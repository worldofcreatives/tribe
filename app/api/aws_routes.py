from app.api.aws_helpers import get_binary_file
from flask import Blueprint, send_file
import io

aws_routes = Blueprint("aws", __name__)


@aws_routes.route("/download/<bucket_name>/<obj_name>")
def get_file_from_s3(bucket_name, obj_name):
    blob = get_binary_file(bucket_name, obj_name)
    if isinstance(blob, str):
        return {"error": "Failed to download file: " + blob}, 400
    return send_file(io.BytesIO(blob), as_attachment=True, download_name=obj_name)
