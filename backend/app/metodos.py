import random
from fastapi import HTTPException
from sqlalchemy.orm import Session

from .models import Concurso


def obter_dezenas_sorteadas(concurso: Concurso) -> list[int]:
    return sorted([
        concurso.bola_1,
        concurso.bola_2,
        concurso.bola_3,
        concurso.bola_4,
        concurso.bola_5,
        concurso.bola_6,
        concurso.bola_7,
        concurso.bola_8,
        concurso.bola_9,
        concurso.bola_10,
        concurso.bola_11,
        concurso.bola_12,
        concurso.bola_13,
        concurso.bola_14,
        concurso.bola_15,
    ])


def obter_dezenas_nao_sorteadas(dezenas_sorteadas: list[int]) -> list[int]:
    universo = set(range(1, 26))
    return sorted(list(universo - set(dezenas_sorteadas)))


def escolher_fixas_sorteadas(dezenas_sorteadas: list[int]) -> list[int]:
    preferidas = [d for d in dezenas_sorteadas if 7 <= d <= 15]

    fixas = preferidas[:3]

    if len(fixas) < 3:
        restantes = [d for d in dezenas_sorteadas if d not in fixas]
        fixas.extend(restantes[: 3 - len(fixas)])

    return sorted(fixas)


def dividir_lista_reproduzivel(lista: list[int], tamanho_grupo: int, seed: int) -> tuple[list[int], list[int]]:
    rng = random.Random(seed)
    embaralhada = lista[:]
    rng.shuffle(embaralhada)

    grupo_1 = sorted(embaralhada[:tamanho_grupo])
    grupo_2 = sorted(embaralhada[tamanho_grupo:])

    return grupo_1, grupo_2


def gerar_jogos_metodo_1(db: Session, numero_concurso_alvo: int):
    concurso_base = db.query(Concurso).filter(
        Concurso.numero_concurso == numero_concurso_alvo - 1
    ).first()

    if not concurso_base:
        raise HTTPException(
            status_code=404,
            detail="Concurso anterior não encontrado para gerar o Método 1."
        )

    dezenas_sorteadas = obter_dezenas_sorteadas(concurso_base)
    dezenas_nao_sorteadas = obter_dezenas_nao_sorteadas(dezenas_sorteadas)

    # 3 fixas das sorteadas, preferindo 07 a 15
    fixas_sorteadas = escolher_fixas_sorteadas(dezenas_sorteadas)
    restantes_sorteadas = [d for d in dezenas_sorteadas if d not in fixas_sorteadas]

    # 2 fixas das não sorteadas = dois primeiros números
    fixas_nao_sorteadas = sorted(dezenas_nao_sorteadas[:2])
    restantes_nao_sorteadas = [d for d in dezenas_nao_sorteadas if d not in fixas_nao_sorteadas]

    # Divisões reproduzíveis
    grupo_base_a, grupo_base_b = dividir_lista_reproduzivel(
        restantes_sorteadas, 6, concurso_base.numero_concurso
    )

    grupo_base_r, grupo_base_s = dividir_lista_reproduzivel(
        restantes_nao_sorteadas, 4, concurso_base.numero_concurso + 1000
    )

    grupo_a = sorted(grupo_base_a + fixas_sorteadas)  # 9 dezenas
    grupo_b = sorted(grupo_base_b + fixas_sorteadas)  # 9 dezenas
    grupo_r = sorted(grupo_base_r + fixas_nao_sorteadas)  # 6 dezenas
    grupo_s = sorted(grupo_base_s + fixas_nao_sorteadas)  # 6 dezenas

    jogo_ar = sorted(grupo_a + grupo_r)
    jogo_as = sorted(grupo_a + grupo_s)
    jogo_br = sorted(grupo_b + grupo_r)
    jogo_bs = sorted(grupo_b + grupo_s)

    jogos = [
        {"codigo": "AR", "dezenas": jogo_ar},
        {"codigo": "AS", "dezenas": jogo_as},
        {"codigo": "BR", "dezenas": jogo_br},
        {"codigo": "BS", "dezenas": jogo_bs},
    ]

    return {
        "numero_concurso_alvo": numero_concurso_alvo,
        "numero_concurso_base": concurso_base.numero_concurso,
        "dezenas_sorteadas_base": dezenas_sorteadas,
        "dezenas_nao_sorteadas_base": dezenas_nao_sorteadas,
        "fixas_sorteadas": fixas_sorteadas,
        "fixas_nao_sorteadas": fixas_nao_sorteadas,
        "grupo_a": grupo_a,
        "grupo_b": grupo_b,
        "grupo_r": grupo_r,
        "grupo_s": grupo_s,
        "jogos": jogos,
    }