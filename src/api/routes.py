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

@api.route('/notes/<int:id>', methods=['GET'])
def handle_get_note(id):
    note = Note.query.get(id)
    if not note:
        return jsonify({"msg": "Empresa no encontrada"}), 404

    return jsonify(note.serialize()), 200

@api.route('/notes', methods=['GET'])
def handle_get_notes():
    notes = Note.query.all()
    if not notes:
        return jsonify({"msg": "No hay notas"}), 404

    return jsonify([note.serialize() for note in notes]), 200

@api.route('/notes/<int:id>', methods=['DELETE'])
def handle_delete_note(id):
    note = Note.query.get(id)
    if not note:
        return jsonify({"msg": "Nota no encontrada"}), 404

    db.session.delete(note)
    db.session.commit()
    return jsonify({"message": "Nota eliminada"}), 200


@api.route('/notes', methods=['POST'])
def handle_post_note():
    data = request.get_json(silent=True)
    note = Note(
        title=data.get("title"),
        body=data.get("body"),
        date=data.get("date"),
        color=data.get("color"),
        )
    db.session.add(note)
    db.session.commit()
    return jsonify({"message": "Nota creada"}), 201


@api.route('/notes/<int:id>', methods=['PUT'])
def handle_put_note(id):
    data = request.get_json(silent=True)
    note = Note.query.get(id)
    if not note:
        return jsonify({"msg": "Nota no encontrada"}), 404

    note.title = data.get("title")
    note.body = data.get("body")
    db.session.commit()
    return jsonify({"message": "Nota actualizada"}), 200


    

