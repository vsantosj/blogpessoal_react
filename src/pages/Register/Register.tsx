import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import type User from "../../models/User";
import { registerUser } from "../../services/Service";
import { PulseLoader } from "react-spinners";
import "./Register.css"


function Register() {

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [checkPassword, setCheckPassword] = useState<string>('');
    const [user, setUser] = useState<User>({
        id: 0,
        name: '',
        user: '',
        password: '',
        photoUrl: ''
    });

    useEffect(() => {
        if (user.id !== 0) {
            retornPage();
        }
    }, [user]);

    function retornPage() {
        navigate('/');
    }

    function updateState(e: ChangeEvent<HTMLInputElement>) {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    }

    function handleCheckPassword(e: ChangeEvent<HTMLInputElement>) {
        setCheckPassword(e.target.value);
    }

    async function handleRegisterNewUser(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (checkPassword === user.password && user.password.length >= 8) {

            setIsLoading(true);

            try {
                await registerUser('/usuarios/cadastrar', user, setUser);
                alert('Usuário cadastrado com sucesso!');
            } catch (error) {
                console.error(`Erro no cadastro`, error)
                alert('Erro ao cadastrar o usuário!');
            }
        } else {
            if (checkPassword != user.password)
                alert(`As senhas não coincidem!`);
            else if (user.password.length < 8)
                alert('A senha deve ter pelo menos 8 caracteres!')
            else
                alert('Dados de usuário inconsistentes! Verifique as informações do cadastro.');
            setUser({
                ...user,
                password: ''
            });
            setCheckPassword('');
        }

        setIsLoading(false);
    }

    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-2 h-screen 
            place-items-center font-bold">
                <div className=" backgroundRegister  hidden lg:block"></div>
                <form className='flex justify-center items-center flex-col w-2/3 gap-3'
                    onSubmit={handleRegisterNewUser} >

                    <h2 className='text-slate-900 text-5xl'>Cadastrar</h2>
                    <div className="flex flex-col w-full">
                        <label htmlFor="nome">Nome</label>
                        <input
                            type="text"
                            id="nome"
                            name="name"
                            placeholder="Nome"
                            className="border-2 border-slate-700 rounded p-2"
                            value={user.name}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => updateState(e)}
                            required
                        />
                    </div>
                    <div className="flex flex-col w-full">
                        <label htmlFor="usuario">Usuario</label>
                        <input
                            type="text"
                            id="usuario"
                            name="user"
                            placeholder="Usuario"
                            className="border-2 border-slate-700 rounded p-2"
                            value={user.user}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => updateState(e)}
                        />
                    </div>
                    <div className="flex flex-col w-full">
                        <label htmlFor="foto">Foto</label>
                        <input
                            type="text"
                            id="foto"
                            name="photoUrl"
                            placeholder="Foto"
                            className="border-2 border-slate-700 rounded p-2"
                            value={user.photoUrl}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => updateState(e)}
                        />
                    </div>
                    <div className="flex flex-col w-full">
                        <label htmlFor="password">Senha</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Senha"
                            className="border-2 border-slate-700 rounded p-2"
                            value={user.password}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => updateState(e)}
                        />
                    </div>
                    <div className="flex flex-col w-full">
                        <label htmlFor="checkPassword">Confirmar Senha</label>
                        <input
                            type="password"
                            id="checkPassword"
                            name="checkPassword"
                            placeholder="Confirmar Senha"
                            className="border-2 border-slate-700 rounded p-2"
                            value={checkPassword}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => handleCheckPassword(e)}
                        />

                    </div>
                    <div className="flex justify-around w-full gap-8">
                        <button
                            type='reset'
                            className='rounded text-white bg-red-400 hover:bg-red-700 w-1/2 py-2'
                            onClick={retornPage}
                        >
                            Cancelar
                        </button>
                        <button
                            type='submit'
                            className='rounded text-white bg-indigo-400 
                            hover:bg-indigo-900 w-1/2 py-2
                            flex justify-center'
                        >
                            {isLoading ?
                                <PulseLoader
                                    color="#ffffff"
                                    size={24}
                                /> :
                                <span>Cadastrar</span>
                            }
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Register
