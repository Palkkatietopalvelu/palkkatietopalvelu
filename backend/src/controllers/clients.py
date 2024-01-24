from flask import Flask, request, jsonify
from app import app
from utilities.client_methods import add_new_client, get_all_clients_from_db

@app.route("/api/all_clients")
def get_all_clients():
    try:
        all_clients = get_all_clients_from_db()
        return jsonify(all_clients)
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
