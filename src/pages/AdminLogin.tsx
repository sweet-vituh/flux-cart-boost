import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Lock, Loader2 } from "lucide-react";
import bcrypt from "bcryptjs";

const loginSchema = z.object({
  username: z.string().min(1, "Username é obrigatório"),
  password: z.string().min(1, "Senha é obrigatória"),
});

type LoginFormData = z.infer<typeof loginSchema>;

const AdminLogin = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      const { data: adminUser, error } = await supabase
        .from("admin_users")
        .select("*")
        .eq("username", data.username)
        .single();

      if (error || !adminUser) {
        toast.error("Credenciais inválidas");
        return;
      }

      // Simple comparison for demo (in production use proper bcrypt)
      const isValid = await bcrypt.compare(data.password, adminUser.password_hash);
      
      if (!isValid) {
        toast.error("Credenciais inválidas");
        return;
      }

      sessionStorage.setItem("admin_logged_in", "true");
      toast.success("Login realizado com sucesso!");
      navigate("/admin/dashboard");
    } catch (error) {
      toast.error("Erro ao fazer login");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center gradient-hero px-4">
      <div className="w-full max-w-md">
        <div className="glass-card rounded-2xl p-8 shadow-elevation">
          <div className="flex items-center justify-center mb-8">
            <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center">
              <Lock className="w-8 h-8 text-white" />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-center mb-2">Painel Admin</h1>
          <p className="text-center text-muted-foreground mb-8">
            Entre para gerenciar o FluxCart
          </p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Usuário</FormLabel>
                    <FormControl>
                      <Input placeholder="admin" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                variant="hero"
                size="lg"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Entrando...
                  </>
                ) : (
                  "Entrar"
                )}
              </Button>
            </form>
          </Form>

          <div className="mt-6 text-center">
            <a href="/" className="text-sm text-primary hover:underline">
              ← Voltar para o site
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
