from typing import Optional

from app.repositories.base_repository import BaseRepository


class ReservationRepository(BaseRepository):
    table_name = "reservations"

    def find_overlapping(
        self,
        room_id: str,
        check_in: str,
        check_out: str,
        exclude_id: Optional[str] = None,
    ) -> list[dict]:
        """Reservas ativas (confirmed/checked_in) que conflitam com o intervalo."""
        active_statuses = ("confirmed", "checked_in")
        query = (
            self._table()
            .select("*")
            .eq("room_id", room_id)
            .in_("status", active_statuses)
            .lt("check_in", check_out)
            .gt("check_out", check_in)
        )
        if exclude_id:
            query = query.neq("id", exclude_id)
        return query.execute().data or []

    def list_with_filters(self, filters: dict) -> list[dict]:
        query = self._table().select("*, rooms(number, type), guests(full_name, email)")

        for key in ("status", "room_id", "guest_id"):
            value = filters.get(key)
            if value:
                query = query.eq(key, value)

        date_from = filters.get("date_from")
        date_to = filters.get("date_to")
        if date_from:
            query = query.gte("check_in", date_from)
        if date_to:
            query = query.lte("check_out", date_to)

        return query.order("check_in", desc=False).execute().data or []
