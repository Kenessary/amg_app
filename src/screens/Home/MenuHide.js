import { Text, StyleSheet, View, TouchableOpacity, Dimensions } from 'react-native'
import React, { Component, useEffect, useState } from 'react'
import { List } from "react-native-paper";
import { BirthdayIcon, EventIcon, InfoguideIcon, MenuIcon, NewsIcon, AddMenu} from "../../cores/helpers/icon";

import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import i18n from 'i18n-js'
import { kz, ru, ch } from '../../languages/localizations';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


export default function MenuHide ({onPress}) {

    
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
    return (
        <View style={{alignItems:'center'}}>
            <View style={styles.listwrapper}>
                <List.Item
                title = {i18n.t('foodmenu')}
                rippleColor='transparent'
                onPress = {onPress}
                left = {color => <MenuIcon fill={color}/>}
                titleStyle={{fontSize:17, color:'#4D4D4D'}}
                />
            </View>
            </View>
    )
}

const styles = StyleSheet.create({
    listwrapper: {
        marginBottom: 0,
        width: windowWidth-30,
      },

})