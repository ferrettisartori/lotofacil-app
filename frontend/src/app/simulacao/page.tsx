import Link from "next/link";
import SimulacaoForm from "../../components/SimulacaoForm";

export default function SimulacaoPage() {
  return (
    <main style={{ padding: "40px", fontFamily: "Arial" }}>
      <div style={{ marginBottom: "20px", display: "flex", gap: "20px" }}>
        <Link href="/">Início</Link>
        <Link href="/concursos">Concursos</Link>
        <Link href="/conferir">Conferir jogo</Link>
      </div>

      <SimulacaoForm />
    </main>
  );
}