import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Ana Silva",
    role: "Fundadora, ModaLux",
    content: "Nosso abandono de carrinho caiu 65% no primeiro mês. O checkout one-tap é revolucionário.",
    rating: 5,
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ana",
  },
  {
    name: "Carlos Mendes",
    role: "CEO, TechStore",
    content: "Finalmente consigo gerenciar estoque em 5 plataformas sem enlouquecer. Economizei 20h por semana.",
    rating: 5,
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos",
  },
  {
    name: "Beatriz Costa",
    role: "E-commerce Manager",
    content: "As automações de upsell geraram R$ 45 mil extras em 30 dias. Sem fazer nada além de ativar.",
    rating: 5,
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Beatriz",
  },
  {
    name: "Rafael Oliveira",
    role: "Diretor, BeautyBox",
    content: "Setup levou 2 minutos. No mesmo dia já estava vendendo mais rápido. Interface impecável.",
    rating: 5,
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rafael",
  },
  {
    name: "Juliana Ferreira",
    role: "Owner, PetShop Plus",
    content: "Meus clientes adoram o painel de acompanhamento. Agora eles voltam mais vezes para comprar.",
    rating: 5,
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Juliana",
  },
  {
    name: "Pedro Santos",
    role: "Founder, SneakerHub",
    content: "A IA previu quando eu precisaria repor estoque. Evitei perder R$ 30 mil em vendas.",
    rating: 5,
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Pedro",
  },
];

export const Testimonials = () => {
  return (
    <section id="testimonials" className="py-24 px-4 bg-background">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Resultados <span className="text-gradient">reais</span> de quem usa
          </h2>
          <p className="text-xl text-muted-foreground">
            Mais de 2.500 lojistas já aumentaram suas vendas com FluxCart
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="glass-card rounded-2xl p-6 shadow-card hover:shadow-elevation transition-all duration-300 hover:-translate-y-1 animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>

              {/* Content */}
              <p className="text-foreground mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full bg-muted"
                />
                <div>
                  <div className="font-semibold text-foreground">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto mt-16 text-center">
          <div className="animate-fade-in">
            <div className="text-4xl font-bold text-gradient mb-2">2.500+</div>
            <div className="text-sm text-muted-foreground">Lojistas ativos</div>
          </div>
          <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="text-4xl font-bold text-gradient mb-2">4.9/5</div>
            <div className="text-sm text-muted-foreground">Avaliação média</div>
          </div>
          <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="text-4xl font-bold text-gradient mb-2">127%</div>
            <div className="text-sm text-muted-foreground">Aumento médio</div>
          </div>
        </div>
      </div>
    </section>
  );
};
