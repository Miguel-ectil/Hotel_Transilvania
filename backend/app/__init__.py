from flask import Flask
from flask_cors import CORS

from app.routes.auth_routes import auth_bp
from app.routes.health_routes import health_bp
from app.routes.room_routes import room_bp
from app.routes.guest_routes import guest_bp
from app.routes.reservation_routes import reservation_bp


def create_app():
    app = Flask(__name__)

    CORS(
        app,
        resources={r"/*": {"origins": "http://localhost:3000"}},
        supports_credentials=True,
    )

    app.register_blueprint(health_bp)
    app.register_blueprint(auth_bp, url_prefix="/auth")
    app.register_blueprint(room_bp, url_prefix="/rooms")
    app.register_blueprint(guest_bp, url_prefix="/guests")
    app.register_blueprint(reservation_bp, url_prefix="/reservations")

    return app
