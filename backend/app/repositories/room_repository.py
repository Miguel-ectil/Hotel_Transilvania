from typing import Optional

from app.repositories.base_repository import BaseRepository


class RoomRepository(BaseRepository):
    table_name = "rooms"

    def find_by_number(self, number: str) -> Optional[dict]:
        response = self._table().select("*").eq("number", number).execute()
        data = response.data or []
        return data[0] if data else None

    def find_available(self) -> list[dict]:
        return self.find_all({"status": "available"})

    def log_status_change(
        self,
        room_id: str,
        previous_status: str,
        new_status: str,
        changed_by: Optional[str] = None,
        reason: Optional[str] = None,
    ) -> None:
        """Observer pattern — registra mudança de status na auditoria."""
        self._client.table("room_status_log").insert({
            "room_id": room_id,
            "previous_status": previous_status,
            "new_status": new_status,
            "changed_by": changed_by,
            "reason": reason,
        }).execute()
