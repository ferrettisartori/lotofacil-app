"use client";

import { useState } from "react";
import {
  simularMetodo1,
  type SimulacaoMetodo1Response,
} from "../services/api";

type FormState = {
  concurso_inicial: string;
  concurso_final: string;
};

function formatarDezenas(dezenas: number[]) {
  return dezenas.map((d) => String(d).padStart(2, "0")).join(", ");
}

function corPorAcerto(acertos: number) {
  if (acertos >= 13) return "#16a34a"; // verde
  if (acertos >= 11) return "#ca8a04"; // amarelo
  return "#444"; // neutro
}

export default function Metodo1Form() {
  const [form, setForm] = useState<FormState>({
    concurso_inicial: "",
    concurso_final: "",
  });

  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [resultado, setResultado] = useState<SimulacaoMetodo1Response | null>(null);

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
      const data = await simularMetodo1({
        concurso_inicial: Number(form.concurso_inicial),
        concurso_final: Number(form.concurso_final),
      });

      setResultado(data);
    } catch (error) {
      if (error instanceof Error) {
        setErro(error.message);
      } else {
        setErro("Erro ao executar a simulação do Método 1.");
      }
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Simulação do Método 1</h1>

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

        {erro && (
          <div style={{ color: "red", marginBottom: "12px" }}>
            {erro}
          </div>
        )}

        <button type="submit" disabled={carregando}>
          {carregando ? "Simulando..." : "Simular Método 1"}
        </button>
      </form>

      {resultado && (
        <div style={{ marginTop: "30px" }}>
        <h2>Resumo do Método 1</h2>

            <div
            style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                gap: "12px",
                marginTop: "10px",
            }}
            >
            <div style={{ padding: "10px", border: "1px solid #333" }}>
                <strong>Concursos</strong>
                <br />
                {resultado.total_concursos}
            </div>

            <div style={{ padding: "10px", border: "1px solid #333" }}>
                <strong>Jogos</strong>
                <br />
                {resultado.total_jogos_gerados}
            </div>

            <div style={{ padding: "10px", border: "1px solid #333", color: "#ca8a04" }}>
                <strong>11 pontos</strong>
                <br />
                {resultado.total_11_pontos}
            </div>

            <div style={{ padding: "10px", border: "1px solid #333", color: "#ca8a04" }}>
                <strong>12 pontos</strong>
                <br />
                {resultado.total_12_pontos}
            </div>

            <div style={{ padding: "10px", border: "1px solid #333", color: "#16a34a" }}>
                <strong>13 pontos</strong>
                <br />
                {resultado.total_13_pontos}
            </div>

            <div style={{ padding: "10px", border: "1px solid #333", color: "#16a34a" }}>
                <strong>14 pontos</strong>
                <br />
                {resultado.total_14_pontos}
            </div>

            <div style={{ padding: "10px", border: "1px solid #333", color: "#16a34a" }}>
                <strong>15 pontos</strong>
                <br />
                {resultado.total_15_pontos}
            </div>
            </div>

          <h2 style={{ marginTop: "24px" }}>Resultados por concurso</h2>

          {resultado.resultados.map((item) => (
            <div
                key={item.numero_concurso}
                style={{
                    marginBottom: "16px",
                    padding: "14px",
                    border: "1px solid #333",
                    borderRadius: "8px",
                    backgroundColor: "#111",
                }}
            >
              <p>
                <strong>Concurso alvo:</strong> {item.numero_concurso}
              </p>
              <p>
                <strong>Concurso base:</strong> {item.numero_concurso_base}
              </p>
              <p>
                <strong>Resultado oficial:</strong> {formatarDezenas(item.resultado_oficial)}
              </p>

              <div style={{ marginTop: "10px" }}>
                {item.jogos.map((jogo) => (
                    <div
                        key={`${item.numero_concurso}-${jogo.codigo}`}
                        style={{
                        padding: "6px 0",
                        color: corPorAcerto(jogo.acertos),
                        fontWeight: jogo.acertos >= 13 ? "bold" : "normal",
                        }}
                    >
                        <strong>{jogo.codigo}:</strong>{" "}
                        {formatarDezenas(jogo.dezenas)} —{" "}
                        <strong>{jogo.acertos} acertos</strong>
                    </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}