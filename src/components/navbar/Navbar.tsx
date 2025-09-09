import { type ReactNode, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { AuthContext } from "../../contexts/AuthContext";
import { ToastAlert } from "../../utils/ToastAlert";

function Navbar() {
  const navigate = useNavigate();

  const { user, handleLogout } = useContext(AuthContext);

  function logout() {
    handleLogout();
    ToastAlert("O Usuario foi deslogado com sucesso!", "info");
    navigate("/");
  }
  let component: ReactNode;

  if (user.token !== "") {
    component = (
      <header className="w-full flex justify-center py-4 bg-indigo-900 text-white">
        <nav className="container flex justify-between text-lg mx-8">
          <Link to="/home" className="text-2xl font-bold">
            Blog Pessoal
          </Link>

          <ul className="flex gap-4">
            <li>
              <Link to="/posts" className="hover:underline">
                Postagens
              </Link>
            </li>
            <li>
              <Link to="/temas" className="hover:underline">
                Temas
              </Link>
            </li>
            <li>
              <Link to="/cadastrartema" className="hover:underline">
                Cadastrar tema
              </Link>
            </li>
            <li>
              <Link to="/perfil" className="hover:underline">
                Perfil
              </Link>
            </li>
            <li>
              <Link to="/" onClick={logout}>
                Sair
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    );
  }

  return <>{component}</>;
}

export default Navbar;
