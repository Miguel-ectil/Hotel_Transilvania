"use client";

import { useState } from "react";
import { useGuests } from "@/src/hooks/useGuests";
import { GuestController } from "@/src/controllers/guestController";
import { DocumentType, GuestCreatePayload } from "@/src/interfaces/guest";
import BackButton from "@/src/components/BackButton";
import FormField from "@/src/components/FormField";

const DOCUMENT_TYPES: { value: DocumentType; label: string }[] = [
    { value: "cpf", label: "CPF" },
    { value: "rg", label: "RG" },
    { value: "passport", label: "Passaporte" },
];

const INITIAL_FORM: GuestCreatePayload = {
    full_name: "",
    email: "",
    phone: "",
    document_type: "cpf",
    document_number: "",
};

const inputClass = "p-2 rounded bg-zinc-800 text-white border border-zinc-700 focus:border-red-500 focus:outline-none";

export default function GuestsPage() {
    const { guests, loading, error, refresh } = useGuests();
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState<GuestCreatePayload>(INITIAL_FORM);
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            await GuestController.create(form);
            setShowForm(false);
            setForm(INITIAL_FORM);
            refresh();
        } catch {
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-zinc-950 to-red-950 text-white px-6 py-10">
            <BackButton href="/dashboard" label="Voltar para o Dashboard" />

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mt-6 mb-8">
                <div>
                    <span className="text-red-500 uppercase tracking-widest text-sm font-semibold">
                        Gestão de Hóspedes
                    </span>

                    <h1 className="text-5xl font-black mt-2">
                        Hóspedes
                    </h1>

                    <p className="text-zinc-400 mt-3 text-lg">
                        Cadastre e consulte os hóspedes do hotel.
                    </p>
                </div>

                <button
                    onClick={() => setShowForm(!showForm)}
                    className="
                    bg-gradient-to-r
                    from-red-600
                    to-orange-500
                    hover:from-red-700
                    hover:to-orange-600
                    px-6
                    py-3
                    rounded-2xl
                    font-semibold
                    shadow-lg
                    shadow-red-900/30
                    transition
                    hover:scale-[1.02]
                    active:scale-[0.98]
                "
                >
                    {showForm ? "Cancelar" : "+ Novo Hóspede"}
                </button>
            </div>

            {showForm && (
                <form
                    onSubmit={handleSubmit}
                    className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 mb-10 shadow-2xl"
                >
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold mb-2">
                            Cadastrar novo hóspede
                        </h2>

                        <p className="text-zinc-400">
                            Preencha os dados do hóspede corretamente
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                            label="Nome completo"
                            htmlFor="full_name"
                            hint="Como aparece no documento de identificação."
                            required
                            colSpan={2}
                        >
                            <input
                                id="full_name"
                                type="text"
                                placeholder="João da Silva"
                                value={form.full_name}
                                onChange={(e) => setForm({ ...form, full_name: e.target.value })}
                                className={inputClass}
                                required
                            />
                        </FormField>

                        <FormField
                            label="E-mail"
                            htmlFor="email"
                            hint="Usado para contato e confirmações. Deve ser único."
                        >
                            <input
                                id="email"
                                type="email"
                                placeholder="joao@email.com"
                                value={form.email}
                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                                className={inputClass}
                            />
                        </FormField>

                        <FormField
                            label="Telefone"
                            htmlFor="phone"
                            hint="Inclua DDD. Ex: (11) 99999-9999."
                        >
                            <input
                                id="phone"
                                type="tel"
                                placeholder="(11) 99999-9999"
                                value={form.phone}
                                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                className={inputClass}
                            />
                        </FormField>

                        <FormField
                            label="Tipo de documento"
                            htmlFor="document_type"
                            hint="Selecione o documento que será apresentado no check-in."
                        >
                            <select
                                id="document_type"
                                value={form.document_type}
                                onChange={(e) =>
                                    setForm({ ...form, document_type: e.target.value as DocumentType })
                                }
                                className={inputClass}
                            >
                                {DOCUMENT_TYPES.map((t) => (
                                    <option key={t.value} value={t.value}>{t.label}</option>
                                ))}
                            </select>
                        </FormField>

                        <FormField
                            label="Número do documento"
                            htmlFor="document_number"
                            hint="Apenas números (sem pontos ou traços)."
                        >
                            <input
                                id="document_number"
                                type="text"
                                placeholder="12345678900"
                                value={form.document_number}
                                onChange={(e) => setForm({ ...form, document_number: e.target.value })}
                                className={inputClass}
                            />
                        </FormField>
                    </div>

                    <button
                        type="submit"
                        disabled={submitting}
                        className="mt-6 w-full bg-green-600 hover:bg-green-700 disabled:bg-green-900 disabled:cursor-not-allowed p-3 rounded font-semibold"
                    >
                        {submitting ? "Cadastrando..." : "Cadastrar Hóspede"}
                    </button>
                </form>
            )}

            {loading && <p className="text-zinc-400">Carregando hóspedes...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {!loading && guests.length === 0 && !error && (
                <p className="text-zinc-500">Nenhum hóspede cadastrado ainda. Clique em "+ Novo Hóspede" para começar.</p>
            )}

            {guests.length > 0 && (
                <div className="bg-zinc-900 rounded-lg overflow-hidden border border-zinc-800">
                    <table className="w-full">
                        <thead className="bg-zinc-800 text-zinc-300 text-sm uppercase">
                            <tr>
                                <th className="text-left p-3">Nome</th>
                                <th className="text-left p-3">E-mail</th>
                                <th className="text-left p-3">Documento</th>
                                <th className="text-left p-3">Telefone</th>
                            </tr>
                        </thead>
                        <tbody>
                            {guests.map((g) => (
                                <tr key={g.id} className="border-t border-zinc-800 hover:bg-zinc-800/50">
                                    <td className="p-3 font-medium">{g.full_name}</td>
                                    <td className="p-3 text-zinc-400">{g.email ?? "—"}</td>
                                    <td className="p-3 text-zinc-400">
                                        {g.document_type
                                            ? `${g.document_type.toUpperCase()} ${g.document_number ?? ""}`
                                            : "—"}
                                    </td>
                                    <td className="p-3 text-zinc-400">{g.phone ?? "—"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
