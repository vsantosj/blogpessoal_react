import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext } from "react";


function Navbar() {

  const navigate = useNavigate();

  const { handleLogout } = useContext(AuthContext);

  function logout() {
    handleLogout();
    alert('O Usuario foi deslogado com sucesso!');
    navigate('/');
  }

  return (
    <>
      <header className='w-full bg-indigo-900 text-white flex justify-center py-4'>
        <nav className='container flex justify-between text-lg'>
          <Link to='/' className="text-2xl font-bold">Blog Pessoal</Link>

          <ul className='flex gap-4'>
            <li>
              <Link to='/posts' className='hover:underline'>Postagens</Link>
            </li>
            <li>
              <Link to='/temas' className='hover:underline'>Temas</Link>
            </li>
            <li>
              <Link to='/cadastrartema' className='hover:underline'>Cadastrar tema</Link>
            </li>
            <li><Link to='/perfil' className='hover:underline'>Perfil</Link></li>
            <li>
              <Link to="/" onClick={logout}>Sair</Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}

export default Navbar;
