from abc import ABC, abstractmethod
from datetime import date


class PricingStrategy(ABC):
    """Strategy pattern para cálculo de preço total de uma reserva.

    Subclasses podem implementar variações por temporada, tipo de quarto,
    promoções, etc. Hoje só temos a estratégia padrão (preço × noites).
    """

    @abstractmethod
    def calculate(self, room: dict, check_in: date, check_out: date) -> float:
        ...


class DefaultPricing(PricingStrategy):
    def calculate(self, room: dict, check_in: date, check_out: date) -> float:
        nights = (check_out - check_in).days
        return float(room["price_per_night"]) * nights
