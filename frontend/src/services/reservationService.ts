import { httpClient } from "@/src/config/axios";
import {
    Reservation,
    ReservationCreatePayload,
    ReservationFilters,
} from "@/src/interfaces/reservation";

export const ReservationService = () => {
    const list = async (filters?: ReservationFilters): Promise<Reservation[]> => {
        const { data } = await httpClient.get<Reservation[]>("/reservations", {
            params: filters,
        });
        return data;
    };

    const get = async (id: string): Promise<Reservation> => {
        const { data } = await httpClient.get<Reservation>(`/reservations/${id}`);
        return data;
    };

    const create = async (payload: ReservationCreatePayload): Promise<Reservation> => {
        const { data } = await httpClient.post<Reservation>("/reservations", payload);
        return data;
    };

    return { list, get, create };
};
