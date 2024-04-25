import '../vagas.css'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function VagasAdminPage() {
    const [vagas, setVagas] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        async function fetchVagas() {
            try {
                const res = await fetch('http://localhost:4000/vagas')

                if (!res.ok) {
                    throw new Error('Erro ao buscar Vagas')
                }

                const data = await res.json()
                setVagas(data)

            } catch (error) {
                console.error(error)
            }
        }

        fetchVagas()
    }, [])

    const handleSearch = (e) => {
        setSearchTerm(e.target.value)
    }

    const handleDelete = async (cod_vaga) => {
        try {
            if (confirm("Deseja excluir esta vaga?")) {
                const res = await fetch(`http://localhost:4000/vaga/${cod_vaga}`, {
                    method: 'DELETE'
                });

                if (!res.ok) {
                    throw new Error('Erro ao excluir vaga');
                }

                const updatedVagas = vagas.filter(vaga => vaga.cod_vaga !== cod_vaga);
                setVagas(updatedVagas);
            }
        } catch (error) {
            console.error(error);
        }
    }

    const relatorio = async () => {
        let b = document.createElement("iframe")
        b.setAttribute('src', `http://localhost:4000/relatorio`)

        document.querySelector("#baixar")
            .appendChild(b)
            .setAttribute("style", 'display: none')

        alert("Relatório gerado com sucesso!")
    }

    const filteredVagas = vagas.filter((vaga) => {
        return vaga.cargo_vaga.toLowerCase().includes(searchTerm.toLowerCase())
    })

    return (
        <main className="page">
            <header className='vagas__header'>
                <h2>Bem-vindo administrador</h2>

                <div id='baixar'></div>

                <div>
                    <button onClick={relatorio} className='vagas__btn'>
                        Gerar relatório
                    </button>
                </div>

            </header>

            <input
                type="search"
                className='search_bar'
                name="search"
                id="search"
                placeholder='🔎 Pesquise sua vaga aqui..'
                value={searchTerm}
                onChange={handleSearch}
            />

            <section className='vagas__container'>
                {filteredVagas.map((vaga, index) => (
                    <div className='card-vaga' key={index}>
                        <h3 className='card-vaga__cargo'>{vaga.cargo_vaga}</h3>
                        <div>
                            <p className='card-vaga__salario'>Salário: R$ {vaga.salario_vaga}</p>
                            <small className='card-vaga__local'>Local: {vaga.cidade_vaga}</small>
                        </div>

                        <div className="card-vaga__button-container">
                            <button className='card-vaga__button' onClick={() => navigate(`/editar/vaga/${vaga.cod_vaga}`)}>
                                Editar
                            </button>

                            <button onClick={() => handleDelete(vaga.cod_vaga)} className='card-vaga__button'>
                                Excluir
                            </button>
                        </div>

                    </div>
                ))}
            </section>
        </main >
    )
}
