import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import type Usuario from '../../models/Usuario'
import { cadastrarUsuario } from '../../services/Service'
import './Cadastro.css'
import { RotatingLines } from 'react-loader-spinner'
import { ToastAlerta } from '../../utils/ToastAlerta'

function Cadastro() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [confirmaSenha, setConfirmaSenha] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  const [usuario, setUsuario] = useState<Usuario>({
    id: 0,
    nome: '',
    usuario: '',
    senha: '',
    foto: ''
  })

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target
    setUsuario(prev => ({ ...prev, [name]: value }))
  }

  function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>) {
    setConfirmaSenha(e.target.value)
  }

  function validarEmail(email: string) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
  }

  async function cadastrarNovoUsuario(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setErrorMsg('')

    if (usuario.senha !== confirmaSenha) {
      setErrorMsg('As senhas não coincidem.')
      return
    }
    if (usuario.senha.length < 8) {
      setErrorMsg('A senha deve conter pelo menos 8 caracteres.')
      return
    }
    if (!usuario.nome.trim() || !usuario.usuario.trim()) {
      setErrorMsg('Nome e usuário são obrigatórios.')
      return
    }
    if (!validarEmail(usuario.usuario)) {
      setErrorMsg('Por favor, insira um email válido.')
      return
    }

    setIsLoading(true)

    try {
      const { id, ...dadosUsuario } = usuario

      await cadastrarUsuario('/usuarios/cadastrar', dadosUsuario, setUsuario)
      ToastAlerta('Usuário cadastrado com sucesso!')
      navigate('/login')
    } catch (error: any) {
      ToastAlerta('Erro ao cadastrar usuário:', error)
      if (error.response) {
        setErrorMsg(`Erro: ${error.response.status} - ${error.response.data?.message || error.response.statusText}`)
      } else if (error.request) {
        ToastAlerta('Erro: servidor não respondeu. Tente novamente mais tarde.')
      } else {
        setErrorMsg(`Erro: ${error.message}`)
      }
    } finally {
      setIsLoading(false)
    }
  }

  function cancelarCadastro() {
    navigate('/login')
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 h-screen place-items-center font-bold">
      <div className="fundoCadastro hidden lg:block"></div>
      <form
        className="flex justify-center items-center flex-col w-2/3 gap-3"
        onSubmit={cadastrarNovoUsuario}
        noValidate
        aria-label="Formulário de cadastro"
      >
        <h2 className="text-slate-900 text-5xl mb-6">Cadastrar</h2>

        {errorMsg && (
          <div
            role="alert"
            className="bg-red-100 text-red-700 border border-red-400 p-3 rounded mb-4 w-full text-center"
          >
            {errorMsg}
          </div>
        )}

        <div className="flex flex-col w-full">
          <label htmlFor="nome">Nome</label>
          <input
            type="text"
            id="nome"
            name="nome"
            placeholder="Nome"
            autoComplete="name"
            className="border-2 border-slate-700 rounded p-2"
            value={usuario.nome}
            onChange={atualizarEstado}
            required
          />
        </div>

        <div className="flex flex-col w-full">
          <label htmlFor="usuario">Usuário</label>
          <input
            type="email"
            id="usuario"
            name="usuario"
            placeholder="Usuário"
            autoComplete="email"
            className="border-2 border-slate-700 rounded p-2"
            value={usuario.usuario}
            onChange={atualizarEstado}
            required
          />
        </div>

        <div className="flex flex-col w-full">
            <label htmlFor="foto">Foto</label>
            <input
              type="text"
              id="foto"
              name="foto"
              placeholder="Foto"
              className="border-2 border-slate-700 rounded p-2"
              value={usuario.foto}
              onChange={atualizarEstado}
          />
        </div>

        <div className="flex flex-col w-full">
          <label htmlFor="senha">Senha</label>
          <input
            type="password"
            id="senha"
            name="senha"
            placeholder="Senha"
            autoComplete="new-password"
            className="border-2 border-slate-700 rounded p-2"
            value={usuario.senha}
            onChange={atualizarEstado}
            required
            minLength={8}
            aria-describedby="senhaHelp"
          />
          <small id="senhaHelp" className="text-gray-500">
            A senha deve ter pelo menos 8 caracteres.
          </small>
        </div>

        <div className="flex flex-col w-full">
          <label htmlFor="confirmarSenha">Confirmar Senha</label>
          <input
            type="password"
            id="confirmarSenha"
            name="confirmarSenha"
            placeholder="Confirmar Senha"
            autoComplete="new-password"
            className="border-2 border-slate-700 rounded p-2"
            value={confirmaSenha}
            onChange={handleConfirmarSenha}
            required
          />
        </div>

        <div className="flex justify-around w-full gap-8 mt-6">
          <button
            type="button"
            className="rounded text-white bg-red-500 hover:bg-red-800 w-1/2 py-2"
            onClick={cancelarCadastro}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="rounded text-white bg-indigo-600 hover:bg-indigo-950 w-1/2 py-2 flex justify-center items-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <RotatingLines
                strokeColor="white"
                strokeWidth="5"
                animationDuration="0.75"
                width="24"
                visible={true}
                aria-label="Carregando"
              />
            ) : (
              'Cadastrar'
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

export default Cadastro
