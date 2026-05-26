"use client";

import { useCallback, useEffect, useState } from "react";
import { RoomService, RoomFilters } from "@/src/services/roomService";
import { Room } from "@/src/interfaces/room";

export function useRooms(filters?: RoomFilters) {
    const service = RoomService();
    const [rooms, setRooms] = useState<Room[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchRooms = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await service.list(filters);
            setRooms(data);
        } catch (err: any) {
            setError(err?.response?.data?.error ?? "Erro ao carregar quartos");
        } finally {
            setLoading(false);
        }
    }, [JSON.stringify(filters)]);

    useEffect(() => {
        fetchRooms();
    }, [fetchRooms]);

    return { rooms, loading, error, refresh: fetchRooms };
}
