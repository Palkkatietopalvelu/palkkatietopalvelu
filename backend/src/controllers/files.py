import os
from datetime import datetime
import jwt
from flask import request, jsonify, send_file
from werkzeug.utils import secure_filename
from app import app
from utilities import file_methods as files
from utilities.require_login import require_login
from config import UPLOAD_FOLDER

@app.route('/api/files', methods=['GET'])
@require_login
def get_all_files():
    try:
        all_files = files.get_all_files()
        return jsonify(all_files)
    except Exception as e: # pylint: disable=broad-except
        return str(e), 400

@app.route('/api/files', methods=['POST'])
@require_login
def upload_file():
    allowed_extensions = ['.pdf', '.xls', '.xlsx', '.doc', '.docx', '.csv']
    if 'file' not in request.files:
        return 'No file part', 400
    file = request.files['file']
    if file.filename == '':
        return 'No selected file', 400
    extension = os.path.splitext(secure_filename(file.filename))[1].lower()
    if extension not in allowed_extensions:
        return 'Invalid file type', 400
    base_name = os.path.splitext(secure_filename(file.filename))[0]
    timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
    unique_name = f"{base_name}_{timestamp}{extension}"
    path = os.path.join(UPLOAD_FOLDER, unique_name)
    try:
        file.save(os.path.join(path))
        files.add_file({
            "owner": request.form.get("owner"),
            "name": unique_name,
            "path": path,
            "date": datetime.now(),
        })
        return "Document uploaded successfully", 200
    except Exception as e: # pylint: disable=broad-except
        return str(e), 403

@app.route('/api/files/<int:file_id>/download', methods=['GET'])
@require_login
def download_file(file_id):
    file = files.get_file(file_id)
    if file:
        file_path = file['path']
        return send_file(file_path, as_attachment=True, download_name=file['name'])
    return 'File not found', 404

@app.route('/api/files/<int:file_id>', methods=['POST'])
@require_login
def move_to_trash(file_id):
    try:
        token = request.headers['Authorization'].split()[1]
        user_data = jwt.decode(token, os.environ.get('SECRET_KEY'), algorithms=['HS256'])
        files.move_file_to_trash(file_id, user_data["id"])
        return "File moved to trash", 200
    except Exception as e: # pylint: disable=broad-except
        return str(e), 400

@app.route('/api/files/<int:file_id>/restore', methods=['POST'])
@require_login
def restore(file_id):
    try:
        files.restore_file(file_id)
        return "File restored successfully", 200
    except Exception as e: # pylint: disable=broad-except
        return str(e), 400

@app.route('/api/files/<int:file_id>', methods=['DELETE'])
@require_login
def delete_file(file_id):
    try:
        files.delete_file(file_id)
        return "File deleted successfully", 200
    except Exception as e: # pylint: disable=broad-except
        return str(e), 400
