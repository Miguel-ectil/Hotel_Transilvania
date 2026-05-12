import { RoomStatus } from "@/src/interfaces/room";

const STATUS_LABELS: Record<RoomStatus, string> = {
    available: "Disponível",
    reserved: "Reservado",
    occupied: "Ocupado",
    maintenance: "Manutenção",
    unavailable: "Indisponível",
};

const STATUS_COLORS: Record<RoomStatus, string> = {
    available: "bg-green-600",
    reserved: "bg-blue-600",
    occupied: "bg-orange-600",
    maintenance: "bg-gray-600",
    unavailable: "bg-red-600",
};

interface Props {
    status: RoomStatus;
}

export default function StatusBadge({ status }: Props) {
    return (
        <span className={`${STATUS_COLORS[status]} text-white text-xs font-semibold px-2 py-1 rounded`}>
            {STATUS_LABELS[status]}
        </span>
    );
}
