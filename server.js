const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const apiKey = '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';

app.post('/api/chatbot', async (req, res) => {
  const userMessage = req.body.message;

  try {
    //openai api called
    const openaiResponse = await fetchOpenAIResponse(userMessage, apiKey);
    res.json({ message: openaiResponse.choices[0].message.content.trim() });
  } catch (error) {
    console.error('Error communicating with OpenAI:', error.message);
    res.status(500).json({ message: 'Error communicating with OpenAI' });
  }
});

async function fetchOpenAIResponse(userMessage, apiKey) {
  const apiUrl = 'https://api.openai.com/v1/chat/completions';

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`,
  };

  
  const conversation = [
    { role: 'system', content: 'You are a helpful assistant designed to output JSON.' },
    { role: 'user', content: userMessage },
  ];

  const data = {
    messages: conversation,
    model: 'gpt-3.5-turbo-1106',
    response_format: { type: 'json_object' },
    max_tokens: 150,
    temperature: 0.7,
    n: 1,
    stop: ['\n'],
  };

  return axios.post(apiUrl, data, { headers });
}


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});