from app.api.aws_helpers import get_binary_file, get_binary_files_and_zip
from flask import Blueprint, send_file, request, jsonify
import io

aws_routes = Blueprint("aws", __name__)


@aws_routes.route("/download/<bucket_name>/<obj_name>")
def get_file_from_s3(bucket_name, obj_name):
    blob = get_binary_file(bucket_name, obj_name)
    if isinstance(blob, str):
        return {"error": "Failed to download file: " + blob}, 400
    return send_file(io.BytesIO(blob), as_attachment=True, download_name=obj_name)

@aws_routes.route('/download-all/<bucket_name>', methods=['POST'])
def bulk_download_from_s3(bucket_name):
    keys = request.json.get('fileKeys', [])
    if not keys:
        return jsonify({'error': 'No file keys provided'}), 400

    zip_file = get_binary_files_and_zip(bucket_name, keys)

    return send_file(zip_file, mimetype='application/zip', as_attachment=True, download_name="bulk_download.zip"), 200
