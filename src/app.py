"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_migrate import Migrate
from flask_swagger import swagger
from api.utils import APIException, generate_sitemap
from api.models import db, User, Note, BlackListToken
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt, get_jti, verify_jwt_in_request
from flask_cors import CORS
from flask_bcrypt import Bcrypt


# from models import Person

ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(os.path.dirname(
    os.path.realpath(__file__)), '../public/')
app = Flask(__name__)

bcrypt = Bcrypt(app)
CORS(app)
app.url_map.strict_slashes = False

app.config["JWT_SECRET_KEY"] = "nuestra_clave_secreta"
jwt = JWTManager(app)

# database condiguration
db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace(
        "postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
MIGRATE = Migrate(app, db, compare_type=True)
db.init_app(app)

# add the admin
setup_admin(app)

# add the admin
setup_commands(app)

# Add all endpoints form the API with a "api" prefix
app.register_blueprint(api, url_prefix='/api')

# Handle/serialize errors like a JSON object

@jwt.token_in_blocklist_loader
def handle_revoked_token(jwt_header,jwt_payload):
    jti = jwt_payload['jti']

    token = db.session.execute(db.select(BlackListToken).filter_by(jti=jti)).scalar()
    return token is not None

@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# generate sitemap with all your endpoints


@app.route('/')
def sitemap():
    if ENV == "development":
        return generate_sitemap(app)
    return send_from_directory(static_file_dir, 'index.html')

# any other endpoint will try to serve it like a static file
@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0  # avoid cache memory
    return response


# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)



# User management endpoints

# Login
@app.route('/login', methods=['POST'])
def handle_login():
    data = request.get_json(silent=True)
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"msg": "Email and password are required"}), 400

    user = User.query.filter_by(email=email).first()
    if not user or user.password != password:
        return jsonify({"msg": "Invalid credentials"}), 401

    return jsonify(user.serialize()), 200


#Register a new user
@app.route("/users", methods=["POST"])
def create_user():

    data = request.get_json(silent=True)
    if not data or not data.get("email") or not data.get("password"):
        return jsonify({"error": "Datos inválidos"}), 400

    if db.session.execute(db.select(User).filter_by(email=data["email"])).scalar_one_or_none():
        return jsonify({"error": "Usuario ya existe"}), 409
    pw_hash = bcrypt.generate_password_hash(data["password"]).decode('utf8')
    user = User(name=data["name"], email=data["email"], password=pw_hash,
        is_active=True)
    db.session.add(user)
    db.session.commit()
    return jsonify({"message": "Usuario registrado"}), 201

# Logout
@app.route('/logout', methods=['POST'])
def handle_logout():
    # In a real application, you would handle session management here
    return jsonify({"msg": "Logged out successfully"}), 200


