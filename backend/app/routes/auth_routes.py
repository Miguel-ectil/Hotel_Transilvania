from flask import Blueprint

from app.controllers.auth_controller import AuthController
from app.middlewares.auth_decorator import require_auth

auth_bp = Blueprint("auth", __name__)

auth_bp.add_url_rule("/register", view_func=AuthController.register, methods=["POST"])
auth_bp.add_url_rule("/login", view_func=AuthController.login, methods=["POST"])
auth_bp.add_url_rule("/me", view_func=require_auth(AuthController.me), methods=["GET"])
