import { useState, useContext, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { buscar, deletar } from "../../../services/Service"
import { RotatingLines } from "react-loader-spinner"
import type Postagem from "../../../models/Postagem"
import { AuthContext } from "../../../context/AuthContext"
import { ToastAlerta } from "../../../utils/ToastAlerta"

function DeletarPostagem() {

    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [postagem, setPostagem] = useState<Postagem>({} as Postagem)

    const { id } = useParams<{ id: string }>()

    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token

    async function buscarPorId(id: string) {
        try {
            await buscar(`/postagens/${id}`, setPostagem, {
                headers: {
                    'Authorization': token
                }
            })
        } catch (error: any) {
            if (error.toString().includes('403')) {
                handleLogout()
            }
        }
    }

    useEffect(() => {
        if (token === '') {
            ToastAlerta('Você precisa estar logado')
            navigate('/')
        }
    }, [token])

    useEffect(() => {
        if (id !== undefined) {
            buscarPorId(id)
        }
    }, [id])

    async function deletarPostagem() {
        setIsLoading(true)

        try {
            await deletar(`/postagens/${id}`, {
                headers: {
                    'Authorization': token
                }
            })

            ToastAlerta('Postagem apagada com sucesso')

        } catch (error: any) {
            if (error.toString().includes('403')) {
                handleLogout()
            } else {
                ToastAlerta('Erro ao deletar a postagem.')
            }
        }

        setIsLoading(false)
        retornar()
    }

    function retornar() {
        navigate("/postagens")
    }

    return (
        <div className='container w-1/3 mx-auto'>
            <h1 className='text-4xl text-center my-4 text-orange-700'>Deletar Postagem</h1>

            <p className='text-center font-semibold mb-4 text-green-800'>
                Você tem certeza de que deseja apagar a postagem a seguir?
            </p>

            <div className='border border-yellow-700 flex flex-col rounded-2xl overflow-hidden justify-between'>
                <header 
                    className='py-2 px-6 bg-yellow-500 text-green-900 font-bold text-2xl'>
                    Postagem
                </header>
                <div className="p-4">
                    <p className='text-xl h-full text-orange-800'>{postagem.titulo}</p>
                    <p className='text-green-900'>{postagem.texto}</p>
                </div>
                <div className="flex">
                    <button 
                        className='text-white bg-orange-500 hover:bg-orange-700 w-full py-2'
                        onClick={retornar}>
                        Não
                    </button>
                    <button 
                        className='w-full text-white bg-green-600 hover:bg-green-800 flex items-center justify-center'
                        onClick={deletarPostagem}>
                        
                        {isLoading ?
                            <RotatingLines
                                strokeColor="white"
                                strokeWidth="5"
                                animationDuration="0.75"
                                width="24"
                                visible={true}
                            /> :
                            <span>Sim</span>
                        }
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DeletarPostagem
