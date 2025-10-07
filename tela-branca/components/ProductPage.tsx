import { useState } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Separator } from './ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { 
  Star, 
  ShoppingCart, 
  Heart, 
  Share2, 
  Minus, 
  Plus, 
  ArrowLeft,
  Truck,
  Shield,
  Award,
  Users
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { toast } from 'sonner@2.0.3';

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

interface ProductPageProps {
  productId: number | null;
  user: User | null;
  onNavigate: (page: Page, productId?: number) => void;
}

const productDetails = {
  1: {
    id: 1,
    name: 'Whey Protein Premium',
    price: 89.90,
    originalPrice: 109.90,
    images: [
      'https://images.unsplash.com/photo-1693996045899-7cf0ac0229c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGV5JTIwcHJvdGVpbiUyMHN1cHBsZW1lbnQlMjBjb250YWluZXJ8ZW58MXx8fHwxNzU5NzU4Njg4fDA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1693996046514-0406d0773a7d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGluZSUyMHN1cHBsZW1lbnQlMjBwb3dkZXJ8ZW58MXx8fHwxNzU5NzU4NjkxfDA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    rating: 4.8,
    reviews: 342,
    description: 'Whey Protein Premium da Vital Recife é produzido com tecnologia de ponta, garantindo máxima absorção e resultados superiores. Ideal para atletas e praticantes de atividade física que buscam ganho de massa muscular e recuperação acelerada.',
    ingredients: ['Proteína do soro do leite concentrada', 'Saborizantes naturais', 'Edulcorantes: sucralose e acessulfame-K', 'Lecitina de soja', 'Complexo enzimático'],
    howToUse: 'Misture 1 scoop (30g) com 200ml de água ou leite. Consuma 2-3 porções ao dia, preferencialmente após o treino e entre as refeições.',
    nutritionalInfo: {
      portion: '30g (1 scoop)',
      protein: '24g',
      carbs: '2g',
      fat: '1g',
      calories: '110'
    },
    badge: 'Mais Vendido',
    stock: 47
  },
  2: {
    id: 2,
    name: 'Creatina Monohidratada',
    price: 49.90,
    originalPrice: 69.90,
    images: [
      'https://images.unsplash.com/photo-1693996046514-0406d0773a7d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGluZSUyMHN1cHBsZW1lbnQlMjBwb3dkZXJ8ZW58MXx8fHwxNzU5NzU4NjkxfDA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    rating: 4.9,
    reviews: 187,
    description: 'Creatina monohidratada pura, sem aditivos. Aumenta a força, potência e resistência muscular. Produto de alta qualidade para máxima performance.',
    ingredients: ['Creatina monohidratada pura 100%'],
    howToUse: 'Fase de saturação: 20g divididos em 4 doses de 5g por 5 dias. Manutenção: 3-5g diários.',
    nutritionalInfo: {
      portion: '5g',
      protein: '0g',
      carbs: '0g',
      fat: '0g',
      calories: '0'
    },
    badge: 'Promoção',
    stock: 23
  }
};

const relatedProducts = [
  {
    id: 3,
    name: 'BCAA 2:1:1 Premium',
    price: 59.90,
    image: 'https://images.unsplash.com/photo-1730388843790-f753ecf9ba94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiY2FhJTIwc3VwcGxlbWVudCUyMGNhcHN1bGVzfGVufDF8fHx8MTc1OTc1ODY5NHww&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.7
  },
  {
    id: 4,
    name: 'Multivitamínico Completo',
    price: 39.90,
    image: 'https://images.unsplash.com/photo-1682978900142-9ab110f7a868?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aXRhbWlucyUyMHN1cHBsZW1lbnQlMjBib3R0bGVzfGVufDF8fHx8MTc1OTc1ODY5N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.6
  }
];

const reviews = [
  {
    id: 1,
    user: 'Carlos Silva',
    rating: 5,
    comment: 'Excelente produto! Resultados visíveis em poucas semanas. Recomendo!',
    date: '15 Jan 2024',
    verified: true
  },
  {
    id: 2,
    user: 'Maria Santos',
    rating: 5,
    comment: 'Melhor whey que já usei. Sabor ótimo e dissolve perfeitamente.',
    date: '12 Jan 2024',
    verified: true
  },
  {
    id: 3,
    user: 'João Oliveira',
    rating: 4,
    comment: 'Produto de qualidade, entrega rápida. Já estou no segundo pote.',
    date: '08 Jan 2024',
    verified: false
  }
];

export function ProductPage({ productId, user, onNavigate }: ProductPageProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  const product = productId ? productDetails[productId as keyof typeof productDetails] : null;

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Produto não encontrado</h2>
          <Button onClick={() => onNavigate('ecommerce')}>
            Voltar à loja
          </Button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    toast.success(`${quantity}x ${product.name} adicionado ao carrinho!`);
  };

  const handleBuyNow = () => {
    if (!user) {
      toast.info('Faça login para finalizar a compra');
      onNavigate('login');
      return;
    }
    toast.success('Redirecionando para pagamento...');
  };

  const discountPercent = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="bg-muted py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button 
            variant="ghost" 
            onClick={() => onNavigate('ecommerce')}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar à loja
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square relative overflow-hidden rounded-lg bg-muted">
              <ImageWithFallback
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.badge && (
                <Badge className="absolute top-4 left-4 z-10">
                  {product.badge}
                </Badge>
              )}
            </div>
            
            {product.images.length > 1 && (
              <div className="flex gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square w-20 rounded-md overflow-hidden border-2 ${
                      selectedImage === index ? 'border-primary' : 'border-transparent'
                    }`}
                  >
                    <ImageWithFallback
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                {product.name}
              </h1>
              
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.rating} ({product.reviews} avaliações)
                </span>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl font-bold text-primary">
                  R$ {product.price.toFixed(2)}
                </span>
                {product.originalPrice > product.price && (
                  <>
                    <span className="text-lg text-muted-foreground line-through">
                      R$ {product.originalPrice.toFixed(2)}
                    </span>
                    <Badge variant="destructive">
                      -{discountPercent}%
                    </Badge>
                  </>
                )}
              </div>
            </div>

            <Separator />

            {/* Quantity Selector */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <label className="font-medium">Quantidade:</label>
                <div className="flex items-center border rounded-md">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="px-4 py-2 min-w-[60px] text-center">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.stock} em estoque
                </span>
              </div>

              <div className="flex gap-3">
                <Button size="lg" onClick={handleBuyNow} className="flex-1">
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Comprar Agora
                </Button>
                <Button size="lg" variant="outline" onClick={handleAddToCart} className="flex-1">
                  Adicionar ao Carrinho
                </Button>
                <Button size="lg" variant="outline">
                  <Heart className="h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Benefits */}
            <div className="space-y-3 p-4 bg-muted rounded-lg">
              <div className="flex items-center gap-3">
                <Truck className="h-5 w-5 text-primary" />
                <span className="text-sm">Frete grátis para compras acima de R$ 99</span>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-primary" />
                <span className="text-sm">Garantia de qualidade Vital Recife</span>
              </div>
              <div className="flex items-center gap-3">
                <Award className="h-5 w-5 text-primary" />
                <span className="text-sm">Produto certificado e testado</span>
              </div>
              {user && (
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-primary" />
                  <span className="text-sm">
                    Indique e ganhe {user.level >= 5 ? 'R$ 25' : user.level >= 3 ? 'R$ 20' : 'R$ 15'} por indicação
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-12">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="description">Descrição</TabsTrigger>
            <TabsTrigger value="ingredients">Ingredientes</TabsTrigger>
            <TabsTrigger value="howto">Como Usar</TabsTrigger>
            <TabsTrigger value="reviews">Avaliações</TabsTrigger>
          </TabsList>
          
          <TabsContent value="description" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Descrição do Produto</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
                
                <div className="mt-6">
                  <h4 className="font-semibold mb-3">Informações Nutricionais</h4>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <div className="text-center p-3 bg-muted rounded-lg">
                      <div className="font-bold text-lg">{product.nutritionalInfo.calories}</div>
                      <div className="text-sm text-muted-foreground">Calorias</div>
                    </div>
                    <div className="text-center p-3 bg-muted rounded-lg">
                      <div className="font-bold text-lg">{product.nutritionalInfo.protein}</div>
                      <div className="text-sm text-muted-foreground">Proteína</div>
                    </div>
                    <div className="text-center p-3 bg-muted rounded-lg">
                      <div className="font-bold text-lg">{product.nutritionalInfo.carbs}</div>
                      <div className="text-sm text-muted-foreground">Carboidratos</div>
                    </div>
                    <div className="text-center p-3 bg-muted rounded-lg">
                      <div className="font-bold text-lg">{product.nutritionalInfo.fat}</div>
                      <div className="text-sm text-muted-foreground">Gorduras</div>
                    </div>
                    <div className="text-center p-3 bg-muted rounded-lg col-span-2 md:col-span-1">
                      <div className="font-bold text-lg">{product.nutritionalInfo.portion}</div>
                      <div className="text-sm text-muted-foreground">Porção</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="ingredients" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Lista de Ingredientes</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {product.ingredients.map((ingredient, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-primary rounded-full"></span>
                      {ingredient}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="howto" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Como Usar</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {product.howToUse}
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="reviews" className="mt-6">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Avaliações dos Clientes</CardTitle>
                  <CardDescription>
                    {product.reviews} avaliações • Média {product.rating}/5
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {reviews.map((review) => (
                      <div key={review.id} className="border-b pb-4 last:border-b-0">
                        <div className="flex items-start gap-4">
                          <Avatar>
                            <AvatarFallback>
                              {review.user.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium">{review.user}</span>
                              {review.verified && (
                                <Badge variant="outline" className="text-xs">
                                  Compra verificada
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-2 mb-2">
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${
                                      i < review.rating
                                        ? 'text-yellow-400 fill-current'
                                        : 'text-gray-300'
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="text-sm text-muted-foreground">
                                {review.date}
                              </span>
                            </div>
                            <p className="text-muted-foreground">
                              {review.comment}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Related Products */}
        <section>
          <h3 className="text-2xl font-bold mb-6">Produtos Relacionados</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <Card 
                key={relatedProduct.id}
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => onNavigate('product', relatedProduct.id)}
              >
                <CardHeader className="p-0">
                  <ImageWithFallback
                    src={relatedProduct.image}
                    alt={relatedProduct.name}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                </CardHeader>
                <CardContent className="p-4">
                  <CardTitle className="text-lg mb-2">{relatedProduct.name}</CardTitle>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-primary">
                      R$ {relatedProduct.price.toFixed(2)}
                    </span>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm">{relatedProduct.rating}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}