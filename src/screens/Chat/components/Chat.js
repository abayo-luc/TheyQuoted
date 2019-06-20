import React, { Component } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import ChatInput from './ChatInput';
import SendButton from './SendButton';

export default class Chat extends Component {
  state = {
    messages: [],
  };

  componentWillMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello Nara',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
      ],
    });
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  }

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
