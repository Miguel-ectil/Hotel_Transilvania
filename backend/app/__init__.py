from flask import Flask
from flask_cors import CORS
from app.routes.auth_routes import auth_bp

def create_app():
    app = Flask(__name__)
    
    # Configuração do CORS
    CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}}, supports_credentials=True)

    app.register_blueprint(auth_bp, url_prefix="/auth")

    return app