// Chatbox.jsx
import React, { useState, useRef, useEffect } from 'react';
import { VStack, Box, Flex, Input, Button, Text, Img } from '@chakra-ui/react';
import MessageBubble from './MessageBubble';
import botAvatar from '../assets/8649607.png';

const Chatbox = ({ messages, sendMessage }) => {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef();
  const chatboxRef = useRef();
  const [showDefaultMessage, setShowDefaultMessage] = useState(true);

  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' });
  };

  const handleSendMessage = () => {
    if (inputValue.trim() === '') {
      return;
    }

    sendMessage(inputValue);
    setInputValue('');

    // Hide the default message after the first user message is sent
    if (showDefaultMessage) {
      setShowDefaultMessage(true);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    // Scroll to the bottom of the chatbox
    chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;

    // Focus on the input only if there are user messages
    if (messages.length > 0) {
      inputRef.current.focus();
    }
  }, [messages]);

  return (
    <VStack>
      <Box display="flex" alignItems="center" justifyContent="center" mt={6}>
        <Box align='center'>
          <Img src={botAvatar} alt='bot-avatar' width='7%' />
          <Text fontWeight='600' fontSize='20px' ml={2}>Ask OpenAI ChatBot!</Text>
        </Box>
      </Box>

      <VStack
        w="32%"  // Reduced width by 20%
        h="80vh"
        mx="auto"
        mt="2vh"
        p={4}
        bg="#FCF9F9"
        borderRadius="md"
        
        position="relative"
        overflowY="auto"
        boxShadow= "0 5px 20px 0px rgba(0, 0, 0, 0.5)"
        ref={chatboxRef}
      >
        {/* Default bot message */}
        {showDefaultMessage && (
          <MessageBubble
            isUser={false}
            text="Hi! I am OpenAI ChatBot. How can I help you?"
            timestamp={getCurrentTime()}
          />
        )}

        {messages.map((message, index) => (
          <MessageBubble
            key={index}
            isUser={message.isUser}
            text={message.text}
            timestamp={getCurrentTime()}
          />
        ))}
        
        {/* Empty space after the chatbox ends */}
        <Box flex="1" />

        <Flex align="center" mt={4}>
          <Input
            backgroundColor='#ffffff'
            ref={inputRef}
            placeholder="Type your message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <Button ml={2} colorScheme="teal" onClick={handleSendMessage}>
            Send
          </Button>
        </Flex>
      </VStack>
    </VStack>
  );
};

export default Chatbox;
