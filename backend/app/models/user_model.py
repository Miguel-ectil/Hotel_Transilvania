from app.database.supabase_client import supabase

class User:
    table_name = "users"

    @classmethod
    def get_by_email(cls, email):
        return supabase.table(cls.table_name).select("*").eq("email", email).execute()

    @classmethod
    def create(cls, email, password, nome, cpf, telefone):
        return supabase.table(cls.table_name).insert({
            "email": email,
            "password": password,
            "nome": nome,
            "cpf": cpf,
            "telefone": telefone
        }).execute()