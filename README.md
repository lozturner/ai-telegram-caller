# 📞 AI Telegram Caller

**Zero-shot AI agent that calls you on Telegram** using CallMeBot API and Groq for conversational AI.

## 🚀 Quick Start - Call Yourself NOW!

### Prerequisites
1. **Authorize CallMeBot** (REQUIRED - Takes 30 seconds)
   - Click: https://api2.callmebot.com/txt/login.php
   - Login with your Telegram account  
   - This allows CallMeBot to call you

2. **Install Node.js** (if not already installed)
   - Download from: https://nodejs.org/

### Instant Setup & Call

```bash
# 1. Clone this repo
git clone https://github.com/lozturner/ai-telegram-caller.git
cd ai-telegram-caller

# 2. Install dependencies
npm install

# 3. Set your Telegram username (or just run with defaults)
export TELEGRAM_USERNAME="@StreetsOfLoz"

# 4. CALL YOURSELF NOW!
npm run call-now
```

**That's it!** Your phone should ring on Telegram in seconds! 🎉

## 📋 Detailed Setup

### 1. Authorize CallMeBot (REQUIRED)

You MUST do this first or calls won't work:

**Option A: Web Authorization**
- Visit: https://api2.callmebot.com/txt/login.php
- Login with Telegram
- Done!

**Option B: Telegram Bot**
- Open Telegram
- Search for `@CallMeBot_txtbot`
- Send `/start`
- Done!

### 2. Configuration

Copy the example environment file:

```bash
cp .env.example .env
```

Edit `.env` with your details:

```env
TELEGRAM_USERNAME=@YourUsername
PHONE_NUMBER=+447476871817
GROQ_API_KEY=your_groq_api_key_here  # Optional
```

### 3. Get Groq API Key (Optional - for AI messages)

1. Go to https://console.groq.com/keys
2. Sign up / Login
3. Create a new API key
4. Add it to your `.env` file

## 🎯 Usage

### Make an Instant Call

```bash
# Call with default message
npm run call-now

# Or start server and hit the endpoint
npm start
curl http://localhost:3000/call-now
```

### Run as a Server

```bash
# Start the server
npm start

# The server will be running on http://localhost:3000
```

### API Endpoints

#### GET `/`
Health check
```bash
curl http://localhost:3000/
```

#### GET `/call-now`
Make an immediate call with default message
```bash
curl http://localhost:3000/call-now
```

#### POST `/call`
Make a call with custom message
```bash
curl -X POST http://localhost:3000/call \
  -H "Content-Type: application/json" \
  -d '{"message": "Hey! This is a custom message!"}'
```

#### POST `/call` with AI
Generate AI message and call
```bash
curl -X POST http://localhost:3000/call \
  -H "Content-Type: application/json" \
  -d '{
    "generateAI": true,
    "aiPrompt": "Generate a friendly reminder to take a break"
  }'
```

## 🔧 Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|----------|
| `TELEGRAM_USERNAME` | Your Telegram username (with @) | ✅ | `@StreetsOfLoz` |
| `PHONE_NUMBER` | Your phone with country code | ✅ | `+447476871817` |
| `GROQ_API_KEY` | Groq API key for AI messages | ❌ | - |
| `CALL_MESSAGE` | Default call message | ❌ | "Hey Loz! Your AI assistant..." |
| `VOICE_LANG` | Voice language | ❌ | `en-GB-Standard-B` |
| `REPEAT_COUNT` | Times to repeat message | ❌ | `2` |
| `PORT` | Server port | ❌ | `3000` |
| `AUTO_CALL_ON_START` | Auto-call on startup | ❌ | `false` |

## 🎤 Available Voices

Check Google Cloud Text-to-Speech voices:
https://cloud.google.com/text-to-speech/docs/voices

Examples:
- `en-GB-Standard-B` - British English Male
- `en-GB-Standard-A` - British English Female
- `en-US-Standard-D` - American English Male
- `en-US-Standard-C` - American English Female

## 🌐 Deploy to Cloud

### Deploy to Replit

1. Fork this repo
2. Import to Replit
3. Set environment variables in Replit Secrets
4. Run!

### Deploy to Render

1. Connect your GitHub repo
2. Set environment variables
3. Deploy as Web Service
4. Your agent will be live!

### Deploy to Railway

```bash
railway login
railway init
railway up
```

## 💡 Use Cases

- **Personal Assistant**: Get called for reminders, alerts
- **Home Automation**: Security alerts, doorbell notifications
- **Development**: Build failures, deployment notifications
- **Health**: Medication reminders, workout alerts
- **Emergency**: Critical system alerts

## 🛠️ Advanced Usage

### Cron Job (Linux/Mac)

Call yourself every day at 9 AM:

```bash
0 9 * * * cd /path/to/ai-telegram-caller && npm run call-now
```

### Webhooks

Integrate with any webhook service:

```javascript
// Your webhook handler
app.post('/webhook', async (req, res) => {
  const { makeCall } = require('./agent');
  await makeCall('Webhook triggered!');
  res.json({ success: true });
});
```

### Custom Integration

```javascript
const { makeCall, generateAIMessage } = require('./agent');

// Call with custom message
await makeCall('Your custom message here');

// Generate AI message and call
const message = await generateAIMessage('remind me to exercise');
await makeCall(message);
```

## 📝 Development

```bash
# Install dependencies
npm install

# Run with auto-reload
npm run dev

# Run tests (when added)
npm test
```

## 🐛 Troubleshooting

### Call not received?

1. **Did you authorize CallMeBot?**
   - Visit https://api2.callmebot.com/txt/login.php
   - Or message @CallMeBot_txtbot on Telegram

2. **Check your username**
   - Must include @ symbol: `@YourUsername`
   - Or use phone number: `+447476871817`

3. **iOS Audio Issue**
   - Known iOS Telegram bug - audio may not play
   - Works fine on Android

### Server not starting?

```bash
# Check if port is in use
lsof -i :3000

# Use different port
PORT=8080 npm start
```

## 🤝 Contributing

Contributions welcome! Please:

1. Fork the repo
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

MIT License - See LICENSE file

## 🙏 Credits

- **CallMeBot** - https://www.callmebot.com/
- **Groq** - https://groq.com/
- **Telegram** - https://telegram.org/

## ⚡ Quick Reference

```bash
# Call yourself NOW
npm run call-now

# Start server
npm start

# Call via API
curl http://localhost:3000/call-now

# Call with custom message
curl -X POST http://localhost:3000/call -H "Content-Type: application/json" -d '{"message": "Hey!"}'
```

---

**Made with ❤️ by Loz Turner**

**Ready to get called? Run `npm run call-now` now!** 🚀
