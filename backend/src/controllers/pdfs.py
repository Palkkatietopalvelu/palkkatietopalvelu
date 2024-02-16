import os
from datetime import datetime
from flask import request, jsonify, send_file
from werkzeug.utils import secure_filename
from app import app
from utilities import pdf_methods as pdfs
from utilities.require_login import require_login
from config import UPLOAD_FOLDER

@app.route('/api/pdfs', methods=['GET'])
@require_login
def get_all_pdfs():
    try:
        all_pdfs = pdfs.get_all_pdfs()
        return jsonify(all_pdfs)
    except Exception as e:
        return str(e), 400

@app.route('/api/pdfs', methods=['POST'])
@require_login
def upload_pdf():
    if 'file' not in request.files:
        return 'No file part', 400
    file = request.files['file']
    if file.filename == '':
        return 'No selected file', 400
    if not file.filename.lower().endswith('.pdf'):
        return 'Invalid file type', 400
    base_name = os.path.splitext(secure_filename(file.filename))[0]
    extension = os.path.splitext(secure_filename(file.filename))[1]
    timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
    unique_name = f"{base_name}_{timestamp}{extension}"
    path = os.path.join(UPLOAD_FOLDER, unique_name)
    try:
        file.save(os.path.join(path))
        pdfs.add_pdf({
            "owner": request.form.get("owner"),
            "name": unique_name,
            "path": path,
            "date": datetime.now(),
        })
        return "PDF uploaded successfully", 200
    except Exception as e:
        return str(e), 400

@app.route('/api/pdfs/<int:pdf_id>/download', methods=['GET'])
@require_login
def download_pdf(pdf_id):
    pdf = pdfs.get_pdf(pdf_id)
    if pdf:
        pdf_path = pdf['path']
        return send_file(pdf_path, as_attachment=True, download_name=pdf['name'])
    return 'PDF not found', 404

@app.route('/api/pdfs/<int:pdf_id>', methods=['DELETE'])
@require_login
def delete_pdf(pdf_id):
    try:
        pdfs.delete_pdf(pdf_id)
        return "PDF deleted successfully", 200
    except Exception as e:
        return str(e), 400
