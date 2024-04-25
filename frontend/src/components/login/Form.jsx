import './form.css'
import { Link } from 'react-router-dom'
import { useState } from 'react'

export default function Form({ target }) {
    const [err, setErr] = useState('')
    const [visibility, setVisibility] = useState(false)

    const [formData, setFormData] = useState({
        email: '',
        senha: ''
    });

    const handlePasswordVisibility = () => {
        visibility == false
            ? setVisibility(true)
            : setVisibility(false)
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, senha } = formData;

        try {
            const response = await fetch(`http://localhost:4000/login/${target}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    [target === 'admin' ? 'email_admin' : 'email_aluno']: email,
                    [target === 'admin' ? 'senha_admin' : 'senha_aluno']: senha
                })
            });

            const data = await response.json();

            if (data.status == 403) {
                setErr('Credenciais inválidas (e-mail ou senha)')
            }

            if (data.status == 404) {
                window.location.href = `/cadastro/${target}`
            }

            if (data.status == 200) {
                localStorage.setItem('user', JSON.stringify(data.user))
                window.location.href = '/'
            }
        } catch (error) {
            console.error('Erro ao fazer requisição:', error);
        }
    }

    return (
        <form className="form" onSubmit={handleSubmit}>

            <div className="form__div">
                <img src="/images/avatar.png" className='form__avatar' alt="ícone de avatar" />
                <Link to={`/cadastro/${target}`} className='form__link-register'>
                    Não possui conta? cadastre-se aqui!
                </Link>
            </div>

            <div className="form__div">
                <label htmlFor="email">E-mail:*</label>
                <input
                    type="email"
                    name="email"
                    placeholder="email@fatec.sp.gov.br"
                    value={formData.email}
                    onChange={handleChange}
                    required />
            </div>

            <div className="form__div">
                <label htmlFor="senha">Senha:*</label>
                <div className='form__div-pass'>
                    <input
                        type={visibility ? 'text' : 'password'}
                        name="senha"
                        placeholder="**********"
                        value={formData.senha}
                        onChange={handleChange}
                        required />


                    <img
                        onClick={handlePasswordVisibility}
                        className='form__icon-visibility'
                        src={visibility ? '/images/visivel.png' : '/images/olho.png'}
                        alt="" />
                </div>

            </div>

            <p className='form_err-msg'>{err}</p>

            <Link to='/' className='form__esqueci-senha'>
                Esqueci minha senha
            </Link>

            <button type="submit">Login</button>
        </form>
    );
}


