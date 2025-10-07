import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Checkbox } from './ui/checkbox';
import { Eye, EyeOff, Mail, Lock, User, Phone, ArrowLeft, Gift } from 'lucide-react';
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

interface RegisterPageProps {
  onNavigate: (page: Page) => void;
  onRegister: (user: User) => void;
}

const generateReferralCode = (name: string): string => {
  const nameCode = name
    .split(' ')
    .map(n => n.charAt(0))
    .join('')
    .toUpperCase();
  const randomNum = Math.floor(Math.random() * 999) + 1;
  return `${nameCode}${randomNum.toString().padStart(3, '0')}`;
};

export function RegisterPage({ onNavigate, onRegister }: RegisterPageProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    referralCode: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [acceptNewsletter, setAcceptNewsletter] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.phone || !formData.password) {
      toast.error('Preencha todos os campos obrigatórios');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('As senhas não coincidem');
      return;
    }

    if (formData.password.length < 6) {
      toast.error('A senha deve ter pelo menos 6 caracteres');
      return;
    }

    if (!acceptTerms) {
      toast.error('Você deve aceitar os termos de uso');
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const userReferralCode = generateReferralCode(formData.name);
      
      const userData: User = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        points: formData.referralCode ? 100 : 0, // Bonus points for using referral
        level: 1, // Bronze level
        referralCode: userReferralCode,
        referrals: 0,
        cashback: 0,
        affiliatePoints: formData.referralCode ? 100 : 0,
        nextLevelProgress: 0,
        levelUpRewards: []
      };

      onRegister(userData);
      
      if (formData.referralCode) {
        toast.success(`Cadastro realizado! Você ganhou 100 pontos por usar o código ${formData.referralCode}!`);
      } else {
        toast.success(`Bem-vindo, ${userData.name}! Seu código de indicação é ${userReferralCode}`);
      }
      
      setIsLoading(false);
    }, 2000);
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
              <CardTitle className="text-2xl">Tornar-se Filiado</CardTitle>
              <CardDescription>
                Crie sua conta e comece a ganhar cashback hoje mesmo
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center gap-2">
                  <User className="h-4 w-4 text-primary" />
                  Nome Completo *
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Seu nome completo"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  required
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-primary" />
                  E-mail *
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  required
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-primary" />
                  Telefone *
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="(81) 99999-0000"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  required
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="flex items-center gap-2">
                  <Lock className="h-4 w-4 text-primary" />
                  Senha *
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Mínimo 6 caracteres"
                    value={formData.password}
                    onChange={(e) => handleChange('password', e.target.value)}
                    required
                    className="h-11 pr-12"
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

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmar Senha *</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Digite novamente sua senha"
                    value={formData.confirmPassword}
                    onChange={(e) => handleChange('confirmPassword', e.target.value)}
                    required
                    className="h-11 pr-12"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="referralCode" className="flex items-center gap-2">
                  <Gift className="h-4 w-4 text-primary" />
                  Código de Indicação (opcional)
                </Label>
                <Input
                  id="referralCode"
                  type="text"
                  placeholder="Ex: JOAO123"
                  value={formData.referralCode}
                  onChange={(e) => handleChange('referralCode', e.target.value.toUpperCase())}
                  className="h-11"
                />
                <p className="text-xs text-muted-foreground">
                  Ganhe 100 pontos extras ao usar um código de indicação!
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="terms"
                    checked={acceptTerms}
                    onCheckedChange={setAcceptTerms}
                    className="mt-1"
                  />
                  <Label htmlFor="terms" className="text-sm leading-5">
                    Aceito os{' '}
                    <Button variant="link" className="p-0 h-auto text-primary">
                      termos de uso
                    </Button>{' '}
                    e{' '}
                    <Button variant="link" className="p-0 h-auto text-primary">
                      política de privacidade
                    </Button>
                  </Label>
                </div>

                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="newsletter"
                    checked={acceptNewsletter}
                    onCheckedChange={setAcceptNewsletter}
                    className="mt-1"
                  />
                  <Label htmlFor="newsletter" className="text-sm leading-5">
                    Quero receber promoções e novidades por e-mail
                  </Label>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-12"
                disabled={isLoading}
              >
                {isLoading ? 'Criando conta...' : 'Criar Conta Filiado'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Já tem uma conta?{' '}
                <Button
                  variant="link"
                  onClick={() => onNavigate('login')}
                  className="text-primary hover:text-primary/80 p-0"
                >
                  Faça login
                </Button>
              </p>
            </div>

            {/* Benefits Section */}
            <div className="mt-8 pt-6 border-t border-border">
              <h4 className="font-semibold text-center mb-4">
                Como Filiado Você Ganha:
              </h4>
              <div className="grid grid-cols-1 gap-3">
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="text-2xl">💰</div>
                  <div>
                    <p className="font-medium text-sm text-green-800">R$ 15-25 por indicação</p>
                    <p className="text-xs text-green-600">Cashback recorrente</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="text-2xl">🏆</div>
                  <div>
                    <p className="font-medium text-sm text-blue-800">Sistema de níveis</p>
                    <p className="text-xs text-blue-600">Bronze → Silver → Gold</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg border border-purple-200">
                  <div className="text-2xl">🎮</div>
                  <div>
                    <p className="font-medium text-sm text-purple-800">Desafios semanais</p>
                    <p className="text-xs text-purple-600">Ganhe pontos e cashback extra</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}