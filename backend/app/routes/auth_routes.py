from flask import Blueprint, request, jsonify
from app.services.auth_service import register_user
from app.utils.jwt import require_auth

auth_bp = Blueprint("auth", __name__)

@auth_bp.route("/register", methods=["POST"])
# @require_auth
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