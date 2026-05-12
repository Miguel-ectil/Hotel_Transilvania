from functools import wraps
from flask import jsonify


_STATUS_MAP = {
    LookupError: 404,
    ValueError: 400,
    PermissionError: 403,
    RuntimeError: 500,
}


def _unpack(exc: Exception) -> tuple[str, str]:
    if not exc.args:
        return "UNKNOWN", str(exc)
    first = exc.args[0]
    if isinstance(first, tuple) and len(first) == 2:
        return first
    return "UNKNOWN", str(first)


def handle_errors(view):
    """Decorator de controller que converte exceções em respostas JSON.

    Services lançam Exception com args=(code, message). Aqui mapeamos
    automaticamente o tipo da exceção pro status HTTP correspondente.
    """

    @wraps(view)
    def wrapper(*args, **kwargs):
        try:
            return view(*args, **kwargs)
        except Exception as exc:
            code, message = _unpack(exc)
            status = _STATUS_MAP.get(type(exc), 500)
            return jsonify({"error": message, "code": code}), status

    return wrapper
