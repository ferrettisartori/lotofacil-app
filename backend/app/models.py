from sqlalchemy import Column, Integer, SmallInteger, Date, TIMESTAMP, text
from .database import Base


class Concurso(Base):
    __tablename__ = "concursos"

    id = Column(Integer, primary_key=True, index=True)
    numero_concurso = Column(Integer, unique=True, nullable=False, index=True)
    data_sorteio = Column(Date, nullable=False)

    bola_1 = Column(SmallInteger, nullable=False)
    bola_2 = Column(SmallInteger, nullable=False)
    bola_3 = Column(SmallInteger, nullable=False)
    bola_4 = Column(SmallInteger, nullable=False)
    bola_5 = Column(SmallInteger, nullable=False)
    bola_6 = Column(SmallInteger, nullable=False)
    bola_7 = Column(SmallInteger, nullable=False)
    bola_8 = Column(SmallInteger, nullable=False)
    bola_9 = Column(SmallInteger, nullable=False)
    bola_10 = Column(SmallInteger, nullable=False)
    bola_11 = Column(SmallInteger, nullable=False)
    bola_12 = Column(SmallInteger, nullable=False)
    bola_13 = Column(SmallInteger, nullable=False)
    bola_14 = Column(SmallInteger, nullable=False)
    bola_15 = Column(SmallInteger, nullable=False)

    soma_dezenas = Column(Integer, nullable=True)
    qtd_pares = Column(SmallInteger, nullable=True)
    qtd_impares = Column(SmallInteger, nullable=True)

    created_at = Column(TIMESTAMP, server_default=text("CURRENT_TIMESTAMP"))