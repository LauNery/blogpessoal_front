import { useNavigate, useParams } from "react-router-dom";
import { buscar, atualizar, cadastrar } from "../../../services/Service";
import { RotatingLines } from "react-loader-spinner";
import { useContext, useEffect, useState, type ChangeEvent } from "react";
import { AuthContext } from "../../../context/AuthContext";
import type Tema from "../../../models/Tema";
import type Postagem from "../../../models/Postagem";
import { ToastAlerta } from "../../../utils/ToastAlerta";

function FormPostagem() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [temas, setTemas] = useState<Tema[]>([]);
  const [tema, setTema] = useState<Tema>({ id: 0, descricao: "" });
  const [postagem, setPostagem] = useState<Postagem>({} as Postagem);

  const { id } = useParams<{ id: string }>();

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario?.token ?? "";

  async function buscarPostagemPorId(id: string) {
    try {
      await buscar(`/postagens/${id}`, setPostagem, {
        headers: { Authorization: token },
      });
    } catch (error: any) {
      if (error.toString().includes("403")) {
        handleLogout();
      }
    }
  }

  async function buscarTemas() {
    try {
      await buscar("/temas", setTemas, {
        headers: { Authorization: token },
      });
    } catch (error: any) {
      if (error.toString().includes("403")) {
        handleLogout();
      }
    }
  }

  useEffect(() => {
    if (token === "") {
      ToastAlerta("Você precisa estar logado");
      navigate("/");
    }
  }, [token, navigate]);

  useEffect(() => {
    buscarTemas();

    if (id !== undefined) {
      buscarPostagemPorId(id);
    } else {
      setPostagem({} as Postagem);
      setTema({ id: 0, descricao: "" });
    }
  }, [id, token]);

  useEffect(() => {
    if (postagem.tema) {
      setTema(postagem.tema);
    }
  }, [postagem]);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setPostagem({
      ...postagem,
      [e.target.name]: e.target.value,
      tema: tema,
      usuario: usuario,
    });
  }

  function selecionarTema(e: ChangeEvent<HTMLSelectElement>) {
    const temaSelecionado = temas.find((t) => t.id === Number(e.target.value));
    if (temaSelecionado) {
      setTema(temaSelecionado);
      setPostagem({
        ...postagem,
        tema: temaSelecionado,
        usuario: usuario,
      });
    }
  }

  function retornar() {
    navigate("/postagens");
  }

  async function gerarNovaPostagem(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (id !== undefined) {
        await atualizar(`/postagens`, postagem, setPostagem, {
          headers: {
            Authorization: token,
          },
        });

        ToastAlerta("Postagem atualizada com sucesso");
      } else {
        await cadastrar(`/postagens`, postagem, setPostagem, {
          headers: {
            Authorization: token,
          },
        });

        ToastAlerta("Postagem cadastrada com sucesso");
      }
      retornar();
    } catch (error: any) {
      if (error.toString().includes("403")) {
        handleLogout();
      } else {
        ToastAlerta(id !== undefined ? "Erro ao atualizar a Postagem" : "Erro ao cadastrar a Postagem");
      }
    } finally {
      setIsLoading(false);
    }
  }

  const carregandoTema = tema.id === 0;

 return (
    <div className="container flex flex-col mx-auto items-center">
      <h1 className="text-4xl text-orange-700 text-center my-8">
        {id !== undefined ? "Editar Postagem" : "Cadastrar Postagem"}
      </h1>

      <form className="flex flex-col w-1/2 gap-4" onSubmit={gerarNovaPostagem}>
        <div className="flex flex-col gap-2">
          <label htmlFor="titulo" className="text-green-900">Título da Postagem</label>
          <input
            type="text"
            placeholder="Titulo"
            name="titulo"
            required
            className="border-2 border-yellow-600 rounded p-2"
            value={postagem.titulo ?? ""}
            onChange={atualizarEstado}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="texto" className="text-green-900">Texto da Postagem</label>
          <textarea
            placeholder="Texto"
            name="texto"
            required
            className="border-2 border-yellow-600 rounded p-2"
            value={postagem.texto ?? ""}
            onChange={atualizarEstado}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="tema" className="text-green-900">Tema da Postagem</label>
          <select
            name="tema"
            id="tema"
            className="border border-yellow-600 p-2 rounded"
            value={tema.id}
            onChange={selecionarTema}
            required
          >
            <option value={0} disabled>
              Selecione um Tema
            </option>

            {temas.map((tema) => (
              <option key={tema.id} value={tema.id}>
                {tema.descricao}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="rounded disabled:bg-slate-200 bg-orange-500 hover:bg-orange-700
                               text-white font-bold w-1/2 mx-auto py-2 flex justify-center"
          disabled={carregandoTema || isLoading}
        >
          {isLoading ? (
            <RotatingLines
              strokeColor="white"
              strokeWidth="5"
              animationDuration="0.75"
              width="24"
              visible={true}
            />
          ) : (
            <span>{id !== undefined ? "Atualizar" : "Cadastrar"}</span>
          )}
        </button>
      </form>
    </div>
  );
}

export default FormPostagem;
