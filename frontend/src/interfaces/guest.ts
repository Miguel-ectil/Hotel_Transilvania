export type DocumentType = "cpf" | "passport" | "rg";

export interface Guest {
    id: string;
    full_name: string;
    email?: string;
    phone?: string;
    document_type?: DocumentType;
    document_number?: string;
    nationality: string;
    created_at?: string;
}

export interface GuestCreatePayload {
    full_name: string;
    email?: string;
    phone?: string;
    document_type?: DocumentType;
    document_number?: string;
    nationality?: string;
}

export type GuestUpdatePayload = Partial<GuestCreatePayload>;
