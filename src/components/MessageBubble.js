import React from 'react';
import { Box, Text } from '@chakra-ui/react';

const MessageBubble = ({ isUser, text, timestamp }) => {
  return (
    <Box
      borderRadius={isUser ? '15px 0 15px 15px' : '0 15px 15px 15px'}
      bg={isUser ? 'purple.500' : 'blue.500'}
      color="white"
      p={3}
      mb={2}
      alignSelf={isUser ? 'flex-end' : 'flex-start'}
      maxW="70%"
    >
      <Text fontSize="xs" mb={1} textAlign={isUser ? 'right' : 'left'}>
        {timestamp}
      </Text>
      <Text fontSize="md">{text}</Text>
    </Box>
  );
};

export default MessageBubble;
