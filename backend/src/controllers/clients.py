from flask import Flask, request, jsonify
from app import app
from utilities.client_methods import add_new_client, get_all_clients_from_db, get_client_data

@app.route("/api/all_clients")
def get_all_clients():
    try:
        all_clients = get_all_clients_from_db()
        return jsonify(all_clients)
    except Exception as error:
        return str(error), 400

@app.route("/api/client/<int:client_id>")
def get_client(client_id):
    try:
        client_data = get_client_data(client_id)
        print(client_data)
        if client_data:
            return jsonify(client_data), 200
        return jsonify({'message': 'Asiakasta ei löytynyt'}), 404
    except Exception as error:
        return str(error), 400

@app.route("/api/client", methods=["POST"])
def add_client():
    try:
        client_data = request.json
        add_new_client(client_data)
        return "Client added successfully", 201
    except Exception as error:
        return str(error), 400
