import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { 
    StartScreen,
    LoginScreen,
    RegisterScreen,
    ResetPasswordScreen,
    // BiometricScreen,
    RepBiometricScreen,
    LanguageSelector,
    RestorePassword
} 
from "../../screens";

import {BiometricScreen} from '../../screens'
import VerifyForget from "../../screens/Auth/VerifyForget";



const Stack = createNativeStackNavigator()

const AuthStack = () => {
    return(
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="LoginScreen" component={LoginScreen} options={{customAnimationOnGesture:false}}/>
            {/* <Stack.Screen name="BiometricScreen" component={BiometricScreen}/> */}
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{customAnimationOnGesture:false, animation:'fade', animationDuration:400}}/>
            <Stack.Screen name="LanguageSelector" component={LanguageSelector}/>
            <Stack.Screen  name="VerifyForget" component={VerifyForget} options={{animation:'fade_from_bottom', animationDuration:400}}/>
            <Stack.Screen name="RestorePassword" component={RestorePassword} />
            {/* <Stack.Screen name="RepBiometricScreen" component={RepBiometricScreen}/> */}
            {/* <Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen}/>
            <Stack.Screen name="StartScreen" component={StartScreen}/> */}
        </Stack.Navigator>
    )
}
export default AuthStack