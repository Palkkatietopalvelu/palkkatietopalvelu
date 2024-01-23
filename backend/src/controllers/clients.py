from flask import Flask, request, jsonify
from app import app
from datetime import datetime
from utilities.client_methods import add_new_client, get_all_clients_from_db, get_client_info_from_db
    
@app.route("/api/all_clients")
def get_all_clients():
    try:
        all_clients = get_all_clients_from_db()
        print(all_clients)
        return jsonify(all_clients)
    except Exception as error:
        return str(error), 400


@app.route("/api/client", methods=["POST"])
def add_client():
    try:
        client_data = request.json
        deadline_str = client_data.get("deadline")
        deadline = datetime.strptime(deadline_str, "%Y-%m-%d").date()
        add_new_client(
            company=client_data.get("company"),
            email=client_data.get("email"),
            phonenumber=client_data.get("phonenumber"),
            bi_code=client_data.get("bi_code"),
            deadline=deadline,
            payperiod=client_data.get("payperiod"),
        )
        return "Client added successfully", 201
    except Exception as error:
        return str(error), 400
    
