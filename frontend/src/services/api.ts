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

export type ConferenciaPayload = {
  numero_concurso: number;
  jogo: number[];
};

export type ConferenciaResponse = {
  numero_concurso: number;
  dezenas_jogo: number[];
  dezenas_sorteadas: number[];
  dezenas_acertadas: number[];
  dezenas_nao_acertadas: number[];
  qtd_acertos: number;
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

export async function conferirJogo(payload: ConferenciaPayload): Promise<ConferenciaResponse> {
  const response = await fetch(`${API_URL}/simulacoes/conferir`, {
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

    throw new Error("Erro ao conferir jogo.");
  }

  return data;
}

export type SimulacaoHistoricoPayload = {
  concurso_inicial: number;
  concurso_final: number;
  jogos: number[][];
};

export type ResultadoJogoSimulado = {
  indice_jogo: number;
  dezenas: number[];
  acertos: number;
};

export type ResultadoConcursoSimulado = {
  numero_concurso: number;
  resultado_oficial: number[];
  jogos: ResultadoJogoSimulado[];
};

export type SimulacaoHistoricoResponse = {
  total_concursos: number;
  total_jogos_testados: number;
  total_11_pontos: number;
  total_12_pontos: number;
  total_13_pontos: number;
  total_14_pontos: number;
  total_15_pontos: number;
  resultados: ResultadoConcursoSimulado[];
};

export async function simularHistorico(
  payload: SimulacaoHistoricoPayload
): Promise<SimulacaoHistoricoResponse> {
  const response = await fetch(`${API_URL}/simulacoes/historico`, {
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

    throw new Error("Erro ao executar simulação.");
  }

  return data;
}

export type SimulacaoMetodo1Payload = {
  concurso_inicial: number;
  concurso_final: number;
};

export type ResultadoMetodo1JogoResponse = {
  codigo: string;
  dezenas: number[];
  acertos: number;
};

export type ResultadoMetodo1ConcursoResponse = {
  numero_concurso: number;
  numero_concurso_base: number;
  resultado_oficial: number[];
  jogos: ResultadoMetodo1JogoResponse[];
};

export type SimulacaoMetodo1Response = {
  total_concursos: number;
  total_jogos_gerados: number;
  total_11_pontos: number;
  total_12_pontos: number;
  total_13_pontos: number;
  total_14_pontos: number;
  total_15_pontos: number;
  resultados: ResultadoMetodo1ConcursoResponse[];
};

export async function simularMetodo1(
  payload: SimulacaoMetodo1Payload
): Promise<SimulacaoMetodo1Response> {
  const response = await fetch(`${API_URL}/simulacoes/metodo-1`, {
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

    throw new Error("Erro ao executar a simulação do Método 1.");
  }

  return data;
}