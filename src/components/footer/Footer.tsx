import { EnvelopeIcon, GithubLogoIcon, LinkedinLogoIcon } from "@phosphor-icons/react";
import { AuthContext } from "../../context/AuthContext";
import { useContext, type ReactNode } from "react";

function Footer() {

    let data = new Date().getFullYear()

    const { usuario } = useContext(AuthContext)

    let component: ReactNode

    if (usuario.token !== "") {

        component = (
        <div className="flex justify-center bg-orange-800 text-red-200">
            <div className="container flex flex-col items-center py-4">
                <p className="text-xl font-bold">
                    Blog Pessoal - Laura Nery | Copyright: {data}
                </p>
                <p className="text-lg">Acesse nossas redes sociais</p>
                <div className="flex gap-2 flex-wrap justify-center mt-2">
                    <a
                        href="https://www.linkedin.com/in/laura-nery-lon1999/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Perfil no LinkedIn de Laura Nery"
                    >
                        <LinkedinLogoIcon size={48} weight="bold" />
                    </a>
                    <a
                        href="mailto:laura.olivernery@gmail.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Email para Laura Nery"
                    >
                        <EnvelopeIcon size={48} weight="bold" />
                    </a>
                    <a
                        href="https://github.com/LauNery"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Perfil no GitHub de Laura Nery"
                    >
                        <GithubLogoIcon size={48} weight="bold" />
                    </a>
                </div>
            </div>
        </div>
    );
}
return (
        <>
            { component }
        </>
    )
}

export default Footer