from typing import Any, Optional

from app.database.supabase_client import supabase


class BaseRepository:
    """
    Implementação base do Repository pattern para o Supabase.

    Subclasses só precisam definir `table_name`. Métodos podem ser
    sobrescritos quando uma entidade exigir lógica específica
    (ex: filtros compostos, joins, soft delete).
    """

    table_name: str = ""

    def __init__(self):
        if not self.table_name:
            raise ValueError(
                f"{self.__class__.__name__} precisa definir `table_name`"
            )
        self._client = supabase

    def _table(self):
        return self._client.table(self.table_name)

    def find_all(self, filters: Optional[dict[str, Any]] = None) -> list[dict]:
        query = self._table().select("*")
        if filters:
            for key, value in filters.items():
                query = query.eq(key, value)
        return query.execute().data or []

    def find_by_id(self, entity_id: str) -> Optional[dict]:
        response = self._table().select("*").eq("id", entity_id).maybe_single().execute()
        return response.data if response else None

    def create(self, payload: dict) -> dict:
        response = self._table().insert(payload).execute()
        return response.data[0] if response.data else {}

    def update(self, entity_id: str, payload: dict) -> Optional[dict]:
        response = self._table().update(payload).eq("id", entity_id).execute()
        return response.data[0] if response.data else None

    def delete(self, entity_id: str) -> bool:
        response = self._table().delete().eq("id", entity_id).execute()
        return bool(response.data)
