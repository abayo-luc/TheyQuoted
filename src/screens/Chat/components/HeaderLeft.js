import React from 'react';
import { View, Image } from 'react-native';
import ChatIcon from './assets/icon.png';
import { headerLeftStyles } from './styles';

const HeaderLeft = () => (
  <View>
    <Image source={ChatIcon} style={headerLeftStyles.icon} />
  </View>
);

export default HeaderLeft;
