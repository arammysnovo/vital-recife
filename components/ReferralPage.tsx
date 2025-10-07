import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Progress } from './ui/progress';
import { 
  Users, 
  Copy, 
  Share2, 
  DollarSign, 
  Gift, 
  Crown, 
  TrendingUp,
  Calendar,
  ExternalLink,
  CheckCircle,
  Star,
  Smartphone,
  Mail
} from 'lucide-react';
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

interface ReferralPageProps {
  user: User;
  onNavigate: (page: Page) => void;
}

const getLevelInfo = (level: number) => {
  if (level >= 5) return { 
    name: 'Gold', 
    color: 'bg-yellow-500', 
    textColor: 'text-yellow-600',
    cashbackPerReferral: 25,
    monthlyCashback: 5,
    discount: 25,
    benefits: ['Eventos exclusivos', 'Consultor pessoal'],
    icon: '👑'
  };
  if (level >= 3) return { 
    name: 'Silver', 
    color: 'bg-gray-400', 
    textColor: 'text-gray-600',
    cashbackPerReferral: 20,
    monthlyCashback: 3,
    discount: 15,
    benefits: ['Material exclusivo', 'Suporte VIP'],
    icon: '⭐'
  };
  return { 
    name: 'Bronze', 
    color: 'bg-amber-600', 
    textColor: 'text-amber-600',
    cashbackPerReferral: 15,
    monthlyCashback: 2,
    discount: 0,
    benefits: ['Suporte prioritário'],
    icon: '🥉'
  };
};

const referralHistory = [
  {
    id: 1,
    name: 'Maria Silva',
    email: 'maria@email.com',
    joinDate: '15 Jan 2024',
    status: 'Ativa',
    purchases: 3,
    earned: 60.00,
    level: 'Filiada',
    isAffiliate: true
  },
  {
    id: 2,
    name: 'João Santos',
    email: 'joao@email.com',
    joinDate: '12 Jan 2024',
    status: 'Ativa',
    purchases: 5,
    earned: 75.00,
    level: 'Filiado',
    isAffiliate: true
  },
  {
    id: 3,
    name: 'Ana Costa',
    email: 'ana@email.com',
    joinDate: '08 Jan 2024',
    status: 'Cliente',
    purchases: 1,
    earned: 15.00,
    level: 'Cliente',
    isAffiliate: false
  },
  {
    id: 4,
    name: 'Pedro Oliveira',
    email: 'pedro@email.com',
    joinDate: '05 Jan 2024',
    status: 'Ativa',
    purchases: 2,
    earned: 40.00,
    level: 'Filiado',
    isAffiliate: true
  }
];

const recentClicks = [
  { origin: 'WhatsApp', clicks: 23, conversions: 3, time: '2h atrás' },
  { origin: 'Instagram', clicks: 15, conversions: 1, time: '4h atrás' },
  { origin: 'Link Direto', clicks: 8, conversions: 2, time: '6h atrás' },
  { origin: 'Facebook', clicks: 12, conversions: 0, time: '1d atrás' }
];

