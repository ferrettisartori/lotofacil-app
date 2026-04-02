"use client";

import { useState } from "react";
import {
  simularHistorico,
  type SimulacaoHistoricoResponse,
} from "../services/api";

type FormState = {
  concurso_inicial: string;
  concurso_final: string;
  jogo_1: string;
  jogo_2: string;
};

function parseJogo(texto: string): number[] {
  return texto
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean)
    .map(Number);
}

function formatarDezenas(dezenas: number[]) {
  return dezenas.map((d) => String(d).padStart(2, "0")).join(", ");
}

export default function SimulacaoForm() {
  const [form, setForm] = useState<FormState>({
    concurso_inicial: "",
    concurso_final: "",
    jogo_1: "",
    jogo_2: "",
  });

  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [resultado, setResultado] = useState<SimulacaoHistoricoResponse | null>(null);

  function handleChange(name: keyof FormState, value: string) {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErro("");
    setResultado(null);
    setCarregando(true);

    try {
      const jogos = [form.jogo_1, form.jogo_2]
        .map((texto) => texto.trim())
        .filter(Boolean)
        .map(parseJogo);

      const data = await simularHistorico({
        concurso_inicial: Number(form.concurso_inicial),
        concurso_final: Number(form.concurso_final),
        jogos,
      });

      setResultado(data);
    } catch (error) {
      if (error instanceof Error) {
        setErro(error.message);
      } else {
        setErro("Erro ao executar simulação.");
      }
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Simulação histórica</h1>

        <div style={{ marginBottom: "12px" }}>
          <label>Concurso inicial</label>
          <br />
          <input
            type="number"
            value={form.concurso_inicial}
            onChange={(e) => handleChange("concurso_inicial", e.target.value)}
            required
          />
        </div>

        <div style={{ marginBottom: "12px" }}>
          <label>Concurso final</label>
          <br />
          <input
            type="number"
            value={form.concurso_final}
            onChange={(e) => handleChange("concurso_final", e.target.value)}
            required
          />
        </div>

        <div style={{ marginBottom: "12px" }}>
          <label>Jogo 1</label>
          <br />
          <input
            type="text"
            value={form.jogo_1}
            onChange={(e) => handleChange("jogo_1", e.target.value)}
            placeholder="Ex: 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15"
            style={{ width: "600px" }}
            required
          />
        </div>

        <div style={{ marginBottom: "12px" }}>
          <label>Jogo 2</label>
          <br />
          <input
            type="text"
            value={form.jogo_2}
            onChange={(e) => handleChange("jogo_2", e.target.value)}
            placeholder="Opcional"
            style={{ width: "600px" }}
          />
        </div>

        {erro && (
          <div style={{ color: "red", marginBottom: "12px" }}>
            {erro}
          </div>
        )}

        <button type="submit" disabled={carregando}>
          {carregando ? "Simulando..." : "Executar simulação"}
        </button>
      </form>

      {resultado && (
        <div style={{ marginTop: "30px" }}>
          <h2>Resumo da simulação</h2>

          <p><strong>Total de concursos:</strong> {resultado.total_concursos}</p>
          <p><strong>Total de jogos testados:</strong> {resultado.total_jogos_testados}</p>
          <p><strong>11 pontos:</strong> {resultado.total_11_pontos}</p>
          <p><strong>12 pontos:</strong> {resultado.total_12_pontos}</p>
          <p><strong>13 pontos:</strong> {resultado.total_13_pontos}</p>
          <p><strong>14 pontos:</strong> {resultado.total_14_pontos}</p>
          <p><strong>15 pontos:</strong> {resultado.total_15_pontos}</p>

          <h2 style={{ marginTop: "24px" }}>Resultados por concurso</h2>

          {resultado.resultados.map((item) => (
            <div
              key={item.numero_concurso}
              style={{
                marginBottom: "20px",
                padding: "12px",
                border: "1px solid #444",
              }}
            >
              <p>
                <strong>Concurso:</strong> {item.numero_concurso}
              </p>
              <p>
                <strong>Resultado oficial:</strong> {formatarDezenas(item.resultado_oficial)}
              </p>

              <div style={{ marginTop: "10px" }}>
                {item.jogos.map((jogo) => (
                  <p key={jogo.indice_jogo}>
                    <strong>Jogo {jogo.indice_jogo}:</strong>{" "}
                    {formatarDezenas(jogo.dezenas)} — <strong>{jogo.acertos} acertos</strong>
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}