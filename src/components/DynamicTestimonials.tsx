import { useEffect, useState } from "react";
import { Star, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { ScrollReveal } from "./ScrollReveal";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  avatar_seed: string;
}

export const DynamicTestimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const { data, error } = await supabase
        .from("testimonials")
        .select("id, name, role, content, rating, avatar_seed")
        .eq("is_active", true)
        .order("display_order");

      if (error) throw error;
      setTestimonials(data || []);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
    } finally {
      setIsLoading(false);
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
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
      {testimonials.map((testimonial, index) => (
        <ScrollReveal key={testimonial.id} direction="scale" delay={index * 0.1}>
          <div className="glass-card rounded-2xl p-6 shadow-card hover:shadow-elevation transition-all duration-300 hover:-translate-y-1">
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
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${testimonial.avatar_seed}`}
                alt={testimonial.name}
                className="w-12 h-12 rounded-full bg-muted"
              />
              <div>
                <div className="font-semibold text-foreground">{testimonial.name}</div>
                <div className="text-sm text-muted-foreground">{testimonial.role}</div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      ))}
    </div>
  );
};
