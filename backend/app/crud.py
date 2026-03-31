from sqlalchemy.orm import Session
from fastapi import HTTPException
from .models import Concurso
from .schemas import ConcursoCreate, ConcursoUpdate


def ordenar_bolas(dados: dict) -> dict:
    bolas = [
        dados["bola_1"],
        dados["bola_2"],
        dados["bola_3"],
        dados["bola_4"],
        dados["bola_5"],
        dados["bola_6"],
        dados["bola_7"],
        dados["bola_8"],
        dados["bola_9"],
        dados["bola_10"],
        dados["bola_11"],
        dados["bola_12"],
        dados["bola_13"],
        dados["bola_14"],
        dados["bola_15"],
    ]

    bolas_ordenadas = sorted(bolas)

    for i, valor in enumerate(bolas_ordenadas, start=1):
        dados[f"bola_{i}"] = valor

    return dados


def calcular_metricas(dados: dict) -> dict:
    bolas = [
        dados["bola_1"],
        dados["bola_2"],
        dados["bola_3"],
        dados["bola_4"],
        dados["bola_5"],
        dados["bola_6"],
        dados["bola_7"],
        dados["bola_8"],
        dados["bola_9"],
        dados["bola_10"],
        dados["bola_11"],
        dados["bola_12"],
        dados["bola_13"],
        dados["bola_14"],
        dados["bola_15"],
    ]

    soma_dezenas = sum(bolas)
    qtd_pares = sum(1 for bola in bolas if bola % 2 == 0)
    qtd_impares = 15 - qtd_pares

    dados["soma_dezenas"] = soma_dezenas
    dados["qtd_pares"] = qtd_pares
    dados["qtd_impares"] = qtd_impares

    return dados


def montar_dezenas(concurso: Concurso) -> list[int]:
    return [
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
    ]


def serializar_concurso(concurso: Concurso) -> dict:
    return {
        "id": concurso.id,
        "numero_concurso": concurso.numero_concurso,
        "data_sorteio": concurso.data_sorteio,
        "bola_1": concurso.bola_1,
        "bola_2": concurso.bola_2,
        "bola_3": concurso.bola_3,
        "bola_4": concurso.bola_4,
        "bola_5": concurso.bola_5,
        "bola_6": concurso.bola_6,
        "bola_7": concurso.bola_7,
        "bola_8": concurso.bola_8,
        "bola_9": concurso.bola_9,
        "bola_10": concurso.bola_10,
        "bola_11": concurso.bola_11,
        "bola_12": concurso.bola_12,
        "bola_13": concurso.bola_13,
        "bola_14": concurso.bola_14,
        "bola_15": concurso.bola_15,
        "dezenas": montar_dezenas(concurso),
        "soma_dezenas": concurso.soma_dezenas,
        "qtd_pares": concurso.qtd_pares,
        "qtd_impares": concurso.qtd_impares,
        "created_at": concurso.created_at,
    }


def listar_concursos(db: Session):
    concursos = db.query(Concurso).order_by(Concurso.numero_concurso.desc()).all()
    return [serializar_concurso(concurso) for concurso in concursos]


def buscar_concurso_por_numero(db: Session, numero_concurso: int):
    concurso = db.query(Concurso).filter(
        Concurso.numero_concurso == numero_concurso
    ).first()

    if not concurso:
        raise HTTPException(status_code=404, detail="Concurso não encontrado.")

    return serializar_concurso(concurso)


def buscar_ultimo_concurso(db: Session):
    concurso = db.query(Concurso).order_by(Concurso.numero_concurso.desc()).first()

    if not concurso:
        raise HTTPException(status_code=404, detail="Nenhum concurso cadastrado.")

    return serializar_concurso(concurso)


def criar_concurso(db: Session, concurso: ConcursoCreate):
    existente = db.query(Concurso).filter(
        Concurso.numero_concurso == concurso.numero_concurso
    ).first()

    if existente:
        raise HTTPException(status_code=400, detail="Número do concurso já cadastrado.")

    dados = concurso.model_dump()
    dados = ordenar_bolas(dados)
    dados = calcular_metricas(dados)

    novo = Concurso(**dados)
    db.add(novo)
    db.commit()
    db.refresh(novo)
    return serializar_concurso(novo)


def atualizar_concurso(db: Session, concurso_id: int, dados: ConcursoUpdate):
    concurso = db.query(Concurso).filter(Concurso.id == concurso_id).first()

    if not concurso:
        raise HTTPException(status_code=404, detail="Concurso não encontrado.")

    concurso_com_mesmo_numero = db.query(Concurso).filter(
        Concurso.numero_concurso == dados.numero_concurso,
        Concurso.id != concurso_id
    ).first()

    if concurso_com_mesmo_numero:
        raise HTTPException(status_code=400, detail="Já existe outro concurso com esse número.")

    novos_dados = dados.model_dump()
    novos_dados = ordenar_bolas(novos_dados)
    novos_dados = calcular_metricas(novos_dados)

    for campo, valor in novos_dados.items():
        setattr(concurso, campo, valor)

    db.commit()
    db.refresh(concurso)
    return serializar_concurso(concurso)