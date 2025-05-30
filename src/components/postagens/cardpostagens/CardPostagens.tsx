import { Link } from 'react-router-dom'
import type Postagem from '../../../models/Postagem'

interface CardPostagensProps {
  postagem: Postagem
}

function CardPostagem({ postagem }: CardPostagensProps) {
  return (
    <div className='border border-yellow-700 flex flex-col rounded overflow-hidden justify-between'>
      <div>
        <div className="flex w-full bg-yellow-500 py-2 px-4 items-center gap-4">
          <img
            src="./assets/img/foto-do-usuario.jpg"
            className='h-12 rounded-full'
            alt={postagem.usuario?.nome ?? 'Foto do usuário'}
          />
          <h3 className='text-lg font-bold text-green-900 uppercase'>
            {postagem.usuario?.nome}
          </h3>
        </div>
        <div className='p-4'>
          <h4 className='text-lg font-semibold text-orange-700 uppercase'>{postagem.titulo}</h4>
          <p className='text-green-800'>{postagem.texto}</p>
          <p className='text-green-800'>Tema: {postagem.tema?.descricao}</p>
          <p className='text-green-800'>
            Data:{' '}
            {new Intl.DateTimeFormat(undefined, {
              dateStyle: 'full',
              timeStyle: 'medium',
            }).format(new Date(postagem.data))}
          </p>
        </div>
      </div>
      <div className="flex">
        <Link
          to={`/editarpostagem/${postagem.id}`}
          className='w-full text-white bg-green-600 hover:bg-green-800 flex items-center justify-center py-2'
        >
          Editar
        </Link>
        <Link
          to={`/deletarpostagem/${postagem.id}`}
          className='w-full text-white bg-orange-500 hover:bg-orange-700 flex items-center justify-center py-2'
        >
          Deletar
        </Link>
      </div>
    </div>
  )
}

export default CardPostagem
