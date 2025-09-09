import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";

import { AuthContext } from "../../../contexts/AuthContext";
import type Posts from "../../../models/Posts";
import { find, remove } from "../../../services/Service";
import { ToastAlert } from "../../../utils/ToastAlert";

function DeletePosts() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [posts, setPosts] = useState<Posts>({} as Posts);

  const { id } = useParams<{ id: string }>();

  const { user, handleLogout } = useContext(AuthContext);
  const token = user.token;

  async function findById(id: string) {
    try {
      await find(`/posts/${id}`, setPosts, {
        headers: {
          Authorization: token,
        },
      });
    } catch (error: any) {
      if (error.toString().includes("401")) {
        handleLogout();
      }
    }
  }

  useEffect(() => {
    if (token === "") {
      ToastAlert("Você precisa estar logado", "info");
      navigate("/");
    }
  }, [token]);

  useEffect(() => {
    if (id !== undefined) {
      findById(id);
    }
  }, [id]);

  async function deletePosts() {
    setIsLoading(true);

    try {
      await remove(`/posts/${id}`, {
        headers: {
          Authorization: token,
        },
      });

      ToastAlert("Postagem apagada com sucesso", "sucess");
    } catch (error: any) {
      if (error.toString().includes("401")) {
        handleLogout();
      } else {
        ToastAlert("Erro ao deletar a postagem.", "error");
      }
    }

    setIsLoading(false);
    back();
  }

  function back() {
    navigate("/posts");
  }

  return (
    <div className="container w-1/3 mx-auto">
      <h1 className="text-4xl text-center my-4">Deletar Postagem</h1>

      <p className="text-center font-semibold mb-4">
        Você tem certeza de que deseja apagar a postagem a seguir?
      </p>

      <div className="border flex flex-col rounded-2xl overflow-hidden justify-between">
        <header className="py-2 px-6 bg-indigo-600 text-white font-bold text-2xl">
          Postagem
        </header>
        <div className="p-4">
          <p className="text-xl h-full">{posts.title}</p>
          <p>{posts.content}</p>
        </div>
        <div className="flex">
          <button
            className="text-slate-100 bg-red-400 hover:bg-red-600 w-full py-2"
            onClick={back}
          >
            Não
          </button>
          <button
            className="w-full text-slate-100 bg-indigo-400 
                        hover:bg-indigo-600 flex items-center justify-center"
            onClick={deletePosts}
          >
            {isLoading ? (
              <ClipLoader color="#ffffff" size={24} />
            ) : (
              <span>Sim</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeletePosts;