export function ReferralPage({ user, onNavigate }: ReferralPageProps) {
  const [shareMethod, setShareMethod] = useState<'link' | 'whatsapp' | 'email'>('link');
  const levelInfo = getLevelInfo(user.level);
  const referralLink = `https://vitalrecife.com/ref/${user.referralCode}`;
  
  const nextLevelTarget = user.level >= 5 ? 10 : user.level >= 3 ? 5 : 3;
  const progressToNext = (user.referrals / nextLevelTarget) * 100;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    toast.success('Link copiado para a área de transferência!');
  };

  const handleWhatsAppShare = () => {
    const message = `Oi! 🌟 Descobri a Vital Recife Suplementos e quero te indicar!\n\n💪 Suplementos de qualidade premium\n🎯 Sistema de filiados com cashback\n🏆 Programa de gamificação exclusivo\n\nUse meu link e ganhe 20% de desconto na primeira compra:\n${referralLink}\n\nVale muito a pena! 🚀`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleEmailShare = () => {
    const subject = `${user.name} te indicou a Vital Recife Suplementos!`;
    const body = `Olá!\n\nQuero te indicar a Vital Recife Suplementos, uma empresa incrível de suplementos premium!\n\n🌟 Por que você vai amar:\n• Produtos de altíssima qualidade\n• Preços competitivos\n• Sistema de filiados com ganhos reais\n• Programa de gamificação único\n\n🎁 Oferta especial para você:\nUse meu link de indicação e ganhe 20% de desconto na primeira compra:\n\n${referralLink}\n\nQualquer dúvida, me chama!\n\nAbraços,\n${user.name}`;
    
    const mailtoUrl = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
  };

  const totalEarned = referralHistory.reduce((sum, ref) => sum + ref.earned, 0);
  const activeAffiliates = referralHistory.filter(ref => ref.isAffiliate).length;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <img 
            src={logoImage} 
            alt="Vital Recife Suplementos" 
            className="w-20 h-20 object-contain mx-auto mb-4 shadow-lg rounded-xl"
          />
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="text-4xl">{levelInfo.icon}</div>
            <h1 className="text-4xl font-bold text-foreground">Programa Filiado VIP</h1>
          </div>
          <p className="text-xl text-muted-foreground mb-4">
            Ganhe cashback real indicando novos filiados para a Vital Recife
          </p>
          <Badge className={`${levelInfo.color} text-white text-lg px-4 py-2`}>
            Status: Filiado {levelInfo.name}
          </Badge>
        </div>

        {/* Level Progress */}
        <Card className="mb-8 bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Crown className="h-6 w-6 text-primary" />
              Progresso do Filiado
            </CardTitle>
            <CardDescription>
              Você está no nível {levelInfo.name} - Continue indicando para subir de nível!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Benefícios Atuais:</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-green-500" />
                    <span className="text-sm">R$ {levelInfo.cashbackPerReferral} por indicação</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-blue-500" />
                    <span className="text-sm">{levelInfo.monthlyCashback}% cashback mensal</span>
                  </div>
                  {levelInfo.discount > 0 && (
                    <div className="flex items-center gap-2">
                      <Gift className="h-4 w-4 text-purple-500" />
                      <span className="text-sm">{levelInfo.discount}% desconto em produtos</span>
                    </div>
                  )}
                  {levelInfo.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3">Próximo Nível:</h4>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Indicações necessárias</span>
                    <span>{user.referrals}/{nextLevelTarget}</span>
                  </div>
                  <Progress value={progressToNext} className="h-3" />
                  <p className="text-sm text-muted-foreground">
                    {nextLevelTarget - user.referrals > 0 
                      ? `Faltam ${nextLevelTarget - user.referrals} indicações para o próximo nível`
                      : 'Parabéns! Você atingiu o nível máximo!'
                    }
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Filiados Ativos</p>
                  <p className="text-2xl font-bold text-blue-600">{activeAffiliates}</p>
                </div>
                <Users className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Ganho</p>
                  <p className="text-2xl font-bold text-green-600">R$ {totalEarned.toFixed(2)}</p>
                </div>
                <DollarSign className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Este Mês</p>
                  <p className="text-2xl font-bold text-purple-600">R$ {user.cashback.toFixed(2)}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Taxa Conversão</p>
                  <p className="text-2xl font-bold text-orange-600">12.5%</p>
                </div>
                <Star className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Referral Link Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Share2 className="h-6 w-6 text-primary" />
              Seu Link de Indicação
            </CardTitle>
            <CardDescription>
              Compartilhe este link e ganhe R$ {levelInfo.cashbackPerReferral} por cada novo filiado
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-2">
                <Input 
                  value={referralLink} 
                  readOnly 
                  className="font-mono text-sm bg-muted"
                />
                <Button onClick={handleCopyLink} variant="outline">
                  <Copy className="h-4 w-4 mr-2" />
                  Copiar
                </Button>
              </div>

              <div className="flex gap-2">
                <Button 
                  onClick={handleWhatsAppShare} 
                  className="flex-1 bg-green-600 hover:bg-green-700"
                >
                  <Smartphone className="h-4 w-4 mr-2" />
                  Compartilhar no WhatsApp
                </Button>
                <Button 
                  onClick={handleEmailShare} 
                  variant="outline" 
                  className="flex-1"
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Enviar por E-mail
                </Button>
              </div>

              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  Seu código: <span className="font-mono font-bold text-primary">{user.referralCode}</span>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Recent Clicks */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ExternalLink className="h-5 w-5 text-primary" />
                Cliques Recentes
              </CardTitle>
              <CardDescription>
                Acompanhe o desempenho do seu link
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentClicks.map((click, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div>
                      <p className="font-medium text-sm">{click.origin}</p>
                      <p className="text-xs text-muted-foreground">
                        {click.clicks} cliques • {click.conversions} conversões
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">
                        {((click.conversions / click.clicks) * 100).toFixed(1)}%
                      </p>
                      <p className="text-xs text-muted-foreground">{click.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Cashback History */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-green-600" />
                Histórico de Cashback
              </CardTitle>
              <CardDescription>
                Seus ganhos dos últimos meses
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                  <div>
                    <p className="font-medium text-sm text-green-800">Janeiro 2024</p>
                    <p className="text-xs text-green-600">3 indicações • 2 filiados</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-green-700">R$ 45,00</p>
                    <Badge variant="outline" className="text-xs border-green-300 text-green-600">
                      Disponível
                    </Badge>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div>
                    <p className="font-medium text-sm text-blue-800">Dezembro 2023</p>
                    <p className="text-xs text-blue-600">5 indicações • 4 filiados</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-blue-700">R$ 75,00</p>
                    <Badge className="text-xs bg-blue-600">Sacado</Badge>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg border border-purple-200">
                  <div>
                    <p className="font-medium text-sm text-purple-800">Novembro 2023</p>
                    <p className="text-xs text-purple-600">2 indicações • 2 filiados</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-purple-700">R$ 30,00</p>
                    <Badge className="text-xs bg-purple-600">Sacado</Badge>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t">
                <Button className="w-full" disabled={user.cashback < 50}>
                  {user.cashback >= 50 
                    ? `Sacar R$ ${user.cashback.toFixed(2)}` 
                    : `Saque mínimo: R$ 50,00 (faltam R$ ${(50 - user.cashback).toFixed(2)})`
                  }
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Referral History */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-6 w-6 text-primary" />
              Histórico de Indicações
            </CardTitle>
            <CardDescription>
              Pessoas que você indicou e seus status atuais
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {referralHistory.map((referral) => (
                <div 
                  key={referral.id} 
                  className={`p-4 rounded-lg border ${
                    referral.isAffiliate 
                      ? 'bg-green-50 border-green-200' 
                      : 'bg-blue-50 border-blue-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium">{referral.name}</h4>
                        <Badge 
                          variant={referral.isAffiliate ? 'default' : 'secondary'}
                          className={referral.isAffiliate ? 'bg-green-600' : 'bg-blue-600'}
                        >
                          {referral.level}
                        </Badge>
                        {referral.status === 'Ativa' && (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{referral.email}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {referral.joinDate}
                        </span>
                        <span>{referral.purchases} compras</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg text-green-600">
                        +R$ {referral.earned.toFixed(2)}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {referral.isAffiliate ? 'Cashback recorrente' : 'Cashback único'}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}