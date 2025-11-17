import { Zap, Package, RefreshCw, Sparkles, ShoppingCart, TrendingUp } from "lucide-react";
import checkoutMobile from "@/assets/checkout-mobile.jpg";

const features = [
  {
    icon: Zap,
    title: "Checkout One-Tap",
    description: "Pagamento com um clique em qualquer dispositivo. IA otimiza cada compra para reduzir abandono de carrinho até 68%.",
    stats: "-68% abandono",
  },
  {
    icon: Package,
    title: "Gestão Omnichannel",
    description: "Sincronização em tempo real entre Shopify, Amazon, Shopee, Mercado Livre e sua loja. Estoque sempre atualizado, em todo lugar.",
    stats: "100% sincronizado",
  },
  {
    icon: RefreshCw,
    title: "Upsell Inteligente",
    description: "Transforme qualquer produto em assinatura. Ofertas pós-compra automáticas que aumentam seu ticket médio em até 127%.",
    stats: "+127% receita",
  },
];

const benefits = [
  {
    icon: Sparkles,
    title: "IA que vende por você",
    description: "Automações inteligentes sugerem produtos, recuperam carrinhos abandonados e otimizam ofertas em tempo real.",
  },
  {
    icon: ShoppingCart,
    title: "Experiência premium",
    description: "Seus clientes têm um painel próprio com histórico, rastreio inteligente e benefícios exclusivos.",
  },
  {
    icon: TrendingUp,
    title: "Crescimento previsível",
    description: "Analytics avançado com IA prevê vendas e recompõe estoque automaticamente.",
  },
];

export const Features = () => {
  return (
    <section id="features" className="py-24 px-4 bg-background">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Vendas que você estava{" "}
            <span className="text-gradient">perdendo</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Capturadas automaticamente com tecnologia que funciona para você 24/7
          </p>
        </div>

        {/* Main Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-24">
          {features.map((feature, index) => (
            <div
              key={index}
              className="glass-card rounded-2xl p-8 shadow-card hover:shadow-elevation transition-all duration-300 hover:-translate-y-2 animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-6 shadow-glow">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
              <p className="text-muted-foreground mb-4">{feature.description}</p>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                {feature.stats}
              </div>
            </div>
          ))}
        </div>

        {/* Visual Showcase */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-24">
          <div className="order-2 lg:order-1 animate-fade-in">
            <div className="relative rounded-2xl overflow-hidden shadow-elevation">
              <img 
                src={checkoutMobile} 
                alt="Checkout Mobile" 
                className="w-full h-auto"
              />
            </div>
          </div>

          <div className="order-1 lg:order-2 animate-fade-in">
            <h3 className="text-3xl md:text-4xl font-bold mb-6">
              Compras mais <span className="text-gradient">rápidas</span>,<br />
              clientes mais <span className="text-gradient">felizes</span>
            </h3>
            <p className="text-lg text-muted-foreground mb-8">
              Seu estoque atualizado em todo lugar. Sempre. Sugestões automáticas de pagamento mais rápido. Zero fricção.
            </p>
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center flex-shrink-0">
                    <benefit.icon className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">{benefit.title}</h4>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 glass-card rounded-2xl p-8 shadow-card">
          {[
            { value: "60s", label: "Setup completo" },
            { value: "+127%", label: "Aumento em vendas" },
            { value: "-68%", label: "Menos abandono" },
            { value: "24/7", label: "IA trabalhando" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
