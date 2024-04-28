import "./politica-privacidade.css";
import Footer from "../../components/Footer";

export default function PoliticaPrivacidadePage() {
  return (
    <>
      <main>
        <h4 className="paragrafo">Políticas de Acesso</h4>

        <p className="paragrafo1">Privacidade:</p>

        <p className="textopolitica">
          A sua privacidade é importante para nós. É política do Fatec Indica
          respeitar a sua privacidade em relação a qualquer informação sua que
          possamos <br />
          coletar no site Fatec Indica, e outros sites que possuímos e operamos.
        </p>

        <h5 className="paragrafo1">Dados que são coletados:</h5>
        <p className="textopolitica">
          Dados cadastrais: nome completo, data de nascimento, telefone, endereço
          de e-mail institucional, endereço residencial, semestre da faculdade e
          curso.
        </p>
        <p className="textopolitica">
          Dados do uso da plataforma: as vagas as quais se candidatou e demonstrou
          interesse.
        </p>

        <p className="paragrafo1">Por que são coletados?</p>
        <p className="textopolitica">
          Solicitamos informações pessoais apenas quando realmente precisamos
          delas para lhe fornecer um serviço. <br /> Fazemo-lo por meios justos e
          legais, com o seu conhecimento e consentimento. Também informamos por
          que estamos coletando e como será usado.
        </p>
        <p className="textopolitica">
          Apenas retemos as informações coletadas pelo tempo necessário para
          fornecer o serviço solicitado.
          <br /> Quando armazenamos dados, protegemos dentro de meios
          comercialmente aceitáveis para evitar perdas e roubos, bem como acesso,
          divulgação,
          <br /> cópia, uso ou modificação não autorizados.
        </p>

        <p className="paragrafo1">Links para outros sites:</p>
        <p className="textopolitica">
          O nosso site pode ter links para sites externos que não são operados por
          nós. Esteja ciente de que não temos controle sobre o conteúdo e práticas
          <br /> desses sites e não podemos aceitar responsabilidade por suas
          respectivas políticas de privacidade.
        </p>


      </main>

      <Footer />
    </>



  );
}
