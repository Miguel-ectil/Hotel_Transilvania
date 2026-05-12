from datetime import date, datetime
from typing import Optional

from app.models.reservation import Reservation, RESERVATION_STATUSES
from app.repositories.reservation_repository import ReservationRepository
from app.repositories.room_repository import RoomRepository
from app.repositories.guest_repository import GuestRepository
from app.services.pricing_strategy import DefaultPricing, PricingStrategy


class ReservationService:
    def __init__(self, pricing: Optional[PricingStrategy] = None):
        self.repository = ReservationRepository()
        self.rooms = RoomRepository()
        self.guests = GuestRepository()
        self.pricing = pricing or DefaultPricing()

    def list_reservations(self, filters: Optional[dict] = None) -> list[dict]:
        return self.repository.list_with_filters(filters or {})

    def get_reservation(self, reservation_id: str) -> Optional[dict]:
        return self.repository.find_by_id(reservation_id)

    def create_reservation(self, payload: dict, created_by: Optional[str] = None) -> dict:
        self._validate_required(payload)

        check_in = self._parse_date(payload["check_in"])
        check_out = self._parse_date(payload["check_out"])
        if check_out <= check_in:
            raise ValueError(("INVALID_DATES", "check_out deve ser posterior ao check_in"))

        room = self.rooms.find_by_id(payload["room_id"])
        if not room:
            raise LookupError(("ROOM_NOT_FOUND", "Quarto não encontrado"))

        if room["status"] in ("maintenance", "unavailable"):
            raise ValueError((
                "ROOM_NOT_BOOKABLE",
                f"Quarto está {room['status']} e não pode ser reservado",
            ))

        if not self.guests.find_by_id(payload["guest_id"]):
            raise LookupError(("GUEST_NOT_FOUND", "Hóspede não encontrado"))

        conflicts = self.repository.find_overlapping(
            room_id=payload["room_id"],
            check_in=payload["check_in"],
            check_out=payload["check_out"],
        )
        if conflicts:
            raise ValueError((
                "ROOM_CONFLICT",
                "Já existe uma reserva ativa para este quarto neste período",
            ))

        total_price = self.pricing.calculate(room, check_in, check_out)

        reservation = Reservation.from_dict({
            **payload,
            "total_price": total_price,
            "created_by": created_by,
        })
        return self.repository.create(reservation.to_dict())

    def _validate_required(self, payload: dict) -> None:
        required = {"room_id", "guest_id", "check_in", "check_out"}
        missing = required - payload.keys()
        if missing:
            raise ValueError((
                "MISSING_FIELDS",
                f"Campos obrigatórios: {', '.join(sorted(missing))}",
            ))

        status = payload.get("status")
        if status and status not in RESERVATION_STATUSES:
            raise ValueError(("INVALID_STATUS", f"Status inválido: {status}"))

    @staticmethod
    def _parse_date(value: str) -> date:
        try:
            return datetime.strptime(value, "%Y-%m-%d").date()
        except (ValueError, TypeError):
            raise ValueError(("INVALID_DATE_FORMAT", "Datas devem estar no formato YYYY-MM-DD"))
