import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Lock, Loader2, Mail, ArrowRight } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../components/Toast";
import { useDocumentTitle } from "../hooks";
import { GlassCard } from "../components/ui/card";
import { Input, Label } from "../components/ui/input";
import { Button } from "../components/ui/button";

export default function Adminlogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated } = useAuth();
  const toast = useToast();

  useDocumentTitle("Admin Login");

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      const from = location.state?.from?.pathname || "/admin";
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Erreur", "Veuillez remplir tous les champs");
      return;
    }

    setIsSubmitting(true);

    const result = await login(email, password);

    if (result.success) {
      toast.success("Succès", "Connexion réussie!");
      const from = location.state?.from?.pathname || "/admin";
      navigate(from, { replace: true });
    } else {
      toast.error(
        "Erreur de connexion",
        result.error || "Email ou mot de passe incorrect",
      );
    }

    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center bg-gradient-to-br from-green-50 via-white to-green-100 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-200/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-300/20 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="sm:mx-auto sm:w-full sm:max-w-md text-center relative z-10"
      >
        <motion.img
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto h-24 w-auto drop-shadow-lg"
          src="/assets/logo.png"
          alt="Restaurant Okla"
        />
        <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
          Connexion <span className="text-gradient">Admin</span>
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Accédez au tableau de bord de gestion
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10"
      >
        <GlassCard className="py-8 px-6 sm:px-10">
          <form className="space-y-6" onSubmit={submitHandler}>
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-green-600" />
                Adresse email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-green-600" />
                Mot de passe
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              variant="gradient"
              size="lg"
              className="w-full gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Connexion...
                </>
              ) : (
                <>
                  Se connecter
                  <ArrowRight className="h-5 w-5" />
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-200/50">
            <p className="text-xs text-center text-gray-500">
              Accès réservé aux administrateurs autorisés
            </p>
          </div>
        </GlassCard>
      </motion.div>

      {/* Footer */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8 text-center text-sm text-gray-500 relative z-10"
      >
        Restaurant Okla © {new Date().getFullYear()}
      </motion.p>
    </div>
  );
}
