from app.models.user_model import User
from app.utils.password import hash_password

def register_user(email, password, nome, cpf, telefone):
    existing = User.get_by_email(email)
    if existing.data and len(existing.data) > 0:
        return {"error": "Email já cadastrado"}

    hashed_password = hash_password(password)

    User.create(email, hashed_password, nome, cpf, telefone)
    return {"message": "Usuário criado com sucesso"}