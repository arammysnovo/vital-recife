import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Separator } from './ui/separator';
import { 
  Trophy, 
  Target, 
  Flame, 
  Star, 
  Gift, 
  CheckCircle, 
  Clock,
  TrendingUp,
  Users,
  Share2,
  ShoppingBag,
  Award
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

interface GamificationPageProps {
  user: User;
  onNavigate: (page: Page) => void;
}

const getLevelInfo = (level: number) => {
  if (level >= 5) return { 
    name: 'Gold', 
    color: 'bg-yellow-500', 
    textColor: 'text-yellow-600',
    nextLevel: 'Platinum', 
    nextLevelTarget: 10,
    benefits: ['R$ 25 por indicação', '5% cashback mensal', '25% desconto', 'Eventos exclusivos'],
    icon: '🥇'
  };
  if (level >= 3) return { 
    name: 'Silver', 
    color: 'bg-gray-400', 
    textColor: 'text-gray-600',
    nextLevel: 'Gold', 
    nextLevelTarget: 5,
    benefits: ['R$ 20 por indicação', '3% cashback mensal', '15% desconto', 'Material exclusivo'],
    icon: '🥈'
  };
  return { 
    name: 'Bronze', 
    color: 'bg-amber-600', 
    textColor: 'text-amber-600',
    nextLevel: 'Silver', 
    nextLevelTarget: 3,
    benefits: ['R$ 15 por indicação', '2% cashback mensal', 'Suporte prioritário'],
    icon: '🥉'
  };
};

const weeklyEngagement = 65; // Current week engagement percentage
const weeklyGoal = 70;

const challenges = [
  {
    id: 1,
    title: 'Filiado Platinum - Indicações',
    description: 'Indicar 5 novos filiados esta semana',
    progress: 2,
    target: 5,
    reward: { points: 800, cashback: 25 },
    icon: Users,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
    completed: false
  },
  {
    id: 2,
    title: 'Engajamento Semanal Gold',
    description: 'Manter 70%+ de engajamento semanal',
    progress: weeklyEngagement,
    target: weeklyGoal,
    reward: { points: 300, cashback: 15 },
    icon: Flame,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200',
    completed: weeklyEngagement >= weeklyGoal
  },
  {
    id: 3,
    title: 'Vendas em Equipe',
    description: 'Sua rede realizar 10 vendas esta semana',
    progress: 7,
    target: 10,
    reward: { points: 600, cashback: 35 },
    icon: ShoppingBag,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    completed: false
  },
  {
    id: 4,
    title: 'Interação Social',
    description: 'Compartilhar 15 vezes nas redes sociais',
    progress: 12,
    target: 15,
    reward: { points: 250, cashback: 10 },
    icon: Share2,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    completed: false
  }
];

export function GamificationPage({ user, onNavigate }: GamificationPageProps) {
  const [motivationalPhrase] = useState([
    "Sua evolução não para! 🚀",
    "Cada indicação é um passo maior! 💪",
    "Você está construindo seu império! 👑",
    "O sucesso ama a persistência! ⭐",
    "Transforme networking em renda! 💰"
  ][Math.floor(Math.random() * 5)]);

  const levelInfo = getLevelInfo(user.level);

  const handleClaimReward = (level: number, cashback: number) => {
    toast.success(`R$ ${cashback.toFixed(2)} de cashback resgatado!`);
    // In real app, this would update the user state
  };

  const handleCompleteChallenge = (challengeId: number, reward: { points: number; cashback: number }) => {
    toast.success(`Desafio concluído! +${reward.points} pontos + R$ ${reward.cashback}!`);
  };

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
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Central do Filiado
          </h1>
          <p className="text-xl text-muted-foreground mb-4">
            Complete desafios, ganhe pontos e suba de nível para desbloquear recompensas exclusivas
          </p>
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-4 max-w-2xl mx-auto">
            <p className="text-lg font-medium text-primary">
              {motivationalPhrase}
            </p>
          </div>
        </div>

        {/* Current Level Status */}
        <Card className="mb-8 bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="text-3xl">{levelInfo.icon}</div>
              <div>
                <span className="text-2xl">Nível {user.level} - {levelInfo.name}</span>
                <Badge className={`ml-3 ${levelInfo.color} text-white`}>
                  Filiado {levelInfo.name}
                </Badge>
              </div>
            </CardTitle>
            <CardDescription>
              Seus benefícios atuais como filiado {levelInfo.name}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Benefícios Ativos:</h4>
                <ul className="space-y-2">
                  {levelInfo.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Progresso para {levelInfo.nextLevel}:</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Indicações necessárias</span>
                    <span>{user.referrals}/{levelInfo.nextLevelTarget}</span>
                  </div>
                  <Progress 
                    value={(user.referrals / levelInfo.nextLevelTarget) * 100} 
                    className="h-3"
                  />
                  <p className="text-sm text-muted-foreground">
                    Faltam {Math.max(0, levelInfo.nextLevelTarget - user.referrals)} indicações para {levelInfo.nextLevel}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Engagement Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Indicações</p>
                  <p className="text-2xl font-bold text-blue-600">{user.referrals}</p>
                  <p className="text-xs text-muted-foreground">Total de indicações ativas</p>
                </div>
                <Users className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Cashback</p>
                  <p className="text-2xl font-bold text-green-600">R$ {user.cashback.toFixed(2)}</p>
                  <p className="text-xs text-muted-foreground">Disponível para saque</p>
                </div>
                <Gift className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Engajamento</p>
                  <p className="text-2xl font-bold text-orange-600">{weeklyEngagement}%</p>
                  <p className="text-xs text-muted-foreground">Meta semanal: {weeklyGoal}%</p>
                </div>
                <Flame className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Level Up Rewards */}
        {user.levelUpRewards.length > 0 && (
          <Card className="mb-8 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-800">
                <Award className="h-6 w-6" />
                🎉 Recompensas Disponíveis!
              </CardTitle>
              <CardDescription className="text-green-700">
                Parabéns! Você alcançou novos níveis e tem recompensas esperando
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {user.levelUpRewards.map((reward) => (
                  <div key={reward.level} className="flex items-center justify-between p-4 bg-white rounded-lg border border-green-200">
                    <div>
                      <p className="font-semibold text-green-800">
                        Recompensa do Nível {reward.level}
                      </p>
                      <p className="text-sm text-green-600">
                        R$ {reward.cashback.toFixed(2)} em cashback + pontos bônus
                      </p>
                    </div>
                    <Button 
                      onClick={() => handleClaimReward(reward.level, reward.cashback)}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      Resgatar Agora
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Weekly Challenges */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-6 w-6 text-primary" />
              Desafios Semanais com Cashback
            </CardTitle>
            <CardDescription>
              Complete os desafios e ganhe pontos + cashback real em dinheiro
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {challenges.map((challenge) => {
                const Icon = challenge.icon;
                const progressPercent = (challenge.progress / challenge.target) * 100;
                
                return (
                  <Card 
                    key={challenge.id} 
                    className={`${challenge.bgColor} border ${challenge.borderColor} ${
                      challenge.completed ? 'ring-2 ring-green-500' : ''
                    }`}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          <Icon className={`h-5 w-5 ${challenge.color}`} />
                          <CardTitle className="text-lg">{challenge.title}</CardTitle>
                        </div>
                        {challenge.completed && (
                          <CheckCircle className="h-6 w-6 text-green-500" />
                        )}
                      </div>
                      <CardDescription>{challenge.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span>Progresso</span>
                            <span>{challenge.progress}/{challenge.target}</span>
                          </div>
                          <Progress value={progressPercent} className="h-2" />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="text-sm">
                            <span className="font-medium">Recompensa:</span>
                            <div className="text-xs text-muted-foreground">
                              {challenge.reward.points} pontos + R$ {challenge.reward.cashback}
                            </div>
                          </div>
                          
                          {challenge.completed ? (
                            <Button 
                              size="sm" 
                              onClick={() => handleCompleteChallenge(challenge.id, challenge.reward)}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              Resgatar
                            </Button>
                          ) : (
                            <Badge variant="outline" className="text-xs">
                              <Clock className="h-3 w-3 mr-1" />
                              Em progresso
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Navigation CTAs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardContent className="pt-6" onClick={() => onNavigate('referral')}>
              <div className="text-center">
                <Users className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Programa de Indicações</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Gerencie suas indicações e maximize seus ganhos
                </p>
                <Button variant="outline" className="w-full">
                  Ir para Indicações
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardContent className="pt-6" onClick={() => onNavigate('dashboard')}>
              <div className="text-center">
                <TrendingUp className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Dashboard Completo</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Veja relatórios detalhados dos seus ganhos
                </p>
                <Button variant="outline" className="w-full">
                  Ver Dashboard
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}