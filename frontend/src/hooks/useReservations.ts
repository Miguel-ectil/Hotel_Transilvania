"use client";

import { useCallback, useEffect, useState } from "react";
import { ReservationService } from "@/src/services/reservationService";
import { Reservation, ReservationFilters } from "@/src/interfaces/reservation";

export function useReservations(filters?: ReservationFilters) {
    const service = ReservationService();
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchReservations = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await service.list(filters);
            setReservations(data);
        } catch (err: any) {
            setError(err?.response?.data?.error ?? "Erro ao carregar reservas");
        } finally {
            setLoading(false);
        }
    }, [JSON.stringify(filters)]);

    useEffect(() => {
        fetchReservations();
    }, [fetchReservations]);

    return { reservations, loading, error, refresh: fetchReservations };
}
