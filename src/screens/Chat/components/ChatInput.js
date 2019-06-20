import React from 'react';
import { InputToolbar } from 'react-native-gifted-chat';
import { chatInputStyles } from './styles';

const ChatInput = props => (
  <InputToolbar {...props} containerStyle={chatInputStyles.container} />
);

export default ChatInput;
