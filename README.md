# BGMI Pro - Tournament Platform

A professional esports tournament website built for Battlegrounds Mobile India (BGMI) competitions. Features a gaming-inspired dark theme with electric blue and neon green accents, tournament management, registration system, and payment integration.

## 🎮 Features

### Tournament Management
- **Tournament Listings** - Browse all available tournaments with filters
- **Tournament Details** - Comprehensive tournament information with rules and prizes
- **Registration System** - Complete team registration with validation
- **Payment Integration** - Ready for Razorpay/UPI integration
- **Results & Leaderboard** - Live tournament results and rankings

### User Experience
- **Responsive Design** - Mobile-first approach with full desktop support
- **Gaming Aesthetics** - Dark theme with neon gaming colors and animations
- **Real-time Updates** - Live tournament status and registration counts
- **Search & Filters** - Find tournaments and results easily

### Pages & Components
- 🏠 **Home/Landing** - Featured tournaments and upcoming battles
- 🏆 **Tournament List** - All tournaments with advanced filtering
- 📋 **Tournament Details** - Registration, rules, prize distribution
- 📊 **Results** - Leaderboard with search functionality
- 💳 **Payment Lookup** - Check payment status by ticket ID
- 🛟 **Support Center** - FAQ and contact information

## 🚀 Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS with custom gaming design system
- **UI Components**: shadcn/ui with custom variants
- **Routing**: React Router v6
- **State Management**: React Query (TanStack Query)
- **Build Tool**: Vite
- **Icons**: Lucide React
- **Animations**: Custom CSS animations with Tailwind

## 🎨 Design System

### Colors
- **Electric Blue**: Primary gaming accent (#00D4FF)
- **Neon Green**: Secondary accent (#39FF14) 
- **Gaming Purple**: Tertiary accent (#BB86FC)
- **Dark Surfaces**: Multiple dark shades for depth

### Components
- **Gaming Buttons**: Custom variants with hover effects and glows
- **Tournament Cards**: Gradient backgrounds with hover animations
- **Hero Sections**: Dynamic gradients with floating animations
- **Form Components**: Dark themed with gaming aesthetics

## 📁 Project Structure

```
src/
├── components/           # Reusable components
│   ├── ui/              # shadcn/ui components with gaming variants
│   ├── Navbar.tsx       # Main navigation
│   ├── Footer.tsx       # Site footer
│   └── RegistrationForm.tsx  # Tournament registration modal
├── pages/               # Route components
│   ├── Home.tsx         # Landing page
│   ├── TournamentList.tsx   # Tournament listings
│   ├── TournamentDetail.tsx # Individual tournament page
│   ├── Results.tsx      # Leaderboard and results
│   ├── PaymentLookup.tsx    # Payment status checker
│   └── Support.tsx      # Help and FAQ
├── services/            # API and data management
│   └── api.ts          # Mock API with TypeScript interfaces
├── assets/             # Images and static files
└── hooks/              # Custom React hooks
```

## 🛠️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd bgmi-tournament-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 🔌 API Integration

The project includes a mock API service (`src/services/api.ts`) with TypeScript interfaces for:

- **Tournaments**: CRUD operations for tournament management
- **Registration**: Team registration with validation
- **Payments**: Payment processing and verification
- **Results**: Leaderboard and tournament results
- **Lookup**: Payment status checking

### Sample API Endpoints
```typescript
// Get tournaments with filters
await tournamentApi.getTournaments({ status: 'upcoming', mode: 'TPP' });

// Register team for tournament
await tournamentApi.registerForTournament(registrationData);

// Get leaderboard
await tournamentApi.getLeaderboard(tournamentId);

// Lookup payment status
await paymentApi.lookupPayment(ticketId, email);
```

## 💳 Payment Integration

Ready for integration with popular Indian payment gateways:

- **Razorpay** - Primary recommendation
- **UPI** - Direct UPI payments
- **Paytm** - Popular digital wallet
- **PhonePe** - Mobile payment solution

## 🎯 Key Features Implementation

### Tournament Registration Flow
1. User selects tournament → Views details
2. Clicks register → Opens modal with form
3. Fills team details → Validates input
4. Submits form → Creates payment order
5. Redirects to payment → Processes transaction
6. Confirms payment → Generates ticket

### Responsive Design
- Mobile-first approach with breakpoint system
- Touch-friendly controls for mobile gaming
- Optimized tournament cards for different screen sizes
- Collapsible navigation for mobile devices

### Gaming Aesthetics
- Custom gradient backgrounds with gaming themes
- Glow effects and hover animations
- Electric color scheme matching gaming preferences
- Typography optimized for readability and impact

## 🔧 Customization

### Adding New Tournament Types
1. Update TypeScript interfaces in `api.ts`
2. Add new tournament modes to filters
3. Update validation rules as needed
4. Customize prize distribution formats

### Theming
1. Modify design tokens in `src/index.css`
2. Update Tailwind config for new colors
3. Customize component variants in UI components
4. Add new gradient combinations

### Payment Gateway Integration
1. Replace mock API calls with real endpoints
2. Add payment gateway SDK integration
3. Implement webhook handlers for payment confirmation
4. Update order status management

## 📱 Browser Support

- Chrome 90+ ✅
- Firefox 88+ ✅
- Safari 14+ ✅
- Edge 90+ ✅
- Mobile browsers ✅

## 🚀 Deployment

The project is ready for deployment to:

- **Vercel** (Recommended)
- **Netlify**
- **GitHub Pages**
- **Traditional hosting**

### Environment Variables
```env
VITE_API_BASE_URL=your-api-endpoint
VITE_RAZORPAY_KEY=your-razorpay-key
VITE_DISCORD_INVITE=your-discord-link
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## 🎮 About BGMI Pro

BGMI Pro is the ultimate destination for competitive Battlegrounds Mobile India tournaments. We provide a professional platform for esports enthusiasts to compete, win prizes, and showcase their skills in organized tournaments.

**Built for champions, by champions** 🏆

---

*Ready to dominate the battleground? Join BGMI Pro and claim your victory!*