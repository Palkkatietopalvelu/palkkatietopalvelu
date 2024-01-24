from flask import Flask, request, jsonify
from app import app
import utilities.client_methods as clients

@app.route("/api/clients")
def get_clients():
    try:
        all_clients = clients.get_clients()
        return jsonify(all_clients)
    except Exception as error:
        return str(error), 400

@app.route("/api/client/<int:client_id>")
def get_client(client_id):
    try:
        client_data = clients.get_client_data(client_id)
        print(client_data)
        if client_data:
            return jsonify(client_data), 200
        return jsonify({'message': 'Asiakasta ei löytynyt'}), 404
    except Exception as error:
        return str(error), 400

@app.route("/api/add", methods=["POST"])
def add_client():
    try:
        client_data = request.json
        clients.add_client(client_data)
        return "Client added successfully", 201
    except Exception as error:
        return str(error), 400
