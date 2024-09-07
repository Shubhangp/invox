import { Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = () => {
  const [user, setUser] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    const token = await AsyncStorage.getItem('token');
    if(token){
      setUser(token);
    }else{
      navigation.navigate("Authentication");
    }
  }

  const handleLogout = async () => {
    try {
      setUser("");
      await AsyncStorage.removeItem('token');
      navigation.navigate('Authentication');
    } catch (error) {
      console.error("Error during logout:", error);
    }
  }

  return (
    <View style={{backgroundColor: "#FFF3DD", height: '100%', paddingHorizontal: 20, paddingTop: 40}}>
      <Text style={{fontSize: 24, color: '#555', fontWeight: '400'}}>Welcome, {user}</Text>
      <View style={{width: '100%', justifyContent: 'center', alignItems: 'center', gap: 20, marginTop: 40}}>
        <Text>This home page invox assingment. Enjoy it.</Text>
        <TouchableOpacity style={{backgroundColor: '#fb4f14', paddingVertical: 15, paddingHorizontal: 30, borderRadius: 30, width: '40%', alignItems: 'center'}} onPress={handleLogout}>
          <Text style={{fontSize: 14, fontWeight: '500', color: '#ffffff'}}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Home;