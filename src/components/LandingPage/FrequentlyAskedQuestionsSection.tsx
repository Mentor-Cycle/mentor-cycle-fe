import { AccordionItemWrapper, AccordionWrapper } from "./AccordionComponent";

const FrequentlyAskedQuestionsSection = () => {
  return (
    <section className="container my-40">
      <h3 className="font-bold text-4.5xl">Perguntas frequentes</h3>
      <div className="mt-12">
        <AccordionWrapper type="single" collapsible>
          <AccordionItemWrapper value="item-1" expandedText="É gratuito?">
            Sim, é totalmente gratuito. Nossos mentores são voluntários e você
            não terá nenhum custo. Porém, fique atendo aos nossos termos e
            condições.
          </AccordionItemWrapper>
          <AccordionItemWrapper
            value="item-2"
            expandedText="Como funcionam as mentorias?"
          >
            Para ter sua mentoria, primeiro você precisa se cadastrar na Mentor
            Cycle. Com seu cadastro feito, é só encontrar o mentor da sua
            preferência, escolher um horário disponível e agendar. Pronto, agora
            é só esperar a data e horário da sua mentoria.
          </AccordionItemWrapper>
          <AccordionItemWrapper
            value="item-3"
            expandedText="Qualquer um pode participar?"
          >
            Sim, qualquer pessoa interessada em receber mentoria na área de
            tecnologia pode participar do Mentor Cycle. O processo de
            participação envolve se cadastrar no Mentor Cycle, escolher um
            mentor disponível e agendar um horário para a mentoria. Depois
            disso, é só aguardar a data e horário marcados para a sessão de
            mentoria.
          </AccordionItemWrapper>
          <AccordionItemWrapper
            value="item-4"
            expandedText="Existem horários fixos?"
          >
            No Mentor Cycle, os mentores têm a liberdade de escolher quais
            horários estão disponíveis para fornecer mentorias. Dessa forma, são
            os próprios mentores que definem os horários em que estão
            disponíveis para realizar as sessões de mentoria. Os aprendizes
            podem acessar o perfil dos mentores e verificar os horários
            disponíveis para agendar uma mentoria de acordo com a
            disponibilidade do mentor escolhido.
          </AccordionItemWrapper>
        </AccordionWrapper>
      </div>
    </section>
  );
};

export default FrequentlyAskedQuestionsSection;
