import express from 'express'
import db from '../database/db.js'
const router = express.Router()
import { enviar_vagas_alunos } from '../services/mailer.js'

router.get("/vagas", (req, res) => {
    db.query(
        "SELECT * FROM fatecindica.tb_adicionar_vagas",
        (err, results) => {
            if (err) throw err
            res.json(results)
        })
});

router.post('/vaga', (req, res) => {
    const {
        empresa_vaga,
        cargo_vaga,
        salario_vaga,
        estado_vaga,
        cidade_vaga,
        link_vaga,
        nivelcargo_vaga,
        data_cadastro_vaga,
        data_encerramento_vaga
    } = req.body

    const sql = `
        INSERT INTO fatecindica.tb_adicionar_vagas(
            empresa_vaga,
            cargo_vaga,
            salario_vaga,
            estado_vaga,
            cidade_vaga,
            link_vaga,
            nivelcargo_vaga,
            data_cadastro_vaga,
            data_encerramento_vaga
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `

    const values = [
        empresa_vaga,
        cargo_vaga,
        salario_vaga,
        estado_vaga,
        cidade_vaga,
        link_vaga,
        nivelcargo_vaga,
        data_cadastro_vaga,
        data_encerramento_vaga
    ]

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Erro ao cadastrar vaga:', err);
            return res.status(500).send('Erro ao cadastrar vaga');
        }

        console.log('Vaga Cadastrada com Sucesso!')

        const q = `SELECT email_aluno FROM tb_cadastro_aluno WHERE receber_vaga = true;`
        db.query(q, (err, destinatario) => {
            if (err) {
                console.error('Erro ao buscar destinatários:', err);
                return res.status(500).send('Erro ao buscar destinatários');
            }

            const emailsDestinatario = destinatario.map((row) => row.email_aluno)

            // [ Preparando os dados a serem enviados ]
            emailsDestinatario.forEach((emailDestinatario) => {
                const vagaDetails = {
                    cargo: cargo_vaga,
                    empresa: empresa_vaga,
                    salario: salario_vaga,
                    local: `${cidade_vaga}, ${estado_vaga}`,
                    nivelcargo: nivelcargo_vaga,
                    link: link_vaga,
                };

                // [ Enviando notificações por e-mail para os alunos ]
                enviar_vagas_alunos(emailDestinatario, vagaDetails);
            })

            res.status(200).send('Vaga cadastrada com sucesso e e-mails enviados');
        })
    })
})

router.post('/vaga/visitada', (req, res) => {
    const { cod_vaga } = req.body; // Supondo que você tenha o código da vaga que está sendo visitada

    const sqlCheck = 'SELECT qnt_visitas FROM fatecindica.tb_adicionar_vagas WHERE cod_vaga = ?';
    const sqlUpdate = 'UPDATE fatecindica.tb_adicionar_vagas SET qnt_visitas = IFNULL(qnt_visitas, 0) + 1 WHERE cod_vaga = ?';

    db.query(sqlCheck, [cod_vaga], (err, rows) => {
        if (err) {
            console.error("Erro ao verificar visitas:", err);
            return res.status(500).send("Erro ao verificar visitas");
        }

        if (rows.length === 0) {
            return res.status(404).send("Vaga não encontrada");
        }

        db.query(sqlUpdate, [cod_vaga], (err, result) => {
            if (err) {
                console.error("Erro ao atualizar visitas:", err);
                return res.status(500).send("Erro ao atualizar visitas");
            }

            console.log("Visitas atualizadas com sucesso!");
            res.status(200).send("Visitas atualizadas com sucesso");
        });
    });
});

router.get("/vaga/:id", (req, res) => {
    const vagaId = req.params.id;

    const sql = `
        SELECT * FROM fatecindica.tb_adicionar_vagas
        WHERE cod_vaga = ?
    `;

    db.query(sql, [vagaId], (err, results) => {
        if (err) {
            console.error("Erro ao buscar dados da vaga:", err);
            return res.status(500).send("Erro ao buscar dados da vaga");
        }

        if (results.length === 0) {
            return res.status(404).send("Vaga não encontrada");
        }

        res.json(results[0]);
    });
});

// Rota para atualizar os dados de uma vaga
router.put("/vaga/:id", (req, res) => {
    const vagaId = req.params.id;
    const {
        empresa_vaga,
        cargo_vaga,
        salario_vaga,
        estado_vaga,
        cidade_vaga,
        link_vaga,
        nivelcargo_vaga,
        data_cadastro_vaga,
        data_encerramento_vaga
    } = req.body;

    const sql = `
        UPDATE fatecindica.tb_adicionar_vagas
        SET
            empresa_vaga = ?,
            cargo_vaga = ?,
            salario_vaga = ?,
            estado_vaga = ?,
            cidade_vaga = ?,
            link_vaga = ?,
            nivelcargo_vaga = ?,
            data_cadastro_vaga = ?,
            data_encerramento_vaga = ?
        WHERE cod_vaga = ?
    `;

    const values = [
        empresa_vaga,
        cargo_vaga,
        salario_vaga,
        estado_vaga,
        cidade_vaga,
        link_vaga,
        nivelcargo_vaga,
        data_cadastro_vaga,
        data_encerramento_vaga,
        vagaId
    ];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("Erro ao atualizar a vaga:", err);
            return res.status(500).send("Erro ao atualizar a vaga");
        }

        console.log('Vaga atualizada com sucesso!', result);
        res.status(200).send("Vaga atualizada com sucesso");
    });
});

router.delete('/vaga/:id', (req, res) => {
    const vagaId = req.params.id

    const sql = `
    DELETE FROM fatecindica.tb_adicionar_vagas
        WHERE tb_adicionar_vagas.cod_vaga = ${vagaId}
    `

    db.query(sql, (err, results) => {
        if (err) throw err

        console.log('Vaga Excluída com Sucesso.')
        res.json({
            success: true
        })
    })
})


export default router