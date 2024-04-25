import express from 'express'
import session from 'express-session'
import db from '../database/db.js'
const router = express.Router()

router.use(session({
    secret: 'fafadebelem',
    resave: false,
    saveUninitialized: true
}));

router.post('/cadastro/admin', (req, res) => {
    const {
        nomecompleto_admin,
        cidade_admin,
        estado_admin,
        email_admin,
        senha_admin,
        senhaconf_admin,
        vinculofatec_admin,
        cod_autorizacao
    } = req.body

    const sql = `
        INSERT INTO fatecindica.tb_cadastro_admin (
            nomecompleto_admin,
            cidade_admin,
            estado_admin,
            email_admin,
            senha_admin,
            senhaconf_admin,
            vinculofatec_admin
        ) VALUES (?, ?, ?, ?, ?, ?, ?)
    `

    const values = [
        nomecompleto_admin,
        cidade_admin,
        estado_admin,
        email_admin,
        senha_admin,
        senhaconf_admin,
        vinculofatec_admin
    ]

    db.query(sql, values, (err, results) => {

        if (err) {
            return res.status(500).json({ error: 'Erro ao Cadastrar' })
        }

        res.status(200).json({ success: true })
    })
})

router.post("/cadastro/aluno", (req, res) => {
    const {
        nomecompleto_aluno,
        datanasc_aluno,
        idade_aluno,
        numero_celular_aluno,
        cidade_aluno,
        estado_aluno,
        curso_aluno,
        semestre_aluno,
        situtrabalho_aluno,
        email_aluno,
        senha_aluno,
        senhaconf_aluno,
        receber_vaga
    } = req.body

    const sql = `
        INSERT INTO fatecindica.tb_cadastro_aluno (
            nomecompleto_aluno,
            datanasc_aluno,
            idade_aluno,
            numero_celular_aluno,
            cidade_aluno,
            estado_aluno,
            curso_aluno,
            semestre_aluno,
            situtrabalho_aluno,
            email_aluno,
            senha_aluno,
            senhaconf_aluno,
            receber_vaga
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `

    const values = [
        nomecompleto_aluno,
        datanasc_aluno,
        idade_aluno,
        numero_celular_aluno,
        cidade_aluno,
        estado_aluno,
        curso_aluno,
        semestre_aluno,
        situtrabalho_aluno,
        email_aluno,
        senha_aluno,
        senhaconf_aluno,
        receber_vaga
    ]

    db.query(sql, values, (err, results) => {

        if (err) {
            return res.status(500).json({ error: 'Erro ao Cadastrar Aluno' })
        }

        res.status(200).json({ success: true })
    })
})

router.post("/login/admin", (req, res) => {
    const { email_admin, senha_admin } = req.body;

    const sql = `
        SELECT * FROM fatecindica.tb_cadastro_admin
        WHERE email_admin='${email_admin}'
    `;

    db.query(sql, (err, results) => {
        if (err) {
            console.error("Erro ao executar a consulta SQL:", err);
            res.status(500).json({
                error: 'Erro interno do servidor',
                status: 500
            });
            return;
        }

        if (results.length === 0) {
            res.status(404).json({ error: 'Usuário não encontrado!', status: 404 });
            return;
        }

        const user = results[0];
        if (user.senha_admin !== senha_admin) {
            res.status(403).json({ error: 'Credenciais inválidas (e-mail ou senha)', status: 403 });
            return;
        }

        req.session.user = { user, role: 'admin' }

        res.status(200).json({ success: true, status: 200, user: req.session.user });
    });
});

router.post("/login/aluno", (req, res) => {
    const { email_aluno, senha_aluno } = req.body

    const sql = `
        SELECT * FROM fatecindica.tb_cadastro_aluno
        WHERE email_aluno='${email_aluno}'
    `;

    db.query(sql, (err, results) => {
        if (err) {
            console.error("Erro ao executar a consulta SQL:", err);
            res.status(500).json({
                error: 'Erro interno do servidor',
                status: 500
            });
            return;
        }

        if (results.length === 0) {
            res.status(404).json({ error: 'Usuário não encontrado!', status: 404 });
            return;
        }

        const user = results[0];
        if (user.senha_aluno !== senha_aluno) {
            res.status(403).json({ error: 'Credenciais inválidas (e-mail ou senha)', status: 403 });
            return;
        }

        req.session.user = { user, role: 'aluno' }

        res.status(200).json({ success: true, status: 200, user: req.session.user });
    });
})


export default router