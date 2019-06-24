import { createAppContainer, createStackNavigator } from 'react-navigation';
import Chat from '../../screens/Chat';

const MainStack = createStackNavigator({
  Chat: {
    screen: Chat,
    navigationOptions: ({ navigation }) => ({
      title: 'TickTalk',
    }),
  },
});

export default createAppContainer(MainStack);
