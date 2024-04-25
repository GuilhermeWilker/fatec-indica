import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import HomePage from './pages/HomePage.jsx'


import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/header/header.jsx'
import RegisterPage from './pages/Cadastro/RegisterPage.jsx';
import AdminRegisterPage from './pages/Cadastro/AdminRegisterPage.jsx';
import AlunoRegisterPage from './pages/Cadastro/AlunoRegisterPage.jsx';
import LoginPage from './pages/Login/LoginPage.jsx';
import AdminLoginPage from './pages/Login/AdminLoginPage.jsx';
import AlunoLoginPage from './pages/Login/AlunoLoginPage.jsx';
import FavoritosPage from './pages/Vagas/FavoritosPage.jsx'

import VagasAdminPage from './pages/Vagas/Admin/VagasAdminPage.jsx'

import { AuthProvider } from './context/AuthProvider.jsx';
import ProtectedAdminRoutes from './context/ProtectedAdminRoutes.jsx';
import AdicionarVagasPage from './pages/Vagas/Admin/AdicionarVagasPages.jsx';
import VagasPage from './pages/Vagas/VagasPage.jsx';
import ProtectedAlunoRoutes from './context/ProtectedAlunoRoutes.jsx';
import Footer from './components/Footer.jsx';
import PoliticaPrivacidadePage from './pages/PoliticaPrivacidade/PoliticaPrivacidadePage.jsx';
import EditarVagasPages from './pages/Vagas/Admin/EditarVagasPage.jsx';

// eslint-disable-next-line
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Header />
        <div className='body'>
          <Routes>
            <Route path="/" element={<HomePage />} />

            <Route path="/cadastro" element={<RegisterPage />} />
            <Route path="/cadastro/admin" element={<AdminRegisterPage />} />
            <Route path="/cadastro/aluno" element={<AlunoRegisterPage />} />

            <Route path="/login" element={<LoginPage />} />
            <Route path="/login/admin" element={<AdminLoginPage />} />
            <Route path="/login/aluno" element={<AlunoLoginPage />} />

            <Route path="/politica-acesso" element={<PoliticaPrivacidadePage />} />

            {/* Rotas de Admin */}
            <Route element={<ProtectedAdminRoutes />}>
              <Route path='/admin' element={<VagasAdminPage />}></Route>
              <Route path='/vagas/adicionar' element={<AdicionarVagasPage />}></Route>
              <Route path='/editar/vaga/:id' element={<EditarVagasPages />}></Route>
            </Route>

            {/* Rotas de Aluno */}
            <Route element={<ProtectedAlunoRoutes />}>
              <Route path='/vagas' element={<VagasPage />} />
              <Route path='/favoritos' element={<FavoritosPage />} />
            </Route>
          </Routes>
        </div>


        <Footer />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>,
)
