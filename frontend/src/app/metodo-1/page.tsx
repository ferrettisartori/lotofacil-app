import Link from "next/link";
import Metodo1Form from "../../components/Metodo1Form";

export default function Metodo1Page() {
  return (
    <main style={{ padding: "40px", fontFamily: "Arial" }}>
      <div style={{ marginBottom: "20px", display: "flex", gap: "20px" }}>
        <Link href="/">Início</Link>
        <Link href="/concursos">Concursos</Link>
        <Link href="/conferir">Conferir jogo</Link>
        <Link href="/simulacao">Simulação histórica</Link>
      </div>

      <Metodo1Form />
    </main>
  );
}