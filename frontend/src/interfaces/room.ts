export type RoomType = "single" | "double" | "suite" | "deluxe";

export type RoomStatus =
    | "available"
    | "reserved"
    | "occupied"
    | "maintenance"
    | "unavailable";

export interface Room {
    id: string;
    number: string;
    type: RoomType;
    floor?: number;
    capacity: number;
    price_per_night: number;
    status: RoomStatus;
    amenities: string[];
    description?: string;
    created_at?: string;
}

export interface RoomCreatePayload {
    number: string;
    type: RoomType;
    floor?: number;
    capacity?: number;
    price_per_night: number;
    amenities?: string[];
    description?: string;
}

export type RoomUpdatePayload = Partial<RoomCreatePayload>;

export interface RoomStatusChangePayload {
    status: RoomStatus;
    reason?: string;
}
