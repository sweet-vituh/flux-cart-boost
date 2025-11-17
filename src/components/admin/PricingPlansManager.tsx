import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Loader2, Save, Plus, X } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";

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

export const PricingPlansManager = () => {
  const [plans, setPlans] = useState<PricingPlan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

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
      const formattedData = (data || []).map(plan => ({
        ...plan,
        features: (Array.isArray(plan.features) ? plan.features : []).map(f => String(f)),
      })) as PricingPlan[];
      setPlans(formattedData);
    } catch (error) {
      toast.error("Erro ao carregar planos");
    } finally {
      setIsLoading(false);
    }
  };

  const updatePlan = (id: string, field: keyof PricingPlan, value: any) => {
    setPlans(plans.map(plan => 
      plan.id === id ? { ...plan, [field]: value } : plan
    ));
  };

  const addFeature = (id: string) => {
    setPlans(plans.map(plan =>
      plan.id === id ? { ...plan, features: [...plan.features, ""] } : plan
    ));
  };

  const updateFeature = (id: string, index: number, value: string) => {
    setPlans(plans.map(plan => {
      if (plan.id === id) {
        const newFeatures = [...plan.features];
        newFeatures[index] = value;
        return { ...plan, features: newFeatures };
      }
      return plan;
    }));
  };

  const removeFeature = (id: string, index: number) => {
    setPlans(plans.map(plan => {
      if (plan.id === id) {
        return { ...plan, features: plan.features.filter((_, i) => i !== index) };
      }
      return plan;
    }));
  };

  const savePlans = async () => {
    setIsSaving(true);
    try {
      for (const plan of plans) {
        const { error } = await supabase
          .from("pricing_plans")
          .update({
            name: plan.name,
            price: plan.price,
            period: plan.period,
            description: plan.description,
            features: plan.features,
            cta_text: plan.cta_text,
            is_popular: plan.is_popular,
          })
          .eq("id", plan.id);

        if (error) throw error;
      }
      toast.success("Planos atualizados com sucesso!");
    } catch (error) {
      toast.error("Erro ao salvar planos");
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
        <h2 className="text-2xl font-bold">Gerenciar Planos de Preços</h2>
        <Button onClick={savePlans} disabled={isSaving} variant="hero">
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

      <div className="grid md:grid-cols-3 gap-6">
        {plans.map((plan, planIndex) => (
          <ScrollReveal key={plan.id} delay={planIndex * 0.1}>
            <div className="glass-card rounded-2xl p-6 shadow-card space-y-4">
              <Input
                value={plan.name}
                onChange={(e) => updatePlan(plan.id, "name", e.target.value)}
                placeholder="Nome do plano"
                className="font-bold text-lg"
              />

              <Input
                value={plan.price}
                onChange={(e) => updatePlan(plan.id, "price", e.target.value)}
                placeholder="Preço"
              />

              <Input
                value={plan.period || ""}
                onChange={(e) => updatePlan(plan.id, "period", e.target.value)}
                placeholder="Período (ex: /mês)"
              />

              <Input
                value={plan.description}
                onChange={(e) => updatePlan(plan.id, "description", e.target.value)}
                placeholder="Descrição"
              />

              <Input
                value={plan.cta_text}
                onChange={(e) => updatePlan(plan.id, "cta_text", e.target.value)}
                placeholder="Texto do botão"
              />

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={plan.is_popular}
                  onChange={(e) => updatePlan(plan.id, "is_popular", e.target.checked)}
                  className="rounded"
                />
                <span className="text-sm">Marcar como popular</span>
              </label>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Features</label>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => addFeature(plan.id)}
                  >
                    <Plus className="w-3 h-3" />
                  </Button>
                </div>
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={feature}
                      onChange={(e) => updateFeature(plan.id, index, e.target.value)}
                      placeholder="Feature"
                      className="text-sm"
                    />
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => removeFeature(plan.id, index)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
};
