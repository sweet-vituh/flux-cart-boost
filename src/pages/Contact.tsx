import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ContactForm } from "@/components/ContactForm";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Mail, Phone, MapPin } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <section className="pt-32 pb-24 px-4 gradient-hero">
        <div className="container mx-auto max-w-6xl">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Fale <span className="text-gradient">Conosco</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Estamos aqui para ajudar você a revolucionar seu e-commerce
              </p>
            </div>
          </ScrollReveal>

          <div className="grid lg:grid-cols-2 gap-12">
            <ScrollReveal direction="left">
              <div className="glass-card rounded-2xl p-8 shadow-card">
                <h2 className="text-2xl font-bold mb-6">Envie uma Mensagem</h2>
                <ContactForm type="contact" />
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.2}>
              <div className="space-y-8">
                <div className="glass-card rounded-2xl p-6 shadow-card">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Email</h3>
                      <p className="text-muted-foreground">contato@fluxcart.com.br</p>
                      <p className="text-muted-foreground">suporte@fluxcart.com.br</p>
                    </div>
                  </div>
                </div>

                <div className="glass-card rounded-2xl p-6 shadow-card">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Telefone</h3>
                      <p className="text-muted-foreground">(11) 3000-0000</p>
                      <p className="text-muted-foreground">WhatsApp: (11) 99999-9999</p>
                    </div>
                  </div>
                </div>

                <div className="glass-card rounded-2xl p-6 shadow-card">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Endereço</h3>
                      <p className="text-muted-foreground">
                        Av. Paulista, 1000 - 10º andar<br />
                        São Paulo, SP - 01310-100
                      </p>
                    </div>
                  </div>
                </div>

                <div className="glass-card rounded-2xl p-6 shadow-card gradient-primary text-white">
                  <h3 className="font-bold text-xl mb-3">Horário de Atendimento</h3>
                  <p className="mb-2">Segunda a Sexta: 9h às 18h</p>
                  <p className="text-white/80 text-sm">Suporte Premium: 24/7</p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
