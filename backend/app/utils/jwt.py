import jwt
from datetime import datetime, timedelta

from app.config import SECRET_KEY


def generate_token(user):
    payload = {
        "user_id": user["id"],
        "email": user["email"],
        "exp": datetime.utcnow() + timedelta(hours=2),
    }

    return jwt.encode(payload, SECRET_KEY, algorithm="HS256")
