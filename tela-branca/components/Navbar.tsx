import { useState } from 'react';
import { Button } from './ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from './ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { 
  User, 
  LayoutDashboard, 
  Trophy, 
  Users, 
  Settings, 
  LogOut,
  Menu,
  X,
  ShoppingCart
} from 'lucide-react';
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

interface NavbarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  user: User | null;
}

const getLevelBadge = (level: number) => {
  if (level >= 5) return { name: 'Gold', color: 'bg-yellow-500' };
  if (level >= 3) return { name: 'Silver', color: 'bg-gray-400' };
  return { name: 'Bronze', color: 'bg-amber-600' };
};

export function Navbar({ currentPage, onNavigate, user }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    // Logic handled in App.tsx
    window.location.reload();
  };

  const levelInfo = user ? getLevelBadge(user.level) : null;

  return (
    <nav className="bg-white border-b border-border sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div 
            className="flex items-center cursor-pointer" 
            onClick={() => onNavigate('ecommerce')}
          >
            <img 
              src={logoImage} 
              alt="Vital Recife Suplementos" 
              className="w-12 h-12 object-contain shadow-md rounded-lg"
            />
            <div className="ml-3 hidden sm:block">
              <h1 className="text-xl font-bold text-foreground">Vital Recife</h1>
              <p className="text-xs text-muted-foreground">Suplementos</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Button
              variant={currentPage === 'ecommerce' ? 'default' : 'ghost'}
              onClick={() => onNavigate('ecommerce')}
              className="flex items-center gap-2"
            >
              <ShoppingCart className="h-4 w-4" />
              Produtos
            </Button>
            
            {user && (
              <>
                <Button
                  variant={currentPage === 'dashboard' ? 'default' : 'ghost'}
                  onClick={() => onNavigate('dashboard')}
                  className="flex items-center gap-2"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard
                </Button>
                
                <Button
                  variant={currentPage === 'gamification' ? 'default' : 'ghost'}
                  onClick={() => onNavigate('gamification')}
                  className="flex items-center gap-2"
                >
                  <Trophy className="h-4 w-4" />
                  Gamificação
                </Button>
                
                <Button
                  variant={currentPage === 'referral' ? 'default' : 'ghost'}
                  onClick={() => onNavigate('referral')}
                  className="flex items-center gap-2"
                >
                  <Users className="h-4 w-4" />
                  Indicações
                </Button>
              </>
            )}
          </div>

          {/* User Menu / Auth Buttons */}
          <div className="flex items-center space-x-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center space-x-3 cursor-pointer">
                  <div className="text-right">
                    <p className="text-sm font-medium text-foreground">{user.name}</p>
                    <div className="flex items-center gap-2">
                      {levelInfo && (
                        <Badge 
                          variant="secondary" 
                          className={`text-xs ${levelInfo.color} text-white`}
                        >
                          {levelInfo.name}
                        </Badge>
                      )}
                      <span className="text-xs text-muted-foreground">
                        R$ {user.cashback.toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem onClick={() => onNavigate('user-area')}>
                    <User className="mr-2 h-4 w-4" />
                    Área do Usuário
                  </DropdownMenuItem>
                  
                  <DropdownMenuItem onClick={() => onNavigate('dashboard')}>
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    Dashboard
                  </DropdownMenuItem>
                  
                  <DropdownMenuItem onClick={() => onNavigate('gamification')}>
                    <Trophy className="mr-2 h-4 w-4" />
                    Gamificação
                  </DropdownMenuItem>
                  
                  <DropdownMenuItem onClick={() => onNavigate('referral')}>
                    <Users className="mr-2 h-4 w-4" />
                    Indicações
                  </DropdownMenuItem>
                  
                  <DropdownMenuItem onClick={() => onNavigate('profile')}>
                    <Settings className="mr-2 h-4 w-4" />
                    Perfil
                  </DropdownMenuItem>
                  
                  <DropdownMenuSeparator />
                  
                  <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    Sair
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-3">
                <Button 
                  variant="outline" 
                  onClick={() => onNavigate('login')}
                  size="sm"
                >
                  Entrar
                </Button>
                <Button 
                  onClick={() => onNavigate('register')}
                  size="sm"
                >
                  Cadastrar
                </Button>
              </div>
            )}

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col space-y-2">
              <Button
                variant={currentPage === 'ecommerce' ? 'default' : 'ghost'}
                onClick={() => {
                  onNavigate('ecommerce');
                  setIsMobileMenuOpen(false);
                }}
                className="justify-start"
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Produtos
              </Button>
              
              {user && (
                <>
                  <Button
                    variant={currentPage === 'user-area' ? 'default' : 'ghost'}
                    onClick={() => {
                      onNavigate('user-area');
                      setIsMobileMenuOpen(false);
                    }}
                    className="justify-start"
                  >
                    <User className="mr-2 h-4 w-4" />
                    Área do Usuário
                  </Button>
                  
                  <Button
                    variant={currentPage === 'dashboard' ? 'default' : 'ghost'}
                    onClick={() => {
                      onNavigate('dashboard');
                      setIsMobileMenuOpen(false);
                    }}
                    className="justify-start"
                  >
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    Dashboard
                  </Button>
                  
                  <Button
                    variant={currentPage === 'gamification' ? 'default' : 'ghost'}
                    onClick={() => {
                      onNavigate('gamification');
                      setIsMobileMenuOpen(false);
                    }}
                    className="justify-start"
                  >
                    <Trophy className="mr-2 h-4 w-4" />
                    Gamificação
                  </Button>
                  
                  <Button
                    variant={currentPage === 'referral' ? 'default' : 'ghost'}
                    onClick={() => {
                      onNavigate('referral');
                      setIsMobileMenuOpen(false);
                    }}
                    className="justify-start"
                  >
                    <Users className="mr-2 h-4 w-4" />
                    Indicações
                  </Button>
                  
                  <Button
                    variant={currentPage === 'profile' ? 'default' : 'ghost'}
                    onClick={() => {
                      onNavigate('profile');
                      setIsMobileMenuOpen(false);
                    }}
                    className="justify-start"
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    Perfil
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}