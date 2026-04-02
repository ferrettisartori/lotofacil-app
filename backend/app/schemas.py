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


class ConferenciaJogoRequest(BaseModel):
    numero_concurso: int
    jogo: list[int]

    @field_validator("jogo")
    @classmethod
    def validar_jogo(cls, value: list[int]) -> list[int]:
        if len(value) != 15:
            raise ValueError("O jogo deve conter exatamente 15 dezenas.")

        if len(set(value)) != 15:
            raise ValueError("As dezenas do jogo devem ser únicas.")

        for dezena in value:
            if dezena < 1 or dezena > 25:
                raise ValueError("Cada dezena do jogo deve estar entre 1 e 25.")

        return sorted(value)


class ConferenciaJogoResponse(BaseModel):
    numero_concurso: int
    dezenas_jogo: list[int]
    dezenas_sorteadas: list[int]
    dezenas_acertadas: list[int]
    dezenas_nao_acertadas: list[int]
    qtd_acertos: int


class SimulacaoHistoricoRequest(BaseModel):
    concurso_inicial: int
    concurso_final: int
    jogos: list[list[int]]

    @field_validator("jogos")
    @classmethod
    def validar_jogos(cls, value: list[list[int]]) -> list[list[int]]:
        if not value:
            raise ValueError("Informe pelo menos um jogo para simulação.")

        jogos_normalizados = []

        for jogo in value:
            if len(jogo) != 15:
                raise ValueError("Cada jogo deve conter exatamente 15 dezenas.")

            if len(set(jogo)) != 15:
                raise ValueError("As dezenas de cada jogo devem ser únicas.")

            for dezena in jogo:
                if dezena < 1 or dezena > 25:
                    raise ValueError("Cada dezena deve estar entre 1 e 25.")

            jogos_normalizados.append(sorted(jogo))

        return jogos_normalizados


class ResultadoJogoSimulado(BaseModel):
    indice_jogo: int
    dezenas: list[int]
    acertos: int


class ResultadoConcursoSimulado(BaseModel):
    numero_concurso: int
    resultado_oficial: list[int]
    jogos: list[ResultadoJogoSimulado]


class SimulacaoHistoricoResponse(BaseModel):
    total_concursos: int
    total_jogos_testados: int
    total_11_pontos: int
    total_12_pontos: int
    total_13_pontos: int
    total_14_pontos: int
    total_15_pontos: int
    resultados: list[ResultadoConcursoSimulado]

class JogoMetodoResponse(BaseModel):
    codigo: str
    dezenas: list[int]


class Metodo1Response(BaseModel):
    numero_concurso_alvo: int
    numero_concurso_base: int
    dezenas_sorteadas_base: list[int]
    dezenas_nao_sorteadas_base: list[int]
    fixas_sorteadas: list[int]
    fixas_nao_sorteadas: list[int]
    grupo_a: list[int]
    grupo_b: list[int]
    grupo_r: list[int]
    grupo_s: list[int]
    jogos: list[JogoMetodoResponse]

class SimulacaoMetodo1Request(BaseModel):
    concurso_inicial: int
    concurso_final: int


class ResultadoMetodo1JogoResponse(BaseModel):
    codigo: str
    dezenas: list[int]
    acertos: int


class ResultadoMetodo1ConcursoResponse(BaseModel):
    numero_concurso: int
    numero_concurso_base: int
    resultado_oficial: list[int]
    jogos: list[ResultadoMetodo1JogoResponse]


class SimulacaoMetodo1Response(BaseModel):
    total_concursos: int
    total_jogos_gerados: int
    total_11_pontos: int
    total_12_pontos: int
    total_13_pontos: int
    total_14_pontos: int
    total_15_pontos: int
    resultados: list[ResultadoMetodo1ConcursoResponse]