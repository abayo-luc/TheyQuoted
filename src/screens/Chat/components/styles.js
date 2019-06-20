import { StyleSheet } from 'react-native';

export const chatInputStyles = StyleSheet.create({
  container: {
    borderRadius: 30,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#ccc',
    justifyContent: 'center',
    paddingHorizontal: 5,
  },
});

export const sendButtonStyles = StyleSheet.create({
  container: {
    alignContent: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 25,
    height: undefined,
    aspectRatio: 510 / 510,
    tintColor: '#1F1B24',
  },
});
