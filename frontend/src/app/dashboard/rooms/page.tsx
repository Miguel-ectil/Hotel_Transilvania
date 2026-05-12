"use client";

import { useState } from "react";
import { useRooms } from "@/src/hooks/useRooms";
import { RoomController } from "@/src/controllers/roomController";
import { RoomCreatePayload, RoomType } from "@/src/interfaces/room";
import RoomCard from "@/src/components/RoomCard";
import BackButton from "@/src/components/BackButton";
import FormField from "@/src/components/FormField";

const ROOM_TYPES: { value: RoomType; label: string }[] = [
    { value: "single", label: "Solteiro" },
    { value: "double", label: "Casal" },
    { value: "suite", label: "Suíte" },
    { value: "deluxe", label: "Deluxe" },
];

const INITIAL_FORM: RoomCreatePayload = {
    number: "",
    type: "single",
    price_per_night: 0,
    capacity: 2,
};

const inputClass = "p-2 rounded bg-zinc-800 text-white border border-zinc-700 focus:border-red-500 focus:outline-none";

export default function RoomsPage() {
    const { rooms, loading, error, refresh } = useRooms();
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState<RoomCreatePayload>(INITIAL_FORM);
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            await RoomController.create(form);
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
                <h1 className="text-3xl font-bold">Quartos</h1>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded font-semibold"
                >
                    {showForm ? "Cancelar" : "+ Novo Quarto"}
                </button>
            </div>
            <p className="text-zinc-400 mb-6">
                Visualize, cadastre e gerencie os quartos do hotel.
            </p>

            {showForm && (
                <form
                    onSubmit={handleSubmit}
                    className="bg-zinc-900 p-6 rounded-lg mb-6 border border-zinc-800"
                >
                    <h2 className="text-xl font-semibold mb-1">Cadastrar novo quarto</h2>
                    <p className="text-sm text-zinc-400 mb-4">
                        Preencha os campos abaixo. Os marcados com <span className="text-red-500">*</span> são obrigatórios.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                            label="Número do quarto"
                            htmlFor="number"
                            hint="Ex: 101, 202A. Deve ser único no hotel."
                            required
                        >
                            <input
                                id="number"
                                type="text"
                                placeholder="101"
                                value={form.number}
                                onChange={(e) => setForm({ ...form, number: e.target.value })}
                                className={inputClass}
                                required
                            />
                        </FormField>

                        <FormField
                            label="Tipo do quarto"
                            htmlFor="type"
                            hint="Categoria que define o padrão do quarto."
                            required
                        >
                            <select
                                id="type"
                                value={form.type}
                                onChange={(e) => setForm({ ...form, type: e.target.value as RoomType })}
                                className={inputClass}
                            >
                                {ROOM_TYPES.map((t) => (
                                    <option key={t.value} value={t.value}>{t.label}</option>
                                ))}
                            </select>
                        </FormField>

                        <FormField
                            label="Andar"
                            htmlFor="floor"
                            hint="Número do andar onde o quarto está localizado (opcional)."
                        >
                            <input
                                id="floor"
                                type="number"
                                placeholder="1"
                                value={form.floor ?? ""}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        floor: e.target.value ? Number(e.target.value) : undefined,
                                    })
                                }
                                className={inputClass}
                            />
                        </FormField>

                        <FormField
                            label="Capacidade"
                            htmlFor="capacity"
                            hint="Quantas pessoas o quarto comporta."
                        >
                            <input
                                id="capacity"
                                type="number"
                                min={1}
                                placeholder="2"
                                value={form.capacity}
                                onChange={(e) => setForm({ ...form, capacity: Number(e.target.value) })}
                                className={inputClass}
                            />
                        </FormField>

                        <FormField
                            label="Preço por noite (R$)"
                            htmlFor="price"
                            hint="Valor cobrado por diária. Aceita centavos (ex: 250.50)."
                            required
                            colSpan={2}
                        >
                            <input
                                id="price"
                                type="number"
                                step="0.01"
                                min={0}
                                placeholder="250.00"
                                value={form.price_per_night || ""}
                                onChange={(e) => setForm({ ...form, price_per_night: Number(e.target.value) })}
                                className={inputClass}
                                required
                            />
                        </FormField>
                    </div>

                    <button
                        type="submit"
                        disabled={submitting}
                        className="mt-6 w-full bg-green-600 hover:bg-green-700 disabled:bg-green-900 disabled:cursor-not-allowed p-3 rounded font-semibold"
                    >
                        {submitting ? "Cadastrando..." : "Cadastrar Quarto"}
                    </button>
                </form>
            )}

            {loading && <p className="text-zinc-400">Carregando quartos...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {!loading && rooms.length === 0 && !error && (
                <p className="text-zinc-500">Nenhum quarto cadastrado ainda. Clique em "+ Novo Quarto" para começar.</p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {rooms.map((room) => (
                    <RoomCard key={room.id} room={room} />
                ))}
            </div>
        </div>
    );
}
