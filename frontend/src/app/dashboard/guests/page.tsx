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
        <div className="min-h-screen bg-zinc-950 text-white p-8">
            <BackButton href="/dashboard" label="Voltar para o Dashboard" />

            <div className="flex justify-between items-center mb-2">
                <h1 className="text-3xl font-bold">Hóspedes</h1>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded font-semibold"
                >
                    {showForm ? "Cancelar" : "+ Novo Hóspede"}
                </button>
            </div>
            <p className="text-zinc-400 mb-6">
                Cadastre e consulte os hóspedes do hotel.
            </p>

            {showForm && (
                <form
                    onSubmit={handleSubmit}
                    className="bg-zinc-900 p-6 rounded-lg mb-6 border border-zinc-800"
                >
                    <h2 className="text-xl font-semibold mb-1">Cadastrar novo hóspede</h2>
                    <p className="text-sm text-zinc-400 mb-4">
                        Preencha os dados do hóspede. Os marcados com <span className="text-red-500">*</span> são obrigatórios.
                    </p>

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
