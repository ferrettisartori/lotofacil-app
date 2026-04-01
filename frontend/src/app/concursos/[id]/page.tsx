import Link from "next/link";
import { buscarConcursoPorId } from "../../../services/api";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function DetalheConcursoPage({ params }: Props) {
  const { id } = await params;
  const concurso = await buscarConcursoPorId(Number(id));

  return (
    <main style={{ padding: "40px", fontFamily: "Arial" }}>
      <div style={{ marginBottom: "20px" }}>
        <Link href="/concursos">Voltar para concursos</Link>
      </div>

      <h1>Concurso {concurso.numero_concurso}</h1>

      <p><strong>Data:</strong> {concurso.data_sorteio}</p>

      <h2>Dezenas</h2>
      <div style={{ marginBottom: "20px" }}>
        {concurso.dezenas.map((d) => (
          <span
            key={d}
            style={{
              display: "inline-block",
              marginRight: "8px",
              padding: "8px",
              border: "1px solid #ccc",
            }}
          >
            {d}
          </span>
        ))}
      </div>

      <h2>Métricas</h2>
      <p><strong>Soma:</strong> {concurso.soma_dezenas}</p>
      <p><strong>Pares:</strong> {concurso.qtd_pares}</p>
      <p><strong>Ímpares:</strong> {concurso.qtd_impares}</p>
    </main>
  );
}