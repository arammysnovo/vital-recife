# Prompt para Reprodução: E-commerce Vital Recife Suplementos

## Contexto Base
Crie um e-commerce completo para a empresa **Vital Recife Suplementos** com design profissional nível Silicon Valley. O sistema deve usar as cores oficiais da logo: **verde limão vibrante (#ADFF2F)** e **preto (#0f0f23)** como cores principais.

## Estrutura Técnica
- **Framework:** React com TypeScript
- **Styling:** Tailwind CSS v4.0
- **Componentes:** shadcn/ui
- **Ícones:** lucide-react
- **Toasts:** sonner@2.0.3

## Arquitetura do Sistema

### 1. Página Principal (EcommercePage)
- **Catálogo de produtos** como primeira tela
- Grid responsivo de produtos com imagens do Unsplash
- **Categorias:** Whey Protein, Creatina, BCAA, Vitaminas, Pre-Workout, Mass Gainer
- Header com botão de login/cadastro
- Funciona sem necessidade de login
- Ao clicar no produto → navega para ProductPage

### 2. Página de Produto (ProductPage)
- Design inspirado no site **Primo Suplementos**
- Galeria de imagens profissional
- **Tabs informativos:** Descrição, Ingredientes, Como Usar, Avaliações
- Seção de produtos relacionados
- Sistema de avaliações com estrelas
- Botão de compra com quantidade

### 3. Sistema de Autenticação
- **LoginPage:** Login com email/senha
- **RegisterPage:** Cadastro com geração automática de código de indicação
- **ResetPasswordPage:** Recuperação de senha
- Integração completa com estado global do usuário

### 4. Área do Usuário (UserAreaPage)
- Dashboard personalizado
- Menu lateral com navegação para todas as seções
- Resumo de atividades e estatísticas

## Sistema de Gamificação (GamificationPage)

### Foco Principal: Programa de Filiados
- **Central do Filiado** como título principal
- Sistema de **engajamento semanal** com meta de 70%
- Barra de progresso visual para engajamento

### Estatísticas do Filiado
1. **Indicações:** Número de pessoas indicadas
2. **Cashback:** Valor total disponível em R$
3. **Engajamento:** Percentual semanal (meta 70%)
4. **Status:** Bronze/Silver/Gold baseado no nível

### Desafios Semanais com Cashback
1. **Filiado Platinum - Indicações**
   - Meta: Indicar 5 novos filiados
   - Recompensa: 800 pontos + R$ 25,00 cashback

2. **Engajamento Semanal Gold**
   - Meta: Manter 70%+ de engajamento
   - Recompensa: 300 pontos + R$ 15,00 cashback

3. **Vendas em Equipe**
   - Meta: Rede realizar 10 vendas
   - Recompensa: 600 pontos + R$ 35,00 cashback

4. **Interação Social**
   - Meta: Compartilhar 15 vezes nas redes
   - Recompensa: 250 pontos + R$ 10,00 cashback

### Sistema de Níveis
- **Bronze:** Filiado iniciante (padrão)
- **Silver:** 3+ indicações ativas
- **Gold:** 5+ indicações ativas

## Sistema de Indicações (ReferralPage)

### Programa Filiado VIP
- Título: **"Programa Filiado VIP"**
- Status dinâmico baseado no nível do usuário
- Indicador de progresso para próximo nível

### Benefícios por Nível
**Bronze (Padrão):**
- R$ 15,00 por indicação
- 2% cashback mensal
- Suporte prioritário

**Silver (3+ indicações):**
- R$ 20,00 por indicação
- 3% cashback mensal
- 15% desconto em produtos
- Material exclusivo

**Gold (5+ indicações):**
- R$ 25,00 por indicação
- 5% cashback mensal
- 25% desconto em produtos
- Eventos exclusivos
- Consultor pessoal

### Funcionalidades
- **Link de indicação personalizado**
- Botões para copiar e compartilhar
- **Histórico de indicações** com status
- **Cliques recentes** com origem
- **Histórico de cashback** detalhado
- Sistema de saque (mínimo R$ 50,00)

## Interface do Usuário

### Esquema de Cores
```css
:root {
  --primary: #ADFF2F; /* Verde limão vibrante */
  --primary-foreground: #0f0f23; /* Preto */
  --background: #fafafa;
  --foreground: #0f0f23;
}
```

### Navegação (Navbar)
- Logo da empresa
- Menu responsivo
- Botões de Login/Cadastro (quando não logado)
- Dropdown do usuário (quando logado) com:
  - Área do Usuário
  - Dashboard  
  - Gamificação
  - Indicações
  - Perfil
  - Logout

### Estado Global do Usuário
```typescript
interface User {
  name: string;
  email: string;
  phone: string;
  points: number;
  level: number;
  referralCode: string;
  referrals: number;
  cashback: number;
}
```

## Experiência de Navegação
1. **Página inicial:** Catálogo de produtos (sem login necessário)
2. **Produto individual:** Descrição profissional + compra
3. **Login/Cadastro:** Acesso às funcionalidades avançadas
4. **Área logada:** Dashboard, gamificação e indicações

## Design System
- **Componentes shadcn/ui** para consistência
- **Gradientes profissionais** para headers
- **Cards com hover effects**
- **Badges coloridos** para status
- **Progress bars animadas**
- **Toasts informativos** para feedback
- **Layout responsivo** (mobile-first)

## Motivação e Engajamento
- **Frases motivacionais rotativas** na gamificação
- **Sistema de conquistas** com raridade
- **Recompensas visuais** por progresso
- **Feedback imediato** em ações
- **Cores e ícones** que incentivam ação

## Instruções Específicas de Implementação
1. Use **React hooks** para estado local
2. **Tailwind classes** sem font-size, font-weight ou line-height customizados
3. **Componentes separados** em `/components/`
4. **Unsplash** para todas as imagens de produtos
5. **Estado persistente** durante a sessão
6. **Navegação fluida** entre páginas
7. **Toast notifications** para feedback do usuário

Este sistema combina e-commerce moderno com gamificação avançada, focando na experiência do filiado e maximizando o engajamento através de recompensas tangíveis (cashback) e progressão visual (níveis/status).