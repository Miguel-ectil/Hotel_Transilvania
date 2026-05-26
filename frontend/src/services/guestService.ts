import { httpClient } from "@/src/config/axios";
import { Guest, GuestCreatePayload, GuestUpdatePayload } from "@/src/interfaces/guest";
import { Reservation } from "@/src/interfaces/reservation";

export const GuestService = () => {
    const list = async (): Promise<Guest[]> => {
        const { data } = await httpClient.get<Guest[]>("/guests");
        return data;
    };

    const get = async (id: string): Promise<Guest> => {
        const { data } = await httpClient.get<Guest>(`/guests/${id}`);
        return data;
    };

    const create = async (payload: GuestCreatePayload): Promise<Guest> => {
        const { data } = await httpClient.post<Guest>("/guests", payload);
        return data;
    };

    const update = async (id: string, payload: GuestUpdatePayload): Promise<Guest> => {
        const { data } = await httpClient.put<Guest>(`/guests/${id}`, payload);
        return data;
    };

    const listReservations = async (id: string): Promise<Reservation[]> => {
        const { data } = await httpClient.get<Reservation[]>(`/guests/${id}/reservations`);
        return data;
    };

    return { list, get, create, update, listReservations };
};
