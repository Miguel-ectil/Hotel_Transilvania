import { GuestService } from "@/src/services/guestService";
import { GuestCreatePayload, GuestUpdatePayload } from "@/src/interfaces/guest";
import { displayMessage } from "@/src/components/displayMessage";

const service = GuestService();

const extractError = (err: any, fallback: string) =>
    err?.response?.data?.error ?? fallback;

export const GuestController = {
    create: async (payload: GuestCreatePayload) => {
        try {
            const guest = await service.create(payload);
            displayMessage("Sucesso", "Hóspede cadastrado", "success", false, false, false, 2000);
            return guest;
        } catch (err: any) {
            displayMessage("Erro", extractError(err, "Erro ao cadastrar hóspede"), "error", false, false, false, 4000);
            throw err;
        }
    },

    update: async (id: string, payload: GuestUpdatePayload) => {
        try {
            const guest = await service.update(id, payload);
            displayMessage("Sucesso", "Hóspede atualizado", "success", false, false, false, 2000);
            return guest;
        } catch (err: any) {
            displayMessage("Erro", extractError(err, "Erro ao atualizar hóspede"), "error", false, false, false, 4000);
            throw err;
        }
    },
};
