import '../../App.css'
import './header.css'
import { useState, useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";

export default function Header() {
    const [user, setUser] = useState(null);
    const location = useLocation();
    const [favoritesLength, setFavoritesLength] = useState(0);

    const logout = () => {
        localStorage.removeItem('user')
        window.location.reload()
    }

    const favoritesCount = async () => {
        if (user && user.user && user.user.email_aluno) {
            const res = await fetch(`http://localhost:4000/favoritos/${user.user.email_aluno}`);

            if (!res.ok) {
                throw new Error('Erro ao buscar Vagas');
            }

            const data = await res.json();
            setFavoritesLength(data.length)
        }
    }

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem("user"));
        setUser(userData);
    }, []);

    useEffect(() => {
        if (user) {
            favoritesCount();
        }
    }, [user]);

    const renderLinks = () => {
        if (location.pathname === '/' && !user) {
            return (
                <>
                    <Link to='/cadastro' className='nav__link-btn'>Cadastrar</Link>
                    <Link to='/login' className='nav__link-btn'>Login</Link>
                </>
            );
        }

        if (user && user.role === 'admin') {
            return (
                <header>
                    <nav className='header__nav'>
                        <Link to='/vagas/adicionar' className='nav__link-btn'>Adicionar vagas</Link>
                        <Link to='/admin' className='nav__link-btn'>Ver Vagas</Link>
                        <Link as='button' onClick={logout} className='nav__link-btn'>Logout</Link>
                    </nav>
                </header>
            );
        }

        if (user && user.role === 'aluno') {
            return (
                <header>
                    <nav className='header__nav'>
                        <Link to='/vagas' className='nav__link-btn'>Ver Vagas</Link>
                        <Link to='/favoritos' className='nav__link-btn'>
                            Meus favoritos
                            <span className='tooltip'>{favoritesLength}</span>
                        </Link>
                        <Link as='button' onClick={logout} className='nav__link-btn'>Logout</Link>
                    </nav>
                </header>
            );
        }

        return (
            <>
                <Link to='/' className='nav__link-btn'>Voltar a Home</Link>
            </>
        );
    }



    return (
        <header className="header">
            <a href="/" className="header__logo">
                Fatec Indica
            </a>

            <nav className="header__nav">
                {renderLinks()}
            </nav>
        </header>
    );
}
