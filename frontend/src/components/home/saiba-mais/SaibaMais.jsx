import './saiba-mais.css'

export default function SaibaMais() {
    return (
        <aside className="saiba-mais">
            <div className="saiba-mais_wrapper">
                <article className="saiba-mais_text-content">
                    <h5 className="tip"><span>Comece agora</span></h5>

                    <h1>
                        Você aluno, se inscreva e comece a desfrutar do seu melhor estágio!
                    </h1>

                    <a href="/politica-acesso" className="btn_saiba-mais">
                        Políticas de Acesso
                    </a>
                </article>

                <img src="images/pessoas reunidas.png" alt="pessoas reunidas" />

            </div>
        </aside>
    )
}