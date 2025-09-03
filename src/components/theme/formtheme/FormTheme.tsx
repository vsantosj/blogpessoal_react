import { useContext, useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type Theme from "../../../models/Theme";
import { AuthContext } from "../../../contexts/AuthContext";
import { create, find, update } from "../../../services/Service";
import { ClipLoader } from "react-spinners";

function FormTheme() {

    const navigate = useNavigate()
    const [theme, setTheme] = useState<Theme>({} as Theme)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { user, handleLogout } = useContext(AuthContext)

    const token = user.token
    const { id } = useParams<{ id: string }>();
    async function findById(id: string) {
        try {
            await find(`/temas/${id}`, setTheme, {
                headers: { Authorization: token },
            });
        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout();
            }
        }
    }

    useEffect(() => {
        if (token === '') {
            alert('Você precisa estar logado!');
            navigate('/');
        }
    }, [token]);

    useEffect(() => {
        if (id !== undefined) {
            findById(id);
        }
    }, [id]);

    function updateState(e: ChangeEvent<HTMLInputElement>) {
        setTheme({
            ...theme,
            [e.target.name]: e.target.value,
        });
    }

    function back() {
        navigate('/temas');
    }

    async function createNewTheme(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsLoading(true);

        if (id !== undefined) {
            try {
                await update('/temas', theme, setTheme, {
                    headers: {
                        Authorization: token,
                    },
                });
                alert('Tema atualizado com sucesso!');
            } catch (error: any) {
                if (error.toString().includes('401')) {
                    handleLogout();
                } else {
                    alert('Erro ao atualizar o Tema!');
                }
            }
        } else {
            try {
                await create('/temas', theme, setTheme, {
                    headers: {
                        Authorization: token,
                    },
                });
                alert('O Tema foi cadastrado com sucesso!');
            } catch (error: any) {
                if (error.toString().includes('401')) {
                    handleLogout();
                } else {
                    alert('Erro ao cadastrar o Tema!');
                }
            }
        }

        setIsLoading(false);
        back();
    }


    return (

        <div className="container flex flex-col items-center justify-center mx-auto">
            <h1 className="text-4xl text-center my-8">
                {id === undefined ? `Cadastrar Tema` : `Editar tema`}
            </h1>

            <form className="w-1/2 flex flex-col gap-4"
                onSubmit={createNewTheme}>

                <div className="flex flex-col gap-2">
                    <label htmlFor="contentTheme">Descrição do Tema</label>
                    <input
                        type="text"
                        placeholder="Descreva aqui seu tema"
                        name="contentTheme"
                        className="border-2 border-slate-700 rounded p-2"
                        value={theme.contentTheme}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => updateState(e)}
                    />
                </div>
                <button
                    className="rounded text-slate-100 bg-indigo-400 hover:bg-indigo-800 w-1/2 py-2 mx-auto flex justify-center"
                    type="submit">
                    {
                        isLoading ?
                            <ClipLoader
                                color="#ffffff"
                                size={24}
                            /> :
                            <span>{id === undefined ? `Cadastrar` : `Atualizar`}</span>
                    }

                </button>
            </form>
        </div>
    );
}
export default FormTheme
