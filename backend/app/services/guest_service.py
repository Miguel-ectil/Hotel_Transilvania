from typing import Optional

from app.models.guest import Guest, DOCUMENT_TYPES
from app.repositories.guest_repository import GuestRepository


class GuestService:
    def __init__(self):
        self.repository = GuestRepository()

    def list_guests(self, filters: Optional[dict] = None) -> list[dict]:
        return self.repository.find_all(filters)

    def get_guest(self, guest_id: str) -> Optional[dict]:
        return self.repository.find_by_id(guest_id)

    def list_reservations(self, guest_id: str) -> list[dict]:
        if not self.repository.find_by_id(guest_id):
            raise LookupError(("GUEST_NOT_FOUND", "Hóspede não encontrado"))
        return self.repository.find_reservations(guest_id)

    def create_guest(self, payload: dict) -> dict:
        self._validate(payload, partial=False)

        email = payload.get("email")
        if email and self.repository.find_by_email(email):
            raise ValueError(("GUEST_EMAIL_TAKEN", "E-mail já cadastrado"))

        guest = Guest.from_dict(payload)
        return self.repository.create(guest.to_dict())

    def update_guest(self, guest_id: str, payload: dict) -> dict:
        self._validate(payload, partial=True)

        if not self.repository.find_by_id(guest_id):
            raise LookupError(("GUEST_NOT_FOUND", "Hóspede não encontrado"))

        updated = self.repository.update(guest_id, payload)
        if not updated:
            raise RuntimeError(("UPDATE_FAILED", "Falha ao atualizar hóspede"))
        return updated

    def _validate(self, payload: dict, partial: bool) -> None:
        if not partial and not payload.get("full_name"):
            raise ValueError(("MISSING_FIELDS", "Nome completo é obrigatório"))

        doc_type = payload.get("document_type")
        if doc_type and doc_type not in DOCUMENT_TYPES:
            raise ValueError(("INVALID_DOCUMENT_TYPE", f"Tipo de documento inválido: {doc_type}"))
