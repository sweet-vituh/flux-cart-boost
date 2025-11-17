import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Loader2, Save, Star } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  avatar_seed: string;
  is_active: boolean;
  display_order: number;
}

export const TestimonialsManager = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .order("display_order");

      if (error) throw error;
      setTestimonials(data || []);
    } catch (error) {
      toast.error("Erro ao carregar depoimentos");
    } finally {
      setIsLoading(false);
    }
  };

  const updateTestimonial = (id: string, field: keyof Testimonial, value: any) => {
    setTestimonials(testimonials.map(t => 
      t.id === id ? { ...t, [field]: value } : t
    ));
  };

  const saveTestimonials = async () => {
    setIsSaving(true);
    try {
      for (const testimonial of testimonials) {
        const { error } = await supabase
          .from("testimonials")
          .update({
            name: testimonial.name,
            role: testimonial.role,
            content: testimonial.content,
            rating: testimonial.rating,
            avatar_seed: testimonial.avatar_seed,
            is_active: testimonial.is_active,
          })
          .eq("id", testimonial.id);

        if (error) throw error;
      }
      toast.success("Depoimentos atualizados com sucesso!");
    } catch (error) {
      toast.error("Erro ao salvar depoimentos");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Gerenciar Depoimentos</h2>
        <Button onClick={saveTestimonials} disabled={isSaving} variant="hero">
          {isSaving ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Salvando...
            </>
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              Salvar Alterações
            </>
          )}
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((testimonial, index) => (
          <ScrollReveal key={testimonial.id} delay={index * 0.1}>
            <div className="glass-card rounded-2xl p-6 shadow-card space-y-4">
              <Input
                value={testimonial.name}
                onChange={(e) => updateTestimonial(testimonial.id, "name", e.target.value)}
                placeholder="Nome"
              />

              <Input
                value={testimonial.role}
                onChange={(e) => updateTestimonial(testimonial.id, "role", e.target.value)}
                placeholder="Cargo/Empresa"
              />

              <Textarea
                value={testimonial.content}
                onChange={(e) => updateTestimonial(testimonial.id, "content", e.target.value)}
                placeholder="Depoimento"
                className="min-h-[100px]"
              />

              <Input
                value={testimonial.avatar_seed}
                onChange={(e) => updateTestimonial(testimonial.id, "avatar_seed", e.target.value)}
                placeholder="Avatar Seed"
              />

              <div>
                <label className="text-sm font-medium mb-2 block">Avaliação</label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => updateTestimonial(testimonial.id, "rating", star)}
                      className="focus:outline-none"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= testimonial.rating
                            ? "fill-primary text-primary"
                            : "text-muted"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={testimonial.is_active}
                  onChange={(e) => updateTestimonial(testimonial.id, "is_active", e.target.checked)}
                  className="rounded"
                />
                <span className="text-sm">Ativo</span>
              </label>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
};
