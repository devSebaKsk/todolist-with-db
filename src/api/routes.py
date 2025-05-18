"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Note
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/notes/int:id', methods=['GET'])
def handle_get_note(id):
    note = Note.query.get(id)
    if not note:
        return jsonify({"msg": "Empresa no encontrada"}), 404

    return jsonify(note), 200


@api.route('/notes', methods=['POST'])
def handle_post_note():
    data = request.get_json(silent=True)
    note = Note(
        title=data.get("title"),
        body=data.get("body")
        )
    db.session.add(note)
    db.session.commit()
    return jsonify({"message": "Nota creada"}), 201

