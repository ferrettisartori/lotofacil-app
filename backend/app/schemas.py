from datetime import date, datetime
from pydantic import BaseModel, field_validator, model_validator


class ConcursoBase(BaseModel):
    numero_concurso: int
    data_sorteio: date
    bola_1: int
    bola_2: int
    bola_3: int
    bola_4: int
    bola_5: int
    bola_6: int
    bola_7: int
    bola_8: int
    bola_9: int
    bola_10: int
    bola_11: int
    bola_12: int
    bola_13: int
    bola_14: int
    bola_15: int

    @field_validator(
        "bola_1", "bola_2", "bola_3", "bola_4", "bola_5",
        "bola_6", "bola_7", "bola_8", "bola_9", "bola_10",
        "bola_11", "bola_12", "bola_13", "bola_14", "bola_15"
    )
    @classmethod
    def validar_intervalo(cls, value: int) -> int:
        if value < 1 or value > 25:
            raise ValueError("Cada bola deve estar entre 1 e 25.")
        return value

    @model_validator(mode="after")
    def validar_bolas_unicas(self):
        bolas = [
            self.bola_1, self.bola_2, self.bola_3, self.bola_4, self.bola_5,
            self.bola_6, self.bola_7, self.bola_8, self.bola_9, self.bola_10,
            self.bola_11, self.bola_12, self.bola_13, self.bola_14, self.bola_15,
        ]

        if len(set(bolas)) != 15:
            raise ValueError("As 15 bolas devem ser únicas.")

        return self


class ConcursoCreate(ConcursoBase):
    pass


class ConcursoUpdate(ConcursoBase):
    pass


class ConcursoResponse(BaseModel):
    id: int
    numero_concurso: int
    data_sorteio: date
    bola_1: int
    bola_2: int
    bola_3: int
    bola_4: int
    bola_5: int
    bola_6: int
    bola_7: int
    bola_8: int
    bola_9: int
    bola_10: int
    bola_11: int
    bola_12: int
    bola_13: int
    bola_14: int
    bola_15: int
    dezenas: list[int]
    soma_dezenas: int | None = None
    qtd_pares: int | None = None
    qtd_impares: int | None = None
    created_at: datetime | None = None

    class Config:
        from_attributes = True