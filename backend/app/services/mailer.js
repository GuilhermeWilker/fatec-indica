import nodemailer from 'nodemailer';

// Create the SMTP transporter directly
const transporter = nodemailer.createTransport({
  host: "smtp-mail.outlook.com",
  port: 587,
  auth: {
    user: "beatriz.souza52@fatec.sp.gov.br",
    pass: "Jaw2#@lc9",
  },
});

async function enviar_vagas_alunos(emailAluno, vagaDetails) {
  await transporter.sendMail({
    from: "Beatriz Gomes <beatriz.souza52@fatec.sp.gov.br>",
    to: emailAluno,
    subject: "Nova Vaga Disponível!",
    html: `   
        <h3>Uma nova vaga foi adicionada:</h3>
        <p>Cargo: ${vagaDetails.cargo}</p>
        <p>Empresa: ${vagaDetails.empresa}</p>
        <p>Salário: ${vagaDetails.salario}</p>
        <p>Local: ${vagaDetails.local}</p>
        <p>Nível de Cargo: ${vagaDetails.nivelcargo}</p>
        <p>Link da Vaga: <a href="${vagaDetails.link}" target="__blank">Clique aqui!</a></p>
  
        <small>
          Acesse <a href="http://localhost:3000/vagas" target="__blank">Fatec Indica</a> para mais vagas!!
        </small>
  
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <img src="../../public/src/images/fatec_logo.png" />
          <img src="../../public/src/images/cps_logo.png" />
          <img src="../../public/src/images/MicrosoftTeams-image (62).png" />
        </div>
      `,
  });
}

export {
  enviar_vagas_alunos,
};
