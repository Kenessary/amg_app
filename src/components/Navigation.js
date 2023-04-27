import React, { useContext, useState, useEffect } from "react"
import { NavigationContainer } from "@react-navigation/native"
// import { createStackNavigator } from "@react-navigation/native-stack"
import { AuthContext } from "../context/AuthContext"
import { View } from "react-native"
import { WaveIndicator } from "react-native-indicators"
import AppStack from "./navigation/AppStack";
import AuthStack from "./navigation/AuthStack"; 
import AsyncStorage from "@react-native-async-storage/async-storage"

const Navigation = () => {
    const {isLoading, iin} = useContext(AuthContext)
    const [secPass, setSecPass] = useState(null)
    // console.log(iin)
    // console.log(secPass)

    
    useEffect(()=>{getData111()}, [])
    

    const getData111 = () => { 
        try {
            AsyncStorage.getItem('secondPass')
                .then(value => {
                    if(value != null){
                        setSecPass(value)
                    }
                })
        } catch(error){
            console.log(error)
        }
      }
    
    if(isLoading) {
        return(
            <View  style={{flex: 1, justifyContent:'center', alignItems: 'center'}}>
                <WaveIndicator color="#D64D43"/>
            </View>
        )
    }

    // console.log(iin)
    return (
        <NavigationContainer>
            {iin === null ? <AuthStack/> : <AppStack/>}
        </NavigationContainer>
    )
}


export default Navigation
