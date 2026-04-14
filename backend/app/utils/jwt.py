import jwt
from functools import wraps
from flask import request, jsonify
from datetime import datetime, timedelta
from app.config import SECRET_KEY

def generate_token(user):
    payload = {
        "user_id": user["id"],
        "email": user["email"],
        "exp": datetime.utcnow() + timedelta(hours=2)
    }

    return jwt.encode(payload, SECRET_KEY, algorithm="HS256")


def require_auth(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get("Authorization")

        if not token:
            return jsonify({"error": "Token ausente"}), 401

        try:
            token = token.split(" ")[1]

            decoded = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])

            request.user = decoded

        except Exception:
            return jsonify({"error": "Token inválido"}), 401

        return f(*args, **kwargs)

    return decorated