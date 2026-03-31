import bcrypt

def hash_password(password: str) -> str:
    # Gera o hash da senha
    salt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(password.encode('utf-8'), salt)
    return hashed.decode('utf-8')

def check_password(password: str, hashed: str) -> bool:
    # Compara senha em texto com hash armazenado
    return bcrypt.checkpw(password.encode('utf-8'), hashed.encode('utf-8'))