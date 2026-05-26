from flask import request, jsonify

from app.middlewares.error_handler import handle_errors
from app.services.room_service import RoomService


class RoomController:
    service = RoomService()

    @classmethod
    @handle_errors
    def list_rooms(cls):
        filters = {}
        for key in ("status", "type", "floor"):
            value = request.args.get(key)
            if value:
                filters[key] = value
        return jsonify(cls.service.list_rooms(filters or None)), 200

    @classmethod
    @handle_errors
    def get_room(cls, room_id: str):
        room = cls.service.get_room(room_id)
        if not room:
            return jsonify({"error": "Quarto não encontrado", "code": "ROOM_NOT_FOUND"}), 404
        return jsonify(room), 200

    @classmethod
    @handle_errors
    def create_room(cls):
        room = cls.service.create_room(request.get_json() or {})
        return jsonify(room), 201

    @classmethod
    @handle_errors
    def update_room(cls, room_id: str):
        room = cls.service.update_room(room_id, request.get_json() or {})
        return jsonify(room), 200

    @classmethod
    @handle_errors
    def change_status(cls, room_id: str):
        data = request.get_json() or {}
        room = cls.service.change_status(
            room_id,
            new_status=data.get("status", ""),
            changed_by=getattr(request, "user", {}).get("user_id"),
            reason=data.get("reason"),
        )
        return jsonify(room), 200

    @classmethod
    @handle_errors
    def delete_room(cls, room_id: str):
        cls.service.delete_room(room_id)
        return ("", 204)
