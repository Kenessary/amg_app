import { Text, StyleSheet, View, TouchableOpacity, Dimensions } from 'react-native'
import React, { Component, useContext, useEffect, useState } from 'react'
import { List } from "react-native-paper";
import { BirthdayIcon, EventIcon, InfoguideIcon, MenuIcon, NewsIcon, AddMenu, AddMenuDark, AddMenuSecond, AddMenuSecondDark} from "../../cores/helpers/icon";
import AsyncStorage from '@react-native-async-storage/async-storage';
import themeContext from '../../cores/themeContext';



const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;




export default function FoodAddSecond ({onPress}) {
  const theme = useContext(themeContext)
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    // Load the user's preference from AsyncStorage
    loadDarkModePreference();
  });

  const loadDarkModePreference = async () => {
    try {
      const preference = await AsyncStorage.getItem('darkMode');
      if (preference !== null) {
        setIsDarkMode(JSON.parse(preference));
      }
    } catch (error) {
      console.log('Error loading dark mode preference:', error);
    }
  };


  return (

    <TouchableOpacity
      style={{width:"32%", alignItems:'center', borderWidth: 0.7, padding:3, borderColor: theme.borderColor, borderRadius: 10, marginBottom:10}}
      onPress = {onPress}
    >

{
                        isDarkMode ? <AddMenuSecondDark/> : <AddMenuSecond/> 
                    }
<Text style={{textAlign:'center', fontSize:12, marginTop:3, fontWeight:'500', color: theme.color}}>Ввод меню</Text>
</TouchableOpacity>
    
  )
}


const styles = StyleSheet.create({
    listwrapper: {
        marginBottom: 0,
        width: windowWidth-30,
      },

})