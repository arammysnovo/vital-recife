import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { ArrowRight, Shield, Zap, Trophy, Users, Star } from 'lucide-react';
import logoImage from 'figma:asset/18df517babfdcb5ab3f1165fa99e35d8f00678f3.png';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const features = [
    {
      icon: Shield,
      title: "Qualidade Premium",
      description: "Produtos certificados e testados por especialistas"
    },
    {
      icon: Zap,
      title: "Entrega Rápida",
      description: "Receba em casa com rapidez e segurança"
    },
    {
      icon: Trophy,
      title: "Sistema de Pontos",
      description: "Ganhe pontos a cada compra e troque por descontos"
    },
    {
      icon: Users,
      title: "Programa de Indicação",
      description: "Indique amigos e ganhe cashback em cada venda"
    }
  ];

  const stats = [
    { number: "10k+", label: "Clientes Satisfeitos" },
    { number: "500+", label: "Produtos Premium" },
    { number: "98%", label: "Satisfação" },
    { number: "24h", label: "Suporte" }
  ];

  return (
    <div className="min-h-screen bg-background">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%2523ADFF2F%22%20fill-opacity%3D%220.05%22%3E%3Cpath%20d%3D%22m36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Content */}
            <div className="text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start mb-8">
                <img src={logoImage} alt="Vital Recife" className="h-16 w-16 mr-4" />
                <div>
                  <h1 className="text-4xl font-bold text-white">VITAL RECIFE</h1>
                  <p className="text-primary text-lg font-medium">SUPLEMENTOS</p>
                </div>
              </div>
              
              <h2 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Transforme seu
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-green-400 block">
                  Potencial
                </span>
              </h2>
              
              <p className="text-xl text-gray-300 mb-8 max-w-2xl">
                Descubra os melhores suplementos do Recife. Qualidade premium, 
                resultados reais e um sistema de recompensas único que te motiva 
                a alcançar seus objetivos.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button 
                  size="lg" 
                  className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-4 h-auto"
                  onClick={() => onNavigate('register')}
                >
                  Começar Agora
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-slate-900 text-lg px-8 py-4 h-auto"
                  onClick={() => onNavigate('login')}
                >
                  Fazer Login
                </Button>
              </div>
            </div>
            
            {/* Hero Image/Animation */}
            <div className="relative">
              <div className="relative w-full max-w-md mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-green-400/20 rounded-full blur-3xl"></div>
                <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
                  <div className="grid grid-cols-2 gap-4">
                    {stats.map((stat, index) => (
                      <div key={index} className="text-center">
                        <div className="text-2xl font-bold text-white">{stat.number}</div>
                        <div className="text-sm text-gray-300">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Por que escolher a Vital Recife?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Mais que uma loja de suplementos, somos seu parceiro na jornada fitness
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <blockquote className="text-2xl font-medium text-gray-900 mb-4">
              "A melhor experiência em suplementos que já tive. Produtos de qualidade e um atendimento excepcional!"
            </blockquote>
            <cite className="text-gray-600">
              — Maria Silva, Cliente há 2 anos
            </cite>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-slate-900 to-slate-800">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Pronto para transformar seus resultados?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Junte-se a milhares de pessoas que já transformaram suas vidas com nossos produtos
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-4 h-auto"
              onClick={() => onNavigate('register')}
            >
              Criar Conta Gratuita
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-slate-900 text-lg px-8 py-4 h-auto"
              onClick={() => onNavigate('login')}
            >
              Já tenho conta
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <img src={logoImage} alt="Vital Recife" className="h-10 w-10 mr-3" />
              <div>
                <h3 className="font-bold text-gray-900">VITAL RECIFE</h3>
                <p className="text-sm text-gray-600">SUPLEMENTOS</p>
              </div>
            </div>
            <div className="text-center md:text-right">
              <p className="text-gray-600 text-sm">
                © 2024 Vital Recife. Todos os direitos reservados.
              </p>
              <p className="text-gray-500 text-xs mt-1">
                Desenvolvido com ❤️ no Recife
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}