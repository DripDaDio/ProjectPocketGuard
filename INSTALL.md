# 🚀 Quick Installation Script

## Windows PowerShell Setup

Run these commands in PowerShell from your project directory:

```powershell
# Step 1: Install dependencies (if not already done)
npm install

# Step 2: Setup environment file
if (!(Test-Path .env)) {
    Copy-Item .env.example .env
    Write-Host "✅ Created .env file - Please add your GEMINI_API_KEY" -ForegroundColor Green
    notepad .env
} else {
    Write-Host "⚠️  .env already exists" -ForegroundColor Yellow
}

# Step 3: Setup database (if not already done)
npm run prisma:generate
npm run db:push
npm run db:seed

# Step 4: Build CSS (optional)
npm run css:build

# Step 5: Start the server
Write-Host "🚀 Starting PocketGuard..." -ForegroundColor Cyan
npm run dev
```

## macOS/Linux Bash Setup

Run these commands in Terminal from your project directory:

```bash
# Step 1: Install dependencies
npm install

# Step 2: Setup environment file
if [ ! -f .env ]; then
    cp .env.example .env
    echo "✅ Created .env file - Please add your GEMINI_API_KEY"
    nano .env  # or use your preferred editor: code .env, vim .env
else
    echo "⚠️  .env already exists"
fi

# Step 3: Setup database
npm run prisma:generate
npm run db:push
npm run db:seed

# Step 4: Build CSS (optional)
npm run css:build

# Step 5: Start the server
echo "🚀 Starting PocketGuard..."
npm run dev
```

## Manual Step-by-Step

### 1. Install Dependencies
```bash
npm install
```

**Verifies:** All packages from package.json are installed

### 2. Configure Environment
```bash
# Copy template
cp .env.example .env

# Edit with your favorite editor
code .env  # VS Code
# or
notepad .env  # Windows Notepad
# or
nano .env  # Terminal editor
```

**Add your Gemini API key:**
```env
GEMINI_API_KEY=your_actual_key_here
```

### 3. Setup Database
```bash
# Generate Prisma client
npm run prisma:generate

# Push schema to database
npm run db:push

# Seed with demo data
npm run db:seed
```

**Creates:** SQLite database with demo user and transactions

### 4. Build CSS (Optional)
```bash
npm run css:build
```

**Note:** Pre-compiled CSS is already included, but you can rebuild if needed

### 5. Start Development Server
```bash
npm run dev
```

**Opens:** http://localhost:3000

### 6. Test the Chatbot
1. Navigate to http://localhost:3000
2. Login with:
   - Email: `demo@pocketguard.test`
   - Password: `demo123`
3. Click "Buddy" in bottom navigation
4. Start chatting!

## Verification Checklist

After installation, verify:

```bash
# Check if .env exists and has GEMINI_API_KEY
Get-Content .env | Select-String "GEMINI_API_KEY"  # PowerShell
# or
cat .env | grep GEMINI_API_KEY  # macOS/Linux
```

Should show: `GEMINI_API_KEY=your_key_here`

```bash
# Check if database exists
Test-Path ".\prisma\dev.db"  # PowerShell
# or
ls -la prisma/dev.db  # macOS/Linux
```

Should show: File exists with size > 0

```bash
# Check if node_modules installed
Test-Path ".\node_modules"  # PowerShell
# or
ls -la node_modules  # macOS/Linux
```

Should show: Directory with packages

```bash
# Check if CSS compiled
Test-Path ".\public\css\buddy.css"  # PowerShell
# or
ls -la public/css/buddy.css  # macOS/Linux
```

Should show: buddy.css file exists

## Common Installation Issues

### Issue: npm install fails
```bash
# Solution 1: Clear cache
npm cache clean --force
npm install

# Solution 2: Delete and reinstall
Remove-Item -Recurse -Force node_modules  # PowerShell
rm -rf node_modules  # macOS/Linux
npm install

# Solution 3: Use specific Node version
nvm install 18
nvm use 18
npm install
```

### Issue: Prisma generate fails
```bash
# Solution: Install Prisma CLI
npm install -D prisma
npx prisma generate
```

### Issue: Database push fails
```bash
# Solution: Delete existing database and start fresh
Remove-Item ".\prisma\dev.db"  # PowerShell
rm prisma/dev.db  # macOS/Linux
npm run db:push
npm run db:seed
```

### Issue: Port 3000 already in use
```bash
# Solution 1: Use different port
# Edit .env:
PORT=3001

# Solution 2: Kill process on port 3000
# PowerShell:
Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess | Stop-Process -Force

# macOS/Linux:
lsof -ti:3000 | xargs kill -9
```

