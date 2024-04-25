import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'

export default function EditarVagasPages() {
    const { id } = useParams()

    const [formData, setFormData] = useState({
        empresa_vaga: '',
        cargo_vaga: '',
        salario_vaga: '',
        estado_vaga: '',
        cidade_vaga: '',
        link_vaga: '',
        nivelcargo_vaga: '',
        data_cadastro_vaga: '',
        data_encerramento_vaga: '',
    });

    useEffect(() => {
        async function fetchVaga() {
            try {
                const res = await fetch(`http://localhost:4000/vaga/${id}`);
                if (!res.ok) {
                    throw new Error('Erro ao buscar dados da vaga');
                }
                const data = await res.json();

                setFormData(data);
            } catch (error) {
                console.error(error);
            }
        }

        fetchVaga();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(`http://localhost:4000/vaga/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!res.ok) {
                throw new Error('Erro ao editar vaga');
            }

            window.location.href = '/admin';
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <section className="page">
            <h2>Formulário editar vagas</h2>

            <form className="form-vagas" onSubmit={handleSubmit}>
                <div>
                    <article className="flex gap-4">
                        <div className="form__div">
                            <label htmlFor="empresa_vaga">Empresa:*</label>
                            <input
                                type="text"
                                name="empresa_vaga"
                                value={formData.empresa_vaga}
                                onChange={handleChange}
                                placeholder="Nome da Empresa"
                                required />
                        </div>

                        <div className="form__div">
                            <label htmlFor="estado_vaga">Estado:*</label>
                            <input
                                type="text"
                                name="estado_vaga"
                                value={formData.estado_vaga}
                                onChange={handleChange}
                                placeholder="São Paulo"
                                required />
                        </div>

                        <div className="form__div">
                            <label htmlFor="cidade_vaga">Cidade:*</label>
                            <input
                                type="text"
                                name="cidade_vaga"
                                value={formData.cidade_vaga}
                                onChange={handleChange}
                                placeholder="Pinheiros"
                                required />
                        </div>
                    </article>

                    <article className="flex gap-4">
                        <div className="form__div">
                            <label htmlFor="salario_vaga">Salario:*</label>
                            <input
                                type="text"
                                name="salario_vaga"
                                value={formData.salario_vaga}
                                onChange={handleChange}
                                placeholder="R$ 1500,00"
                                required />
                        </div>

                        <div className="form__div">
                            <label htmlFor="link_vaga">Link da Vaga:*</label>
                            <input
                                type="text"
                                name="link_vaga"
                                value={formData.link_vaga}
                                onChange={handleChange}
                                placeholder="https://empresa.com.br/trabalhe-conosco"
                                required />
                        </div>

                        <div className="form__div">
                            <label htmlFor="nivelcargo_vaga">Nível de Cargo:*</label>
                            <select name="nivelcargo_vaga" value={formData.nivelcargo_vaga} onChange={handleChange}>
                                <option value="">Selecione uma opção</option>
                                <option value="trainee">Trainee</option>
                                <option value="estagio">Estágio</option>
                                <option value="junior">Júnior</option>
                                <option value="pleno">Pleno</option>
                            </select>
                        </div>
                    </article>

                    <div className="form__div">
                        <label htmlFor="cargo_vaga">Cargo:*</label>
                        <input
                            type="text"
                            name="cargo_vaga"
                            value={formData.cargo_vaga}
                            onChange={handleChange}
                            placeholder='Analista de Suporte N1'
                            required />
                    </div>

                    <div className="form__div">
                        <label htmlFor="data_cadastro_vaga">Data de Cadastro:*</label>
                        <input
                            type="date"
                            name="data_cadastro_vaga"
                            value={formData.data_cadastro_vaga}
                            onChange={handleChange}
                            required />
                    </div>

                    <div className="form__div">
                        <label htmlFor="data_encerramento_vaga">Data de Encerramento:*</label>
                        <input
                            type="date"
                            name="data_encerramento_vaga"
                            value={formData.data_encerramento_vaga}
                            onChange={handleChange}
                            required />
                    </div>
                </div>

                <div className="form__btns-container">
                    <button type='submit'>
                        Atualizar
                    </button>
                </div>
            </form>
        </section >
    );
}
