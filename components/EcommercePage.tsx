import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Star, ShoppingCart, Heart, Filter } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
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

interface EcommercePageProps {
  user: User | null;
  onNavigate: (page: Page, productId?: number) => void;
}

const products = [
  {
    id: 1,
    name: 'Whey Protein Premium',
    category: 'Whey Protein',
    price: 89.90,
    originalPrice: 109.90,
    image: 'https://images.unsplash.com/photo-1693996045899-7cf0ac0229c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGV5JTIwcHJvdGVpbiUyMHN1cHBsZW1lbnQlMjBjb250YWluZXJ8ZW58MXx8fHwxNzU5NzU4Njg4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Whey Protein concentrado de alta qualidade, 1kg',
    rating: 4.8,
    reviews: 342,
    badge: 'Mais Vendido',
    badgeColor: 'destructive'
  },
  {
    id: 2,
    name: 'Creatina Monohidratada',
    category: 'Creatina',
    price: 49.90,
    originalPrice: 69.90,
    image: 'https://images.unsplash.com/photo-1693996046514-0406d0773a7d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGluZSUyMHN1cHBsZW1lbnQlMjBwb3dkZXJ8ZW58MXx8fHwxNzU5NzU4NjkxfDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Creatina monohidratada pura, 300g',
    rating: 4.9,
    reviews: 187,
    badge: 'Promoção',
    badgeColor: 'secondary'
  },
  {
    id: 3,
    name: 'BCAA 2:1:1 Premium',
    category: 'BCAA',
    price: 59.90,
    originalPrice: 79.90,
    image: 'https://images.unsplash.com/photo-1730388843790-f753ecf9ba94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiY2FhJTIwc3VwcGxlbWVudCUyMGNhcHN1bGVzfGVufDF8fHx8MTc1OTc1ODY5NHww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'BCAA em cápsulas, 120 caps',
    rating: 4.7,
    reviews: 203,
    badge: 'Novo',
    badgeColor: 'default'
  },
  {
    id: 4,
    name: 'Multivitamínico Completo',
    category: 'Vitaminas',
    price: 39.90,
    originalPrice: 59.90,
    image: 'https://images.unsplash.com/photo-1682978900142-9ab110f7a868?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aXRhbWlucyUyMHN1cHBsZW1lbnQlMjBib3R0bGVzfGVufDF8fHx8MTc1OTc1ODY5N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Complexo vitamínico e mineral, 60 caps',
    rating: 4.6,
    reviews: 156,
    badge: '',
    badgeColor: 'default'
  },
  {
    id: 5,
    name: 'Pre-Workout Extreme',
    category: 'Pre-Workout',
    price: 79.90,
    originalPrice: 99.90,
    image: 'https://images.unsplash.com/photo-1704650311162-153bbf7f17b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmUlMjB3b3Jrb3V0JTIwc3VwcGxlbWVudHxlbnwxfHx8fDE3NTk3NTg2OTl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Fórmula avançada para treinos intensos, 300g',
    rating: 4.8,
    reviews: 289,
    badge: 'Premium',
    badgeColor: 'outline'
  },
  {
    id: 6,
    name: 'Mass Gainer 3kg',
    category: 'Mass Gainer',
    price: 129.90,
    originalPrice: 159.90,
    image: 'https://images.unsplash.com/photo-1693996045899-7cf0ac0229c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXNzJTIwZ2FpbmVyJTIwcHJvdGVpbiUyMHBvd2RlcnxlbnwxfHx8fDE3NTk3NTg3MDN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Hipercalórico para ganho de massa, 3kg',
    rating: 4.7,
    reviews: 167,
    badge: 'Oferta',
    badgeColor: 'destructive'
  }
];

const categories = [
  'Todos', 'Whey Protein', 'Creatina', 'BCAA', 'Vitaminas', 'Pre-Workout', 'Mass Gainer'
];

export function EcommercePage({ user, onNavigate }: EcommercePageProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-foreground via-gray-900 to-gray-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <img 
              src={logoImage} 
              alt="Vital Recife Suplementos" 
              className="w-32 h-32 md:w-40 md:h-40 object-contain mx-auto mb-8 shadow-2xl rounded-2xl"
            />
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Vital Recife Suplementos
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Sua evolução fitness começa aqui. Suplementos de qualidade premium com sistema de gamificação exclusivo para filiados.
            </p>
            
            {user ? (
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button 
                  size="lg" 
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                  onClick={() => onNavigate('dashboard')}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Área do Filiado
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-black"
                  onClick={() => onNavigate('gamification')}
                >
                  Ver Gamificação
                </Button>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button 
                  size="lg" 
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                  onClick={() => onNavigate('register')}
                >
                  Tornar-se Filiado
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-black"
                  onClick={() => onNavigate('login')}
                >
                  Fazer Login
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Stats Section - Only for logged users */}
      {user && (
        <section className="py-12 bg-card">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-primary mb-2">
                    {user.referrals}
                  </div>
                  <p className="text-sm text-muted-foreground">Indicações Ativas</p>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    R$ {user.cashback.toFixed(2)}
                  </div>
                  <p className="text-sm text-muted-foreground">Cashback Disponível</p>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {user.points}
                  </div>
                  <p className="text-sm text-muted-foreground">Pontos Acumulados</p>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-purple-600 mb-2">
                    Nível {user.level}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {user.level >= 5 ? 'Gold' : user.level >= 3 ? 'Silver' : 'Bronze'}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      )}

      {/* Products Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Nossos Produtos
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Suplementos premium selecionados para potencializar seus resultados
            </p>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((category) => (
              <Button
                key={category}
                variant={category === 'Todos' ? 'default' : 'outline'}
                size="sm"
                className="mb-2"
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <Card 
                key={product.id} 
                className="group cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                onClick={() => onNavigate('product', product.id)}
              >
                <CardHeader className="p-0">
                  <div className="relative">
                    <ImageWithFallback
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    
                    {product.badge && (
                      <Badge 
                        className="absolute top-3 left-3"
                        variant={product.badgeColor as any}
                      >
                        {product.badge}
                      </Badge>
                    )}
                    
                    <Button
                      size="sm"
                      variant="outline"
                      className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                
                <CardContent className="p-4">
                  <Badge variant="outline" className="text-xs mb-2">
                    {product.category}
                  </Badge>
                  
                  <CardTitle className="text-lg mb-2 group-hover:text-primary transition-colors">
                    {product.name}
                  </CardTitle>
                  
                  <CardDescription className="text-sm mb-3">
                    {product.description}
                  </CardDescription>
                  
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                    <span className="text-sm text-muted-foreground ml-1">
                      {product.rating} ({product.reviews})
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-primary">
                        R$ {product.price.toFixed(2)}
                      </span>
                      {product.originalPrice > product.price && (
                        <span className="text-sm text-muted-foreground line-through">
                          R$ {product.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>
                </CardContent>
                
                <CardFooter className="p-4 pt-0">
                  <Button className="w-full" size="sm">
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Ver Produto
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {user ? 'Continue Evoluindo!' : 'Pronto para Evoluir?'}
          </h2>
          <p className="text-lg mb-8 opacity-90">
            {user 
              ? 'Acesse sua área de filiado e descubra novas formas de ganhar cashback'
              : 'Torne-se um filiado Vital Recife e ganhe cashback em cada indicação'
            }
          </p>
          <Button 
            size="lg" 
            variant="secondary"
            onClick={() => onNavigate(user ? 'gamification' : 'register')}
          >
            {user ? 'Ver Gamificação' : 'Tornar-se Filiado'}
          </Button>
        </div>
      </section>
    </div>
  );
}