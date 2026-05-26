from flask import request, jsonify

from app.services.auth_service import register_user, login_user


class AuthController:
    @staticmethod
    def register():
        data = request.get_json() or {}

        email = (data.get("email") or "").strip().lower()
        password = (data.get("password") or "").strip()
        nome = data.get("nome")
        cpf = data.get("cpf")
        telefone = data.get("telefone")

        if not email or not password or not nome:
            return jsonify({
                "error": "Dados obrigatórios faltando",
                "code": "MISSING_FIELDS",
            }), 400

        result = register_user(email, password, nome, cpf, telefone)

        if "error" in result:
            return jsonify({**result, "code": "REGISTER_FAILED"}), 400

        return jsonify({"message": "Usuário criado com sucesso"}), 201

    @staticmethod
    def login():
        data = request.get_json() or {}

        email = (data.get("email") or "").strip().lower()
        password = (data.get("password") or "").strip()

        if not email or not password:
            return jsonify({
                "error": "Email e senha são obrigatórios",
                "code": "MISSING_CREDENTIALS",
            }), 400

        result = login_user(email, password)

        if "error" in result:
            return jsonify({**result, "code": "LOGIN_FAILED"}), 401

        return jsonify(result), 200

    @staticmethod
    def me():
        return jsonify(request.user), 200
