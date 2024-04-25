import express from 'express'
import db from '../database/db.js'
const router = express.Router()

router.get('/favoritos/:email_aluno', (req, res) => {
    const email_aluno = req.params.email_aluno

    const sql = `
        SELECT * FROM fatecindica.tb_adicionar_vagas
        JOIN fatecindica.tb_favoritos
        ON fatecindica.tb_adicionar_vagas.cod_vaga = fatecindica.tb_favoritos.cod_vaga
        WHERE email_aluno = ?;
    `

    db.query(sql, email_aluno, (err, results) => {
        if (err) {
            return res.status(500).json({
                error: 'Erro ao obter favoritos'
            })
        }

        const favoritos = results.map(result => result);
        res.status(200).json(favoritos);
    })
})

router.post('/favoritos', (req, res) => {
    const { cod_vaga, email_aluno } = req.body;

    const sql = `
        INSERT INTO fatecindica.tb_favoritos 
        (cod_vaga, email_aluno) 
        VALUES (?, ?);
    `;

    const values = [cod_vaga, email_aluno];

    db.query(sql, values, (err, result) => {
        if (err) {
            return res.status(500).json({
                error: 'Erro ao adicionar favorito'
            });
        }

        const favoritoId = result.insertId;

        const favorito = {
            id_favorito: favoritoId,
            cod_vaga,
            email_aluno
        };

        res.status(200).json({
            success: true,
            favorito
        });
    });
});

router.delete('/favoritos/:id_favorito', (req, res) => {
    const id_favorito = req.params.id_favorito

    const sql = `
        delete from fatecindica.tb_favoritos
        where id_favorito = ?
    `

    db.query(sql, id_favorito, (err, results) => {
        if (err) {
            res.status(500).json({
                error: 'Erro ao remover favorito!'
            })
        }

        res.status(200).json({
            success: true
        })
    })
})

export default router