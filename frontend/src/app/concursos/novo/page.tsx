import Link from "next/link";
import ConcursoForm from "../../../components/ConcursoForm";

export default function NovoConcursoPage() {
  return (
    <main style={{ padding: "40px", fontFamily: "Arial" }}>
      <div style={{ marginBottom: "20px" }}>
        <Link href="/concursos">Voltar para concursos</Link>
      </div>

      <ConcursoForm modo="criar" />
    </main>
  );
}