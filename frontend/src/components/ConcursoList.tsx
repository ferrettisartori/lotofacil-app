import Link from "next/link";
import { Concurso } from "../types/concurso";

type Props = {
  concursos: Concurso[];
};

export default function ConcursoList({ concursos }: Props) {
  return (
    <div>
      <h2>Concursos</h2>

      <table border={1} cellPadding={8}>
        <thead>
          <tr>
            <th>Número</th>
            <th>Data</th>
            <th>Dezenas</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {concursos.map((c) => (
            <tr key={c.id}>
              <td>{c.numero_concurso}</td>
              <td>{c.data_sorteio}</td>
              <td>{c.dezenas.join(", ")}</td>
              <td>
                <Link href={`/concursos/${c.id}/editar`}>Editar</Link>
                <Link href={`/concursos/${c.id}`}>Ver</Link> |{" "}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}