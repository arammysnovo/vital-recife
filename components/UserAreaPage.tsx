import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { 
  LayoutDashboard, 
  Trophy, 
  Users, 
  Settings, 
  TrendingUp, 
  DollarSign, 
  Gift,
  Calendar,
  Target,
  Award
} from 'lucide-react';

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

interface UserAreaPageProps {
  user: User;
  onNavigate: (page: Page) => void;
}

const getLevelInfo = (level: number) => {
  if (level >= 5) return { name: 'Gold', color: 'bg-yellow-500', nextLevel: 'Platinum', nextLevelTarget: 10 };
  if (level >= 3) return { name: 'Silver', color: 'bg-gray-400', nextLevel: 'Gold', nextLevelTarget: 5 };
  return { name: 'Bronze', color: 'bg-amber-600', nextLevel: 'Silver', nextLevelTarget: 3 };
};

const getEngagementLevel = (progress: number) => {
  if (progress >= 80) return { level: 'Excelente', color: 'text-green-600', description: 'Parabéns! Você está super engajado!' };
  if (progress >= 60) return { level: 'Bom', color: 'text-blue-600', description: 'Continue assim para manter o ritmo!' };
  if (progress >= 40) return { level: 'Regular', color: 'text-yellow-600', description: 'Você pode melhorar seu engajamento.' };
  return { level: 'Baixo', color: 'text-red-600', description: 'Precisa de mais atividade para crescer.' };
};

export function UserAreaPage({ user, onNavigate }: UserAreaPageProps) {
  const levelInfo = getLevelInfo(user.level);
  const engagementInfo = getEngagementLevel(user.nextLevelProgress);
  
  // Calculate weekly progress
  const weeklyGoal = 70;
  const currentEngagement = user.nextLevelProgress;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Bem-vindo, {user.name}!
          </h1>
          <p className="text-muted-foreground">
            Gerencie sua conta de filiado e acompanhe seus ganhos
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Cashback</p>
                  <p className="text-2xl font-bold text-green-600">
                    R$ {user.cashback.toFixed(2)}
                  </p>
                </div>
                <DollarSign className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Indicações</p>
                  <p className="text-2xl font-bold text-blue-600">{user.referrals}</p>
                </div>
                <Users className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Nível</p>
                  <div className="flex items-center gap-2">
                    <p className="text-2xl font-bold">{user.level}</p>
                    <Badge className={`${levelInfo.color} text-white`}>
                      {levelInfo.name}
                    </Badge>
                  </div>
                </div>
                <Trophy className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Pontos Cupom</p>
                  <p className="text-2xl font-bold text-purple-600">{user.affiliatePoints}</p>
                </div>
                <Gift className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Progress Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Level Progress */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Progresso para {levelInfo.nextLevel}
              </CardTitle>
              <CardDescription>
                Você precisa de {levelInfo.nextLevelTarget - user.level} níveis para alcançar {levelInfo.nextLevel}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span>Progresso atual</span>
                  <span>{user.nextLevelProgress}%</span>
                </div>
                <Progress value={user.nextLevelProgress} className="h-3" />
                <p className="text-sm text-muted-foreground">
                  Continue indicando novos filiados para subir de nível!
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Weekly Engagement */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Engajamento Semanal
              </CardTitle>
              <CardDescription>
                Meta semanal: {weeklyGoal}% de engajamento
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span>Engajamento atual</span>
                  <span className={engagementInfo.color}>
                    {currentEngagement}% - {engagementInfo.level}
                  </span>
                </div>
                <Progress 
                  value={currentEngagement} 
                  className="h-3"
                />
                <p className="text-sm text-muted-foreground">
                  {engagementInfo.description}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card 
            className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
            onClick={() => onNavigate('dashboard')}
          >
            <CardContent className="pt-6 text-center">
              <LayoutDashboard className="h-12 w-12 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold mb-2">Dashboard</h3>
              <p className="text-sm text-muted-foreground">
                Visão geral dos seus ganhos e estatísticas
              </p>
            </CardContent>
          </Card>

          <Card 
            className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
            onClick={() => onNavigate('gamification')}
          >
            <CardContent className="pt-6 text-center">
              <Trophy className="h-12 w-12 text-yellow-500 mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold mb-2">Gamificação</h3>
              <p className="text-sm text-muted-foreground">
                Desafios, níveis e recompensas
              </p>
            </CardContent>
          </Card>

          <Card 
            className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
            onClick={() => onNavigate('referral')}
          >
            <CardContent className="pt-6 text-center">
              <Users className="h-12 w-12 text-blue-500 mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold mb-2">Indicações</h3>
              <p className="text-sm text-muted-foreground">
                Gerencie seu programa de indicações
              </p>
            </CardContent>
          </Card>

          <Card 
            className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
            onClick={() => onNavigate('profile')}
          >
            <CardContent className="pt-6 text-center">
              <Settings className="h-12 w-12 text-gray-500 mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold mb-2">Perfil</h3>
              <p className="text-sm text-muted-foreground">
                Edite suas informações pessoais
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Atividade Recente
            </CardTitle>
            <CardDescription>
              Suas últimas atividades como filiado
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-3 bg-green-50 rounded-lg border border-green-200">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <DollarSign className="h-4 w-4 text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-green-800">Cashback recebido</p>
                  <p className="text-sm text-green-600">R$ 20,00 da indicação de Maria Silva</p>
                </div>
                <span className="text-xs text-green-600">Hoje</span>
              </div>

              <div className="flex items-center gap-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <Users className="h-4 w-4 text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-blue-800">Nova indicação</p>
                  <p className="text-sm text-blue-600">Pedro Santos se tornou filiado</p>
                </div>
                <span className="text-xs text-blue-600">2 dias</span>
              </div>

              <div className="flex items-center gap-4 p-3 bg-purple-50 rounded-lg border border-purple-200">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                  <Award className="h-4 w-4 text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-purple-800">Nível alcançado</p>
                  <p className="text-sm text-purple-600">Parabéns! Você chegou ao nível Silver</p>
                </div>
                <span className="text-xs text-purple-600">1 semana</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Rewards Alert */}
        {user.levelUpRewards.length > 0 && (
          <Card className="mt-6 bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                  <Gift className="h-6 w-6 text-primary-foreground" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">
                    🎉 Você tem recompensas disponíveis!
                  </h3>
                  <p className="text-muted-foreground">
                    {user.levelUpRewards.length} recompensa(s) de nível esperando por você
                  </p>
                </div>
                <Button onClick={() => onNavigate('gamification')}>
                  Resgatar Agora
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}