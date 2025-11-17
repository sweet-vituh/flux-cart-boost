import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, Sparkles, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { ScrollReveal } from "./ScrollReveal";

interface PricingPlan {
  id: string;
  name: string;
  price: string;
  period: string | null;
  description: string;
  features: string[];
  cta_text: string;
  is_popular: boolean;
  display_order: number;
}

export const DynamicPricing = () => {
  const [plans, setPlans] = useState<PricingPlan[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const { data, error } = await supabase
        .from("pricing_plans")
        .select("*")
        .order("display_order");

      if (error) throw error;

      const formattedData = (data || []).map((plan) => ({
        ...plan,
        features: (Array.isArray(plan.features) ? plan.features : []) as string[],
      })) as PricingPlan[];

      setPlans(formattedData);
    } catch (error) {
      console.error("Error fetching plans:", error);
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
    <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
      {plans.map((plan, index) => {
        const variantMap: Record<string, "outline" | "hero" | "premium"> = {
          "Essencial": "outline",
          "Turbo": "hero",
          "Galactic Pro": "premium",
        };
        const variant = variantMap[plan.name] || "outline";

        return (
          <ScrollReveal
            key={plan.id}
            direction="scale"
            delay={index * 0.1}
          >
            <div
              className={`relative glass-card rounded-2xl p-8 shadow-card hover:shadow-elevation transition-all duration-300 ${
                plan.is_popular ? "border-2 border-primary" : ""
              }`}
            >
              {plan.is_popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="gradient-primary px-4 py-1 rounded-full text-white text-sm font-medium shadow-glow flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    Mais Popular
                  </div>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-muted-foreground text-sm">{plan.description}</p>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-bold text-gradient">{plan.price}</span>
                  {plan.period && (
                    <span className="text-muted-foreground">{plan.period}</span>
                  )}
                </div>
              </div>

              <Button variant={variant} className="w-full mb-6" size="lg">
                {plan.cta_text}
              </Button>

              <div className="space-y-3">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-sm text-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        );
      })}
    </div>
  );
};
