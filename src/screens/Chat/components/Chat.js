import React, { Component } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { Dialogflow_V2 } from 'react-native-dialogflow-text';
import ChatInput from './ChatInput';
import SendButton from './SendButton';
import { PRIVATE_KEY, CLIENT_EMAIL, PROJECT_ID } from '../../../../keys.json';

const INITIAL_MESSAGE = `
Welcome to TheySaid APP . This bot will introduce you
to popular saying and quotes. You can say Hi and introduce yourself. 
Developed by Luka
`;
const BOT_USER = {
  _id: 2,
  name: 'React Native',
  avatar:
    'https://res.cloudinary.com/dghepsznx/image/upload/v1561383297/20681465.jpg',
};
export default class Chat extends Component {
  state = {
    messages: [
      {
        _id: 1,
        text: INITIAL_MESSAGE,
        createdAt: new Date(),
        user: BOT_USER,
      },
    ],
  };

  componentWillMount() {
    Dialogflow_V2.setConfiguration(
      CLIENT_EMAIL,
      PRIVATE_KEY,
      Dialogflow_V2.LANG_ENGLISH_US,
      PROJECT_ID,
    );
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
    const message = messages[0].text;

    Dialogflow_V2.requestQuery(
      message,
      result => this.handleGoogleResponse(result),
      error => console.log(error),
    );
  }

  handleGoogleResponse = (result) => {
    const text = result.queryResult.fulfillmentText;
    this.sendBotResponse(text);
  };

  sendBotResponse = (text) => {
    const { messages } = this.state;
    const message = {
      _id: messages.length + 1,
      text,
      createdAt: new Date(),
      user: BOT_USER,
    };
    this.setState(state => ({
      messages: GiftedChat.append(state.messages, message),
    }));
  };

  renderChatInput = props => <ChatInput {...props} />;

  renderSendBtn = props => <SendButton {...props} />;

  render() {
    const { messages } = this.state;
    return (
      <GiftedChat
        messages={messages}
        onSend={message => this.onSend(message)}
        user={{
          _id: 1,
        }}
        renderSend={this.renderSendBtn}
        renderInputToolbar={this.renderChatInput}
      />
    );
  }
}
