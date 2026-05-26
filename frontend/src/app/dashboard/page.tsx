import Link from "next/link";

const SECTIONS = [
    {
        href: "/dashboard/rooms",
        title: "Quartos",
        desc: "Gerenciar quartos e status",
    },
    {
        href: "/dashboard/guests",
        title: "Hóspedes",
        desc: "Cadastro e consulta de hóspedes",
    },
    {
        href: "/dashboard/reservations",
        title: "Reservas",
        desc: "Criar e visualizar reservas",
    },
];

export default function DashboardPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-zinc-950 to-red-950 text-white px-6 py-10">
            {/* Glow */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-600/10 blur-3xl rounded-full" />

            <div className="relative max-w-7xl mx-auto">
                {/* HEADER */}
                <div className="mb-10">
                    <span className="text-red-500 font-semibold tracking-widest uppercase text-sm">
                        Hotel Transilvânia
                    </span>

                    <h1 className="text-5xl font-black mt-2">
                        Dashboard
                    </h1>

                    <p className="text-zinc-400 mt-3 text-lg">
                        Sistema de Gestão Hoteleira
                    </p>
                </div>

                {/* CARDS */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {SECTIONS.map((s) => (
                        <Link
                            key={s.href}
                            href={s.href}
                            className="
                                group
                                relative
                                overflow-hidden
                                rounded-3xl
                                border
                                border-white/10
                                bg-white/5
                                backdrop-blur-md
                                p-7
                                transition-all
                                duration-300
                                hover:border-red-500/40
                                hover:bg-white/10
                                hover:-translate-y-1
                                hover:shadow-2xl
                                hover:shadow-red-900/20
                            "
                        >
                            {/* Glow hover */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-br from-red-500/10 to-transparent" />

                            <div className="relative z-10">
                                <div className="w-14 h-14 rounded-2xl bg-red-600/20 border border-red-500/20 flex items-center justify-center mb-5 text-2xl">
                                    {s.title === "Quartos" && "🛏️"}
                                    {s.title === "Hóspedes" && "🧛"}
                                    {s.title === "Reservas" && "📖"}
                                </div>

                                <h2 className="text-2xl font-bold mb-3 group-hover:text-red-400 transition">
                                    {s.title}
                                </h2>

                                <p className="text-zinc-400 leading-relaxed">
                                    {s.desc}
                                </p>

                                <div className="mt-6 flex items-center text-red-400 font-medium">
                                    Acessar
                                    <span className="ml-2 transition-transform group-hover:translate-x-1">
                                        →
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}