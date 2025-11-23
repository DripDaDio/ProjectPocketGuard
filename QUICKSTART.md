# 🤖 Finance Buddy Chatbot - Quick Start

## ✨ Features Added

### Enhanced UI/UX
- **Modern Chat Interface** - Sleek, professional design with smooth animations
- **Color Theme** - Matches PocketGuard's coral/peach theme (#E66D57)
- **Message Bubbles** - Distinct styles for user and AI responses
- **Typing Indicator** - Shows when AI is thinking
- **Welcome Message** - Greets users with helpful suggestions
- **Quick Actions** - Pre-configured questions for easy start
- **Smooth Scrolling** - Auto-scrolls to latest messages
- **Loading States** - Visual feedback during API calls

### Functionality
- **AI-Powered Responses** - Uses Google Gemini API for intelligent answers
- **Context-Aware** - Accesses your financial data for personalized advice
- **Chat History** - Maintains conversation across sessions
- **Reset Function** - Clear chat and start fresh anytime
- **Error Handling** - Graceful fallbacks for network issues
- **Mobile Responsive** - Works perfectly on all screen sizes

## 🚀 Setup in 3 Steps

### Step 1: Get Gemini API Key
```
1. Visit: https://makersuite.google.com/app/apikey
2. Sign in with Google
3. Click "Get API Key"
4. Copy your key
```

### Step 2: Configure Environment
```bash
# Copy the example file
cp .env.example .env

# Edit .env and add your key
GEMINI_API_KEY=your_api_key_here
```

### Step 3: Start the Server
```bash
# Install dependencies (if not done)
npm install

# Start development server
npm run dev

# Open browser to http://localhost:3000
# Login: demo@pocketguard.test / demo123
# Click "Buddy" in navigation
```

## 🎨 What's Been Changed

### New Files Created
```
✅ public/css/buddy.css          - Complete chatbot styling
✅ .env.example                  - Environment configuration template
✅ CHATBOT_SETUP.md              - Detailed setup guide
✅ QUICKSTART.md                 - This file
```

### Files Modified
```
✅ views/buddy.ejs               - Enhanced UI with new elements
✅ public/js/buddy.js            - Improved client-side logic
✅ README.md                     - Added chatbot documentation link
```

### Files Using Existing Backend
```
✅ src/routes/api.js             - Already configured (no changes needed)
✅ src/utils/gemini_sdk.js       - Already configured (no changes needed)
✅ server.js                     - Already configured (no changes needed)
```

## 🎯 UI Components

### 1. Header Section
- **Title** with icon
- **Status Badge** (AI Active / Demo Mode)
- **New Chat Button** to reset conversation

### 2. Health Score Card (Optional)
- Shows financial health score
- Provides quick feedback

### 3. Chat Container
- **Header Bar** with AI avatar and typing indicator
- **Message Log** with scrollable chat history
- **Input Field** with placeholder text
- **Send Button** with icon

### 4. Quick Start Cards
- Pre-configured questions
- Click to instantly send
- Hover effects and animations

## 🎨 Color Scheme

```css
Primary: rgb(230, 109, 87)    /* Coral */
Secondary: rgb(255, 224, 191)  /* Peach */
Background: #F8F8F8            /* Light gray */
Cards: #FFFFFF                 /* White */
Border: #E0E0E0                /* Light border */
Text: #333333                  /* Dark gray */
```

## 📱 Responsive Design

### Desktop (>768px)
- Full width chat interface (max 900px)
- 3-column quick start cards
- Spacious padding

### Mobile (<768px)
- Optimized for touch
- Single column layout
- Larger touch targets
- Bottom navigation aware

## 🔧 Customization Options

### Change AI Model
```env
# In .env file
GEMINI_MODEL=gemini-2.0-flash
```

### Modify Colors
Edit `public/css/buddy.css`:
```css
.buddy .bubble.ai {
  background: your-color-here;
}
```

### Add Quick Questions
Edit `views/buddy.ejs`:
```html
<div class="card">
  <span class="material-icons-round">icon_name</span>
  <div>Your question</div>
</div>
```

### Customize Welcome Message
Edit `public/js/buddy.js`:
```javascript
addBubble('Your custom welcome message', true);
```

## 🐛 Troubleshooting

### Issue: "Demo Mode" Badge
**Fix**: Add `GEMINI_API_KEY` to `.env` and restart server

### Issue: No Response
**Fix**: Check internet connection and API key validity

### Issue: Slow Response
**Fix**: Try faster model or check API quota

### Issue: Styling Issues
**Fix**: Clear browser cache and hard reload (Ctrl+Shift+R)

## 📊 Performance

- **Response Time**: 2-5 seconds typical
- **Timeout**: 18 seconds maximum
- **History**: Last 20 messages stored
- **Context**: Last 8 turns sent to AI

## 🔒 Security

- ✅ API key stored server-side only
- ✅ Rate limiting enabled
- ✅ Authentication required
- ✅ Input validation
- ✅ Session-based history

## 📈 Usage Tips

1. **Be Specific** - Ask detailed questions for better answers
2. **Use Context** - The AI knows your financial data
3. **Try Quick Starts** - Click pre-configured questions
4. **Reset When Needed** - Clear chat for new topics
5. **Check Status Badge** - Ensure AI is active

## 🎓 Example Questions

```
✅ "How much can I save this month?"
✅ "What are my top spending categories?"
✅ "Should I invest in mutual funds or stocks?"
✅ "Help me create a budget for dining out"
✅ "What's my safe-to-spend amount?"
✅ "Suggest some index funds for long-term investment"
```

## 📚 Additional Resources

- **Full Setup Guide**: See `CHATBOT_SETUP.md`
- **Main README**: See `README.md`
- **API Documentation**: See code comments in `src/routes/api.js`

## ✅ Testing Checklist

Before going live, verify:
- [ ] API key is configured
- [ ] Status badge shows "AI Active"
- [ ] Welcome message appears
- [ ] Can send and receive messages
- [ ] Chat history persists
- [ ] Reset button works
- [ ] Quick start cards are clickable
- [ ] Mobile layout looks good
- [ ] Typing indicator shows
- [ ] Errors are handled gracefully

---

**Ready to chat!** 🚀 Navigate to `/buddy` and start exploring your Finance Buddy!
