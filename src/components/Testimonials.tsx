import { Star } from "lucide-react";
import { DynamicTestimonials } from "./DynamicTestimonials";
import { ScrollReveal } from "./ScrollReveal";

export const Testimonials = () => {
  return (
    <section id="testimonials" className="py-24 px-4 bg-background">
      <div className="container mx-auto">
        {/* Section Header */}
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Resultados <span className="text-gradient">reais</span> de quem usa
            </h2>
            <p className="text-xl text-muted-foreground">
              Mais de 2.500 lojistas já aumentaram suas vendas com FluxCart
            </p>
          </div>
        </ScrollReveal>

        {/* Testimonials Grid - Dynamic */}
        <DynamicTestimonials />

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto mt-16 text-center">
          <ScrollReveal delay={0.1}>
            <div>
              <div className="text-4xl font-bold text-gradient mb-2">2.500+</div>
              <div className="text-sm text-muted-foreground">Lojistas ativos</div>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <div>
              <div className="text-4xl font-bold text-gradient mb-2">4.9/5</div>
              <div className="text-sm text-muted-foreground">Avaliação média</div>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <div>
              <div className="text-4xl font-bold text-gradient mb-2">127%</div>
              <div className="text-sm text-muted-foreground">Aumento médio</div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
