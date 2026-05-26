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
    const [editingRoom, setEditingRoom] = useState<any | null>(null);
    const [selectedRoom, setSelectedRoom] = useState<any | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            await RoomController.create(form);
            setShowForm(false);
            setForm(INITIAL_FORM);
            refresh();
            closeModal();
        } catch {
        } finally {
            setSubmitting(false);
        }
    };

    const openRoomModal = (room: any) => {
        setSelectedRoom(room);

        setForm({
            number: room.number,
            type: room.type,
            capacity: room.capacity,
            price_per_night: room.price_per_night,
            floor: room.floor,
        });

        setShowForm(true);
    };
    const closeModal = () => {
        setShowForm(false);
        setEditingRoom(null);
        setForm(INITIAL_FORM);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-zinc-950 to-red-950 text-white px-6 py-10">
            {/* Background glow */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-600/10 blur-3xl rounded-full" />

            <div className="relative max-w-7xl mx-auto">
                <BackButton href="/dashboard" label="Voltar para o Dashboard" />

                {/* HEADER */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mt-6 mb-8">
                    <div>
                        <span className="text-red-500 uppercase tracking-widest text-sm font-semibold">
                            Gestão de Quartos
                        </span>

                        <h1 className="text-5xl font-black mt-2">
                            Quartos
                        </h1>

                        <p className="text-zinc-400 mt-3 text-lg">
                            Visualize, cadastre e gerencie os quartos do hotel.
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
                    transition-all
                    duration-200
                    hover:scale-[1.02]
                    active:scale-[0.98]
                "
                    >
                        {showForm ? "Cancelar" : "+ Novo Quarto"}
                    </button>
                </div>

                {/* FORM */}
                {showForm && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center">
                        {/* BACKDROP */}
                        <div
                            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                            onClick={() => setShowForm(false)}
                        />

                        {/* MODAL */}
                        <div className="relative w-full max-w-2xl mx-4">
                            <form
                                onSubmit={handleSubmit}
                                className="
                    bg-zinc-950/80
                    border
                    border-white/10
                    rounded-3xl
                    p-8
                    shadow-2xl
                    animate-in fade-in zoom-in-95 duration-200
                "
                            >
                                {/* HEADER MODAL */}
                                <div className="flex items-start justify-between mb-6">
                                    <div>
                                        <h2 className="text-2xl font-bold">
                                            {editingRoom ? "Editar quarto" : "Cadastrar novo quarto"}
                                        </h2>
                                        <p className="text-zinc-400 text-sm mt-1">
                                            Preencha os dados do quarto
                                        </p>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() => setShowForm(false)}
                                        className="
                            text-zinc-400
                            hover:text-white
                            transition
                            text-xl
                        "
                                    >
                                        ✕
                                    </button>
                                </div>

                                {/* FORM */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <FormField
                                        label="Número do quarto"
                                        htmlFor="number"
                                        required
                                    >
                                        <input
                                            id="number"
                                            type="text"
                                            value={form.number}
                                            onChange={(e) =>
                                                setForm({ ...form, number: e.target.value })
                                            }
                                            className="w-full p-4 rounded-2xl bg-black/40 border border-white/10 text-white focus:border-red-500 focus:ring-2 focus:ring-red-500/20 outline-none"
                                        />
                                    </FormField>

                                    <FormField
                                        label="Tipo do quarto"
                                        htmlFor="type"
                                        required
                                    >
                                        <select
                                            id="type"
                                            value={form.type}
                                            onChange={(e) =>
                                                setForm({
                                                    ...form,
                                                    type: e.target.value as RoomType,
                                                })
                                            }
                                            className="w-full p-4 rounded-2xl bg-black/40 border border-white/10 text-white"
                                        >
                                            {ROOM_TYPES.map((t) => (
                                                <option key={t.value} value={t.value}>
                                                    {t.label}
                                                </option>
                                            ))}
                                        </select>
                                    </FormField>

                                    <FormField label="Andar" htmlFor="floor">
                                        <input
                                            id="floor"
                                            type="number"
                                            value={form.floor ?? ""}
                                            onChange={(e) =>
                                                setForm({
                                                    ...form,
                                                    floor: e.target.value
                                                        ? Number(e.target.value)
                                                        : undefined,
                                                })
                                            }
                                            className="w-full p-4 rounded-2xl bg-black/40 border border-white/10 text-white"
                                        />
                                    </FormField>

                                    <FormField label="Capacidade" htmlFor="capacity">
                                        <input
                                            id="capacity"
                                            type="number"
                                            min={1}
                                            value={form.capacity}
                                            onChange={(e) =>
                                                setForm({
                                                    ...form,
                                                    capacity: Number(e.target.value),
                                                })
                                            }
                                            className="w-full p-4 rounded-2xl bg-black/40 border border-white/10 text-white"
                                        />
                                    </FormField>

                                    <FormField
                                        label="Preço por noite"
                                        htmlFor="price"
                                        required
                                        colSpan={2}
                                    >
                                        <input
                                            id="price"
                                            type="number"
                                            step="0.01"
                                            value={form.price_per_night || ""}
                                            onChange={(e) =>
                                                setForm({
                                                    ...form,
                                                    price_per_night: Number(e.target.value),
                                                })
                                            }
                                            className="w-full p-4 rounded-2xl bg-black/40 border border-white/10 text-white"
                                        />
                                    </FormField>
                                </div>

                                {/* ACTIONS */}
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="
                        mt-8
                        w-full
                        bg-gradient-to-r
                        from-green-600
                        to-emerald-500
                        hover:from-green-700
                        hover:to-emerald-600
                        p-4
                        rounded-2xl
                        font-bold
                        transition
                        disabled:opacity-50
                    "
                                >
                                    {selectedRoom ? "Editar quarto" : "Cadastrar quarto"}
                                </button>
                            </form>
                        </div>
                    </div>
                )}

                {/* STATES */}
                {loading && (
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-zinc-400">
                        Carregando quartos...
                    </div>
                )}

                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6 text-red-400">
                        {error}
                    </div>
                )}

                {!loading && rooms.length === 0 && !error && (
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-10 text-center">
                        <p className="text-zinc-400 text-lg">
                            Nenhum quarto cadastrado ainda.
                        </p>

                        <p className="text-zinc-500 mt-2">
                            Clique em "+ Novo Quarto" para começar.
                        </p>
                    </div>
                )}

                {/* ROOMS */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                    {rooms.map((room) => (
                        <div
                            key={room.id}
                            onClick={() => openRoomModal(room)}
                            className="
                                group
                                relative
                                cursor-pointer
                                transition-all
                                duration-300
                                hover:-translate-y-1
                            "
                        >
                            <RoomCard room={room} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
