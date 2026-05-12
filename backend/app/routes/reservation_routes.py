from flask import Blueprint

from app.controllers.reservation_controller import ReservationController
from app.middlewares.auth_decorator import require_auth

reservation_bp = Blueprint("reservations", __name__)

reservation_bp.add_url_rule(
    "",
    view_func=require_auth(ReservationController.list_reservations),
    methods=["GET"],
)
reservation_bp.add_url_rule(
    "",
    view_func=require_auth(ReservationController.create_reservation),
    methods=["POST"],
)
reservation_bp.add_url_rule(
    "/<reservation_id>",
    view_func=require_auth(ReservationController.get_reservation),
    methods=["GET"],
)
