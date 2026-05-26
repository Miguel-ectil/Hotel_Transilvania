from dataclasses import dataclass, field, asdict
from typing import Optional


ROOM_TYPES = {"single", "double", "suite", "deluxe"}
ROOM_STATUSES = {"available", "reserved", "occupied", "maintenance", "unavailable"}


@dataclass
class Room:
    number: str
    type: str
    price_per_night: float
    id: Optional[str] = None
    floor: Optional[int] = None
    capacity: int = 2
    status: str = "available"
    amenities: list[str] = field(default_factory=list)
    description: Optional[str] = None
    created_at: Optional[str] = None

    @staticmethod
    def from_dict(data: dict) -> "Room":
        return Room(
            id=data.get("id"),
            number=data["number"],
            type=data["type"],
            floor=data.get("floor"),
            capacity=data.get("capacity", 2),
            price_per_night=float(data["price_per_night"]),
            status=data.get("status", "available"),
            amenities=data.get("amenities") or [],
            description=data.get("description"),
            created_at=data.get("created_at"),
        )

    def to_dict(self) -> dict:
        return {k: v for k, v in asdict(self).items() if v is not None}
