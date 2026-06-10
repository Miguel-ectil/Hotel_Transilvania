import uuid
from flask import request, jsonify

from app.middlewares.error_handler import handle_errors
from app.services.reservation_service import ReservationService


def _as_uuid(value) -> str | None:
    try:
        return str(uuid.UUID(str(value)))
    except (ValueError, AttributeError, TypeError):
        return None


class ReservationController:
    service = ReservationService()

    @classmethod
    @handle_errors
    def list_reservations(cls):
        filters = {
            key: request.args.get(key)
            for key in ("status", "room_id", "guest_id", "date_from", "date_to")
            if request.args.get(key)
        }
        return jsonify(cls.service.list_reservations(filters or None)), 200

    @classmethod
    @handle_errors
    def get_reservation(cls, reservation_id: str):
        reservation = cls.service.get_reservation(reservation_id)
        if not reservation:
            return jsonify({"error": "Reserva não encontrada", "code": "RESERVATION_NOT_FOUND"}), 404
        return jsonify(reservation), 200

    @classmethod
    @handle_errors
    def create_reservation(cls):
        created_by = _as_uuid(getattr(request, "user", {}).get("user_id"))
        reservation = cls.service.create_reservation(request.get_json() or {}, created_by=created_by)
        return jsonify(reservation), 201
