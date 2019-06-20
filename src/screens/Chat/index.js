import React, { Component } from 'react';
import Chat from './components/Chat';
import HeaderLeft from './components/HeaderLeft';

export default class index extends Component {
  static navigationOptions = {
    headerLeft: <HeaderLeft />,
  };

  render() {
    return <Chat />;
  }
}
