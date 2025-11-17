import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogOut, DollarSign, MessageSquare } from "lucide-react";
import { toast } from "sonner";
import { PricingPlansManager } from "@/components/admin/PricingPlansManager";
import { TestimonialsManager } from "@/components/admin/TestimonialsManager";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem("admin_logged_in");
    if (!isLoggedIn) {
      navigate("/admin/login");
    } else {
      setIsAuthenticated(true);
    }
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem("admin_logged_in");
    toast.success("Logout realizado com sucesso");
    navigate("/admin/login");
  };

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/30 glass-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gradient">FluxCart Admin</h1>
            <p className="text-sm text-muted-foreground">Painel de Gerenciamento</p>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Sair
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="plans" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
            <TabsTrigger value="plans">
              <DollarSign className="w-4 h-4 mr-2" />
              Planos
            </TabsTrigger>
            <TabsTrigger value="testimonials">
              <MessageSquare className="w-4 h-4 mr-2" />
              Depoimentos
            </TabsTrigger>
          </TabsList>

          <TabsContent value="plans">
            <PricingPlansManager />
          </TabsContent>

          <TabsContent value="testimonials">
            <TestimonialsManager />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
