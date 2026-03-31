from functools import wraps
from flask import request, jsonify
from app.database.supabase_client import supabase

def require_auth(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get("Authorization")

        if not token:
            return jsonify({"error": "Token ausente"}), 401

        try:
            token = token.split(" ")[1]

            user = supabase.auth.get_user(token)

            request.user = user

        except Exception:
            return jsonify({"error": "Token inválido"}), 401

        return f(*args, **kwargs)

    return decorated