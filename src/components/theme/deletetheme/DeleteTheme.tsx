import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";

import { AuthContext } from "../../../contexts/AuthContext";
import type Theme from "../../../models/Theme";
import { find, remove } from "../../../services/Service";
import { ToastAlert } from "../../../utils/ToastAlert";

function DeleteTheme() {
  const navigate = useNavigate();

  const [theme, setTheme] = useState<Theme>({} as Theme);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { user, handleLogout } = useContext(AuthContext);
  const token = user.token;

  const { id } = useParams<{ id: string }>();

  async function findById(id: string) {
    try {
      await find(`/temas/${id}`, setTheme, {
        headers: { Authorization: token },
      });
    } catch (error: any) {
      if (error.toString().includes("401")) {
        handleLogout();
      }
    }
  }

  useEffect(() => {
    if (token === "") {
      ToastAlert("Você precisa estar logado!", "info");
      navigate("/");
    }
  }, [token]);

  useEffect(() => {
    if (id !== undefined) {
      findById(id);
    }
  }, [id]);

  function back() {
    navigate("/temas");
  }

  async function deleteTheme() {
    try {
      await remove(`/temas/${id}`, {
        headers: { Authorization: token },
      });
      ToastAlert("Tema apagado com sucesso!", "sucess");
    } catch (error: any) {
      if (error.toString().includes("401")) {
        handleLogout();
      } else {
        ToastAlert("Erro ao apagar o Tema!", "error");
      }
    }
    setIsLoading(false);
    back();
  }

  return (
    <main className="container w-1/3 mx-auto">
      <h1 className="text-4xl text-center my-4">Deletar tema</h1>
      <h2 className="text-center font-semibold mb-4">
        Você tem certeza de que deseja apagar o tema a seguir?
      </h2>
      <article className="border flex flex-col rounded-2xl overflow-hidden justify-between">
        <header className="py-2 px-6 bg-indigo-600 text-white font-bold text-2xl">
          Tema
        </header>
        <p className="p-8 text-3xl bg-slate-200 h-full">{theme.contentTheme}</p>
        <section className="flex">
          <button
            className="text-slate-100 bg-red-400 hover:bg-red-600 w-full py-2"
            onClick={back}
          >
            Não
          </button>
          <button
            className="w-full text-slate-100 bg-indigo-400 hover:bg-indigo-600 flex items-center justify-center"
            onClick={deleteTheme}
          >
            {isLoading ? (
              <ClipLoader color="#fff" size={24} />
            ) : (
              <span>Sim</span>
            )}
          </button>
        </section>
      </article>
    </main>
  );
}

export default DeleteTheme;
