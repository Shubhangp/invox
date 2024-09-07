import { Keyboard, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Alert from './Alert';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Authentication = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [loading, setLoading] = useState(false);
    const [alertVisible, setAlertVisible] = useState(false);
    const navigation = useNavigation();

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const isValidPassword = (password) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
        return passwordRegex.test(password);
    };

    const handleSignIn = async () => {
        let valid = true;
    
        if (!email) {
            setEmailError('Email cannot be empty');
            valid = false;
        } else if (!isValidEmail(email)) {
            setEmailError('Please enter a valid email address');
            valid = false;
        } else {
            setEmailError('');
        }
    
        if (!password) {
            setPasswordError('Password cannot be empty');
            valid = false;
        } else if (!isValidPassword(password)) {
            setPasswordError('Invalid password');
            valid = false;
        } else {
            setPasswordError('');
        }
    
        if (valid) {
            setLoading(true);
            try {
                await fetch('https://api.mokx.org/api/v1/admin', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      "user_id": email,
                      "password": password
                    }),
                })
                .then(res=>{
                    return res.json();
                })
                .then(async(data) => {                
                    if (data === "exist") {
                        await AsyncStorage.setItem('token', email);
                        setEmail('');
                        setPassword('');
                        navigation.navigate("Home");
                    } else {
                        setAlertVisible(true);
                    }
                })
                .catch(e=>{
                    alert("wrong details")
                    console.log(e);
                })
            } catch (e) {
                console.log(e.message);
            }
            setLoading(false);
        }
    };

    return (
        <>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{backgroundColor: "#FFF3DD", height: '100%', justifyContent: 'center', alignItems: 'center', gap: 20, paddingHorizontal: 30}}>
                    <Text style={{fontSize: 28, color: '#555', fontWeight: '400'}}>Sign in with us!</Text>
                    <View style={{width: '100%', justifyContent: 'center', alignItems: 'center', gap: 20, marginTop: 40}}>

                        <View style={{width: '100%', alignItems: 'center'}}>
                            <TextInput 
                                style={{backgroundColor: '#ffffff', paddingVertical: 10, paddingHorizontal: 15, borderRadius: 5, width: '80%', fontSize: 15, color: '#555555'}} 
                                placeholder='Enter Email' 
                                value={email} 
                                onChangeText={setEmail} 
                                keyboardType='email-address'
                                autoCapitalize='none'
                            />
                            {emailError ? <Text style={{color: 'red', fontSize: 12, textAlign: 'right', width: '80%'}}>{emailError}</Text> : null}
                        </View>

                        <View style={{width: '100%', alignItems: 'center'}}>
                            <TextInput 
                                style={{backgroundColor: '#ffffff', paddingVertical: 10, paddingHorizontal: 15, borderRadius: 5, width: '80%', fontSize: 15, color: '#555555'}} 
                                placeholder='Enter Password' 
                                value={password} 
                                onChangeText={setPassword} 
                                secureTextEntry={true} 
                                autoCapitalize='none'
                            />
                            {passwordError ? <Text style={{color: 'red', fontSize: 12, textAlign: 'right', width: '80%'}}>{passwordError}</Text> : null}
                        </View>
                    </View>

                    <TouchableOpacity 
                        style={{backgroundColor: '#6A1B9A', paddingVertical: 15, paddingHorizontal: 30, borderRadius: 30, width: '80%', alignItems: 'center', marginTop: 40}} 
                        onPress={handleSignIn} 
                        disabled={loading}
                    >
                        <Text style={{fontSize: 14, fontWeight: '500', color: '#ffffff',}}>{loading ? 'Loading...' : 'Login'}</Text>
                    </TouchableOpacity>
                </View>
            </TouchableWithoutFeedback>
            <Alert
                visible={alertVisible}
                onConfirm={() => setAlertVisible(false)}
            />
        </>
    );
}

export default Authentication;