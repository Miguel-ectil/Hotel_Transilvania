export interface IUserRegister {
    email: string;
    password: string;
    nome: string;
    cpf: string;
    telefone: string;
}

export interface User {
    token: string;
    email?: string;
    id?: number;
}