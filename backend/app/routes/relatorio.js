import express from 'express';
import db from '../database/db.js';
import ExcelJS from 'exceljs';

const router = express.Router();

router.get("/relatorio", (req, res) => {
    const workbook = new ExcelJS.Workbook();
    const timestamp = Date.now();
    const filename = `relatorio_${timestamp}.xlsx`;

    const sheet1 = workbook.addWorksheet("Relatório de Vagas");
    const sheet2 = workbook.addWorksheet("Vagas em Alta");
    const sheet3 = workbook.addWorksheet("Dados dos Alunos");
    const sheet4 = workbook.addWorksheet("Vagas por Local");
    const sheet5 = workbook.addWorksheet("Alunos por Curso & Empregados");

    sheet1.columns = [
        { header: 'Código Vaga', key: 'cod_vaga' },
        { header: 'Cargo', key: 'cargo_vaga' },
        { header: 'Nível do Cargo', key: 'nivelcargo_vaga' },
        { header: 'Data de Cadastro', key: 'data_cadastro_vaga' }
    ];

    sheet2.columns = [
        { header: 'Código Vaga', key: 'cod_vaga' },
        { header: 'Cargo', key: 'cargo_vaga' },
        { header: 'Nível do Cargo', key: 'nivelcargo_vaga' },
        { header: 'Data de Cadastro', key: 'data_cadastro_vaga' },
        { header: 'Qtd Vagas Favoritada', key: 'qtd_favoritada' },
        { header: 'Qtd de Visitas', key: 'qtd_visitas' }
    ];

    sheet3.columns = [
        { header: 'Email Aluno', key: 'email_aluno' },
        { header: 'Curso do Aluno', key: 'curso_aluno' },
        { header: 'Situação de Trabalho', key: 'situtrabalho_aluno' },
        { header: 'Área de Atuação', key: 'atuacao_aluno' },
        { header: 'Idade', key: 'idade_aluno' }
    ];

    sheet4.columns = [
        { header: 'Código Vaga', key: 'cod_vaga' },
        { header: 'Estado Vaga', key: 'estado_vaga' },
        { header: 'Cidade Vaga', key: 'cidade_vaga' },
        { header: 'Qtd de Visitas', key: 'qtd_visitas' },
        { header: 'Cargo', key: 'cargo_vaga' },
        { header: 'Nível do Cargo', key: 'nivelcargo_vaga' }
    ];

    sheet5.columns = [
        { header: 'Qtd Alunos no Curso de Gestão da Tecnologia da Informação', key: 'total_GTI' },
        { header: 'Qtd Alunos no Curso de Gestão de Energia e Eficiência Energética', key: 'total_GEE' },
        { header: 'Qtd Alunos Empregados', key: 'total_alunos_empregados' }
    ];

    // Consulta para o Relatório de Vagas
    const queryVagas = "SELECT * FROM fatecindica.tb_adicionar_vagas";
    db.query(queryVagas, (err, result) => {
        if (err) {
            console.error("Erro ao buscar vagas:", err);
            res.status(500).json({ error: "Erro interno do servidor" });
            return;
        }

        result.forEach(vaga => {
            sheet1.addRow({
                cod_vaga: vaga.cod_vaga,
                cargo_vaga: vaga.cargo_vaga,
                nivelcargo_vaga: vaga.nivelcargo_vaga,
                data_cadastro_vaga: vaga.data_cadastro_vaga,
            });
        });

        // Consulta para o Relatório de Vagas em Alta
        const queryVagasAlta = `
        SELECT 
            v.cod_vaga,
            v.cargo_vaga,
            v.nivelcargo_vaga,
            v.data_cadastro_vaga,
            COUNT(f.cod_vaga) AS qtd_favoritada,
            v.qnt_visitas
        FROM 
            fatecindica.tb_adicionar_vagas v
        LEFT JOIN 
            fatecindica.tb_favoritos f ON v.cod_vaga = f.cod_vaga
        GROUP BY 
            v.cod_vaga
        ORDER BY 
            qtd_favoritada DESC, 
            v.qnt_visitas DESC
        `;

        db.query(queryVagasAlta, (err, result) => {
            if (err) {
                console.error("Erro ao buscar vagas em alta:", err);
                res.status(500).json({ error: "Erro interno do servidor" });
                return;
            }

            result.forEach(vaga => {
                sheet2.addRow({
                    cod_vaga: vaga.cod_vaga,
                    cargo_vaga: vaga.cargo_vaga,
                    nivelcargo_vaga: vaga.nivelcargo_vaga,
                    data_cadastro_vaga: vaga.data_cadastro_vaga,
                    qtd_favoritada: vaga.qtd_favoritada,
                    qtd_visitas: vaga.qnt_visitas
                });
            });

            // Consulta para os Dados dos Alunos
            const queryDadosAlunos = `
            SELECT 
                email_aluno,
                situtrabalho_aluno,
                atuacao_aluno,
                curso_aluno,
                idade_aluno
            FROM 
                fatecindica.tb_cadastro_aluno
            `;

            db.query(queryDadosAlunos, (err, result) => {
                if (err) {
                    console.error("Erro ao buscar dados dos alunos:", err);
                    res.status(500).json({ error: "Erro interno do servidor" });
                    return;
                }

                result.forEach(aluno => {
                    sheet3.addRow({
                        email_aluno: aluno.email_aluno,
                        situtrabalho_aluno: aluno.situtrabalho_aluno,
                        atuacao_aluno: aluno.atuacao_aluno,
                        curso_aluno: aluno.curso_aluno,
                        idade_aluno: aluno.idade_aluno
                    });
                });

                // Consulta para as Informações das Vagas
                const queryInformacoesVagas = `
                SELECT 
                    cod_vaga,
                    qnt_visitas,
                    cidade_vaga,
                    estado_vaga,
                    cargo_vaga,
                    nivelcargo_vaga
                FROM 
                    fatecindica.tb_adicionar_vagas
                `;

                db.query(queryInformacoesVagas, (err, result) => {
                    if (err) {
                        console.error("Erro ao buscar informações das vagas:", err);
                        res.status(500).json({ error: "Erro interno do servidor" });
                        return;
                    }

                    result.forEach(vaga => {
                        sheet4.addRow({
                            cod_vaga: vaga.cod_vaga,
                            qtd_visitas: vaga.qnt_visitas,
                            cidade_vaga: vaga.cidade_vaga,
                            estado_vaga: vaga.estado_vaga,
                            cargo_vaga: vaga.cargo_vaga,
                            nivelcargo_vaga: vaga.nivelcargo_vaga
                        });
                    });

                    // Consulta para os Alunos por Curso & Empregados
                    const queryAlunosPorCursoEmpregados = `
                    SELECT 
                        (SELECT COUNT(*) 
                         FROM fatecindica.tb_cadastro_aluno 
                         WHERE situtrabalho_aluno = 'Sim' OR situtrabalho_aluno = 'sim' OR situtrabalho_aluno = 'SIM') AS total_alunos_empregados,
                        
                        (SELECT SUM(CASE WHEN curso_aluno = 'Gestão da Tecnologia da Informação' THEN 1 ELSE 0 END) 
                         FROM fatecindica.tb_cadastro_aluno) AS total_GTI,
                        
                        (SELECT SUM(CASE WHEN curso_aluno = 'Gestão de Energia e Eficiência Energética' THEN 1 ELSE 0 END) 
                         FROM fatecindica.tb_cadastro_aluno) AS total_GEE;
                    `;

                    db.query(queryAlunosPorCursoEmpregados, (err, result) => {
                        if (err) {
                            console.error("Erro ao buscar alunos por curso e empregados:", err);
                            res.status(500).json({ error: "Erro interno do servidor" });
                            return;
                        }

                        const { total_alunos_empregados, total_GTI, total_GEE } = result[0];

                        sheet5.addRow({
                            total_alunos_empregados: total_alunos_empregados,
                            total_GTI: total_GTI,
                            total_GEE: total_GEE
                        });

                        // Salva o arquivo Excel após todas as consultas estarem completas
                        workbook.xlsx.writeFile(filename)
                            .then(() => {
                                res.download(import.meta.dirname + `../../../backend/${filename}`)
                            })
                            .catch(err => {
                                console.error("Erro ao salvar arquivo Excel:", err);
                                res.status(500).json({ error: "Erro interno do servidor ao salvar arquivo Excel" });
                            });
                    });
                });
            });
        });
    });
});

export default router;
