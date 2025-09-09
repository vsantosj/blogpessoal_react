import { Link } from "react-router-dom";

import type Theme from "../../../models/Theme";

interface CardThemeProps {
  theme: Theme;
}

function CardTheme({ theme }: CardThemeProps) {
  return (
    <article className="border flex flex-col rounded-2xl overflow-hidden justify-between">
      <header className="py-2 px-6 bg-indigo-800 text-white font-bold text-2xl">
        <h1>Tema</h1>
      </header>

      <p className="p-8 text-3xl bg-slate-200 h-full">{theme.contentTheme}</p>

      <section className="flex">
        <Link
          to={`/editartema/${theme.id}`}
          className="w-full text-slate-100 bg-indigo-400 hover:bg-indigo-800 flex items-center justify-center py-2"
        >
          <button>Editar</button>
        </Link>

        <Link
          to={`/deletartema/${theme.id}`}
          className="text-slate-100 bg-red-600 hover:bg-red-700 w-full flex items-center justify-center"
        >
          <button>Deletar</button>
        </Link>
      </section>
    </article>
  );
}
export default CardTheme;
