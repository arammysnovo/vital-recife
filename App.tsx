import { useState } from 'react';
import { Toaster } from './components/ui/sonner';
import { Navbar } from './components/Navbar';
import { ProductPage } from './components/ProductPage';
import { LoginPage } from './components/LoginPage';
import { RegisterPage } from './components/RegisterPage';
import { ResetPasswordPage } from './components/ResetPasswordPage';
import { EcommercePage } from './components/EcommercePage';
import { UserAreaPage } from './components/UserAreaPage';
import { DashboardPage } from './components/DashboardPage';
import { GamificationPage } from './components/GamificationPage';
import { ReferralPage } from './components/ReferralPage';
import { ProfilePage } from './components/ProfilePage';

type Page = 'ecommerce' | 'product' | 'login' | 'register' | 'reset-password' | 'user-area' | 'dashboard' | 'gamification' | 'referral' | 'profile';

interface User {
  name: string;
  email: string;
  phone: string;
  points: number;
  level: number;
  referralCode: string;
  referrals: number;
  cashback: number;
  affiliatePoints: number; // Pontos específicos para trocar por cupons
  nextLevelProgress: number; // Progresso para próximo nível (0-100)
  levelUpRewards: { level: number; cashback: number }[]; // Recompensas pendentes por subir de nível
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('ecommerce');
  const [user, setUser] = useState<User | null>(null);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);

  const handleLogin = (userData: User) => {
    setUser(userData);
    setCurrentPage('ecommerce');
  };

  const handleRegister = (userData: User) => {
    setUser(userData);
    setCurrentPage('ecommerce');
  };

  const handleUpdateUser = (userData: User) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('ecommerce');
  };

  const handleNavigate = (page: Page, productId?: number) => {
    if (page === 'product' && productId) {
      setSelectedProductId(productId);
    }
    setCurrentPage(page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'ecommerce':
        return <EcommercePage user={user} onNavigate={handleNavigate} />;
      case 'product':
        return <ProductPage productId={selectedProductId} user={user} onNavigate={handleNavigate} />;
      case 'login':
        return <LoginPage onNavigate={handleNavigate} onLogin={handleLogin} />;
      case 'register':
        return <RegisterPage onNavigate={handleNavigate} onRegister={handleRegister} />;
      case 'reset-password':
        return <ResetPasswordPage onNavigate={handleNavigate} />;
      case 'user-area':
        return user ? <UserAreaPage user={user} onNavigate={handleNavigate} /> : <EcommercePage user={user} onNavigate={handleNavigate} />;
      case 'dashboard':
        return user ? <DashboardPage user={user} onNavigate={handleNavigate} /> : <EcommercePage user={user} onNavigate={handleNavigate} />;
      case 'gamification':
        return user ? <GamificationPage user={user} onNavigate={handleNavigate} /> : <EcommercePage user={user} onNavigate={handleNavigate} />;
      case 'referral':
        return user ? <ReferralPage user={user} onNavigate={handleNavigate} /> : <EcommercePage user={user} onNavigate={handleNavigate} />;
      case 'profile':
        return user ? <ProfilePage user={user} onNavigate={handleNavigate} onUpdateUser={handleUpdateUser} /> : <EcommercePage user={user} onNavigate={handleNavigate} />;
      default:
        return <EcommercePage user={user} onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar currentPage={currentPage} onNavigate={handleNavigate} user={user} />
      <main>
        {renderPage()}
      </main>
      <Toaster />
    </div>
  );
}