"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

import { ServiceUser } from "@/src/services/user";
import { displayMessage } from "@/src/components/displayMessage";

export default function LoginPage() {
    const serviceUser = ServiceUser();
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const res = await serviceUser.LoginUser({
                email,
                password,
            });

            Cookies.set("token", res.data.token, {
                expires: 7,
                sameSite: "lax",
            });

            displayMessage(
                "Sucesso",
                "Login realizado com sucesso!",
                "success",
                false,
                false,
                false,
                3000
            );

            router.push("/dashboard");
        } catch (err: any) {
            displayMessage(
                "Erro",
                "Email ou senha inválidos",
                "error",
                false,
                false,
                false,
                5000
            );
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-red-950 px-4">
            {/* Glow background */}
            <div className="absolute w-[200px] h-[500px] bg-red-600/20 blur-3xl rounded-full " />

            <form
                onSubmit={handleSubmit}
                className="
                    relative
                    w-full
                    max-w-md
                    bg-white/5
                    backdrop-blur-md
                    border
                    border-white/10
                    rounded-3xl
                    p-8
                    shadow-2xl
                "
            >
                {/* HEADER */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-black text-white">
                        Login
                    </h1>

                    <p className="text-gray-400 mt-2">
                        Entre na sua conta
                    </p>
                </div>

                {/* EMAIL */}
                <div className="mb-5">
                    <label className="block text-sm text-gray-300 mb-2">
                        Email
                    </label>

                    <input
                        type="email"
                        placeholder="Digite seu email"
                        className="
                            w-full
                            p-4
                            rounded-xl
                            bg-black/30
                            border
                            border-white/10
                            text-white
                            placeholder:text-gray-500
                            outline-none
                            transition
                            focus:border-red-500
                            focus:ring-2
                            focus:ring-red-500/20
                        "
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                {/* PASSWORD */}
                <div className="mb-6">
                    <label className="block text-sm text-gray-300 mb-2">
                        Senha
                    </label>

                    <input
                        type="password"
                        placeholder="Digite sua senha"
                        className="
                            w-full
                            p-4
                            rounded-xl
                            bg-black/30
                            border
                            border-white/10
                            text-white
                            placeholder:text-gray-500
                            outline-none
                            transition
                            focus:border-red-500
                            focus:ring-2
                            focus:ring-red-500/20
                        "
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                {/* BUTTON */}
                <button
                    type="submit"
                    className="
                        w-full
                        bg-red-600
                        hover:bg-red-700
                        transition-all
                        duration-200
                        p-4
                        rounded-xl
                        font-bold
                        text-white
                        shadow-lg
                        shadow-red-900/40
                        hover:scale-[1.01]
                        active:scale-[0.99]
                    "
                >
                    Entrar
                </button>

                {/* FOOTER */}
                <div className="mt-6 text-center">
                    <span className="text-gray-500 text-sm">
                        Acesse sua plataforma com segurança
                    </span>
                </div>
            </form>
        </div>
    );
}