import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Switch } from './ui/switch';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { 
  User, 
  Mail, 
  Phone, 
  Lock, 
  Bell, 
  Shield, 
  CreditCard,
  Settings,
  Eye,
  EyeOff,
  Copy,
  Camera
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

interface ProfilePageProps {
  user: User;
  onNavigate: (page: Page) => void;
  onUpdateUser: (userData: User) => void;
}

const getLevelInfo = (level: number) => {
  if (level >= 5) return { name: 'Gold', color: 'bg-yellow-500', icon: '����' };
  if (level >= 3) return { name: 'Silver', color: 'bg-gray-400', icon: '🥈' };
  return { name: 'Bronze', color: 'bg-amber-600', icon: '🥉' };
};

export function ProfilePage({ user, onNavigate, onUpdateUser }: ProfilePageProps) {
  const [activeTab, setActiveTab] = useState('personal');
  const [isEditing, setIsEditing] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [notifications, setNotifications] = useState({
    emailMarketing: true,
    pushNotifications: true,
    smsMarketing: false,
    weeklyReports: true,
    newReferrals: true,
    levelUp: true
  });

  const [privacy, setPrivacy] = useState({
    showProfile: true,
    showEarnings: false,
    allowMessages: true
  });

  const levelInfo = getLevelInfo(user.level);

  const handleSaveProfile = () => {
    if (!formData.name || !formData.email || !formData.phone) {
      toast.error('Preencha todos os campos obrigatórios');
      return;
    }

    const updatedUser: User = {
      ...user,
      name: formData.name,
      email: formData.email,
      phone: formData.phone
    };

    onUpdateUser(updatedUser);
    setIsEditing(false);
    toast.success('Perfil atualizado com sucesso!');
  };

  const handleChangePassword = () => {
    if (!formData.currentPassword || !formData.newPassword || !formData.confirmPassword) {
      toast.error('Preencha todos os campos de senha');
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error('As senhas não coincidem');
      return;
    }

    if (formData.newPassword.length < 6) {
      toast.error('A nova senha deve ter pelo menos 6 caracteres');
      return;
    }

    // In real app, verify current password
    toast.success('Senha alterada com sucesso!');
    setFormData({
      ...formData,
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };

  const handleCopyReferralCode = () => {
    navigator.clipboard.writeText(user.referralCode);
    toast.success('Código de indicação copiado!');
  };

  const handleUpdateNotifications = (key: string, value: boolean) => {
    setNotifications({ ...notifications, [key]: value });
    toast.success('Preferências de notificação atualizadas!');
  };

  const handleUpdatePrivacy = (key: string, value: boolean) => {
    setPrivacy({ ...privacy, [key]: value });
    toast.success('Configurações de privacidade atualizadas!');
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 flex items-center gap-4">
          <img 
            src={logoImage} 
            alt="Vital Recife Suplementos" 
            className="w-16 h-16 object-contain shadow-md rounded-lg"
          />
          <div>
            <h1 className="text-3xl font-bold text-foreground">Configurações do Perfil</h1>
            <p className="text-muted-foreground">
              Gerencie suas informações pessoais e preferências da conta
            </p>
          </div>
        </div>

        {/* Profile Summary Card */}
        <Card className="mb-8 bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
          <CardContent className="pt-6">
            <div className="flex items-center gap-6">
              <div className="relative">
                <Avatar className="w-20 h-20">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                    {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <Button
                  size="sm"
                  variant="outline"
                  className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0"
                >
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-2xl font-bold">{user.name}</h2>
                  <Badge className={`${levelInfo.color} text-white`}>
                    {levelInfo.icon} {levelInfo.name}
                  </Badge>
                </div>
                <p className="text-muted-foreground mb-2">{user.email}</p>
                <div className="flex items-center gap-4 text-sm">
                  <span>Filiado desde: Janeiro 2024</span>
                  <span>•</span>
                  <span>Código: {user.referralCode}</span>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    onClick={handleCopyReferralCode}
                    className="p-1 h-auto"
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
              </div>

              <div className="text-right">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Cashback Total</p>
                  <p className="text-2xl font-bold text-green-600">R$ {user.cashback.toFixed(2)}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="personal" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Dados Pessoais
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Segurança
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Notificações
            </TabsTrigger>
            <TabsTrigger value="account" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Conta
            </TabsTrigger>
          </TabsList>

          <TabsContent value="personal" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Informações Pessoais</CardTitle>
                    <CardDescription>
                      Atualize suas informações básicas de perfil
                    </CardDescription>
                  </div>
                  <Button
                    variant={isEditing ? "outline" : "default"}
                    onClick={() => {
                      if (isEditing) {
                        setFormData({
                          ...formData,
                          name: user.name,
                          email: user.email,
                          phone: user.phone
                        });
                      }
                      setIsEditing(!isEditing);
                    }}
                  >
                    {isEditing ? 'Cancelar' : 'Editar'}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome Completo</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefone</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>

                {isEditing && (
                  <div className="flex gap-3 pt-4">
                    <Button onClick={handleSaveProfile}>
                      Salvar Alterações
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Account Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Estatísticas da Conta</CardTitle>
                <CardDescription>
                  Resumo da sua performance como filiado
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <p className="text-2xl font-bold text-blue-600">{user.referrals}</p>
                    <p className="text-sm text-muted-foreground">Indicações Ativas</p>
                  </div>
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <p className="text-2xl font-bold text-green-600">R$ {user.cashback.toFixed(2)}</p>
                    <p className="text-sm text-muted-foreground">Cashback Total</p>
                  </div>
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <p className="text-2xl font-bold text-purple-600">{user.points}</p>
                    <p className="text-sm text-muted-foreground">Pontos Acumulados</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Alterar Senha</CardTitle>
                <CardDescription>
                  Mantenha sua conta segura com uma senha forte
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Senha Atual</Label>
                  <div className="relative">
                    <Input
                      id="currentPassword"
                      type={showCurrentPassword ? 'text' : 'password'}
                      value={formData.currentPassword}
                      onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                      placeholder="Digite sua senha atual"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    >
                      {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">Nova Senha</Label>
                    <div className="relative">
                      <Input
                        id="newPassword"
                        type={showNewPassword ? 'text' : 'password'}
                        value={formData.newPassword}
                        onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                        placeholder="Digite a nova senha"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-3 top-1/2 -translate-y-1/2"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                      >
                        {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirmar Nova Senha</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      placeholder="Confirme a nova senha"
                    />
                  </div>
                </div>

                <Button onClick={handleChangePassword}>
                  Alterar Senha
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Configurações de Privacidade</CardTitle>
                <CardDescription>
                  Controle quem pode ver suas informações
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="showProfile">Perfil Público</Label>
                    <p className="text-sm text-muted-foreground">
                      Permitir que outros filiados vejam seu perfil
                    </p>
                  </div>
                  <Switch
                    id="showProfile"
                    checked={privacy.showProfile}
                    onCheckedChange={(checked) => handleUpdatePrivacy('showProfile', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="showEarnings">Mostrar Ganhos</Label>
                    <p className="text-sm text-muted-foreground">
                      Exibir seus ganhos em rankings públicos
                    </p>
                  </div>
                  <Switch
                    id="showEarnings"
                    checked={privacy.showEarnings}
                    onCheckedChange={(checked) => handleUpdatePrivacy('showEarnings', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="allowMessages">Mensagens Diretas</Label>
                    <p className="text-sm text-muted-foreground">
                      Permitir que outros filiados te enviem mensagens
                    </p>
                  </div>
                  <Switch
                    id="allowMessages"
                    checked={privacy.allowMessages}
                    onCheckedChange={(checked) => handleUpdatePrivacy('allowMessages', checked)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Preferências de Notificação</CardTitle>
                <CardDescription>
                  Escolha como e quando você quer ser notificado
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="emailMarketing">E-mails de Marketing</Label>
                    <p className="text-sm text-muted-foreground">
                      Receber ofertas e promoções por e-mail
                    </p>
                  </div>
                  <Switch
                    id="emailMarketing"
                    checked={notifications.emailMarketing}
                    onCheckedChange={(checked) => handleUpdateNotifications('emailMarketing', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="pushNotifications">Notificações Push</Label>
                    <p className="text-sm text-muted-foreground">
                      Receber alertas no navegador e mobile
                    </p>
                  </div>
                  <Switch
                    id="pushNotifications"
                    checked={notifications.pushNotifications}
                    onCheckedChange={(checked) => handleUpdateNotifications('pushNotifications', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="smsMarketing">SMS Marketing</Label>
                    <p className="text-sm text-muted-foreground">
                      Receber ofertas por mensagem de texto
                    </p>
                  </div>
                  <Switch
                    id="smsMarketing"
                    checked={notifications.smsMarketing}
                    onCheckedChange={(checked) => handleUpdateNotifications('smsMarketing', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="weeklyReports">Relatórios Semanais</Label>
                    <p className="text-sm text-muted-foreground">
                      Resumo semanal da sua performance
                    </p>
                  </div>
                  <Switch
                    id="weeklyReports"
                    checked={notifications.weeklyReports}
                    onCheckedChange={(checked) => handleUpdateNotifications('weeklyReports', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="newReferrals">Novas Indicações</Label>
                    <p className="text-sm text-muted-foreground">
                      Ser notificado quando alguém usar seu link
                    </p>
                  </div>
                  <Switch
                    id="newReferrals"
                    checked={notifications.newReferrals}
                    onCheckedChange={(checked) => handleUpdateNotifications('newReferrals', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="levelUp">Subida de Nível</Label>
                    <p className="text-sm text-muted-foreground">
                      Celebrar quando você subir de nível
                    </p>
                  </div>
                  <Switch
                    id="levelUp"
                    checked={notifications.levelUp}
                    onCheckedChange={(checked) => handleUpdateNotifications('levelUp', checked)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="account" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Informações da Conta</CardTitle>
                <CardDescription>
                  Dados importantes sobre sua conta de filiado
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Código de Indicação</Label>
                    <div className="flex gap-2">
                      <Input value={user.referralCode} readOnly className="font-mono" />
                      <Button variant="outline" onClick={handleCopyReferralCode}>
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Status da Conta</Label>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-green-50 border-green-200 text-green-700">
                        Ativa
                      </Badge>
                      <Badge className={`${levelInfo.color} text-white`}>
                        Filiado {levelInfo.name}
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Membro desde</Label>
                    <Input value="Janeiro 2024" readOnly />
                  </div>

                  <div className="space-y-2">
                    <Label>Última atividade</Label>
                    <Input value="Hoje, 14:30" readOnly />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-destructive/20">
              <CardHeader>
                <CardTitle className="text-destructive">Zona de Perigo</CardTitle>
                <CardDescription>
                  Ações irreversíveis que afetam sua conta
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-destructive/20 rounded-lg bg-destructive/5">
                  <div>
                    <h4 className="font-medium">Desativar Conta</h4>
                    <p className="text-sm text-muted-foreground">
                      Suspender temporariamente sua conta de filiado
                    </p>
                  </div>
                  <Button variant="outline" className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground">
                    Desativar
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 border border-destructive/20 rounded-lg bg-destructive/5">
                  <div>
                    <h4 className="font-medium">Excluir Conta</h4>
                    <p className="text-sm text-muted-foreground">
                      Remover permanentemente sua conta e todos os dados
                    </p>
                  </div>
                  <Button variant="destructive">
                    Excluir Conta
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}