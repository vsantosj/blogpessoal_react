import { useContext, useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { AuthContext } from "../../../contexts/AuthContext";
import type Theme from "../../../models/Theme";
import type Posts from "../../../models/Posts";
import { create, find, update } from "../../../services/Service";


function FormPosts() {

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const [themes, setThemes] = useState<Theme[]>([])

    const [theme, setTheme] = useState<Theme>({ id: 0, contentTheme: '', })

    const [posts, setPosts] = useState<Posts>({

    } as Posts)

    const { user, handleLogout } = useContext(AuthContext)
    const token = user.token

    const { id } = useParams<{ id: string }>()

    async function findPostsById(id: string) {
        try {
            const updateUrl = `/posts/${id}`;
            console.log('URL de update:', updateUrl);
            await find(updateUrl, setPosts, {
                headers: { Authorization: token }
            })
        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout()
            }
        }
    }

    async function findThemeById(id: string) {
        try {
            await find(`/temas/${id}`, setTheme, {
                headers: { Authorization: token }
            })
        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout()
            }
        }
    }

    async function findThemes() {
        try {
            await find('/temas', setThemes, {
                headers: { Authorization: token }
            })
        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout()
            }
        }
    }

    useEffect(() => {
        if (token === '') {
            alert('Você precisa estar logado');
            navigate('/');
        }
    }, [token])

    useEffect(() => {
        findThemes()

        if (id !== undefined) {
            findPostsById(id)
        }
    }, [id])

    useEffect(() => {
        setPosts({
            ...posts,
            theme: theme,
        })
    }, [theme])

    function updateState(e: ChangeEvent<HTMLInputElement>) {
        setPosts({
            ...posts,
            [e.target.name]: e.target.value,
            theme: theme,
            user: user,
        });
    }

    function back() {
        navigate('/posts');
    }

    async function createNewPosts(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setIsLoading(true)

        if (id !== undefined) {
            try {
                await update(`/posts/${id}`, posts, setPosts, {
                    headers: {
                        Authorization: token,
                    },
                });

                alert('Postagem atualizada com sucesso')

            } catch (error: any) {
                if (error.toString().includes('401')) {
                    handleLogout()
                } else {
                    alert('Erro ao atualizar a Postagem')
                }
            }

        } else {
            try {
                await create(`/posts`, posts, setPosts, {
                    headers: {
                        Authorization: token,
                    },
                })

                alert('Postagem cadastrada com sucesso');

            } catch (error: any) {
                if (error.toString().includes('401'))
                    handleLogout()
                else
                    alert('Erro ao cadastrar a Postagem');
            }
        }
        setIsLoading(false)
        back()
    }

    const loadTheme = theme.contentTheme === '';

    return (
        <div className="container flex flex-col mx-auto items-center">
            <h1 className="text-4xl text-center my-8">
                {id !== undefined ? 'Editar Postagem' : 'Cadastrar Postagem'}
            </h1>

            <form className="flex flex-col w-1/2 gap-4"
                onSubmit={createNewPosts}>
                <div className="flex flex-col gap-2">
                    <label htmlFor="titulo">Título da Postagem</label>
                    <input
                        type="text"
                        placeholder="Titulo"
                        name="title"
                        required
                        className="border-2 border-slate-700 rounded p-2"
                        value={posts.title}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => updateState(e)}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="titulo">Texto da Postagem</label>
                    <input
                        type="text"
                        placeholder="Texto"
                        name="content"
                        required
                        className="border-2 border-slate-700 rounded p-2"
                        value={posts.content}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => updateState(e)}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <p>Tema da Postagem</p>
                    <select name="tema" id="tema" className='border p-2 border-slate-800 rounded'
                        onChange={(e) => findThemeById(e.currentTarget.value)}
                    >
                        <option value="" selected disabled>Selecione um Tema</option>

                        {themes.map((theme) => (
                            <>
                                <option key={theme.id} value={theme.id} >{theme.contentTheme}</option>
                            </>
                        ))}

                    </select>
                </div>
                <button
                    type='submit'
                    className='rounded disabled:bg-slate-200 bg-indigo-400 hover:bg-indigo-800
                               text-white font-bold w-1/2 mx-auto py-2 flex justify-center'
                    disabled={loadTheme}
                >
                    {isLoading ?
                        <ClipLoader
                            color="#ffffff"
                            size={24}
                        /> :
                        <span>{id === undefined ? 'Cadastrar' : 'Atualizar'}</span>
                    }

                </button>
            </form>
        </div>
    );
}

export default FormPosts;
