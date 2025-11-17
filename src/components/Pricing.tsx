import { Button } from "@/components/ui/button";
import { Check, Sparkles } from "lucide-react";
import { DynamicPricing } from "./DynamicPricing";
import { ScrollReveal } from "./ScrollReveal";

export const Pricing = () => {
  return (
    <section id="pricing" className="py-24 px-4 gradient-hero">
      <div className="container mx-auto">
        {/* Section Header */}
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Planos que <span className="text-gradient">escalam</span> com você
            </h2>
            <p className="text-xl text-muted-foreground">
              Comece grátis e evolua conforme suas vendas crescem
            </p>
          </div>
        </ScrollReveal>

        {/* Pricing Cards - Dynamic */}
        <DynamicPricing />

        {/* Bottom CTA */}
        <ScrollReveal delay={0.3}>
          <div className="text-center mt-16">
            <p className="text-muted-foreground mb-4">
              Todos os planos incluem 14 dias de teste grátis
            </p>
            <p className="text-sm text-muted-foreground">
              Precisa de algo personalizado?{" "}
              <a href="/contact" className="text-primary hover:underline font-medium">
                Fale com nosso time
              </a>
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
