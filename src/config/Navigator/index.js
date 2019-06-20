import { createAppContainer, createStackNavigator } from 'react-navigation';
import Chat from '../../screens/Chat';

const MainStack = createStackNavigator({
  Chat,
});

export default createAppContainer(MainStack);
