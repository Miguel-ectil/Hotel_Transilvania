"use client";
import { useState } from "react";
import { ServiceUser } from "@/src/services/user";
import { displayMessage } from "@/src/components/displayMessage";

export default function LoginPage() {
    const serviceUser = ServiceUser();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const res = await serviceUser.LoginUser({
                email,
                password
            });

            // salvar token (IMPORTANTE)
            localStorage.setItem("token", res.data.token);

            displayMessage(
                "Sucesso", "Login realizado com sucesso!", "success",
                false, false, false, 3000
            );

            console.log("USER:", res.data.user);

        } catch (err: any) {
            displayMessage(
                "Erro", "Email ou senha inválidos", "error",
                false, false, false, 5000
            );
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gray-900">
            <form
                onSubmit={handleSubmit}
                className="bg-black/70 p-8 rounded-xl w-full max-w-md text-white backdrop-blur-sm"
            >
                <h1 className="text-3xl font-bold mb-6 text-red-600 text-center">
                    Login
                    <span className="block text-orange-200 text-lg mt-1 font-medium">
                        Entre na sua conta
                    </span>
                </h1>

                {/* EMAIL */}
                <input
                    type="email"
                    placeholder="Email"
                    className="w-full p-3 mb-4 rounded bg-gray-800 text-white"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                {/* PASSWORD */}
                <input
                    type="password"
                    placeholder="Senha"
                    className="w-full p-3 mb-6 rounded bg-gray-800 text-white"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    type="submit"
                    className="w-full bg-red-600 hover:bg-red-700 p-3 rounded font-bold"
                >
                    Entrar
                </button>
            </form>
        </div>
    );
}