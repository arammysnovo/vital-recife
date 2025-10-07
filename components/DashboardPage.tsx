import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  DollarSign, 
  Users, 
  TrendingUp, 
  Target, 
  Calendar,
  Download,
  BarChart3,
  PieChart,
  Activity,
  Award,
  Gift,
  Clock
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

interface DashboardPageProps {
  user: User;
  onNavigate: (page: Page) => void;
}

const monthlyData = [
  { month: 'Set', referrals: 2, cashback: 30, sales: 4 },
  { month: 'Out', referrals: 3, cashback: 45, sales: 7 },
  { month: 'Nov', referrals: 1, cashback: 15, sales: 2 },
  { month: 'Dez', referrals: 4, cashback: 75, sales: 9 },
  { month: 'Jan', referrals: 5, cashback: 95, sales: 12 }
];

const weeklyGoals = [
  { goal: 'Indicar 2 novos filiados', progress: 1, target: 2, reward: 'R$ 30', status: 'progress' },
  { goal: 'Manter 70% engajamento', progress: 65, target: 70, reward: 'R$ 15', status: 'progress' },
  { goal: 'Realizar 3 vendas na rede', progress: 3, target: 3, reward: 'R$ 25', status: 'completed' },
  { goal: 'Compartilhar 10x nas redes', progress: 7, target: 10, reward: '100 pts', status: 'progress' }
];

const recentActivities = [
  {
    id: 1,
    type: 'referral',
    description: 'Nova indicação: Maria Silva se tornou filiada',
    amount: 20,
    time: '2 horas atrás',
    icon: Users,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50'
  },
  {
    id: 2,
    type: 'cashback',
    description: 'Cashback recebido da venda de Pedro Santos',
    amount: 15,
    time: '5 horas atrás',
    icon: DollarSign,
    color: 'text-green-600',
    bgColor: 'bg-green-50'
  },
  {
    id: 3,
    type: 'level',
    description: 'Parabéns! Você alcançou o nível Silver',
    amount: 0,
    time: '1 dia atrás',
    icon: Award,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50'
  },
  {
    id: 4,
    type: 'challenge',
    description: 'Desafio "Engajamento Semanal" concluído',
    amount: 10,
    time: '2 dias atrás',
    icon: Target,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50'
  }
];

const getLevelInfo = (level: number) => {
  if (level >= 5) return { name: 'Gold', color: 'bg-yellow-500', icon: '🥇' };
  if (level >= 3) return { name: 'Silver', color: 'bg-gray-400', icon: '🥈' };
  return { name: 'Bronze', color: 'bg-amber-600', icon: '🥉' };
};

