// AI Telegram Caller Agent
// Zero-shot agent that calls you on Telegram using CallMeBot API

const axios = require('axios');
const Groq = require('groq-sdk');
const express = require('express');

// Configuration from environment variables
const CONFIG = {
  TELEGRAM_USERNAME: process.env.TELEGRAM_USERNAME || '@StreetsOfLoz',
  PHONE_NUMBER: process.env.PHONE_NUMBER || '+447476871817',
  GROQ_API_KEY: process.env.GROQ_API_KEY,
  PORT: process.env.PORT || 3000,
  CALL_MESSAGE: process.env.CALL_MESSAGE || 'Hey Loz! Your AI assistant is calling to check in on you. How are things going?',
  VOICE_LANG: process.env.VOICE_LANG || 'en-GB-Standard-B',
  REPEAT_COUNT: process.env.REPEAT_COUNT || 2
};

// Initialize Groq client
const groq = new Groq({ apiKey: CONFIG.GROQ_API_KEY });

// Function to make a Telegram call
async function makeCall(message = CONFIG.CALL_MESSAGE) {
  try {
    // URL encode the message
    const encodedMessage = encodeURIComponent(message);
    
    // Build the CallMeBot API URL
    const callUrl = `http://api.callmebot.com/start.php?user=${CONFIG.TELEGRAM_USERNAME}&text=${encodedMessage}&lang=${CONFIG.VOICE_LANG}&rpt=${CONFIG.REPEAT_COUNT}`;
    
    console.log('🔥 Initiating Telegram call...');
    console.log('👤 User:', CONFIG.TELEGRAM_USERNAME);
    console.log('📞 Backup number:', CONFIG.PHONE_NUMBER);
    console.log('💬 Message:', message);
    
    // Make the API call
    const response = await axios.get(callUrl);
    
    console.log('✅ Call initiated successfully!');
    console.log('📊 Response:', response.data);
    
    return {
      success: true,
      message: 'Call initiated',
      data: response.data
    };
  } catch (error) {
    console.error('❌ Error making call:', error.message);
    return {
      success: false,
      error: error.message
    };
  }
}

// Function to generate AI message using Groq
async function generateAIMessage(prompt) {
  try {
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'You are a friendly AI assistant that makes voice calls. Generate a short, natural-sounding message (max 200 characters) that would be good for text-to-speech. Be casual and conversational.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.7,
      max_tokens: 100
    });
    
    return completion.choices[0].message.content;
  } catch (error) {
    console.error('❌ Error generating AI message:', error.message);
    return null;
  }
}

// Express server for webhook/API control
const app = express();
app.use(express.json());

// Health check endpoint
app.get('/', (req, res) => {
  res.json({
    status: 'online',
    service: 'AI Telegram Caller',
    ready: true,
    config: {
      username: CONFIG.TELEGRAM_USERNAME,
      phone: CONFIG.PHONE_NUMBER.substring(0, 8) + '****'
    }
  });
});

// Endpoint to trigger a call
app.post('/call', async (req, res) => {
  const { message, generateAI, aiPrompt } = req.body;
  
  let callMessage = message || CONFIG.CALL_MESSAGE;
  
  // Generate AI message if requested
  if (generateAI && aiPrompt && CONFIG.GROQ_API_KEY) {
    const aiMessage = await generateAIMessage(aiPrompt);
    if (aiMessage) {
      callMessage = aiMessage;
    }
  }
  
  const result = await makeCall(callMessage);
  res.json(result);
});

// Endpoint to test call immediately
app.get('/call-now', async (req, res) => {
  console.log('🚀 Immediate call triggered via /call-now endpoint');
  const result = await makeCall();
  res.json(result);
});

// Start the server
app.listen(CONFIG.PORT, () => {
  console.log('🤖 AI Telegram Caller Agent Started!');
  console.log(`📡 Server listening on port ${CONFIG.PORT}`);
  console.log('🔗 Endpoints:');
  console.log(`   - GET  /          : Health check`);
  console.log(`   - GET  /call-now  : Make immediate call`);
  console.log(`   - POST /call      : Make call with custom message`);
  console.log('\n⚡ Ready to call!');
  console.log('\n💡 To make a call right now, run:');
  console.log(`   curl http://localhost:${CONFIG.PORT}/call-now`);
  console.log('\n');
});

// Auto-call on startup if AUTO_CALL_ON_START is set
if (process.env.AUTO_CALL_ON_START === 'true') {
  setTimeout(async () => {
    console.log('\n🔥 AUTO CALL TRIGGERED!');
    await makeCall();
  }, 2000); // Wait 2 seconds after startup
}

// Export for testing
module.exports = { makeCall, generateAIMessage };
