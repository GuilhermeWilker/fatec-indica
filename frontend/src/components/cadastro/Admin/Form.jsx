import { useState } from 'react';

import '../form.css';

export default function Form() {
    const [step, setStep] = useState(0);
    const [formData, setFormData] = useState({
        nomecompleto_admin: '',
        vinculofatec_admin: '',
        email_admin: '',
        cidade_admin: '',
        estado_admin: '',
        senha_admin: '',
        senhaconf_admin: ''
    });
    const [emailError, setEmailError] = useState(false);
    const [passwordRequirements, setPasswordRequirements] = useState({
        minLength: false,
        containsLowercase: false,
        containsUppercase: false,
        containsSpecialCharacter: false,
        containsNumber: false
    });

    const StepDisplay = () => {
        if (step === 0) {
            return (
                <>
                    <div className="form__div">
                        <label htmlFor="nomecompleto_admin">Nome completo:*</label>
                        <input
                            type="text"
                            name="nomecompleto_admin"
                            value={formData.nomecompleto_admin}
                            onChange={handleChange}
                            placeholder="Nome completo"
                            required />
                    </div>

                    <div className="form__div">
                        <label htmlFor="vinculofatec_admin">Qual seu vínculo com a Fatec?*</label>
                        <select
                            name="vinculofatec_admin"
                            value={formData.vinculofatec_admin}
                            onChange={handleChange}
                            required >
                            <option value="">Selecione...</option>
                            <option value="professor">Professor</option>
                            <option value="administrativo">Administrativo</option>
                            <option value="diretor">Diretor</option>
                            <option value="outro">Outro</option>
                        </select>
                    </div>

                    <div className="form__div">
                        <label htmlFor="email_admin">E-mail:*</label>
                        <input
                            type="email"
                            name="email_admin"
                            value={formData.email_admin}
                            onChange={handleChange}
                            placeholder="email@fatec.sp.gov.br"
                            required />
                        {emailError && <p style={{ color: 'red', fontSize: '14px' }}>O email deve terminar com &apos;@fatec.sp.gov.br&apos;</p>}
                    </div>
                </>
            );
        } else if (step === 1) {
            return (
                <>
                    <div className="form__div">
                        <label htmlFor="cidade_admin">Cidade:*</label>
                        <input
                            type="text"
                            name="cidade_admin"
                            value={formData.cidade_admin}
                            onChange={handleChange}
                            placeholder="Franco da Rocha"
                            required />
                    </div>

                    <div className="form__div">
                        <label htmlFor="estado_admin">Estado:*</label>
                        <input
                            type="text"
                            name="estado_admin"
                            value={formData.estado_admin}
                            onChange={handleChange}
                            placeholder="São Paulo"
                            required />
                    </div>

                    <div className="form__div">
                        <label htmlFor="cod_autorizacao">Código de Autorização:*</label>
                        <input
                            type="text"
                            name="cod_autorizacao"
                            placeholder="******"
                        />
                    </div>
                </>
            );
        } else {
            return (
                <>
                    <div className="form__div">
                        <label htmlFor="senha_admin">Senha:*</label>
                        <input
                            type="password"
                            name="senha_admin"
                            value={formData.senha_admin}
                            onChange={handlePasswordChange}
                            placeholder="******"
                            required />
                    </div>

                    <div className="form__div">
                        <label htmlFor="senhaconf_admin">Confirmar senha:*</label>
                        <input
                            type="password"
                            name="senhaconf_admin"
                            value={formData.senhaconf_admin}
                            onChange={handleChange}
                            placeholder="******"
                            required />
                    </div>

                    <div className="form__requirements">
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
                    </div>
                </>
            );
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "email_admin") {
            if (value.endsWith("@fatec.sp.gov.br")) {
                setEmailError(false);
            } else {
                setEmailError(true);
            }
        }
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

    const isLastStep = step === 2;
    const isPasswordValid = Object.values(passwordRequirements).every(req => req);
    const isPasswordMatch = formData.senha_admin === formData.senhaconf_admin;

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isPasswordValid) {
            alert('Por favor, siga as instruções para criar uma senha válida.');
            return;
        }

        if (!isPasswordMatch) {
            alert('As senhas não correspondem. Por favor, verifique.');
            return;
        }

        try {
            const res = await fetch('http://localhost:4000/cadastro/admin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            console.log(data);

            // Resetar os estados após o envio do formulário
            setFormData({
                nomecompleto_admin: '',
                vinculofatec_admin: '',
                email_admin: '',
                cidade_admin: '',
                estado_admin: '',
                senha_admin: '',
                senhaconf_admin: ''
            });

            window.location.href = '/'
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <form className="form" onSubmit={handleSubmit}>
            {StepDisplay()}

            <div className="form__btns-container">
                <button
                    disabled={step === 0}
                    onClick={() => setStep(currStep => currStep - 1)}
                >
                    Voltar
                </button>

                <button
                    type={isLastStep ? 'submit' : 'button'}
                    onClick={() => {
                        if (!isLastStep) {
                            setStep(currStep => currStep + 1);
                        }
                    }}
                    disabled={step === 2 && (!isPasswordValid || !isPasswordMatch)}
                >
                    {isLastStep ? 'Cadastrar' : 'Próximo'}
                </button>
            </div>
        </form>
    );
}
