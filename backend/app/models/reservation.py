from dataclasses import dataclass, asdict
from typing import Optional


RESERVATION_STATUSES = {
    "confirmed", "checked_in", "checked_out", "cancelled", "no_show",
}


@dataclass
class Reservation:
    room_id: str
    guest_id: str
    check_in: str
    check_out: str
    id: Optional[str] = None
    status: str = "confirmed"
    adults: int = 1
    children: int = 0
    total_price: Optional[float] = None
    notes: Optional[str] = None
    cancelled_at: Optional[str] = None
    cancellation_reason: Optional[str] = None
    created_by: Optional[str] = None
    created_at: Optional[str] = None
    updated_at: Optional[str] = None

    @staticmethod
    def from_dict(data: dict) -> "Reservation":
        return Reservation(
            id=data.get("id"),
            room_id=data["room_id"],
            guest_id=data["guest_id"],
            check_in=data["check_in"],
            check_out=data["check_out"],
            status=data.get("status", "confirmed"),
            adults=data.get("adults", 1),
            children=data.get("children", 0),
            total_price=data.get("total_price"),
            notes=data.get("notes"),
            cancelled_at=data.get("cancelled_at"),
            cancellation_reason=data.get("cancellation_reason"),
            created_by=data.get("created_by"),
            created_at=data.get("created_at"),
            updated_at=data.get("updated_at"),
        )

    def to_dict(self) -> dict:
        return {k: v for k, v in asdict(self).items() if v is not None}
