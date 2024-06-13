import { Text, StyleSheet, View, TouchableOpacity, Dimensions } from 'react-native'
import React, { Component, useContext, useEffect, useState } from 'react'
import { List } from "react-native-paper";
import { BirthdayIcon, EventIcon, InfoguideIcon, MenuIcon, NewsIcon, AddMenu, AddMenuDark, AddMenuSecond} from "../../cores/helpers/icon";
import AsyncStorage from '@react-native-async-storage/async-storage';
import themeContext from '../../cores/themeContext';



const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


export default function FoodAdd ({onPress}) {
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

          <View style={{alignItems:'center'}}>
        <TouchableOpacity style={styles.listwrapper}>
            <List.Item
                style={styles.title}
                title = 'Ввод меню.'
                rippleColor='transparent'
                onPress = {onPress}
                left = {color => isDarkMode === true ? <AddMenuDark fill={color}/> : <AddMenu fill={color}/>}
                titleStyle={{fontSize:17, color: theme.color, fontWeight: '600'}}
        />
        </TouchableOpacity>
        </View>
      
    )
}


// export function FoodAddSecond ({onPress}) {
//   const theme = useContext(themeContext)
//   const [isDarkMode, setIsDarkMode] = useState(false)

//   useEffect(() => {
//     // Load the user's preference from AsyncStorage
//     loadDarkModePreference();
//   });

//   const loadDarkModePreference = async () => {
//     try {
//       const preference = await AsyncStorage.getItem('darkMode');
//       if (preference !== null) {
//         setIsDarkMode(JSON.parse(preference));
//       }
//     } catch (error) {
//       console.log('Error loading dark mode preference:', error);
//     }
//   };

//   //<View style={{alignItems:'center'}}>
//       // <TouchableOpacity style={styles.listwrapper}>
//       //     <List.Item
//       //         style={styles.title}
//       //         title = 'Ввод меню.'
//       //         rippleColor='transparent'
//       //         onPress = {onPress}
//       //         left = {color => isDarkMode === true ? <AddMenuDark fill={color}/> : <AddMenu fill={color}/>}
//       //         titleStyle={{fontSize:17, color: theme.color, fontWeight: '600'}}
//       // />
//       // </TouchableOpacity>
//       // </View>

//   return (

//     <TouchableOpacity
//       style={{width:"32%", alignItems:'center', borderWidth: 0.7, padding:3, borderColor: theme.borderColor, borderRadius: 10, marginBottom:10}}
//       onPress = {onPress}
//     >
// <AddMenuSecond/>
// <Text style={{textAlign:'center', fontSize:12, marginTop:3, fontWeight:'500'}}>Ввод меню</Text>
// </TouchableOpacity>
    
//   )
// }


const styles = StyleSheet.create({
    listwrapper: {
        marginBottom: 0,
        width: windowWidth-30,
      },

})