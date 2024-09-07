import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'react-native';
import { useEffect, useState } from 'react';

// Import custom components
import Authentication from './src/Screens/Authentication/Authentication';
import Home from './src/Screens/Home/Home';

const Stack = createStackNavigator();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    const token = await AsyncStorage.getItem('token');    
    if(token){
      setIsLoggedIn(true);
    }
  }

  return (
    <>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      <NavigationContainer>
        <Stack.Navigator initialRouteName={isLoggedIn ? "Home" : "Authentication"}>
          <Stack.Screen name="Authentication" options={{ headerShown: false }} component={Authentication}  />
          <Stack.Screen name="Home" options={{ headerShown: false }} component={Home} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

export default App;