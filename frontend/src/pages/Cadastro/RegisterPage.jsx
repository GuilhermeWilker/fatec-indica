import './register.css'
import { Link } from 'react-router-dom'

export default function RegisterPage() {
    return (
        <main className='registerPage'>
            <div className="card-modal">
                <div className="card-modal__body">

                    <h5 className="card-modal__body-title">
                        Bem-vindo
                        Identifique-se
                    </h5>

                    <div className="card-modal__btn-container">
                        <Link to="/cadastro/admin" className="btn__card">Administrador</Link>
                        <Link to="/cadastro/aluno" className="btn__card"> Aluno</Link>
                    </div>
                </div>
            </div>
        </main>

    )
}