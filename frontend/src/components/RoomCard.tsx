import { Room } from "@/src/interfaces/room";
import StatusBadge from "./StatusBadge";

interface Props {
    room: Room;
    onClick?: (room: Room) => void;
}

const TYPE_LABELS: Record<string, string> = {
    single: "Solteiro",
    double: "Casal",
    suite: "Suíte",
    deluxe: "Deluxe",
};

export default function RoomCard({ room, onClick }: Props) {
    return (
        <button
            onClick={() => onClick?.(room)}
            className="
                group
                w-full
                text-left
                rounded-2xl
                border
                border-white/10
                bg-white/5
                backdrop-blur-md
                p-5
                transition-all
                duration-300
                hover:-translate-y-1
                hover:bg-white/10
                hover:border-red-500/30
                hover:shadow-2xl
                hover:shadow-red-900/20
                active:scale-[0.99]
            "
        >
            {/* HEADER */}
            <div className="flex justify-between items-start mb-3">
                <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-red-400 transition">
                        Quarto {room.number}
                    </h3>

                    <p className="text-xs text-zinc-400 mt-1">
                        {TYPE_LABELS[room.type] ?? room.type}
                    </p>
                </div>

                <StatusBadge status={room.status} />
            </div>

            {/* INFO */}
            <div className="space-y-1 text-sm text-zinc-400">
                <p>
                    <span className="text-zinc-500">Capacidade:</span>{" "}
                    {room.capacity} pessoas
                </p>

                {room.floor !== undefined && (
                    <p>
                        <span className="text-zinc-500">Andar:</span>{" "}
                        {room.floor}
                    </p>
                )}
            </div>

            {/* PRICE */}
            <div className="mt-4 pt-3 border-t border-white/10">
                <p className="text-base font-semibold text-white">
                    <span className="text-red-400">R$</span>{" "}
                    {room.price_per_night.toFixed(2)}
                    <span className="text-zinc-400 text-sm font-normal">
                        {" "} / noite
                    </span>
                </p>
            </div>

            {/* HOVER HINT */}
            <div className="mt-3 text-xs text-red-400 opacity-0 group-hover:opacity-100 transition">
                Clique para editar →
            </div>
        </button>
    );
}
