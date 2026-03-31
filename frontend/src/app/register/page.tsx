"use client";
import { useState } from "react";
import { IUserRegister } from "@/src/interfaces/user";
import { ServiceUser } from "@/src/services/user";
import { displayMessage } from "@/src/components/displayMessage"
import { AxiosError } from "axios";


export default function RegisterPage() {
    const serviceUser = ServiceUser();
    const [form, setForm] = useState<IUserRegister>({
        email: "",
        password: "",
        nome: "",
        cpf: "",
        telefone: "",
    });
    const [message, setMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await serviceUser.RegisterUser(form);
            displayMessage(
                "Sucesso",
                "Usuário cadastrado com sucesso.",
                "success", false, false, false, 3000
            )
            setForm({ email: "", password: "", nome: "", cpf: "", telefone: "" });
        } catch (err: unknown) {
            let message = "Falha ao cadastrar usuário.";

            if (err && typeof err === "object" && "response" in err) {
                const axiosErr = err as AxiosError;
                if (axiosErr.response && axiosErr.response.data) {
                    message = (axiosErr.response.data as any).error || message;
                }
            }

            displayMessage(
                "Erro", message, "error",
                false, false, false, 5000
            );
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gray-900">
            <form
                onSubmit={handleSubmit}
                className="bg-black/70 p-8 rounded-xl w-full max-w-xl text-white backdrop-blur-sm"
            >
                <h1 className="text-3xl font-bold mb-6 text-red-600 text-center">
                    Bem vindo ao Hotel Transilvânia
                    <span className="block text-orange-200 text-lg mt-1 font-medium">
                        Cadastro de Usuário
                    </span>
                </h1>

                <input
                    type="text"
                    name="nome"
                    placeholder="Nome"
                    value={form.nome}
                    onChange={handleChange}
                    className="w-full p-3 mb-4 rounded bg-gray-800 placeholder-gray-400 text-white focus:ring-2 focus:ring-red-600 focus:outline-none transition rounded-md"
                    required
                />

                <div className="grid grid-cols-2 gap-2">
                    <input
                        type="text"
                        name="cpf"
                        placeholder="CPF"
                        value={form.cpf}
                        onChange={handleChange}
                        className="w-full p-3 mb-4 rounded bg-gray-800 placeholder-gray-400 text-white focus:ring-2 focus:ring-red-600 focus:outline-none transition rounded-md"
                        required
                    />
                    <input
                        type="text"
                        name="telefone"
                        placeholder="Telefone"
                        value={form.telefone}
                        onChange={handleChange}
                        className="w-full p-3 mb-4 rounded bg-gray-800 placeholder-gray-400 text-white focus:ring-2 focus:ring-red-600 focus:outline-none transition rounded-md"
                        required
                    />
                </div>

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full p-3 mb-4 rounded bg-gray-800 placeholder-gray-400 text-white focus:ring-2 focus:ring-red-600 focus:outline-none transition rounded-md"
                    required
                />

                <div className="relative mb-6">
                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Senha"
                        value={form.password}
                        onChange={handleChange}
                        className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 placeholder-gray-400 text-white focus:border-red-600 focus:ring-2 focus:ring-red-600 focus:outline-none transition"
                        required
                    />
                    <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white cursor-pointer transition"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? "🙈" : "👁️"}
                    </button>
                </div>

                <button
                    type="submit"
                    className="w-full py-3 mb-2 rounded font-bold text-black bg-orange-500 hover:bg-orange-600 transition-colors duration-200 cursor-pointer rounded-md"
                >
                    Cadastrar
                </button>

                {message && (
                    <p className="mt-4 text-center text-red-500 font-medium">{message}</p>
                )}

                <p className="mt-4 text-center text-gray-300 text-sm">
                    Já tem um cadastro?{" "}
                    <a
                        href="/login"
                        className="text-orange-400 hover:text-orange-300 font-semibold transition-colors"
                    >
                        Então faça login
                    </a>
                </p>
            </form>
        </div>
    );
}