import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import logoImage from 'figma:asset/5f0600645dd56fd710c73a40be1a5062c930b655.png';

type Page = 'ecommerce' | 'product' | 'login' | 'register' | 'reset-password' | 'user-area' | 'dashboard' | 'gamification' | 'referral' | 'profile';

interface ResetPasswordPageProps {
  onNavigate: (page: Page) => void;
}

export function ResetPasswordPage({ onNavigate }: ResetPasswordPageProps) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error('Digite seu e-mail');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error('Digite um e-mail válido');
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsEmailSent(true);
      setIsLoading(false);
      toast.success('E-mail de recuperação enviado!');
    }, 1500);
  };

  if (isEmailSent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-foreground via-gray-900 to-gray-800 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Card className="shadow-2xl">
            <CardHeader className="text-center space-y-4">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="h-8 w-8 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl">E-mail Enviado!</CardTitle>
                <CardDescription>
                  Verifique sua caixa de entrada
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="text-center space-y-4">
                <p className="text-muted-foreground">
                  Enviamos um link de recuperação para:
                </p>
                <p className="font-medium text-primary">{email}</p>
                <p className="text-sm text-muted-foreground">
                  Clique no link no e-mail para redefinir sua senha. 
                  Se não receber o e-mail em alguns minutos, verifique sua pasta de spam.
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <Button
                  onClick={() => setIsEmailSent(false)}
                  variant="outline"
                  className="w-full"
                >
                  Tentar outro e-mail
                </Button>
                
                <Button
                  onClick={() => onNavigate('login')}
                  className="w-full"
                >
                  Voltar ao Login
                </Button>
              </div>

              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  Lembrou da senha?{' '}
                  <Button
                    variant="link"
                    onClick={() => onNavigate('login')}
                    className="text-primary hover:text-primary/80 p-0"
                  >
                    Fazer login
                  </Button>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-foreground via-gray-900 to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Button 
          variant="ghost" 
          onClick={() => onNavigate('login')}
          className="mb-6 text-white hover:text-primary"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar ao login
        </Button>

        <Card className="shadow-2xl">
          <CardHeader className="text-center space-y-4">
            <img 
              src={logoImage} 
              alt="Vital Recife Suplementos" 
              className="w-20 h-20 object-contain mx-auto shadow-lg rounded-xl"
            />
            <div>
              <CardTitle className="text-2xl">Recuperar Senha</CardTitle>
              <CardDescription>
                Digite seu e-mail para receber o link de recuperação
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">E-mail cadastrado</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-12"
                />
                <p className="text-sm text-muted-foreground">
                  Digite o e-mail usado para criar sua conta filiado
                </p>
              </div>

              <Button
                type="submit"
                className="w-full h-12"
                disabled={isLoading}
              >
                {isLoading ? 'Enviando...' : 'Enviar Link de Recuperação'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Lembrou da senha?{' '}
                <Button
                  variant="link"
                  onClick={() => onNavigate('login')}
                  className="text-primary hover:text-primary/80 p-0"
                >
                  Fazer login
                </Button>
              </p>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Não tem uma conta?{' '}
                <Button
                  variant="link"
                  onClick={() => onNavigate('register')}
                  className="text-primary hover:text-primary/80 p-0"
                >
                  Cadastre-se como filiado
                </Button>
              </p>
            </div>

            {/* Help Section */}
            <div className="mt-8 pt-6 border-t border-border">
              <h4 className="font-semibold text-center mb-4 text-sm">
                Problemas para acessar?
              </h4>
              <div className="space-y-3">
                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-sm">
                    <strong>E-mail não chega:</strong> Verifique a pasta de spam/lixo eletrônico
                  </p>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-sm">
                    <strong>E-mail não cadastrado:</strong> Crie uma nova conta de filiado
                  </p>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-sm">
                    <strong>Ainda com problemas?</strong> Entre em contato pelo WhatsApp (81) 99999-0000
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}