import { Link } from "react-router-dom"

export default function LoginPage() {
    return (<>
        <main className='registerPage'>
            <div className="card-modal">
                <div className="card-modal__body">

                    <h5 className="card-modal__body-title">
                        Bem-vindo
                        Identifique-se
                    </h5>

                    <div className="card-modal__btn-container">
                        <Link to="/login/admin" className="btn__card">Administrador</Link>
                        <Link to="/login/aluno" className="btn__card"> Aluno</Link>
                    </div>
                </div>
            </div>
        </main>

    </>)
}