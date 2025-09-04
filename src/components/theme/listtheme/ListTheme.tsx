import { useNavigate } from "react-router-dom";
import CardTheme from "../cardtheme/CardTheme";
import { useContext, useEffect, useState } from "react";
import { find } from "../../../services/Service";
import type Theme from "../../../models/Theme";
import { AuthContext } from "../../../contexts/AuthContext";
import { SyncLoader } from "react-spinners";

function ListTheme() {

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [theme, setTheme] = useState<Theme[]>([])
  const { user, handleLogout } = useContext(AuthContext)

  const token = user.token

  useEffect(() => {
    if (token === '') {
      alert('Você precisa estar Logado')
      navigate('/')
    }
  }, [token])

  useEffect(() => {
    findTheme()
  }, [theme.length])


  async function findTheme() {
    try {

      setIsLoading(true)

      await find(`/temas`, setTheme, {
        headers: { Authorization: token }
      })

    } catch (error: any) {
      if (error.toString().includes('401'))
        handleLogout()

    } finally {
      setIsLoading(false)
    }
  }


  return (
    <main>
      {
        isLoading && (
          <div className="flex justify-center w-full my-8">
            <SyncLoader
              color="#312e81"
              size={32}
            />
          </div>
        )
      }
      <div className="flex justify-center w-full my-4">
        <div className="container flex flex-col">
          {(!isLoading && theme.length === 0) && (
            <span className="text-3xl text-center my-8">
              Nenhum Tema foi encontrado!
            </span>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {
              theme.map((theme) => (
                <CardTheme key={theme.id} theme={theme} />
              ))
            }
          </div>
        </div>
      </div>
    </main>
  );
}

export default ListTheme;
