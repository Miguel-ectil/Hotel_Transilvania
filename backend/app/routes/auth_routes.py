from flask import Blueprint, request, jsonify
from app.services.auth_service import register_user
from app.utils.jwt import require_auth
from app.services.auth_service import login_user

auth_bp = Blueprint("auth", __name__)

@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.get_json()

    email = data.get("email").strip().lower()
    password = data.get("password").strip()
    nome = data.get("nome")
    cpf = data.get("cpf")
    telefone = data.get("telefone")

    if not email or not password or not nome:
        return jsonify({"error": "Dados obrigatórios faltando"}), 400

    result = register_user(email, password, nome, cpf, telefone)

    if "error" in result:
        return jsonify(result), 400

    return jsonify({"message": "Usuário criado com sucesso"}), 201


@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()

    email = data.get("email").strip().lower()
    password = data.get("password").strip()

    if not email or not password:
        return jsonify({"error": "Email e senha são obrigatórios"}), 400

    result = login_user(email, password)

    if "error" in result:
        return jsonify(result), 401

    return jsonify(result), 200


@auth_bp.route("/me", methods=["GET"])
@require_auth
def me():
    return jsonify(request.user)