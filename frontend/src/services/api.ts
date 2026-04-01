import { Concurso } from "../types/concurso";

export type ConcursoPayload = {
  numero_concurso: number;
  data_sorteio: string;
  bola_1: number;
  bola_2: number;
  bola_3: number;
  bola_4: number;
  bola_5: number;
  bola_6: number;
  bola_7: number;
  bola_8: number;
  bola_9: number;
  bola_10: number;
  bola_11: number;
  bola_12: number;
  bola_13: number;
  bola_14: number;
  bola_15: number;
};

const API_URL = "http://127.0.0.1:8000";

export async function listarConcursos(): Promise<Concurso[]> {
  const response = await fetch(`${API_URL}/concursos`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Erro ao buscar concursos");
  }

  return response.json();
}

export async function buscarConcursoPorId(id: number): Promise<Concurso> {
  const response = await fetch(`${API_URL}/concursos/id/${id}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Erro ao buscar concurso");
  }

  return response.json();
}

export async function criarConcurso(payload: ConcursoPayload) {
  const response = await fetch(`${API_URL}/concursos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    if (typeof data.detail === "string") {
      throw new Error(data.detail);
    }

    if (Array.isArray(data.detail)) {
      throw new Error(data.detail.map((item: any) => item.msg).join(" | "));
    }

    throw new Error("Erro ao cadastrar concurso.");
  }

  return data;
}

export async function atualizarConcurso(id: number, payload: ConcursoPayload) {
  const response = await fetch(`${API_URL}/concursos/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    if (typeof data.detail === "string") {
      throw new Error(data.detail);
    }

    if (Array.isArray(data.detail)) {
      throw new Error(data.detail.map((item: any) => item.msg).join(" | "));
    }

    throw new Error("Erro ao atualizar concurso.");
  }

  return data;
}