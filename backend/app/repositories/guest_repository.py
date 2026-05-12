from typing import Optional

from app.repositories.base_repository import BaseRepository


class GuestRepository(BaseRepository):
    table_name = "guests"

    def find_by_email(self, email: str) -> Optional[dict]:
        response = self._table().select("*").eq("email", email).execute()
        data = response.data or []
        return data[0] if data else None

    def find_by_document(self, document_number: str) -> Optional[dict]:
        response = self._table().select("*").eq("document_number", document_number).execute()
        data = response.data or []
        return data[0] if data else None

    def find_reservations(self, guest_id: str) -> list[dict]:
        response = (
            self._client.table("reservations")
            .select("*, rooms(number, type)")
            .eq("guest_id", guest_id)
            .order("check_in", desc=True)
            .execute()
        )
        return response.data or []
