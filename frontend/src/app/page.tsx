import Link from "next/link";

export default function Home() {
  return (
    <main style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>Sistema Lotofácil</h1>
      <p>Projeto inicial para cadastro, consulta, conferência e simulação.</p>

      <div style={{ marginTop: "20px", display: "flex", gap: "20px", flexWrap: "wrap" }}>
        <Link href="/concursos">Ver concursos</Link>
        <Link href="/concursos/novo">Novo concurso</Link>
        <Link href="/conferir">Conferir jogo</Link>
        <Link href="/simulacao">Simulação histórica</Link>
        <Link href="/metodo-1">Método 1</Link>
      </div>
    </main>
  );
}