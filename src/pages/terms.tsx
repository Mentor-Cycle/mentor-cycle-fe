import { NextPage } from "next";

const Terms: NextPage = () => {
  return (
    <div className="container py-10">
      <h1 className="text-center font-bold text-3xl mt-8 mb-8">
        Termos de Uso da Mentor Cycle
      </h1>
      <p className="italic font-bold text-lg mb-8">
        1. Aceitação dos Termos de Uso
      </p>
      <p className="mb-4">
        Ao acessar e utilizar a plataforma Mentor Cycle, você concorda em
        cumprir e se vincular a estes Termos de Uso. Se você não concordar com
        estes termos, por favor, não utilize a plataforma.
      </p>
      <p className="italic font-bold text-lg mb-8">2. Descrição do serviço</p>
      <p className="mb-8">
        A Mentor Cycle é um projeto open-source que tem como objetivo conectar
        pessoas na área de T.I que estão aprendendo com profissionais
        experientes no mercado, realizando o match entre aprendiz e mentor. A
        plataforma visa facilitar a jornada de estudos e metas dos iniciantes,
        proporcionando acesso a mentores que já vivenciaram aquilo que os
        aprendizes buscam aprender.
      </p>
      <p className="italic font-bold text-lg mb-8">
        3. Elegibilidade e registro
      </p>
      <p className="mb-4">
        Para utilizar a plataforma, você deve ter pelo menos 18 anos de idade e
        fornecer informações verdadeiras, precisas e completas durante o
        processo de registro. A Mentor Cycle se reserva o direito de suspender
        ou encerrar sua conta se qualquer informação fornecida durante o
        registro ou em qualquer momento subsequente for considerada falsa,
        imprecisa ou incompleta.
      </p>
      <h2 className="italic font-bold text-lg mb-8">4. Conduta do usuário</h2>

      <p> Os usuários da plataforma Mentor Cycle concordam em não:</p>

      <ol className="list-disc list-inside flex flex-col gap-4 mb-4">
        <li className="mt-2">Violar leis ou regulamentações aplicáveis;</li>
        <li>Assediar, ameaçar ou intimidar outros usuários;</li>
        <li>
          Fazer upload, transmitir ou compartilhar conteúdo que seja obsceno,
          difamatório, discriminatório, violento ou de alguma forma ofensivo;
        </li>
        <li>
          Violar a privacidade de outros usuários ou compartilhar suas
          informações pessoais sem consentimento; Utilizar a plataforma para
          fins comerciais ou promocionais não autorizados.
        </li>
        <li>
          {" "}
          Todo o conteúdo disponível na plataforma, incluindo, mas não se
          limitando a, textos, gráficos, imagens, logotipos e código-fonte, é de
          propriedade da Mentor Cycle ou de seus respectivos autores. Nenhum
          conteúdo pode ser copiado, distribuído, reproduzido ou utilizado de
          outra forma sem a expressa autorização por escrito da Mentor Cycle ou
          do autor aplicável.
        </li>
      </ol>
      <p className="italic font-bold text-lg mb-8">
        5. Limitação de responsabilidade
      </p>
      <p className="mb-4">
        A plataforma Mentor Cycle é fornecida <span>`como está`</span> e{" "}
        <span>`conforme disponível`</span>, sem garantias de qualquer tipo,
        expressas ou implícitas. O uso da plataforma é por sua conta e risco. A
        Mentor Cycle não se responsabiliza por qualquer dano, perda ou prejuízo
        resultante do uso da plataforma, incluindo, mas não se limitando a,
        erros, omissões, interrupções, perda de dados ou lucros.
      </p>
      <p className="italic font-bold text-lg mb-8">
        6. Modificações nos Termos de Uso
      </p>
      <p className="mb-4">
        A Mentor Cycle se reserva o direito de modificar estes Termos de Uso a
        qualquer momento. Ao continuar utilizando a plataforma após a publicação
        de alterações nos Termos de Uso, você concorda em se vincular aos termos
        atualizados.
      </p>
      <p className="italic font-bold text-lg mb-8">7. Legislação aplicável</p>
      <p>
        Estes Termos de Uso são regidos pelas leis do país em que a plataforma
        Mentor Cycle é mantida. Quaisquer disputas ou reivindicações
        relacionadas a estes Termos de Uso serão resolvidas nos tribunais
        competentes desse país.
      </p>
    </div>
  );
};

export default Terms;
