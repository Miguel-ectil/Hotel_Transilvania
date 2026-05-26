import { httpClient } from "@/src/config/axios";
import {
    Room,
    RoomCreatePayload,
    RoomStatus,
    RoomStatusChangePayload,
    RoomUpdatePayload,
} from "@/src/interfaces/room";

export interface RoomFilters {
    status?: RoomStatus;
    type?: string;
    floor?: number;
}

export const RoomService = () => {
    const list = async (filters?: RoomFilters): Promise<Room[]> => {
        const { data } = await httpClient.get<Room[]>("/rooms", { params: filters });
        return data;
    };

    const get = async (id: string): Promise<Room> => {
        const { data } = await httpClient.get<Room>(`/rooms/${id}`);
        return data;
    };

    const create = async (payload: RoomCreatePayload): Promise<Room> => {
        const { data } = await httpClient.post<Room>("/rooms", payload);
        return data;
    };

    const update = async (id: string, payload: RoomUpdatePayload): Promise<Room> => {
        const { data } = await httpClient.put<Room>(`/rooms/${id}`, payload);
        return data;
    };

    const changeStatus = async (id: string, payload: RoomStatusChangePayload): Promise<Room> => {
        const { data } = await httpClient.patch<Room>(`/rooms/${id}/status`, payload);
        return data;
    };

    const remove = async (id: string): Promise<void> => {
        await httpClient.delete(`/rooms/${id}`);
    };

    return { list, get, create, update, changeStatus, remove };
};
