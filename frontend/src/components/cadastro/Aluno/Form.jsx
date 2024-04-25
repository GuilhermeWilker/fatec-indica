import '../form.css'
import { useState } from 'react'

export default function Form() {
    const [step, setStep] = useState(0)
    const [formData, setFormData] = useState({
        nomecompleto_aluno: '',
        datanasc_aluno: '',
        idade_aluno: '',
        numero_celular_aluno: '',
        cidade_aluno: '',
        estado_aluno: '',
        curso_aluno: '',
        semestre_aluno: '',
        situtrabalho_aluno: '',
        email_aluno: '',
        senha_aluno: '',
        senhaconf_aluno: '',
        receber_vaga: ''
    })

    console.log(formData)

    const [passwordRequirements, setPasswordRequirements] = useState({
        minLength: false,
        containsLowercase: false,
        containsUppercase: false,
        containsSpecialCharacter: false,
        containsNumber: false
    })

    const [emailError, setEmailError] = useState(false);

    const StepDisplay = () => {
        if (step === 0) {
            return (
                <>
                    <div className="form__div">
                        <label htmlFor="name">Nome completo:*</label>
                        <input
                            type="text"
                            name="nomecompleto_aluno"
                            placeholder="Nome completo"
                            value={formData.nomecompleto_aluno}
                            onChange={handleChange}
                            required />
                    </div>
                    <div className="form__div">
                        <label htmlFor="cel">Celular:*</label>
                        <input
                            type="text"
                            name="numero_celular_aluno"
                            placeholder="(11)91234-5687"
                            value={formData.numero_celular_aluno}
                            onChange={handleChange}
                            required />
                    </div>
                    <div className="form__div">
                        <label htmlFor="email">E-mail:*</label>
                        <input
                            type="email"
                            name="email_aluno"
                            placeholder="email@fatec.sp.gov.br"
                            value={formData.email_aluno}
                            onChange={handleChange}
                            onBlur={handleEmailBlur}
                            required />
                        {emailError && <p style={{ color: 'red', fontSize: '14px' }}>
                            O email deve terminar com &apos;@fatec.sp.gov.br&apos;
                        </p>}
                    </div>
                </>
            )
        } else if (step === 1) {
            return (
                <>
                    <div className="form__div">
                        <label htmlFor="cidade">Cidade:*</label>
                        <input
                            type="text"
                            name="cidade_aluno"
                            placeholder="Franco da Rocha"
                            value={formData.cidade_aluno}
                            onChange={handleChange}
                            required />
                    </div>
                    <div className="form__div">
                        <label htmlFor="estado">Estado:*</label>
                        <input
                            type="text"
                            name="estado_aluno"
                            placeholder="São Paulo"
                            value={formData.estado_aluno}
                            onChange={handleChange}
                            required />
                    </div>
                    <div className="form__div">
                        <label htmlFor="dataNasc">Data de Nascimento:*</label>
                        <input
                            type="date"
                            name="datanasc_aluno"
                            value={formData.datanasc_aluno}
                            onChange={handleChange}
                            required />
                    </div>
                    <div className="form__div">
                        <label htmlFor="idade_aluno">Selecione sua idade:*</label>
                        <select
                            name="idade_aluno"
                            value={formData.idade_aluno}
                            onChange={handleChange}
                            required>
                            <option value="">Selecione uma opção</option>
                            <option value="18 a 28">Entre 18 a 28</option>
                            <option value="29 a 39">Entre 29 a 39</option>
                            <option value="40 a 49">Entre 40 a 49</option>
                            <option value="50 ou mais">Entre 50 ou mais</option>
                        </select>
                    </div>
                </>
            )
        } else if (step === 2) {
            return (
                <>
                    <div className="form__div">
                        <label htmlFor="cidade">Curso:*</label>
                        <select name="curso_aluno" value={formData.curso_aluno} onChange={handleChange} required>
                            <option value="">Selecione uma opção</option>
                            <option value="Desenvolvimento de Software Multiplataforma">
                                Desenvolvimento de Software Multiplataforma
                            </option>
                            <option value="Gestão da Tecnologia da Informação">
                                Gestão da Tecnologia da Informação
                            </option>
                            <option value="Gestão de Energia e Eficiência Energética">
                                Gestão de Energia e Eficiência Energética
                            </option>
                        </select>
                    </div>
                    <div className="form__div">
                        <label htmlFor="estado">Semestre:*</label>
                        <select name="semestre_aluno" value={formData.semestre_aluno} onChange={handleChange} required>
                            <option value="">Selecione uma opção</option>
                            <option value="1°">1º Semestre</option>
                            <option value="2°">2º Semestre</option>
                            <option value="3°">3º Semestre</option>
                            <option value="4°">4º Semestre</option>
                            <option value="5°">5º Semestre</option>
                            <option value="6°">6º Semestre</option>
                            <option value="7°">7º Semestre</option>
                            <option value="8°">8º Semestre</option>
                        </select>
                    </div>
                    <div className="form__div">
                        <label htmlFor="dataNasc">Trabalha atualmente?*</label>
                        <select name="situtrabalho_aluno" value={formData.situtrabalho_aluno} onChange={handleChange} required>
                            <option value="">Selecione uma opção</option>
                            <option value="Sim">Sim</option>
                            <option value="Não">Não</option>
                        </select>
                    </div>

                </>
            )
        } else {
            return (
                <>
                    <div className="form__div">
                        <label htmlFor="password">Senha:*</label>
                        <input
                            type="password"
                            name="senha_aluno"
                            placeholder="******"
                            value={formData.senha_aluno}
                            onChange={handlePasswordChange}
                            required />
                    </div>
                    <div className="form__div">
                        <label htmlFor="confirm_password">Confirmar senha:*</label>
                        <input
                            type="password"
                            name="senhaconf_aluno"
                            placeholder="******"
                            value={formData.senhaconf_aluno}
                            onChange={handleChange}
                            required />
                    </div>
                    <div className="form__div-erros">
                        <p style={{ color: passwordRequirements.minLength ? 'green' : 'red' }}>
                            Deve conter no mínimo 8 caracteres
                        </p>
                        <p style={{ color: passwordRequirements.containsLowercase ? 'green' : 'red' }}>
                            Deve conter no mínimo uma letra minúscula!
                        </p>
                        <p style={{ color: passwordRequirements.containsUppercase ? 'green' : 'red' }}>
                            Deve conter no mínimo uma letra maiúscula!
                        </p>
                        <p style={{ color: passwordRequirements.containsSpecialCharacter ? 'green' : 'red' }}>
                            Deve conter no mínimo um caractere especial (@, #, $, %,&amp;)!
                        </p>
                        <p style={{ color: passwordRequirements.containsNumber ? 'green' : 'red' }}>
                            Deve conter no mínimo um número!
                        </p>
                        <p style={{ color: isPasswordMatch ? 'green' : 'red' }}>
                            As senhas devem ser iguais!
                        </p>
                    </div>
                </>
            )
        }
    }

    const isLastStep = step === 3
    const isPasswordValid = Object.values(passwordRequirements).every(req => req)
    const isPasswordMatch = formData.senha_aluno === formData.senhaconf_aluno

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswordRequirements({
            ...passwordRequirements,
            minLength: value.length >= 8,
            containsLowercase: /[a-z]/.test(value),
            containsUppercase: /[A-Z]/.test(value),
            containsSpecialCharacter: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(value),
            containsNumber: /\d/.test(value)
        });
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleEmailBlur = (e) => {
        const { value } = e.target;
        if (!value.endsWith("@fatec.sp.gov.br")) {
            setEmailError(true);
        } else {
            setEmailError(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!isPasswordValid || !isPasswordMatch || emailError) {
            alert('Por favor, siga as instruções para criar uma senha válida, garantir que as senhas correspondam e fornecer um e-mail válido.')
            return
        }
        try {
            const res = await fetch('http://localhost:4000/cadastro/aluno', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            console.log(data);

            setFormData({
                nomecompleto_aluno: '',
                datanasc_aluno: '',
                idade_aluno: '',
                numero_celular_aluno: '',
                cidade_aluno: '',
                estado_aluno: '',
                curso_aluno: '',
                semestre_aluno: '',
                situtrabalho_aluno: '',
                email_aluno: '',
                senha_aluno: '',
                senhaconf_aluno: '',
                receber_vaga: ''
            });

            window.location.href = '/'
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <form className="form" onSubmit={handleSubmit}>
            {StepDisplay()}
            <div className='form__btns-container'>
                <button
                    disabled={step === 0}
                    onClick={() => setStep(currStep => currStep - 1)}>
                    Voltar
                </button>
                <button
                    type={isLastStep ? 'submit' : 'button'}
                    onClick={() => {
                        if (!isLastStep) {
                            setStep(currStep => currStep + 1)
                        }
                    }}>
                    {isLastStep ? 'Cadastrar' : 'Próximo'}
                </button>
            </div>
        </form>
    )
}
