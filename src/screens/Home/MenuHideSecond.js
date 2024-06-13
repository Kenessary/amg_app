import { Text, StyleSheet, View, TouchableOpacity, Dimensions } from 'react-native'
import React, { Component, useContext, useEffect, useState } from 'react'
import { List } from "react-native-paper";
import { BirthdayIcon, EventIcon, InfoguideIcon, MenuIcon, NewsIcon, AddMenu, MenuIconDark, BirthdayIconSecond, MenuIconSecond, MenuIconSecondDark} from "../../cores/helpers/icon";

import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import i18n from 'i18n-js'
import { kz, ru, ch } from '../../languages/localizations';
import themeContext from '../../cores/themeContext';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


export default function MenuHideSecond ({onPress}) {
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

    
    let [locale, setLocale] = useState('');
    let [lang, setLang] = useState('')
    i18n.fallbacks = true
    i18n.translations = { kz, ru, ch };
    i18n.locale = lang;
    i18n.defaultLocale = 'kz'

    useEffect(()=>{
        if(locale !== ''){
          AsyncStorage.setItem('appLanguage', locale)
        }
      })
    
      useEffect(()=>{
        getData()
    })
    
    const getData = () => { 
        try {
            AsyncStorage.getItem('appLanguage')
                .then(value => {
                    if(value != null){
                    //   console.log(value)
                        setLang(value)
                    }
                })
            // setIsLoading(false)
        } catch(error){
            // setIsLoading(false)
            console.log(error)
        }
    }

        {/* <View style={styles.listwrapper}>
                <List.Item
                title = {i18n.t('foodmenu')}
                rippleColor='transparent'
                onPress = {onPress}
                left = {color => isDarkMode === true ? <MenuIconDark fill={color}/> : <MenuIcon fill={color}/>}
                titleStyle={{fontSize:17, color: theme.color}}
                />
            </View> */}
    return (
       
        

<TouchableOpacity 
  style={{width:"32%", alignItems:'center', borderWidth: 0.7, padding:3, borderColor: theme.borderColor, borderRadius: 10, marginBottom:10}}
  onPress = {onPress}
>
{
  isDarkMode ? <MenuIconSecondDark/> : <MenuIconSecond/>
}

  <Text style={{textAlign:'center', fontSize:12, marginTop:3, fontWeight:'500', color: theme.color}}>{i18n.t('foodmenu')}</Text>
</TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    listwrapper: {
        marginBottom: 0,
        width: windowWidth-30,
      },

})