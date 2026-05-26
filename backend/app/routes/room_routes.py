from flask import Blueprint

from app.controllers.room_controller import RoomController
from app.middlewares.auth_decorator import require_auth

room_bp = Blueprint("rooms", __name__)

room_bp.add_url_rule("", view_func=require_auth(RoomController.list_rooms), methods=["GET"])
room_bp.add_url_rule("", view_func=require_auth(RoomController.create_room), methods=["POST"])
room_bp.add_url_rule("/<room_id>", view_func=require_auth(RoomController.get_room), methods=["GET"])
room_bp.add_url_rule("/<room_id>", view_func=require_auth(RoomController.update_room), methods=["PUT"])
room_bp.add_url_rule("/<room_id>/status", view_func=require_auth(RoomController.change_status), methods=["PATCH"])
room_bp.add_url_rule("/<room_id>", view_func=require_auth(RoomController.delete_room), methods=["DELETE"])
