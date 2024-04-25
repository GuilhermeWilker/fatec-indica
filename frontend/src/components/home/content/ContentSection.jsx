import './content.css'
import CardInfoContainer from '../../CardInfoContainer'
import CardInfo from '../../CardInfo'
import SaibaMais from '../saiba-mais/SaibaMais'

export default function ContentSection() {
    return (
        <main className="content">
            <CardInfoContainer className='content__card-container'>

                <CardInfo
                    title='Confira nossas Vagas'
                    content='Realize seu cadastro e busque pelas vagas de seu interesse.' />

                <CardInfo
                    title='Por que fazer estágio?'
                    content='Fazer estágio é uma ótima forma de ganhar experiência na sua área, uma oportunidade de aprender novas habilidades e técnicas. Permitem que você faça conexões e desenvolva sua rede profissional. Chance de descobrir a área pela qual possui interesse, pode ser um diferencial no seu currículo e ajudá-lo no mercado de trabalho.' />

                <CardInfo
                    title='Como funciona o projeto?'
                    content='Após realizar o cadastro em seu perfil, poderá acessar, buscar e candidatar as vagas e verificar com a empresa os status da candidatura.' />
            </CardInfoContainer>

            <SaibaMais />

        </main>

    )
}