export function DashboardPage({ user, onNavigate }: DashboardPageProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const levelInfo = getLevelInfo(user.level);
  
  const totalEarningsThisYear = monthlyData.reduce((sum, month) => sum + month.cashback, 0);
  const totalReferralsThisYear = monthlyData.reduce((sum, month) => sum + month.referrals, 0);
  const averageMonthlyEarnings = totalEarningsThisYear / monthlyData.length;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard Filiado</h1>
            <p className="text-muted-foreground">
              Acompanhe seu desempenho e ganhos em tempo real
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Exportar Relatório
            </Button>
            <Button onClick={() => onNavigate('gamification')}>
              Ver Gamificação
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Cashback Total</p>
                  <p className="text-2xl font-bold text-green-600">
                    R$ {user.cashback.toFixed(2)}
                  </p>
                  <p className="text-xs text-muted-foreground">Disponível para saque</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Indicações Ativas</p>
                  <p className="text-2xl font-bold text-blue-600">{user.referrals}</p>
                  <p className="text-xs text-muted-foreground">+2 este mês</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Nível Atual</p>
                  <div className="flex items-center gap-2">
                    <p className="text-2xl font-bold">{user.level}</p>
                    <Badge className={`${levelInfo.color} text-white`}>
                      {levelInfo.name}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{user.nextLevelProgress}% para próximo</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">{levelInfo.icon}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Média Mensal</p>
                  <p className="text-2xl font-bold text-purple-600">
                    R$ {averageMonthlyEarnings.toFixed(0)}
                  </p>
                  <p className="text-xs text-muted-foreground">Últimos 5 meses</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Visão Geral
            </TabsTrigger>
            <TabsTrigger value="performance" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Performance
            </TabsTrigger>
            <TabsTrigger value="goals" className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              Metas
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <PieChart className="h-4 w-4" />
              Análises
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Monthly Performance Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-primary" />
                    Performance Mensal
                  </CardTitle>
                  <CardDescription>
                    Evolução dos seus ganhos nos últimos meses
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {monthlyData.map((data, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="font-medium text-sm w-8">{data.month}</span>
                          <div className="flex-1">
                            <div className="flex justify-between text-xs mb-1">
                              <span>R$ {data.cashback}</span>
                              <span>{data.referrals} indicações</span>
                            </div>
                            <Progress 
                              value={Math.min((data.cashback / 100) * 100, 100)} 
                              className="h-2"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    Atividade Recente
                  </CardTitle>
                  <CardDescription>
                    Suas últimas atividades como filiado
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivities.map((activity) => {
                      const Icon = activity.icon;
                      return (
                        <div key={activity.id} className={`flex items-start gap-3 p-3 rounded-lg ${activity.bgColor}`}>
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${activity.bgColor}`}>
                            <Icon className={`h-4 w-4 ${activity.color}`} />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">{activity.description}</p>
                            <div className="flex items-center justify-between mt-1">
                              <span className="text-xs text-muted-foreground">{activity.time}</span>
                              {activity.amount > 0 && (
                                <span className={`text-sm font-bold ${activity.color}`}>
                                  +R$ {activity.amount}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Gráfico de Ganhos</CardTitle>
                  <CardDescription>
                    Visualização detalhada da sua evolução financeira
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-muted rounded-lg">
                    <div className="text-center">
                      <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                      <p className="text-muted-foreground">Gráfico de Performance</p>
                      <p className="text-sm text-muted-foreground">Dados dos últimos 12 meses</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Estatísticas</CardTitle>
                  <CardDescription>Resumo dos seus números</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Taxa de Conversão</span>
                      <span className="font-medium">12.5%</span>
                    </div>
                    <Progress value={12.5} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Engajamento Médio</span>
                      <span className="font-medium">68%</span>
                    </div>
                    <Progress value={68} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Meta Mensal</span>
                      <span className="font-medium">85%</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>

                  <div className="pt-4 border-t">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Próximo Saque</span>
                      <Badge variant="outline">5 dias</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="goals" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  Metas Semanais
                </CardTitle>
                <CardDescription>
                  Complete suas metas e ganhe recompensas extras
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {weeklyGoals.map((goal, index) => (
                    <Card key={index} className={`${
                      goal.status === 'completed' 
                        ? 'bg-green-50 border-green-200' 
                        : 'bg-gray-50'
                    }`}>
                      <CardContent className="pt-4">
                        <div className="flex items-start justify-between mb-3">
                          <h4 className="font-medium text-sm">{goal.goal}</h4>
                          {goal.status === 'completed' && (
                            <Badge className="bg-green-600">Concluído</Badge>
                          )}
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Progresso</span>
                            <span>{goal.progress}/{goal.target}</span>
                          </div>
                          <Progress 
                            value={(goal.progress / goal.target) * 100} 
                            className="h-2"
                          />
                        </div>
                        
                        <div className="flex justify-between items-center mt-3">
                          <span className="text-sm text-muted-foreground">
                            Recompensa: {goal.reward}
                          </span>
                          {goal.status === 'completed' && (
                            <Button size="sm" className="bg-green-600 hover:bg-green-700">
                              Resgatar
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Distribuição de Ganhos</CardTitle>
                  <CardDescription>
                    Como seus ganhos estão distribuídos
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-muted rounded-lg">
                    <div className="text-center">
                      <PieChart className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                      <p className="text-muted-foreground">Gráfico de Pizza</p>
                      <p className="text-sm text-muted-foreground">Distribuição por fonte</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Insights e Recomendações</CardTitle>
                  <CardDescription>
                    Dicas para melhorar sua performance
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm font-medium text-blue-800">💡 Dica de Performance</p>
                    <p className="text-xs text-blue-600 mt-1">
                      Compartilhe seu link nas redes sociais para aumentar conversões
                    </p>
                  </div>

                  <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                    <p className="text-sm font-medium text-green-800">🎯 Meta Recomendada</p>
                    <p className="text-xs text-green-600 mt-1">
                      Tente indicar 1-2 novos filiados por semana
                    </p>
                  </div>

                  <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                    <p className="text-sm font-medium text-purple-800">🚀 Oportunidade</p>
                    <p className="text-xs text-purple-600 mt-1">
                      Você está a 1 indicação do próximo nível!
                    </p>
                  </div>

                  <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                    <p className="text-sm font-medium text-orange-800">📊 Análise</p>
                    <p className="text-xs text-orange-600 mt-1">
                      Seu melhor dia para indicações é terça-feira
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}