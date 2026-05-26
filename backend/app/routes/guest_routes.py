from flask import Blueprint

from app.controllers.guest_controller import GuestController
from app.middlewares.auth_decorator import require_auth

guest_bp = Blueprint("guests", __name__)

guest_bp.add_url_rule("", view_func=require_auth(GuestController.list_guests), methods=["GET"])
guest_bp.add_url_rule("", view_func=require_auth(GuestController.create_guest), methods=["POST"])
guest_bp.add_url_rule("/<guest_id>", view_func=require_auth(GuestController.get_guest), methods=["GET"])
guest_bp.add_url_rule("/<guest_id>", view_func=require_auth(GuestController.update_guest), methods=["PUT"])
guest_bp.add_url_rule(
    "/<guest_id>/reservations",
    view_func=require_auth(GuestController.list_guest_reservations),
    methods=["GET"],
)
