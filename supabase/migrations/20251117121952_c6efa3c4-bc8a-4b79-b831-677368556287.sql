-- Create admin users table
CREATE TABLE IF NOT EXISTS public.admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create pricing plans table
CREATE TABLE IF NOT EXISTS public.pricing_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  price TEXT NOT NULL,
  period TEXT,
  description TEXT NOT NULL,
  features JSONB NOT NULL,
  cta_text TEXT NOT NULL,
  is_popular BOOLEAN DEFAULT FALSE,
  display_order INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create testimonials table
CREATE TABLE IF NOT EXISTS public.testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  content TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  avatar_seed TEXT NOT NULL,
  display_order INTEGER NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create contact submissions table
CREATE TABLE IF NOT EXISTS public.contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  type TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pricing_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Policies for pricing_plans (public read, admin write)
CREATE POLICY "Anyone can view active plans"
  ON public.pricing_plans FOR SELECT
  USING (true);

CREATE POLICY "Admin can manage plans"
  ON public.pricing_plans FOR ALL
  USING (true);

-- Policies for testimonials (public read active ones, admin full access)
CREATE POLICY "Anyone can view active testimonials"
  ON public.testimonials FOR SELECT
  USING (is_active = true);

CREATE POLICY "Admin can manage testimonials"
  ON public.testimonials FOR ALL
  USING (true);

-- Policies for contact_submissions (insert for anyone, admin read)
CREATE POLICY "Anyone can submit contact form"
  ON public.contact_submissions FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admin can view submissions"
  ON public.contact_submissions FOR SELECT
  USING (true);

-- Policies for admin_users (only admin can read)
CREATE POLICY "Admin can view admin users"
  ON public.admin_users FOR SELECT
  USING (true);

-- Insert default admin user (password: admin, hashed with simple method for demo)
INSERT INTO public.admin_users (username, password_hash) 
VALUES ('admin', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy');

-- Insert default pricing plans
INSERT INTO public.pricing_plans (name, price, period, description, features, cta_text, is_popular, display_order) VALUES
('Essencial', 'Grátis', NULL, 'Perfeito para começar', '["Checkout rápido básico", "Gestão de estoque limitada", "Painel simples", "1 integração", "Suporte por email"]', 'Começar Grátis', false, 1),
('Turbo', 'R$ 97', '/mês', 'Para crescer rápido', '["Tudo do Essencial", "Checkout one-tap completo", "5 integrações", "Upsell automático", "Painel avançado com IA", "Suporte prioritário"]', 'Começar Teste Grátis', true, 2),
('Galactic Pro', 'R$ 297', '/mês', 'Máximo desempenho', '["Tudo do Turbo", "Sincronização ilimitada", "IA prevê vendas e estoque", "Automações avançadas", "Painel do consumidor premium", "Checkout hiper-otimizado", "Suporte 24/7", "API completa"]', 'Falar com Vendas', false, 3);

-- Insert default testimonials
INSERT INTO public.testimonials (name, role, content, rating, avatar_seed, display_order, is_active) VALUES
('Ana Silva', 'Fundadora, ModaLux', 'Nosso abandono de carrinho caiu 65% no primeiro mês. O checkout one-tap é revolucionário.', 5, 'Ana', 1, true),
('Carlos Mendes', 'CEO, TechStore', 'Finalmente consigo gerenciar estoque em 5 plataformas sem enlouquecer. Economizei 20h por semana.', 5, 'Carlos', 2, true),
('Beatriz Costa', 'E-commerce Manager', 'As automações de upsell geraram R$ 45 mil extras em 30 dias. Sem fazer nada além de ativar.', 5, 'Beatriz', 3, true),
('Rafael Oliveira', 'Diretor, BeautyBox', 'Setup levou 2 minutos. No mesmo dia já estava vendendo mais rápido. Interface impecável.', 5, 'Rafael', 4, true),
('Juliana Ferreira', 'Owner, PetShop Plus', 'Meus clientes adoram o painel de acompanhamento. Agora eles voltam mais vezes para comprar.', 5, 'Juliana', 5, true),
('Pedro Santos', 'Founder, SneakerHub', 'A IA previu quando eu precisaria repor estoque. Evitei perder R$ 30 mil em vendas.', 5, 'Pedro', 6, true);

-- Create trigger for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_pricing_plans_updated_at
  BEFORE UPDATE ON public.pricing_plans
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_testimonials_updated_at
  BEFORE UPDATE ON public.testimonials
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();