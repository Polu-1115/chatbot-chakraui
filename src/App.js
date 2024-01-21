// App.jsx
import React, { useState } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import Chatbox from './components/Chatbox.js';

function App() {
  const [messages, setMessages] = useState([]);

  const sendMessage = async (userMessage) => {
    // Call your backend API to get the chatbot response
    // For demonstration, I'm adding a user message and a dummy chatbot response
    const newMessages = [...messages, { text: userMessage, isUser: true }];
    setMessages(newMessages);

    // Simulate chatbot response (replace with your API call)
    setTimeout(() => {
      const chatbotResponse = 'This is a dummy response from the chatbot.';
      setMessages([...newMessages, { text: chatbotResponse, isUser: false }]);
    }, 500);
  };

  return (
    <ChakraProvider>
      <Chatbox messages={messages} sendMessage={sendMessage} />
    </ChakraProvider>
  );
}

export default App;
