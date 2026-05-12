import { ReservationService } from "@/src/services/reservationService";
import { ReservationCreatePayload } from "@/src/interfaces/reservation";
import { displayMessage } from "@/src/components/displayMessage";

const service = ReservationService();

const extractError = (err: any, fallback: string) =>
    err?.response?.data?.error ?? fallback;

export const ReservationController = {
    create: async (payload: ReservationCreatePayload) => {
        try {
            const reservation = await service.create(payload);
            displayMessage("Sucesso", "Reserva criada", "success", false, false, false, 2000);
            return reservation;
        } catch (err: any) {
            displayMessage("Erro", extractError(err, "Erro ao criar reserva"), "error", false, false, false, 4000);
            throw err;
        }
    },
};
