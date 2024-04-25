import { useState, useEffect } from 'react';

export default function VagasPage() {
    const props = JSON.parse(localStorage.getItem("user"));

    const [vagas, setVagas] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [favoritos, setFavoritos] = useState([]);

    useEffect(() => {
        async function fetchVagas() {
            try {
                const res = await fetch('http://localhost:4000/vagas');
                if (!res.ok) {
                    throw new Error('Erro ao buscar Vagas');
                }
                const data = await res.json();
                setVagas(data);

                const email_aluno = props.user.email_aluno;
                const favoritosRes = await fetch(`http://localhost:4000/favoritos/${email_aluno}`);
                if (!favoritosRes.ok) {
                    throw new Error('Erro ao buscar favoritos');
                }
                const favoritosData = await favoritosRes.json();
                setFavoritos(favoritosData);
            } catch (error) {
                console.error(error);
            }
        }

        fetchVagas();
    }, [props.user.email_aluno]);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    }

    const isFavorito = (vaga) => {
        return favoritos.find(favorito => favorito.cod_vaga === vaga.cod_vaga) !== undefined;
    }

    const visitarVaga = async (cod_vaga) => {
        try {
            const res = await fetch("http://localhost:4000/vaga/visitada", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    cod_vaga: cod_vaga
                })
            });

            if (!res.ok) {
                throw new Error('Erro ao registrar visita à vaga.');
            }

        } catch (error) {
            console.error(error);
        }
    }

    const handleFavorito = async (vagaId) => {
        try {
            const email_aluno = props.user.email_aluno;

            const res = await fetch("http://localhost:4000/favoritos", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    cod_vaga: vagaId,
                    email_aluno: email_aluno
                })
            });

            if (!res.ok) {
                throw new Error('Erro ao adicionar Favorito.');
            }

            const novoFavorito = await res.json();
            setFavoritos(prevFavoritos => [...prevFavoritos, novoFavorito]);

            window.location.reload()

        } catch (error) {
            console.log(error);
        }
    }

    const filteredVagas = vagas.filter((vaga) => {
        const searchTermMatches = vaga.cargo_vaga.toLowerCase().includes(searchTerm.toLowerCase());
        return searchTermMatches;
    });


    return (
        <main className="page">
            <header className='vagas__header'>
                <h2>Bem-vindo ao mural de vagas</h2>

                <input
                    type="search"
                    className='search_bar'
                    name="search"
                    id="search"
                    placeholder='🔎 Pesquise sua vaga aqui..'
                    value={searchTerm}
                    onChange={handleSearch}
                />
            </header>

            <section className='vagas__container'>
                {filteredVagas.map((vaga, index) => (
                    <div className='card-vaga' key={index}>

                        <div className='favorito_icon' onClick={() => handleFavorito(vaga.cod_vaga)}>
                            <img
                                src={isFavorito(vaga) ? "/images/coracao_ativo.png" : '/images/coracao.png'}
                                alt="Ícone de favorito" />
                        </div>

                        <h3 className='card-vaga__cargo'>{vaga.cargo_vaga}</h3>
                        <div>
                            <p className='card-vaga__salario'>Salário: R$ {vaga.salario_vaga}</p>
                            <small className='card-vaga__local'>Local: {vaga.cidade_vaga}</small>
                        </div>

                        <a
                            href={vaga.link_vaga}
                            target='__blank'
                            className='card-vaga__button'
                            onClick={(e) => {
                                visitarVaga(vaga.cod_vaga)
                                if (new Date(vaga.data_encerramento_vaga) < new Date()) {
                                    e.preventDefault();
                                    if (confirm('Esta vaga já foi encerrada. Deseja Continuar?')) {
                                        window.open(vaga.link_vaga, '_blank');
                                    }
                                }
                            }}>
                            Candidatar-se
                        </a>

                    </div>
                ))}
            </section>
        </main >
    )
}
