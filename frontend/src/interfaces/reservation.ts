export type ReservationStatus =
    | "confirmed"
    | "checked_in"
    | "checked_out"
    | "cancelled"
    | "no_show";

export interface Reservation {
    id: string;
    room_id: string;
    guest_id: string;
    check_in: string;
    check_out: string;
    status: ReservationStatus;
    adults: number;
    children: number;
    total_price?: number;
    notes?: string;
    cancelled_at?: string;
    cancellation_reason?: string;
    created_at?: string;
    updated_at?: string;
    rooms?: { number: string; type: string };
    guests?: { full_name: string; email?: string };
}

export interface ReservationCreatePayload {
    room_id: string;
    guest_id: string;
    check_in: string;
    check_out: string;
    adults?: number;
    children?: number;
    notes?: string;
}

export interface ReservationFilters {
    status?: ReservationStatus;
    room_id?: string;
    guest_id?: string;
    date_from?: string;
    date_to?: string;
}
