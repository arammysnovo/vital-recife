import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Checkbox } from './ui/checkbox';
import { Eye, EyeOff, Mail, Lock, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import logoImage from 'figma:asset/5f0600645dd56fd710c73a40be1a5062c930b655.png';

interface User {
  name: string;
  email: string;
  phone: string;
  points: number;
  level: number;
  referralCode: string;
  referrals: number;
  cashback: number;
  affiliatePoints: number;
  nextLevelProgress: number;
  levelUpRewards: { level: number; cashback: number }[];
}

type Page = 'ecommerce' | 'product' | 'login' | 'register' | 'reset-password' | 'user-area' | 'dashboard' | 'gamification' | 'referral' | 'profile';

interface LoginPageProps {
  onNavigate: (page: Page) => void;
  onLogin: (user: User) => void;
}

export function LoginPage({ onNavigate, onLogin }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error('Preencha todos os campos');
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      // Demo login - in real app, this would validate credentials
      const userData: User = {
        name: 'João Silva',
        email: email,
        phone: '(81) 99999-0000',
        points: 1250,
        level: 3, // Silver level
        referralCode: 'JOAO123',
        referrals: 5,
        cashback: 45.50,
        affiliatePoints: 850,
        nextLevelProgress: 65,
        levelUpRewards: [
          { level: 3, cashback: 50.00 }
        ]
      };

      onLogin(userData);
      toast.success(`Bem-vindo de volta, ${userData.name}!`);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-foreground via-gray-900 to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Button 
          variant="ghost" 
          onClick={() => onNavigate('ecommerce')}
          className="mb-6 text-white hover:text-primary"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar à loja
        </Button>

        <Card className="shadow-2xl">
          <CardHeader className="text-center space-y-4">
            <img 
              src={logoImage} 
              alt="Vital Recife Suplementos" 
              className="w-20 h-20 object-contain mx-auto shadow-lg rounded-xl"
            />
            <div>
              <CardTitle className="text-2xl">Entrar</CardTitle>
              <CardDescription>
                Acesse sua conta de filiado Vital Recife
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-primary" />
                  E-mail
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="flex items-center gap-2">
                  <Lock className="h-4 w-4 text-primary" />
                  Senha
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Sua senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="h-12 pr-12"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={setRememberMe}
                  />
                  <Label htmlFor="remember" className="text-sm">
                    Lembrar de mim
                  </Label>
                </div>
                <Button
                  type="button"
                  variant="link"
                  onClick={() => onNavigate('reset-password')}
                  className="text-sm text-primary hover:text-primary/80"
                >
                  Esqueceu a senha?
                </Button>
              </div>

              <Button
                type="submit"
                className="w-full h-12"
                disabled={isLoading}
              >
                {isLoading ? 'Entrando...' : 'Entrar'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Não tem uma conta?{' '}
                <Button
                  variant="link"
                  onClick={() => onNavigate('register')}
                  className="text-primary hover:text-primary/80 p-0"
                >
                  Cadastre-se agora
                </Button>
              </p>
            </div>

            {/* Benefits Section */}
            <div className="mt-8 pt-6 border-t border-border">
              <h4 className="font-semibold text-center mb-4">
                Benefícios do Filiado Vital Recife
              </h4>
              <div className="grid grid-cols-1 gap-3">
                <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-primary-foreground text-sm font-bold">💰</span>
                  </div>
                  <div>
                    <p className="font-medium text-sm">Cashback Garantido</p>
                    <p className="text-xs text-muted-foreground">R$ 15-25 por indicação</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">🏆</span>
                  </div>
                  <div>
                    <p className="font-medium text-sm">Sistema de Gamificação</p>
                    <p className="text-xs text-muted-foreground">Níveis e recompensas</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">👥</span>
                  </div>
                  <div>
                    <p className="font-medium text-sm">Programa de Indicações</p>
                    <p className="text-xs text-muted-foreground">Ganhe por cada indicação</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Demo Credentials */}
        <Card className="mt-4 bg-yellow-50 border-yellow-200">
          <CardContent className="pt-4">
            <p className="text-sm text-yellow-800 text-center">
              <strong>Demo:</strong> Use qualquer e-mail e senha para entrar
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}