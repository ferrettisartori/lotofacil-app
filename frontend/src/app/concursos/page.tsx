import { listarConcursos } from "../../services/api";
import ConcursoList from "../../components/ConcursoList";
import Link from "next/link";

export default async function ConcursosPage() {
  const concursos = await listarConcursos();

  return (
    <main style={{ padding: "40px", fontFamily: "Arial" }}>
      <div style={{ marginBottom: "20px" }}>
        <h1>Lista de concursos</h1>
        <Link href="/concursos/novo">Novo concurso</Link>
      </div>

      <ConcursoList concursos={concursos} />
    </main>
  );
}