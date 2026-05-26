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
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-red-950 px-4 py-10 overflow-hidden">
            {/* Glow */}
            <div className="absolute w-[200px] h-[600px] bg-red-600/20 blur-3xl rounded-full" />

            <form
                onSubmit={handleSubmit}
                className="
            relative
            w-full
            max-w-xl
            bg-white/5
            backdrop-blur-xl
            border
            border-white/10
            rounded-3xl
            p-8
            md:p-10
            shadow-2xl
        "
            >
                {/* HEADER */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-black text-white leading-tight">
                        Cadastro de Usuário
                    </h1>
                </div>

                {/* NOME */}
                <div className="mb-2">
                    <label className="block text-sm text-gray-300 mb-1">
                        Nome
                    </label>

                    <input
                        type="text"
                        name="nome"
                        placeholder="Digite seu nome"
                        value={form.nome}
                        onChange={handleChange}
                        className="
                    w-full
                    p-4
                    rounded-2xl
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
                        required
                    />
                </div>

                {/* CPF + TELEFONE */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                    <div>
                        <label className="block text-sm text-gray-300 mb-1">
                            CPF
                        </label>

                        <input
                            type="text"
                            name="cpf"
                            placeholder="000.000.000-00"
                            value={form.cpf}
                            onChange={handleChange}
                            className="
                        w-full
                        p-4
                        rounded-2xl
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
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-300 mb-1">
                            Telefone
                        </label>

                        <input
                            type="text"
                            name="telefone"
                            placeholder="(11) 99999-9999"
                            value={form.telefone}
                            onChange={handleChange}
                            className="
                        w-full
                        p-4
                        rounded-2xl
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
                            required
                        />
                    </div>
                </div>

                {/* EMAIL */}
                <div className="mb-5">
                    <label className="block text-sm text-gray-300 mb-1">
                        Email
                    </label>

                    <input
                        type="email"
                        name="email"
                        placeholder="Digite seu email"
                        value={form.email}
                        onChange={handleChange}
                        className="
                    w-full
                    p-4
                    rounded-2xl
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
                        required
                    />
                </div>

                {/* SENHA */}
                <div className="mb-7">
                    <label className="block text-sm text-gray-300 mb-1">
                        Senha
                    </label>

                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Digite sua senha"
                            value={form.password}
                            onChange={handleChange}
                            className="
                        w-full
                        p-4
                        rounded-2xl
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
                            required
                        />

                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="
                        absolute
                        right-4
                        top-1/2
                        -translate-y-1/2
                        text-gray-400
                        hover:text-white
                        transition
                        cursor-pointer
                    "
                        >
                            {showPassword ? "🙈" : "👁️"}
                        </button>
                    </div>
                </div>

                {/* BUTTON */}
                <button
                    type="submit"
                    className="
                w-full
                bg-gradient-to-r
                from-orange-500
                to-red-600
                hover:from-orange-600
                hover:to-red-700
                transition-all
                duration-200
                p-4
                rounded-2xl
                font-bold
                text-white
                shadow-lg
                shadow-red-900/40
                hover:scale-[1.01]
                active:scale-[0.99]
                cursor-pointer
            "
                >
                    Cadastrar
                </button>

                {/* MESSAGE */}
                {message && (
                    <p className="mt-5 text-center text-red-400 font-medium">
                        {message}
                    </p>
                )}

                {/* FOOTER */}
                <p className="mt-6 text-center text-gray-400 text-sm">
                    Já tem uma conta?{" "}
                    <a
                        href="/login"
                        className="
                    text-orange-400
                    hover:text-orange-300
                    font-semibold
                    transition-colors
                "
                    >
                        Faça login
                    </a>
                </p>
            </form>
        </div>
    );
}