"use client";

import { useMemo, useState } from "react";
import { useReservations } from "@/src/hooks/useReservations";
import { useRooms } from "@/src/hooks/useRooms";
import { useGuests } from "@/src/hooks/useGuests";
import { ReservationController } from "@/src/controllers/reservationController";
import { ReservationCreatePayload } from "@/src/interfaces/reservation";
import BackButton from "@/src/components/BackButton";
import FormField from "@/src/components/FormField";

const STATUS_LABELS: Record<string, string> = {
    confirmed: "Confirmada",
    checked_in: "Check-in",
    checked_out: "Check-out",
    cancelled: "Cancelada",
    no_show: "No-show",
};

const ROOM_TYPE_LABELS: Record<string, string> = {
    single: "Solteiro",
    double: "Casal",
    suite: "Suíte",
    deluxe: "Deluxe",
};

const INITIAL_FORM: ReservationCreatePayload = {
    room_id: "",
    guest_id: "",
    check_in: "",
    check_out: "",
    adults: 1,
    children: 0,
};

const inputClass = "p-2 rounded bg-zinc-800 text-white border border-zinc-700 focus:border-red-500 focus:outline-none";

export default function ReservationsPage() {
    const { reservations, loading, error, refresh } = useReservations();
    const { rooms } = useRooms();
    const { guests } = useGuests();
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState<ReservationCreatePayload>(INITIAL_FORM);
    const [submitting, setSubmitting] = useState(false);

    const availableRooms = useMemo(
        () => rooms.filter((r) => r.status === "available"),
        [rooms]
    );

    const today = new Date().toISOString().slice(0, 10);
    const checkoutMin = form.check_in || today;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            await ReservationController.create(form);
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

            <div className="flex justify-between items-center mb-2">
                <h1 className="text-3xl font-bold">Reservas</h1>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded font-semibold"
                    disabled={!showForm && (availableRooms.length === 0 || guests.length === 0)}
                >
                    {showForm ? "Cancelar" : "+ Nova Reserva"}
                </button>
            </div>
            <p className="text-zinc-400 mb-6">
                Crie e acompanhe reservas. O sistema valida automaticamente se há conflitos de datas no mesmo quarto.
            </p>

            {!showForm && (availableRooms.length === 0 || guests.length === 0) && (
                <div className="bg-yellow-500/10 border border-yellow-500/20 text-yellow-200 p-4 rounded-2xl mb-6 text-sm">
                    Para criar uma reserva é necessário ter pelo menos{" "}
                    <strong>1 quarto disponível</strong> e <strong>1 hóspede cadastrado</strong>.
                    {availableRooms.length === 0 && " Nenhum quarto disponível no momento."}
                    {guests.length === 0 && " Nenhum hóspede cadastrado."}
                </div>
            )}

            {showForm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
                    <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-zinc-900 border border-zinc-800 rounded-3xl shadow-2xl">
                        <div className="sticky top-0 bg-zinc-900 border-b border-zinc-800 p-6 flex items-center justify-between">
                            <div>
                                <h2 className="text-2xl font-bold">
                                    Nova Reserva
                                </h2>
                                <p className="text-zinc-400 text-sm">
                                    Selecione o quarto, hóspede e período da estadia.
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={() => setShowForm(false)}
                                className="text-zinc-400 hover:text-white text-2xl"
                            >
                                ✕
                            </button>
                        </div>
                <form
                    onSubmit={handleSubmit}
                    className="p-6"
                >

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                            label="Quarto"
                            htmlFor="room_id"
                            hint="Apenas quartos com status 'Disponível' são listados."
                            required
                        >
                            <select
                                id="room_id"
                                value={form.room_id}
                                onChange={(e) => setForm({ ...form, room_id: e.target.value })}
                                className={inputClass}
                                required
                            >
                                <option value="">Selecione um quarto</option>
                                {availableRooms.map((r) => (
                                    <option key={r.id} value={r.id}>
                                        Quarto {r.number} — {ROOM_TYPE_LABELS[r.type] ?? r.type} — R${" "}
                                        {Number(r.price_per_night).toFixed(2)}/noite
                                    </option>
                                ))}
                            </select>
                        </FormField>

                        <FormField
                            label="Hóspede"
                            htmlFor="guest_id"
                            hint="Selecione um hóspede já cadastrado."
                            required
                        >
                            <select
                                id="guest_id"
                                value={form.guest_id}
                                onChange={(e) => setForm({ ...form, guest_id: e.target.value })}
                                className={inputClass}
                                required
                            >
                                <option value="">Selecione um hóspede</option>
                                {guests.map((g) => (
                                    <option key={g.id} value={g.id}>{g.full_name}</option>
                                ))}
                            </select>
                        </FormField>

                        <FormField
                            label="Check-in"
                            htmlFor="check_in"
                            hint="Data de entrada do hóspede."
                            required
                        >
                            <input
                                id="check_in"
                                type="date"
                                min={today}
                                value={form.check_in}
                                onChange={(e) => setForm({ ...form, check_in: e.target.value })}
                                className={inputClass}
                                required
                            />
                        </FormField>

                        <FormField
                            label="Check-out"
                            htmlFor="check_out"
                            hint="Data de saída. Deve ser posterior ao check-in."
                            required
                        >
                            <input
                                id="check_out"
                                type="date"
                                min={checkoutMin}
                                value={form.check_out}
                                onChange={(e) => setForm({ ...form, check_out: e.target.value })}
                                className={inputClass}
                                required
                            />
                        </FormField>

                        <FormField
                            label="Adultos"
                            htmlFor="adults"
                            hint="Quantidade de adultos (12+ anos)."
                        >
                            <input
                                id="adults"
                                type="number"
                                min={1}
                                placeholder="1"
                                value={form.adults}
                                onChange={(e) => setForm({ ...form, adults: Number(e.target.value) })}
                                className={inputClass}
                            />
                        </FormField>

                        <FormField
                            label="Crianças"
                            htmlFor="children"
                            hint="Quantidade de crianças (até 11 anos)."
                        >
                            <input
                                id="children"
                                type="number"
                                min={0}
                                placeholder="0"
                                value={form.children}
                                onChange={(e) => setForm({ ...form, children: Number(e.target.value) })}
                                className={inputClass}
                            />
                        </FormField>

                        <FormField
                            label="Observações"
                            htmlFor="notes"
                            hint="Pedidos especiais, restrições, alergias, etc. (opcional)."
                            colSpan={2}
                        >
                            <textarea
                                id="notes"
                                rows={3}
                                placeholder="Ex: hóspede pediu cama extra para criança"
                                value={form.notes ?? ""}
                                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                                className={inputClass}
                            />
                        </FormField>
                    </div>

                    <button
                        type="submit"
                        disabled={submitting}
                        className="mt-6 w-full bg-green-600 hover:bg-green-700 disabled:bg-green-900 disabled:cursor-not-allowed p-3 rounded font-semibold"
                    >
                        {submitting ? "Criando reserva..." : "Criar Reserva"}
                    </button>
                        </form>
                    </div>
                    </div>
            )}

            {loading && <p className="text-zinc-400">Carregando reservas...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {!loading && reservations.length === 0 && !error && (
                <p className="text-zinc-500">Nenhuma reserva criada ainda.</p>
            )}

            {reservations.length > 0 && (
                <div className="bg-zinc-900 rounded-lg overflow-hidden border border-zinc-800">
                    <table className="w-full">
                        <thead className="bg-zinc-800 text-zinc-300 text-sm uppercase">
                            <tr>
                                <th className="text-left p-3">Quarto</th>
                                <th className="text-left p-3">Hóspede</th>
                                <th className="text-left p-3">Check-in</th>
                                <th className="text-left p-3">Check-out</th>
                                <th className="text-left p-3">Status</th>
                                <th className="text-left p-3">Valor total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reservations.map((r) => (
                                <tr key={r.id} className="border-t border-zinc-800 hover:bg-zinc-800/50">
                                    <td className="p-3 font-medium">{r.rooms?.number ?? "—"}</td>
                                    <td className="p-3">{r.guests?.full_name ?? "—"}</td>
                                    <td className="p-3 text-zinc-400">{r.check_in}</td>
                                    <td className="p-3 text-zinc-400">{r.check_out}</td>
                                    <td className="p-3">{STATUS_LABELS[r.status] ?? r.status}</td>
                                    <td className="p-3 font-semibold">
                                        {r.total_price ? `R$ ${Number(r.total_price).toFixed(2)}` : "—"}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
