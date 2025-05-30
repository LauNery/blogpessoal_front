import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"
import { ToastAlerta } from "../../utils/ToastAlerta"

function Perfil() {
  const navigate = useNavigate()
  const { usuario } = useContext(AuthContext)

  useEffect(() => {
    if (usuario.token === "") {
      ToastAlerta("Você precisa estar logado")
      navigate("/")
    }
  }, [usuario.token])

  return (
    <div className="flex justify-center mx-4">
      <div className="container mx-auto my-4 rounded-2xl overflow-hidden">
        <img
          className="w-full h-72 object-cover border-b-8 border-green-600"
          src="./assets/img/rockstar-com-guitarra.jpg"
          alt="Capa do Perfil"
        />

        <img
          className="rounded-full w-56 mx-auto mt-[-8rem] border-8 border-white relative z-10"
          src="./assets/img/foto-do-perfil.jpg"
          alt={`Foto de perfil de ${usuario.nome}`}
        />

        <div
          className="relative mt-[-6rem] h-72 flex flex-col 
          bg-orange-500 text-yellow-300 text-2xl items-center justify-center"
        >
          <p>Nome: Laura Nery</p>
          <p>Email: laura@gmail.com</p>
        </div>
      </div>
    </div>
  )
}

export default Perfil
