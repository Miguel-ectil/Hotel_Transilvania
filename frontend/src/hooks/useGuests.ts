"use client";

import { useCallback, useEffect, useState } from "react";
import { GuestService } from "@/src/services/guestService";
import { Guest } from "@/src/interfaces/guest";

export function useGuests() {
    const service = GuestService();
    const [guests, setGuests] = useState<Guest[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchGuests = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await service.list();
            setGuests(data);
        } catch (err: any) {
            setError(err?.response?.data?.error ?? "Erro ao carregar hóspedes");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchGuests();
    }, [fetchGuests]);

    return { guests, loading, error, refresh: fetchGuests };
}
