import ListaPostagens from "../../components/postagens/listapostagens/ListaPostagens";
import ModalPostagem from "../../components/postagens/modalpostagem/ModalPostagem";

function Home() {
    return (
        <>
            <div className="bg-yellow-200 flex justify-center">
                <div className='container grid grid-cols-2 text-green-900'>
                    <div className="flex flex-col gap-4 items-center justify-center py-4">
                        <h2 className='text-5xl font-bold text-orange-600'>
                            Seja Bem Vinde!
                        </h2>
                        <p className='text-xl text-green-800'>
                            Expresse aqui seus pensamentos e opniões
                        </p>

                        <div className="flex justify-around gap-4">
                            <div className="flex justify-around gap-4">
                                <ModalPostagem />
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center ">
                        <img
                            src="./assets/img/foto-home.jpg"
                            alt="Imagem Página Home"
                            className='w-2/3'
                        />
                    </div>
                </div>
            </div>

            <ListaPostagens />
        </>
    );
}

export default Home;
