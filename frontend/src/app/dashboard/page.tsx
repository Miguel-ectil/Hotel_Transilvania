import Link from "next/link";

const SECTIONS = [
    { href: "/dashboard/rooms", title: "Quartos", desc: "Gerenciar quartos e status" },
    { href: "/dashboard/guests", title: "Hóspedes", desc: "Cadastro e consulta de hóspedes" },
    { href: "/dashboard/reservations", title: "Reservas", desc: "Criar e visualizar reservas" },
];

export default function DashboardPage() {
    return (
        <div className="min-h-screen bg-zinc-950 text-white p-8">
            <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
            <p className="text-zinc-400 mb-8">Sistema de Gestão Hoteleira — Hotel Transilvânia</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {SECTIONS.map((s) => (
                    <Link
                        key={s.href}
                        href={s.href}
                        className="bg-zinc-900 hover:bg-zinc-800 p-6 rounded-lg border border-zinc-800 transition-colors"
                    >
                        <h2 className="text-xl font-bold mb-2">{s.title}</h2>
                        <p className="text-zinc-400 text-sm">{s.desc}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
}
