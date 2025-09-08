import { Link } from "react-router-dom";
import type Posts from "../../../models/Posts";

interface CardPostsProps {
  posts: Posts;
}

function CardPosts({ posts }: CardPostsProps) {
  return (
    <div
      className="border-slate-900 border 
            flex flex-col rounded overflow-hidden justify-between"
    >
      <section>
        <div className="flex w-full bg-indigo-400 py-2 px-4 items-center gap-4">
          <img
            src={posts.user?.photoUrl}
            className="h-12 rounded-full"
            alt={`imagem do usuário ${posts.user?.name}`}
          />

          <h3 className="text-lg font-bold text-center uppercase">
            {posts.user?.name}
          </h3>
        </div>
        <div className="p-4 ">
          <h4 className="text-lg font-semibold uppercase">{posts.title}</h4>
          <p>{posts.content}</p>
          <p>{posts.content}</p>
          <p>
            Data Criação:{" "}
            {new Intl.DateTimeFormat("pt-BR", {
              dateStyle: "full",
              timeStyle: "medium",
            }).format(new Date(posts.created_at))}
          </p>
        </div>
      </section>

      <div className="flex">
        <Link
          to={`/editarpost/${posts.id}`}
          className="w-full text-white bg-indigo-400 
                    hover:bg-indigo-800 flex items-center justify-center py-2"
        >
          <button>Editar</button>
        </Link>
        <Link
          to={`/deletarpost/${posts.id}`}
          className="text-white bg-red-400 
                    hover:bg-red-700 w-full flex items-center justify-center"
        >
          <button>Deletar</button>
        </Link>
      </div>
    </div>
  );
}

export default CardPosts;
