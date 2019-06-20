import React from 'react';
import PropTypes from 'prop-types';
import { View, Image } from 'react-native';
import { Send } from 'react-native-gifted-chat';
import { sendButtonStyles } from './styles';
import SendIcon from './assets/send.png';

const SendButton = ({ containerStyles, ...props }) => (
  <Send
    {...props}
    containerStyle={[containerStyles, sendButtonStyles.container]}
  >
    <View>
      <Image source={SendIcon} style={sendButtonStyles.icon} />
    </View>
  </Send>
);
SendButton.propTypes = {
  containerStyles: PropTypes.shape({}),
};
SendButton.defaultProps = {
  containerStyles: {},
};
export default SendButton;
