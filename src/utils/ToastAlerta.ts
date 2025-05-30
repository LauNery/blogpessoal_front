import { toast } from 'react-toastify'

export function ToastAlerta(
  mensagem: string,
  tipo: 'sucesso' | 'erro' | 'info' = 'info'
) {
  const config = {
    position: 'top-right' as const,
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    theme: 'colored',
  }

  switch (tipo) {
    case 'sucesso':
      toast.success(mensagem, config)
      break
    case 'erro':
      toast.error(mensagem, config)
      break
    case 'info':
    default:
      toast.info(mensagem, config)
      break
  }
}
