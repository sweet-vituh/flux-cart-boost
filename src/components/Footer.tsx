import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const footerLinks = {
  product: {
    title: "Produto",
    links: [
      { label: "Recursos", href: "#features" },
      { label: "Planos", href: "#pricing" },
      { label: "Integrações", href: "#" },
      { label: "API", href: "#" },
    ],
  },
  company: {
    title: "Empresa",
    links: [
      { label: "Sobre", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Carreiras", href: "#" },
      { label: "Contato", href: "#" },
    ],
  },
  resources: {
    title: "Recursos",
    links: [
      { label: "Documentação", href: "#" },
      { label: "Suporte", href: "#" },
      { label: "Status", href: "#" },
      { label: "Changelog", href: "#" },
    ],
  },
  legal: {
    title: "Legal",
    links: [
      { label: "Privacidade", href: "#" },
      { label: "Termos", href: "#" },
      { label: "Segurança", href: "#" },
      { label: "LGPD", href: "#" },
    ],
  },
};

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
];

export const Footer = () => {
  return (
    <footer className="bg-background border-t border-border/30 py-12 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="text-2xl font-bold text-gradient mb-4">FluxCart</div>
            <p className="text-sm text-muted-foreground mb-4">
              E-commerce que vende por você.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="w-8 h-8 rounded-lg bg-muted hover:bg-primary/20 flex items-center justify-center transition-colors"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([key, section]) => (
            <div key={key}>
              <h3 className="font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border/30 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© 2024 FluxCart. Todos os direitos reservados.</p>
          <p>Feito com 💙 para revolucionar o e-commerce</p>
        </div>
      </div>
    </footer>
  );
};
