# PocketGuard 💰

A modern, AI-powered personal finance management application built with Node.js. Track your expenses, manage budgets, set financial goals, and get intelligent insights from your AI finance buddy powered by Google Gemini.

![PocketGuard](https://img.shields.io/badge/Version-0.2-orange) ![Node](https://img.shields.io/badge/Node-18+-green) ![License](https://img.shields.io/badge/License-MIT-blue)

## ✨ Features

### 📊 Dashboard
- **Real-time Overview**: View your total balance, income, and expenses at a glance
- **Credit Card Management**: Switch between multiple credit cards (Mastercard, Visa, Amex)
- **Visual Analytics**: Interactive charts showing spending trends (weekly/monthly)
- **Quick Stats**: Track your financial health with color-coded indicators

### 💳 Account Management
- **Multiple Accounts**: Manage checking, savings, and credit card accounts
- **Balance Tracking**: Monitor current balances across all accounts
- **Transaction History**: Detailed view of all your financial activities

### 💸 Expense Tracking
- **Smart Categorization**: Automatic expense categorization into 7 categories
  - Food & Dining
  - Transportation
  - Shopping
  - Entertainment
  - Bills & Utilities
  - Health & Fitness
  - Other
- **Period Filters**: View expenses by week, month, or year
- **Export Functionality**: Download expenses as CSV for further analysis
- **Visual Breakdown**: See spending distribution with colorful charts and cards

### 🎯 Goals & Budgets
- **Financial Goals**: Set and track savings goals (Emergency Fund, Vacation, etc.)
- **Budget Management**: Create budgets for different expense categories
- **Progress Tracking**: Visual progress bars showing goal achievement
- **Smart Alerts**: Get notified when approaching budget limits

### 📝 Bills & Subscriptions
- **Bill Tracking**: Keep track of recurring bills and due dates
- **Subscription Management**: Monitor monthly subscriptions (Netflix, Spotify, etc.)
- **Payment Reminders**: Never miss a payment with smart notifications
- **PDF Reports**: Export bills summary as PDF

### 🤖 AI Finance Buddy (Powered by Google Gemini)
- **Intelligent Conversations**: Chat with your personal finance assistant
- **Contextual Insights**: Get advice based on your actual spending patterns
- **Smart Recommendations**: Receive personalized tips to improve finances
- **Natural Language**: Ask questions in plain English
- **Modern UI**: Beautiful chat interface with smooth animations

### 🔐 Security & Authentication
- **Secure Sessions**: Session-based authentication with express-session
- **Password Hashing**: Bcrypt encryption for user passwords
- **Rate Limiting**: Protection against brute force attacks
- **Helmet Security**: HTTP security headers for production

## 🛠️ Technology Stack

**Backend:**
- Node.js & Express.js
- Prisma ORM
- SQLite (Development) / PostgreSQL (Production ready)
- bcryptjs for authentication
- express-session for session management

**Frontend:**
- EJS Templates
- Vanilla JavaScript
- CSS3 with modern features
- Chart.js for data visualization
- Material Icons Round

**AI Integration:**
- Google Generative AI (Gemini 1.5 Pro)
- Context-aware financial assistant

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- Google Gemini API key (for AI features)

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd "PocketGuard 0.2"
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
# Copy the example env file
cp .env.example .env

# Edit .env and add your keys
DATABASE_URL="file:./prisma/dev.db"
SESSION_SECRET="your_secure_random_string_here"
GEMINI_API_KEY="your_gemini_api_key_here"
GEMINI_MODEL="gemini-1.5-pro"
NODE_ENV="development"
PORT=3000
```

4. **Initialize the database**
```bash
# Generate Prisma Client
npm run prisma:generate

# Push database schema
npm run db:push

# Seed demo data (optional but recommended)
npm run db:seed
```

5. **Start the development server**
```bash
npm run dev
```

6. **Open your browser**
Navigate to `http://localhost:3000`

**Demo Credentials:**
- Email: `demo@pocketguard.test`
- Password: `demo123`

## 📋 Available Scripts

```bash
npm run dev          # Start development server with nodemon
npm start            # Start production server
npm run css:build    # Compile SCSS to CSS
npm run css:watch    # Watch SCSS files and recompile
npm run prisma:generate  # Generate Prisma Client
npm run db:push      # Push schema changes to database
npm run db:seed      # Seed database with demo data
```

## 🎨 Design System

**Color Palette:**
- Primary Yellow: `#FFD97D`
- Primary Blue: `#4A90E2`
- Orange Gradient: `#FF8E53` to `#FE6B8B`
- Text: `#2d3748`
- Secondary: `#718096`

**Typography:**
- Font Family: Inter (Google Fonts)
- Icons: Material Icons Round

**Layout:**
- Sidebar Navigation: 280px width
- Responsive breakpoints: 768px (tablet), 900px, 1200px (desktop)
- Card-based design with rounded corners (20px)

## 📱 Pages & Routes

- `/` - Landing page (redirects to login/dashboard)
- `/login` - Authentication page
- `/dashboard` - Main overview with stats and charts
- `/balances` - Account balances and management
- `/transactions` - Transaction history and filtering
- `/expenses` - Expense tracking and categorization
- `/bills` - Bill tracking and payments
- `/budgeting` - Budget management
- `/goals` - Financial goals tracking
- `/buddy` - AI Finance Buddy chat
- `/profile` - User settings and preferences

## 🤖 AI Buddy Setup

### Getting Your Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy your key and add it to `.env`:
```env
GEMINI_API_KEY=your_39_character_key_here
GEMINI_MODEL=gemini-1.5-pro
```

### Using the AI Buddy

1. Login to your account
2. Click "Pocket Buddy" in the sidebar
3. Start chatting! Try asking:
   - "How much did I spend this month?"
   - "What's my top spending category?"
   - "Should I save more money?"
   - "Give me budgeting tips"

The AI has access to your:
- Current balance and transactions
- Spending patterns by category
- Upcoming bills and subscriptions
- Savings goals progress
- Recent transaction history

## 📊 Database Schema

**Main Models:**
- `User` - User accounts and authentication
- `Account` - Bank accounts (checking, savings, credit)
- `Transaction` - Financial transactions
- `Category` - Transaction categories
- `Budget` - Budget limits per category
- `Goal` - Savings goals
- `Subscription` - Recurring subscriptions

See `prisma/schema.prisma` for complete schema definition.

## 🔄 Demo Data

The application includes rich demo data generation:
- **93 transactions** across 3 months
- **6 budget categories** with realistic limits
- **4 subscriptions** (Netflix, Spotify, Gym, Cloud Storage)
- **3 savings goals** (Emergency Fund, New Laptop, Trip)
- Diverse expense types with realistic merchant names

**Regenerate demo data:**
```bash
node regenerate-data.js
```

## 🚀 Deployment

### Environment Variables for Production

```env
NODE_ENV=production
DATABASE_URL=postgresql://user:password@host:5432/dbname
SESSION_SECRET=use_a_strong_random_string_here
GEMINI_API_KEY=your_production_key
PORT=3000
```

### Recommended Hosting
- **Backend**: Heroku, Railway, Render, DigitalOcean
- **Database**: PostgreSQL on Heroku, Supabase, or Neon
- **Storage**: For production, use Redis for sessions

### Security Checklist
- [ ] Change default SESSION_SECRET
- [ ] Use PostgreSQL instead of SQLite
- [ ] Enable HTTPS
- [ ] Set up Redis for session storage
- [ ] Configure CORS properly
- [ ] Add rate limiting
- [ ] Enable Helmet security headers (already included)
- [ ] Set up monitoring and logging

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Google Gemini AI for intelligent financial insights
- Chart.js for beautiful data visualizations
- Material Design Icons for the icon set
- Prisma for excellent database tooling

## 📞 Support

For support, email support@pocketguard.example or open an issue in the repository.

---

**Made with ❤️ by PocketGuard Team**

*Manage your money wisely with PocketGuard!* 💰✨