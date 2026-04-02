import Link from "next/link";
import ConferenciaForm from "../../components/ConferenciaForm";

export default function ConferirPage() {
  return (
    <main style={{ padding: "40px", fontFamily: "Arial" }}>
      <div style={{ marginBottom: "20px", display: "flex", gap: "20px" }}>
        <Link href="/">Início</Link>
        <Link href="/concursos">Concursos</Link>
      </div>

      <ConferenciaForm />
    </main>
  );
}