### Issue: .env not being read
```bash
# Solution: Verify .env location
# Should be in project root, same level as package.json
Get-Location  # PowerShell
pwd  # macOS/Linux

# Check file location
Get-ChildItem .env  # PowerShell
ls -la .env  # macOS/Linux
```

## Quick Test Script

Save as `test-setup.ps1` (PowerShell) or `test-setup.sh` (Bash):

### PowerShell Version
```powershell
Write-Host "🔍 Testing PocketGuard Setup..." -ForegroundColor Cyan

# Test 1: Check .env
if (Test-Path .env) {
    Write-Host "✅ .env file exists" -ForegroundColor Green
} else {
    Write-Host "❌ .env file missing" -ForegroundColor Red
}

# Test 2: Check API key
$apiKey = Select-String -Path .env -Pattern "GEMINI_API_KEY=\w+"
if ($apiKey) {
    Write-Host "✅ API key configured" -ForegroundColor Green
} else {
    Write-Host "⚠️  API key not set or empty" -ForegroundColor Yellow
}

# Test 3: Check database
if (Test-Path ".\prisma\dev.db") {
    Write-Host "✅ Database exists" -ForegroundColor Green
} else {
    Write-Host "❌ Database missing - run: npm run db:push" -ForegroundColor Red
}

# Test 4: Check node_modules
if (Test-Path ".\node_modules") {
    Write-Host "✅ Dependencies installed" -ForegroundColor Green
} else {
    Write-Host "❌ Dependencies missing - run: npm install" -ForegroundColor Red
}

# Test 5: Check CSS
if (Test-Path ".\public\css\buddy.css") {
    Write-Host "✅ Chatbot CSS exists" -ForegroundColor Green
} else {
    Write-Host "❌ Chatbot CSS missing" -ForegroundColor Red
}

Write-Host "`n✨ Setup check complete!" -ForegroundColor Cyan
```

### Bash Version
```bash
#!/bin/bash

echo "🔍 Testing PocketGuard Setup..."

# Test 1: Check .env
if [ -f .env ]; then
    echo "✅ .env file exists"
else
    echo "❌ .env file missing"
fi

# Test 2: Check API key
if grep -q "GEMINI_API_KEY=\w\+" .env 2>/dev/null; then
    echo "✅ API key configured"
else
    echo "⚠️  API key not set or empty"
fi

# Test 3: Check database
if [ -f prisma/dev.db ]; then
    echo "✅ Database exists"
else
    echo "❌ Database missing - run: npm run db:push"
fi

# Test 4: Check node_modules
if [ -d node_modules ]; then
    echo "✅ Dependencies installed"
else
    echo "❌ Dependencies missing - run: npm install"
fi

# Test 5: Check CSS
if [ -f public/css/buddy.css ]; then
    echo "✅ Chatbot CSS exists"
else
    echo "❌ Chatbot CSS missing"
fi

echo -e "\n✨ Setup check complete!"
```

## Production Deployment

For production deployment:

```bash
# 1. Set production environment
# In .env:
NODE_ENV=production
SESSION_SECRET=generate_strong_secret_here

# 2. Use PostgreSQL instead of SQLite
# In .env:
DATABASE_URL=postgresql://user:password@localhost:5432/pocketguard

# 3. Build and start
npm run prisma:generate
npm run db:push
npm run css:build
npm start
```

## Get Your Gemini API Key

1. **Visit:** https://makersuite.google.com/app/apikey
2. **Sign in** with your Google account
3. **Click** "Get API Key" or "Create API Key"
4. **Copy** the generated key
5. **Paste** into your `.env` file:
   ```env
   GEMINI_API_KEY=AIza...your_key_here
   ```

## All-in-One Installation

Copy and paste this complete setup:

### PowerShell
```powershell
# Complete PocketGuard setup
Write-Host "🚀 Starting PocketGuard setup..." -ForegroundColor Cyan

npm install
Copy-Item .env.example .env -ErrorAction SilentlyContinue
npm run prisma:generate
npm run db:push
npm run db:seed

Write-Host "✅ Setup complete!" -ForegroundColor Green
Write-Host "📝 Don't forget to add your GEMINI_API_KEY to .env" -ForegroundColor Yellow
Write-Host "🌐 Starting server..." -ForegroundColor Cyan

npm run dev
```

### Bash
```bash
#!/bin/bash
echo "🚀 Starting PocketGuard setup..."

npm install
cp .env.example .env 2>/dev/null || true
npm run prisma:generate
npm run db:push
npm run db:seed

echo "✅ Setup complete!"
echo "📝 Don't forget to add your GEMINI_API_KEY to .env"
echo "🌐 Starting server..."

npm run dev
```

---

**Ready to go!** 🎉 Your Finance Buddy chatbot is now installed and configured.
