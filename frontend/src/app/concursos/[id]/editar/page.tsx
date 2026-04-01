import Link from "next/link";
import ConcursoForm from "../../../../components/ConcursoForm";
import { buscarConcursoPorId } from "../../../../services/api";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditarConcursoPage({ params }: Props) {
  const { id } = await params;
  const concurso = await buscarConcursoPorId(Number(id));

  return (
    <main style={{ padding: "40px", fontFamily: "Arial" }}>
      <div style={{ marginBottom: "20px" }}>
        <Link href="/concursos">Voltar para concursos</Link>
      </div>

      <ConcursoForm modo="editar" concursoInicial={concurso} />
    </main>
  );
}