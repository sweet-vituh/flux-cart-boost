import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Quanto tempo leva para implementar o FluxCart?",
    answer: "O setup completo leva menos de 60 segundos. Você conecta suas plataformas, configura as integrações e já está pronto para vender mais. Não precisa de desenvolvedor ou conhecimento técnico.",
  },
  {
    question: "O checkout one-tap funciona em mobile?",
    answer: "Sim! O checkout one-tap foi projetado especialmente para dispositivos móveis, onde acontecem 70% dos abandonos de carrinho. A IA otimiza automaticamente a experiência para cada dispositivo.",
  },
  {
    question: "Quais plataformas posso integrar?",
    answer: "Você pode integrar Shopify, Amazon, Shopee, Mercado Livre, Etsy e sua loja própria. A sincronização é em tempo real e o estoque é atualizado automaticamente em todas as plataformas.",
  },
  {
    question: "Como funciona o upsell inteligente?",
    answer: "Nossa IA analisa o comportamento de compra e oferece produtos complementares automaticamente. Você pode transformar qualquer produto em assinatura com um clique e criar ofertas pós-compra que aumentam seu ticket médio.",
  },
  {
    question: "O que meus clientes ganham com isso?",
    answer: "Seus clientes têm acesso a um painel próprio onde podem ver histórico de compras, rastrear pedidos em tempo real, gerenciar assinaturas e receber benefícios exclusivos. Isso aumenta a retenção e satisfação.",
  },
  {
    question: "Posso cancelar a qualquer momento?",
    answer: "Sim! Não há contrato de permanência. Você pode cancelar quando quiser e seus dados ficam disponíveis para exportação. O plano gratuito permanece ativo para sempre.",
  },
  {
    question: "Como funciona o teste grátis?",
    answer: "Você tem 14 dias para testar todos os recursos dos planos pagos sem compromisso. Não pedimos cartão de crédito no cadastro e você pode começar a usar imediatamente.",
  },
  {
    question: "Vocês oferecem suporte em português?",
    answer: "Sim! Nossa equipe de suporte está disponível em português por chat, email e, nos planos Premium e Galactic Pro, por telefone com atendimento prioritário 24/7.",
  },
];

export const FAQ = () => {
  return (
    <section id="faq" className="py-24 px-4 gradient-hero">
      <div className="container mx-auto max-w-4xl">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Perguntas <span className="text-gradient">Frequentes</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Tudo o que você precisa saber para começar
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="glass-card rounded-2xl p-8 shadow-card animate-scale-in">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b border-border/30 last:border-0">
                <AccordionTrigger className="text-left hover:no-underline py-4">
                  <span className="font-semibold text-foreground">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12 animate-fade-in">
          <p className="text-muted-foreground mb-2">Ainda tem dúvidas?</p>
          <a href="#" className="text-primary hover:underline font-medium">
            Fale com nosso time de especialistas
          </a>
        </div>
      </div>
    </section>
  );
};
