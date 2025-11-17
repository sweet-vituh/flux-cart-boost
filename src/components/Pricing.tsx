import { Button } from "@/components/ui/button";
import { Check, Sparkles } from "lucide-react";

const plans = [
  {
    name: "Essencial",
    price: "Grátis",
    description: "Perfeito para começar",
    features: [
      "Checkout rápido básico",
      "Gestão de estoque limitada",
      "Painel simples",
      "1 integração",
      "Suporte por email",
    ],
    cta: "Começar Grátis",
    variant: "outline" as const,
    popular: false,
  },
  {
    name: "Turbo",
    price: "R$ 97",
    period: "/mês",
    description: "Para crescer rápido",
    features: [
      "Tudo do Essencial",
      "Checkout one-tap completo",
      "5 integrações",
      "Upsell automático",
      "Painel avançado com IA",
      "Suporte prioritário",
    ],
    cta: "Começar Teste Grátis",
    variant: "hero" as const,
    popular: true,
  },
  {
    name: "Galactic Pro",
    price: "R$ 297",
    period: "/mês",
    description: "Máximo desempenho",
    features: [
      "Tudo do Turbo",
      "Sincronização ilimitada",
      "IA prevê vendas e estoque",
      "Automações avançadas",
      "Painel do consumidor premium",
      "Checkout hiper-otimizado",
      "Suporte 24/7",
      "API completa",
    ],
    cta: "Falar com Vendas",
    variant: "premium" as const,
    popular: false,
  },
];

export const Pricing = () => {
  return (
    <section id="pricing" className="py-24 px-4 gradient-hero">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Planos que <span className="text-gradient">escalam</span> com você
          </h2>
          <p className="text-xl text-muted-foreground">
            Comece grátis e evolua conforme suas vendas crescem
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative glass-card rounded-2xl p-8 shadow-card hover:shadow-elevation transition-all duration-300 animate-scale-in ${
                plan.popular ? "border-2 border-primary" : ""
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="gradient-primary px-4 py-1 rounded-full text-white text-sm font-medium shadow-glow flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    Mais Popular
                  </div>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-muted-foreground text-sm">{plan.description}</p>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-bold text-gradient">{plan.price}</span>
                  {plan.period && (
                    <span className="text-muted-foreground">{plan.period}</span>
                  )}
                </div>
              </div>

              <Button variant={plan.variant} className="w-full mb-6" size="lg">
                {plan.cta}
              </Button>

              <div className="space-y-3">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-sm text-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 animate-fade-in">
          <p className="text-muted-foreground mb-4">
            Todos os planos incluem 14 dias de teste grátis
          </p>
          <p className="text-sm text-muted-foreground">
            Precisa de algo personalizado?{" "}
            <a href="#" className="text-primary hover:underline font-medium">
              Fale com nosso time
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};
