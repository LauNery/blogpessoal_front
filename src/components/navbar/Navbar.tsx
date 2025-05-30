﻿import { useContext, type ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { ToastAlerta } from "../../utils/ToastAlerta";

function Navbar() {

    const navigate = useNavigate();

    const { usuario, handleLogout } = useContext(AuthContext)

    function logout() {

        handleLogout()
        ToastAlerta('O Usuário foi desconectado com sucesso!', 'info')
        navigate('/')
    }
    
    let component: ReactNode

    if (usuario.token !== "") {

        component = (
        <>
            <div className='w-full bg-yellow-400 text-green-900 flex justify-center py-4'>

                <div className="container flex justify-between text-lg">
                    <Link to='/home' className="text-2xl font-bold text-orange-600 pl-3.5">Blog Pessoal</Link>

                    <div className='flex gap-4'>
                        <Link to='/postagens' className='hover:underline text-green-800'>Postagens</Link>
                        <Link to='/temas' className='hover:underline text-green-800'>Temas</Link>
                        <Link to='/cadastrartema' className='hover:underline text-green-800'>Cadastrar tema</Link>
                        <Link to='/perfil' className='hover:underline text-green-800'>Perfil</Link>
                        <Link to='' onClick={logout} className='hover:underline text-orange-600'>Sair</Link>
                    </div>
                </div>
            </div>
        </>
    );
}

return (
        <>
            { component }
        </>
    )
}

export default Navbar
