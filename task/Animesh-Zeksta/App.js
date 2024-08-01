import { View } from 'react-native';
import Home from './components/Home'
import UserProfile from './components/UserProfile';
import OtherProfile from './components/OtherProfile';
import Filter from './components/Filter';

export default function App() {
  return (
    <View>
      {/* <Home/> */}
      {/* <UserProfile/> */}
      {/* <OtherProfile/> */}
      <Filter/>
    </View>
  );
}