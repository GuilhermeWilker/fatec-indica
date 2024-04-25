import Form from '../../components/cadastro/Aluno/Form'
import './register.css'

export default function AdminRegisterPage() {
    return (
        <main className="registerPage">
            <div>
                <h2>Formulário de Cadastro</h2>
                <Form />
            </div>
        </main>
    )
}