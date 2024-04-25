import './hero.css'

export default function Hero() {
    return (
        <section className="hero">
            <div className="hero__img-container">
                <img src="/images/menina_mexendo_no_computador.jpeg" alt="" />
            </div>

            <aside className="hero__content">
                <p className='tip'>
                    <span>Indica aí!</span>
                    Separamos as melhores vagas que são a sua cara
                </p>

                <div className='hero__content-wrapper'>
                    <h1 >Encontre seu estágio</h1>

                    <p >Fatec Indica, foi criado com o objetivo de auxiliar os alunos da Fatec Franco da Rocha a encontrar as vagas de acordo com suas preferências e necessidades com base em sua formação acadêmica, como um meio formal de divulgação</p>
                </div>

            </aside>
        </section>
    )
}