import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";

export const FinalCTA = () => {
  return (
    <section className="py-24 px-4 bg-background">
      <div className="container mx-auto">
        <div className="relative overflow-hidden rounded-3xl gradient-primary p-12 md:p-16 shadow-elevation">
          {/* Background decoration */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto text-center animate-fade-in">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Pare de perder vendas.
              <br />
              Comece a crescer hoje.
            </h2>
            
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Configure em 60 segundos. Veja resultados no primeiro dia. Cresça sem limites.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button variant="glass" size="xl" className="bg-white/10 hover:bg-white/20 text-white border-white/30 group">
                Começar Grátis Agora
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="ghost" size="xl" className="text-white hover:bg-white/10">
                Agendar Demonstração
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              {[
                "Setup em menos de 60 segundos",
                "14 dias de teste grátis",
                "Sem cartão de crédito necessário",
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-3 text-white">
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4" />
                  </div>
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
