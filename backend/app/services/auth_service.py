from app.models.user_model import User
from app.utils.password import hash_password
from app.utils.password import check_password
from app.utils.jwt import generate_token

def register_user(email, password, nome, cpf, telefone):
    existing = User.get_by_email(email)
    if existing.data and len(existing.data) > 0:
        return {"error": "Email já cadastrado"}

    hashed_password = hash_password(password)

    User.create(email, hashed_password, nome, cpf, telefone)
    return {"message": "Usuário criado com sucesso"}


def login_user(email, password):
    response = User.get_by_email(email)

    if not response.data:
        return {"error": "Usuário não encontrado"}

    user = response.data[0]

    if not check_password(password, user["password"]):
        return {"error": "Senha inválida"}

    token = generate_token(user)

    return {
        "token": token,
        "user": {
            "id": user["id"],
            "email": user["email"],
            "nome": user["nome"]
        }
    }