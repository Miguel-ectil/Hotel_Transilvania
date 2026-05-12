from typing import Optional

from app.models.room import Room, ROOM_STATUSES, ROOM_TYPES
from app.repositories.room_repository import RoomRepository


class RoomService:
    def __init__(self):
        self.repository = RoomRepository()

    def list_rooms(self, filters: Optional[dict] = None) -> list[dict]:
        return self.repository.find_all(filters)

    def get_room(self, room_id: str) -> Optional[dict]:
        return self.repository.find_by_id(room_id)

    def create_room(self, payload: dict) -> dict:
        self._validate_payload(payload, partial=False)

        if self.repository.find_by_number(payload["number"]):
            raise ValueError(("ROOM_NUMBER_TAKEN", "Já existe um quarto com este número"))

        room = Room.from_dict(payload)
        return self.repository.create(room.to_dict())

    def update_room(self, room_id: str, payload: dict) -> dict:
        self._validate_payload(payload, partial=True)

        if not self.repository.find_by_id(room_id):
            raise LookupError(("ROOM_NOT_FOUND", "Quarto não encontrado"))

        updated = self.repository.update(room_id, payload)
        if not updated:
            raise RuntimeError(("UPDATE_FAILED", "Falha ao atualizar quarto"))
        return updated

    def change_status(
        self,
        room_id: str,
        new_status: str,
        changed_by: Optional[str] = None,
        reason: Optional[str] = None,
    ) -> dict:
        if new_status not in ROOM_STATUSES:
            raise ValueError(("INVALID_STATUS", f"Status inválido: {new_status}"))

        room = self.repository.find_by_id(room_id)
        if not room:
            raise LookupError(("ROOM_NOT_FOUND", "Quarto não encontrado"))

        previous_status = room["status"]
        if previous_status == new_status:
            return room

        updated = self.repository.update(room_id, {"status": new_status})
        self.repository.log_status_change(
            room_id=room_id,
            previous_status=previous_status,
            new_status=new_status,
            changed_by=changed_by,
            reason=reason,
        )
        return updated

    def delete_room(self, room_id: str) -> None:
        """Soft delete — marca como unavailable em vez de remover."""
        if not self.repository.find_by_id(room_id):
            raise LookupError(("ROOM_NOT_FOUND", "Quarto não encontrado"))
        self.change_status(room_id, "unavailable", reason="Quarto desativado")

    def _validate_payload(self, payload: dict, partial: bool) -> None:
        required = {"number", "type", "price_per_night"}
        if not partial:
            missing = required - payload.keys()
            if missing:
                raise ValueError((
                    "MISSING_FIELDS",
                    f"Campos obrigatórios: {', '.join(sorted(missing))}",
                ))

        if "type" in payload and payload["type"] not in ROOM_TYPES:
            raise ValueError(("INVALID_TYPE", f"Tipo inválido: {payload['type']}"))

        if "status" in payload and payload["status"] not in ROOM_STATUSES:
            raise ValueError(("INVALID_STATUS", f"Status inválido: {payload['status']}"))
