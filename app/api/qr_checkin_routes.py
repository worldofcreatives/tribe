from flask import Blueprint, request, jsonify, send_file
from flask_login import login_required, current_user
from app.models import Attendance, db
import qrcode
import io

def generate_qr_code(user_id, event_id):
    # Combine user ID and event ID into a single string
    qr_data = f"user_id:{user_id},event_id:{event_id}"

    # Create a QR code instance
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_L,
        box_size=10,
        border=4,
    )
    qr.add_data(qr_data)
    qr.make(fit=True)

    # Create an image from the QR Code instance
    img = qr.make_image(fill_color="black", back_color="white")

    # Save the image to a bytes buffer
    img_bytes = io.BytesIO()
    img.save(img_bytes)
    img_bytes.seek(0)

    # Send the image as a file response
    return send_file(img_bytes, mimetype='image/png', as_attachment=True, download_name=f'qr_code_{user_id}_{event_id}.png')

checkin_routes = Blueprint('checkin', __name__)

@checkin_routes.route('/<int:event_id>', methods=['POST'])
@login_required
def checkin(event_id):
    # Generate and return QR code
    return generate_qr_code(current_user.id, event_id)

@checkin_routes.route('/verify', methods=['POST'])
@login_required
def verify_qr():
    data = request.json
    user_id = data.get('user_id')
    event_id = data.get('event_id')

    # Verify QR code and check in the user
    attendance = Attendance.query.filter_by(user_id=user_id, event_id=event_id).first()
    if attendance:
        attendance.checked_in = True
        db.session.commit()
        return {'message': 'Check-in successful'}, 200
    return {'error': 'Invalid QR code'}, 400
