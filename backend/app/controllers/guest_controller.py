from flask import request, jsonify

from app.middlewares.error_handler import handle_errors
from app.services.guest_service import GuestService


class GuestController:
    service = GuestService()

    @classmethod
    @handle_errors
    def list_guests(cls):
        return jsonify(cls.service.list_guests()), 200

    @classmethod
    @handle_errors
    def get_guest(cls, guest_id: str):
        guest = cls.service.get_guest(guest_id)
        if not guest:
            return jsonify({"error": "Hóspede não encontrado", "code": "GUEST_NOT_FOUND"}), 404
        return jsonify(guest), 200

    @classmethod
    @handle_errors
    def create_guest(cls):
        guest = cls.service.create_guest(request.get_json() or {})
        return jsonify(guest), 201

    @classmethod
    @handle_errors
    def update_guest(cls, guest_id: str):
        guest = cls.service.update_guest(guest_id, request.get_json() or {})
        return jsonify(guest), 200

    @classmethod
    @handle_errors
    def list_guest_reservations(cls, guest_id: str):
        return jsonify(cls.service.list_reservations(guest_id)), 200
