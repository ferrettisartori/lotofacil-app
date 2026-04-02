"use client";

import { useState } from "react";
import { conferirJogo } from "../services/api";
import type { ConferenciaResponse } from "../services/api";

type FormState = {
  numero_concurso: string;
  bola_1: string;
  bola_2: string;
  bola_3: string;
  bola_4: string;
  bola_5: string;
  bola_6: string;
  bola_7: string;
  bola_8: string;
  bola_9: string;
  bola_10: string;
  bola_11: string;
  bola_12: string;
  bola_13: string;
  bola_14: string;
  bola_15: string;
};

const initialState: FormState = {
  numero_concurso: "",
  bola_1: "",
  bola_2: "",
  bola_3: "",
  bola_4: "",
  bola_5: "",
  bola_6: "",
  bola_7: "",
  bola_8: "",
  bola_9: "",
  bola_10: "",
  bola_11: "",
  bola_12: "",
  bola_13: "",
  bola_14: "",
  bola_15: "",
};

function formatarDezenas(dezenas: number[]) {
  return dezenas.map((d) => String(d).padStart(2, "0")).join(", ");
}

export default function ConferenciaForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [resultado, setResultado] = useState<ConferenciaResponse | null>(null);

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
      const jogo = Array.from({ length: 15 }, (_, index) => {
        const fieldName = `bola_${index + 1}` as keyof FormState;
        return Number(form[fieldName]);
      });

      const data = await conferirJogo({
        numero_concurso: Number(form.numero_concurso),
        jogo,
      });

      setResultado(data);
    } catch (error) {
      if (error instanceof Error) {
        setErro(error.message);
      } else {
        setErro("Erro ao conferir jogo.");
      }
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Conferir jogo</h1>

        <div style={{ marginBottom: "12px" }}>
          <label>Número do concurso</label>
          <br />
          <input
            type="number"
            value={form.numero_concurso}
            onChange={(e) => handleChange("numero_concurso", e.target.value)}
            required
          />
        </div>

        <div style={{ marginBottom: "12px" }}>
          <p>Dezenas do jogo</p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(5, 80px)",
              gap: "10px",
            }}
          >
            {Array.from({ length: 15 }, (_, index) => {
              const fieldName = `bola_${index + 1}` as keyof FormState;

              return (
                <div key={fieldName}>
                  <label>Bola {index + 1}</label>
                  <br />
                  <input
                    type="number"
                    min={1}
                    max={25}
                    value={form[fieldName]}
                    onChange={(e) => handleChange(fieldName, e.target.value)}
                    required
                    style={{ width: "70px" }}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {erro && (
          <div style={{ color: "red", marginBottom: "12px" }}>
            {erro}
          </div>
        )}

        <button type="submit" disabled={carregando}>
          {carregando ? "Conferindo..." : "Conferir jogo"}
        </button>
      </form>

      {resultado && (
        <div style={{ marginTop: "30px" }}>
          <h2>Resultado da conferência</h2>

          <p>
            <strong>Concurso:</strong> {resultado.numero_concurso}
          </p>
          <p>
            <strong>Quantidade de acertos:</strong> {resultado.qtd_acertos}
          </p>
          <p>
            <strong>Jogo informado:</strong> {formatarDezenas(resultado.dezenas_jogo)}
          </p>
          <p>
            <strong>Dezenas sorteadas:</strong> {formatarDezenas(resultado.dezenas_sorteadas)}
          </p>
          <p>
            <strong>Dezenas acertadas:</strong> {formatarDezenas(resultado.dezenas_acertadas)}
          </p>
          <p>
            <strong>Dezenas não acertadas:</strong> {formatarDezenas(resultado.dezenas_nao_acertadas)}
          </p>
        </div>
      )}
    </div>
  );
}