import { RoomService } from "@/src/services/roomService";
import {
    RoomCreatePayload,
    RoomStatusChangePayload,
    RoomUpdatePayload,
} from "@/src/interfaces/room";
import { displayMessage } from "@/src/components/displayMessage";

const service = RoomService();

const extractError = (err: any, fallback: string) =>
    err?.response?.data?.error ?? fallback;

export const RoomController = {
    create: async (payload: RoomCreatePayload) => {
        try {
            const room = await service.create(payload);
            displayMessage("Sucesso", "Quarto criado com sucesso", "success", false, false, false, 2000);
            return room;
        } catch (err: any) {
            displayMessage("Erro", extractError(err, "Erro ao criar quarto"), "error", false, false, false, 4000);
            throw err;
        }
    },

    update: async (id: string, payload: RoomUpdatePayload) => {
        try {
            const room = await service.update(id, payload);
            displayMessage("Sucesso", "Quarto atualizado", "success", false, false, false, 2000);
            return room;
        } catch (err: any) {
            displayMessage("Erro", extractError(err, "Erro ao atualizar quarto"), "error", false, false, false, 4000);
            throw err;
        }
    },

    changeStatus: async (id: string, payload: RoomStatusChangePayload) => {
        try {
            const room = await service.changeStatus(id, payload);
            displayMessage("Sucesso", "Status atualizado", "success", false, false, false, 2000);
            return room;
        } catch (err: any) {
            displayMessage("Erro", extractError(err, "Erro ao mudar status"), "error", false, false, false, 4000);
            throw err;
        }
    },

    remove: async (id: string) => {
        try {
            await service.remove(id);
            displayMessage("Sucesso", "Quarto desativado", "success", false, false, false, 2000);
        } catch (err: any) {
            displayMessage("Erro", extractError(err, "Erro ao remover quarto"), "error", false, false, false, 4000);
            throw err;
        }
    },
};
