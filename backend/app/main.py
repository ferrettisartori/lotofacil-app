from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from .database import get_db
from .schemas import ConcursoCreate, ConcursoUpdate, ConcursoResponse
from .crud import (
    listar_concursos,
    buscar_concurso_por_numero,
    buscar_ultimo_concurso,
    criar_concurso,
    atualizar_concurso,
)
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Lotofácil API")


@app.get("/")
def root():
    return {"message": "API da Lotofácil no ar"}


@app.get("/concursos", response_model=list[ConcursoResponse])
def get_concursos(db: Session = Depends(get_db)):
    return listar_concursos(db)


@app.get("/concursos/ultimo", response_model=ConcursoResponse)
def get_ultimo_concurso(db: Session = Depends(get_db)):
    return buscar_ultimo_concurso(db)

@app.get("/concursos/id/{concurso_id}", response_model=ConcursoResponse)
def get_concurso_por_id(concurso_id: int, db: Session = Depends(get_db)):
    return buscar_concurso_por_id(db, concurso_id)


@app.get("/concursos/{numero_concurso}", response_model=ConcursoResponse)
def get_concurso_por_numero(numero_concurso: int, db: Session = Depends(get_db)):
    return buscar_concurso_por_numero(db, numero_concurso)


@app.post("/concursos", response_model=ConcursoResponse)
def post_concurso(concurso: ConcursoCreate, db: Session = Depends(get_db)):
    return criar_concurso(db, concurso)


@app.put("/concursos/{concurso_id}", response_model=ConcursoResponse)
def put_concurso(
    concurso_id: int,
    concurso: ConcursoUpdate,
    db: Session = Depends(get_db)
):
    return atualizar_concurso(db, concurso_id, concurso)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

from .crud import (
    listar_concursos,
    buscar_concurso_por_numero,
    buscar_concurso_por_id,
    buscar_ultimo_concurso,
    criar_concurso,
    atualizar_concurso,
)