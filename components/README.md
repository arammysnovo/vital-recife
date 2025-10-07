# Vital Recife Suplementos - E-commerce Gamificado

Sistema de e-commerce com gamificação completa para filiados, desenvolvido com arquitetura simples HTML + CSS + JavaScript.

## 🎯 Funcionalidades Implementadas

### ✅ Sistema de Gamificação Completo
1. **Premiação em cashback por nível alcançado**
   - Nível 3 (Silver): R$ 50,00 cashback + 200 pontos cupom
   - Nível 5 (Gold): R$ 100,00 cashback + 500 pontos cupom  
   - Nível 10 (Platinum): R$ 500,00 cashback + 2000 pontos cupom

2. **Pontos por indicação para trocar por cupons**
   - Loja de Cupons Filiado com 4 opções de resgate
   - Sistema separado de "Pontos de Cupom" 
   - Filiados: 100 pontos/mês + cashback
   - Clientes: 25 pontos uma vez (sem cashback)

3. **Visualização melhorada dos níveis**
   - Barra de progresso para próximo nível
   - Sistema Bronze/Silver/Gold/Platinum
   - Recompensas pendentes em destaque

4. **Sistema diferenciado para clientes via link**
   - **Indicação para Filiado**: Cashback + pontos cupom + recorrência
   - **Indicação para Cliente**: Apenas pontos (sem cashback)
   - Identificação visual clara na interface

### 🔧 Arquitetura Simplificada

```
/html/          - Páginas HTML
/css/           - Estilos CSS separados
/js/            - Lógica JavaScript
```

#### Arquivos Principais:
- `html/index.html` - Aplicação principal completa
- `html/login.html` - Página de login
- `css/globals.css` - Variáveis e estilos base
- `css/components.css` - Componentes reutilizáveis  
- `css/pages.css` - Estilos específicos das páginas
- `css/auth.css` - Estilos de autenticação
- `js/main.js` - Lógica da aplicação

## 🚀 Como Usar

### 1. Acesso Direto
```bash
# Abrir diretamente no navegador
open html/index.html
```

### 2. Servidor Local (Recomendado)
```bash
# Python 3
python -m http.server 8000

# Node.js (npx)
npx serve .

# Acesse: http://localhost:8000/html/
```

## 🎮 Funcionalidades por Página

### 📊 Dashboard (Central do Filiado)
- Estatísticas de nível e progresso
- Engajamento semanal (meta 70%)
- Cashback disponível para saque
- Pontos de cupom acumulados
- Gráficos de evolução

### 🏆 Gamificação
- **Sistema de Níveis**: Progressão Bronze → Silver → Gold → Platinum
- **Loja de Cupons**: 4 opções de troca por pontos
- **Desafios Semanais**: Com cashback real
- **Recompensas por Nível**: Cashback automático ao subir

### 👥 Indicações  
- **Link Personalizado**: `https://vitalrecife.com/ref/JOAO123`
- **Sistema Duplo**:
  - Filiados: R$ 15-25 + 100pts/mês + cashback recorrente
  - Clientes: 0 cashback + 25pts + desconto 20%
- **Histórico Completo**: Com tipo de indicação e recompensas

### 👤 Perfil
- Edição de dados pessoais
- Informações da conta
- Código de indicação
- Status de filiado

## 🎨 Design System

### Cores Principais
- **Primary**: `#ADFF2F` (Verde limão Vital Recife)
- **Success**: `#10b981` (Verde sucesso)
- **Info**: `#3b82f6` (Azul informativo)
- **Warning**: `#f59e0b` (Amarelo alerta)
- **Error**: `#ef4444` (Vermelho erro)

### Tipografia
- Font Stack: System fonts (-apple-system, BlinkMacSystemFont, Segoe UI)
- Tamanhos: xs(12px) → 4xl(36px)
- Pesos: normal(400), medium(500), semibold(600), bold(700)

### Componentes
- **Cards**: White background, subtle shadows
- **Buttons**: Primary (gradient), Secondary (outline)
- **Badges**: Status indicators com cores semânticas
- **Progress Bars**: Indicadores visuais animados

## 📱 Responsividade

- **Desktop**: Layout completo em grid
- **Tablet**: Adaptação de colunas
- **Mobile**: Stack vertical + menu hambúrguer

## 🔧 Customização

### Variáveis CSS (globals.css)
```css
:root {
  --primary: #ADFF2F;          /* Cor principal */
  --primary-dark: #7dd327;     /* Hover states */
  --space-4: 1rem;             /* Espaçamentos */
  --radius-lg: 12px;           /* Border radius */
  /* ... */
}
```

### Adicionando Novas Páginas
1. Criar HTML em `/html/nova-pagina.html`
2. Adicionar estilos em `/css/pages.css`
3. Atualizar navegação em `/js/main.js`

## 🎯 Próximos Passos Sugeridos

1. **Backend Integration**: Conectar com APIs reais
2. **Autenticação**: Sistema completo de login/registro
3. **Pagamentos**: Gateway para cashback real
4. **Notificações**: Push notifications
5. **Analytics**: Tracking de engajamento
6. **PWA**: Transformar em app mobile

## 📄 Licença

Sistema proprietário - Vital Recife Suplementos

---

**Desenvolvido com foco em gamificação e experiência do usuário para maximizar engajamento e conversões dos filiados.**