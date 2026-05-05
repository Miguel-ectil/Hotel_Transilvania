import jwt
from functools import wraps
from flask import request, jsonify

from app.config import SECRET_KEY


def require_auth(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        header = request.headers.get("Authorization")

        if not header:
            return jsonify({"error": "Token ausente", "code": "MISSING_TOKEN"}), 401

        try:
            token = header.split(" ")[1]
            decoded = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
            request.user = decoded
        except jwt.ExpiredSignatureError:
            return jsonify({"error": "Token expirado", "code": "EXPIRED_TOKEN"}), 401
        except Exception:
            return jsonify({"error": "Token inválido", "code": "INVALID_TOKEN"}), 401

        return f(*args, **kwargs)

    return decorated
