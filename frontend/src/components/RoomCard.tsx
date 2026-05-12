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
            className="bg-zinc-900 hover:bg-zinc-800 text-left p-4 rounded-lg border border-zinc-800 transition-colors"
        >
            <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold text-white">Quarto {room.number}</h3>
                <StatusBadge status={room.status} />
            </div>
            <p className="text-sm text-zinc-400">{TYPE_LABELS[room.type] ?? room.type}</p>
            <p className="text-sm text-zinc-400">Capacidade: {room.capacity}</p>
            <p className="text-base text-zinc-200 mt-2 font-semibold">
                R$ {room.price_per_night.toFixed(2)} / noite
            </p>
        </button>
    );
}
