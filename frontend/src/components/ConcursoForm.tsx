"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { criarConcurso, atualizarConcurso } from "../services/api";
import { Concurso } from "../types/concurso";

type FormState = {
  numero_concurso: string;
  data_sorteio: string;
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

type Props = {
  modo: "criar" | "editar";
  concursoInicial?: Concurso;
};

const initialState: FormState = {
  numero_concurso: "",
  data_sorteio: "",
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

function mapearConcursoParaForm(concurso?: Concurso): FormState {
  if (!concurso) return initialState;

  return {
    numero_concurso: String(concurso.numero_concurso),
    data_sorteio: concurso.data_sorteio,
    bola_1: String(concurso.bola_1),
    bola_2: String(concurso.bola_2),
    bola_3: String(concurso.bola_3),
    bola_4: String(concurso.bola_4),
    bola_5: String(concurso.bola_5),
    bola_6: String(concurso.bola_6),
    bola_7: String(concurso.bola_7),
    bola_8: String(concurso.bola_8),
    bola_9: String(concurso.bola_9),
    bola_10: String(concurso.bola_10),
    bola_11: String(concurso.bola_11),
    bola_12: String(concurso.bola_12),
    bola_13: String(concurso.bola_13),
    bola_14: String(concurso.bola_14),
    bola_15: String(concurso.bola_15),
  };
}

export default function ConcursoForm({ modo, concursoInicial }: Props) {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(mapearConcursoParaForm(concursoInicial));
  const [erro, setErro] = useState("");
  const [salvando, setSalvando] = useState(false);

  function handleChange(name: keyof FormState, value: string) {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErro("");
    setSalvando(true);

    try {
      const payload = {
        numero_concurso: Number(form.numero_concurso),
        data_sorteio: form.data_sorteio,
        bola_1: Number(form.bola_1),
        bola_2: Number(form.bola_2),
        bola_3: Number(form.bola_3),
        bola_4: Number(form.bola_4),
        bola_5: Number(form.bola_5),
        bola_6: Number(form.bola_6),
        bola_7: Number(form.bola_7),
        bola_8: Number(form.bola_8),
        bola_9: Number(form.bola_9),
        bola_10: Number(form.bola_10),
        bola_11: Number(form.bola_11),
        bola_12: Number(form.bola_12),
        bola_13: Number(form.bola_13),
        bola_14: Number(form.bola_14),
        bola_15: Number(form.bola_15),
      };

      if (modo === "criar") {
        await criarConcurso(payload);
      } else {
        if (!concursoInicial) {
          throw new Error("Concurso não carregado para edição.");
        }

        await atualizarConcurso(concursoInicial.id, payload);
      }

      router.push("/concursos");
      router.refresh();
    } catch (error) {
      if (error instanceof Error) {
        setErro(error.message);
      } else {
        setErro("Erro ao salvar concurso.");
      }
    } finally {
      setSalvando(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>{modo === "criar" ? "Novo concurso" : "Editar concurso"}</h1>

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
        <label>Data do sorteio</label>
        <br />
        <input
          type="date"
          value={form.data_sorteio}
          onChange={(e) => handleChange("data_sorteio", e.target.value)}
          required
        />
      </div>

      <div style={{ marginBottom: "12px" }}>
        <p>Dezenas sorteadas</p>

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

      <button type="submit" disabled={salvando}>
        {salvando ? "Salvando..." : modo === "criar" ? "Salvar concurso" : "Atualizar concurso"}
      </button>
    </form>
  );
}