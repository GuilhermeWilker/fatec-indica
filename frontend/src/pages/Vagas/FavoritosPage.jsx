import { useEffect, useState } from 'react';

export default function FavoritosPage() {
    const [vagasFavoritas, setVagasFavoritas] = useState([]);
    const props = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        async function fetchFavorites(emailAluno) {
            try {
                const res = await fetch(`http://localhost:4000/favoritos/${emailAluno}`);

                if (!res.ok) {
                    throw new Error('Erro ao buscar Vagas');
                }

                const data = await res.json();
                setVagasFavoritas(data);
            } catch (error) {
                console.error(error);
            }
        }

        if (props && props.user && props.user.email_aluno) {
            fetchFavorites(props.user.email_aluno);
        }
    }, [props.user.email_aluno]);

    const handleFavorito = async (idFavorito) => {
        try {
            const res = await fetch(`http://localhost:4000/favoritos/${idFavorito}`, {
                method: 'DELETE',
            });

            if (!res.ok) {
                throw new Error('Erro ao remover Favorito.');
            }

            // Removendo a vaga favorita da lista após a exclusão bem-sucedida
            setVagasFavoritas(prevVagas => prevVagas.filter(vaga => vaga.id_favorito !== idFavorito));
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <section className="page">

            <header className='vagas__header'>
                <h2 className='vagas__header-greet'>
                    Bem vindo a sua página de favoritos, <br />
                    {props.user.nomecompleto_aluno}!
                </h2>
            </header>


            <div className="vagas__container">
                {vagasFavoritas.map((vaga, index) => (
                    <div className='card-vaga' key={index}>

                        <div className='favorito_icon' onClick={() => handleFavorito(vaga.id_favorito)}>
                            <img
                                src="/images/coracao_ativo.png" // Sempre ativo, pois está na página de favoritos
                                alt="Ícone de favorito" />
                        </div>

                        <h3 className='card-vaga__cargo'>{vaga.cargo_vaga}</h3>
                        <div>
                            <p className='card-vaga__salario'>Salário: R$ {vaga.salario_vaga}</p>
                            <small className='card-vaga__local'>Local: {vaga.local_vaga}</small>
                        </div>

                        <a href={vaga.link_vaga} target='__blank' className='card-vaga__button'>
                            Candidatar-se
                        </a>
                    </div>
                ))}
            </div>
        </section>
    );
}
