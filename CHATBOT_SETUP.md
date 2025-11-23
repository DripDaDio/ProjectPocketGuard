# Finance Buddy Chatbot - Setup Guide

## Overview
The Finance Buddy is an AI-powered chatbot integrated into PocketGuard that helps users with financial advice, budget planning, expense tracking, and personalized financial insights.

## Features
- 💬 **Real-time AI Chat** - Powered by Google Gemini AI
- 📊 **Personalized Context** - Uses your actual financial data for tailored advice
- 🎨 **Modern UI** - Smooth animations and responsive design matching the website theme
- 💾 **Chat History** - Maintains conversation context across sessions
- 🔄 **Reset Functionality** - Start fresh conversations anytime
- 📱 **Mobile Responsive** - Works seamlessly on all devices

## Setup Instructions

### 1. Get Your Gemini API Key
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Get API Key" or "Create API Key"
4. Copy your API key

### 2. Configure Environment Variables
1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Open `.env` and add your API key:
   ```env
   GEMINI_API_KEY=your_actual_api_key_here
   ```

3. (Optional) Choose a specific Gemini model:
   ```env
   GEMINI_MODEL=gemini-2.0-flash
   ```

   Available models:
   - `gemini-2.0-flash` - Fast and efficient (recommended)
   - `gemini-1.5-pro` - More powerful, slightly slower
   - `gemini-1.5-flash` - Good balance (default)

### 3. Install Dependencies
If not already installed:
```bash
npm install
```

### 4. Start the Application
```bash
npm run dev
```

### 5. Access the Chatbot
1. Open your browser to `http://localhost:3000`
2. Login with demo credentials:
   - Email: `demo@pocketguard.test`
   - Password: `demo123`
3. Click on "Buddy" in the navigation bar
4. Start chatting!

## Using the Chatbot

### Quick Start Questions
The chatbot comes with pre-configured quick start questions:
- "How can I save more money?"
- "What's a good investment strategy?"
- "Help me create a budget"

Click any of these to instantly send the question.

### AI Capabilities
The Finance Buddy can help with:
- **Budget Analysis** - Review your spending patterns
- **Savings Tips** - Get personalized saving strategies
- **Investment Advice** - Learn about stocks, mutual funds, ETFs
- **Expense Tracking** - Understand your spending categories
- **Financial Goals** - Set and track financial milestones
- **Bill Management** - Reminders for upcoming payments

### Contextual Awareness
The chatbot has access to your:
- Monthly income and expenses
- Top spending categories
- Upcoming bills
- Savings goals
- Recent transactions
- Safe-to-spend amount

This allows it to provide personalized, data-driven advice.

## UI Features

### Chat Interface
- **Modern Design** - Clean, professional interface with smooth animations
- **Color Theme** - Matches PocketGuard's coral/peach theme
- **Typing Indicator** - Shows when the bot is thinking
- **Message Bubbles** - Different styles for user and AI messages
- **Auto-scroll** - Automatically scrolls to newest messages

### Status Indicators
- **AI Active** - Green badge when Gemini API is configured
- **Demo Mode** - Gray badge when using fallback responses
- **Connection Status** - Shows if the AI is responding

### Keyboard Shortcuts
- **Enter** - Send message
- **Shift + Enter** - New line in message (not yet implemented)

## Troubleshooting

### "Demo Mode" Badge Showing
**Issue**: The chatbot shows "Demo Mode" instead of "AI Active"

**Solutions**:
1. Verify your API key is correctly set in `.env`
2. Restart the server after updating `.env`
3. Check for typos in the environment variable name (`GEMINI_API_KEY`)

### API Key Not Working
**Issue**: Invalid API key error

**Solutions**:
1. Ensure you copied the complete API key
2. Check for extra spaces or quotes around the key
3. Verify the API key is active in Google AI Studio
4. Make sure you have API quota remaining

### Slow Response Times
**Issue**: Chatbot takes too long to respond

**Solutions**:
1. Try a faster model like `gemini-2.0-flash`
2. Check your internet connection
3. Reduce the complexity of your questions
4. The timeout is set to 18 seconds - if exceeded, you'll get an error

### Chat History Not Loading
**Issue**: Previous messages don't appear

**Solutions**:
1. Ensure you're logged in
2. Check that session storage is working
3. Try clearing your browser cache
4. Click "New Chat" to reset

## Customization

### Changing the Theme Colors
Edit `public/css/buddy.css`:

```css
/* Change the primary color (coral/peach) */
.buddy .chat-header .ai-avatar {
  background: linear-gradient(135deg, rgb(230, 109, 87), rgb(255, 224, 191));
}

/* Change bubble colors */
.buddy .bubble.ai {
  background: linear-gradient(135deg, rgba(255, 224, 191, 0.25), rgba(255, 224, 191, 0.15));
}
```

### Adding More Quick Start Questions
Edit `views/buddy.ejs`:

```html
<div class="card">
  <span class="material-icons-round" style="color: rgb(230, 109, 87); margin-bottom: 4px;">YOUR_ICON</span>
  <div>Your question here</div>
</div>
```

### Customizing AI Behavior
Edit `src/routes/api.js` to modify the system prompt:

```javascript
const system = [
  'You are Pocket Guard, an Indian personal finance assistant.',
  'Your custom instructions here...'
].join('\n');
```

## Technical Details

### Architecture
- **Frontend**: Vanilla JavaScript, EJS templates
- **Backend**: Node.js + Express
- **AI**: Google Gemini API via official SDK
- **Session Management**: express-session
- **Database**: Prisma ORM with SQLite

### API Endpoints
- `GET /buddy` - Render chatbot page
- `POST /api/buddy` - Send message to chatbot
- `GET /api/buddy/history` - Fetch chat history
- `POST /api/buddy/reset` - Clear chat history

### File Structure
```
├── views/
│   └── buddy.ejs              # Chatbot page template
├── public/
│   ├── css/
│   │   └── buddy.css          # Chatbot styles
│   └── js/
│       └── buddy.js           # Chatbot client logic
├── src/
│   ├── routes/
│   │   └── api.js             # Chatbot API routes
│   └── utils/
│       ├── gemini_sdk.js      # Gemini SDK integration
│       └── gemini.js          # Gemini REST API (fallback)
└── .env                       # Environment configuration
```

## Security Notes
- API keys are stored server-side only
- Rate limiting is applied to prevent abuse
- User authentication required to access chatbot
- Session-based chat history (not stored in database)
- Input validation and sanitization

## Performance Optimization
- Request timeout: 18 seconds
- Chat history limited to last 20 messages
- Context limited to last 8 conversation turns
- Automatic model fallback if primary fails
- Canned responses available when API is unavailable

## Support
For issues or questions:
1. Check the server logs for error messages
2. Verify all environment variables are set
3. Ensure dependencies are installed
4. Check the Gemini API status at Google Cloud

## Credits
- **UI Design**: Matches PocketGuard's coral/peach theme
- **AI Provider**: Google Gemini
- **Icons**: Material Icons Round

---

**Last Updated**: October 30, 2025
**Version**: 0.2
