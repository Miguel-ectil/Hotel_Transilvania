from dataclasses import dataclass, asdict
from typing import Optional


DOCUMENT_TYPES = {"cpf", "passport", "rg"}


@dataclass
class Guest:
    full_name: str
    id: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    document_type: Optional[str] = None
    document_number: Optional[str] = None
    nationality: str = "BR"
    created_at: Optional[str] = None

    @staticmethod
    def from_dict(data: dict) -> "Guest":
        return Guest(
            id=data.get("id"),
            full_name=data["full_name"],
            email=data.get("email"),
            phone=data.get("phone"),
            document_type=data.get("document_type"),
            document_number=data.get("document_number"),
            nationality=data.get("nationality") or "BR",
            created_at=data.get("created_at"),
        )

    def to_dict(self) -> dict:
        return {k: v for k, v in asdict(self).items() if v is not None}
