import { useContext, useEffect, useState } from "react";
import { Text, View, TouchableOpacity, StyleSheet} from "react-native";
import i18n from 'i18n-js'
import { multiLanguage } from "../../../language";
import { ru, ch, kz } from "../../../../languages/localizations";
import themeContext from "../../../../cores/themeContext";
import {BottomSheet} from "react-native-btr"
import { loadDarkMode } from "../../../loadDarkMode";




export function BirthdayCongratulation({fio, buttonShow}){
    const [visible1, setVisible1] = useState(false);
    const theme = useContext(themeContext)
    let [isDarkMode, setIsDarkMode] = useState(false)
    let [locale, setLocale] = useState('')
    let [lang, setLang] = useState('')
    multiLanguage(locale, setLang)
    i18n.fallbacks = true
    i18n.translations = { kz, ru, ch };
    i18n.locale = lang;
    i18n.defaultLocale = 'kz'

    const toggleBottomNavigationView1 = () => {
        setVisible1(!visible1)
    }

    useEffect(()=>{
        loadDarkMode(setIsDarkMode)
    },[])

    return(
    


        <View style={{position:'absolute', bottom:20, right:20, zIndex:30, display: buttonShow === true ? 'flex' : 'none'}}>
            
    <BottomSheet
          visible={visible1}

          onBackButtonPress={toggleBottomNavigationView1}
          onBackdropPress={toggleBottomNavigationView1}
          //Toggling the visibility state on the clicking out side of the sheet
        >
          {/*Bottom Sheet inner View*/}
          <View style={[styles.bottomNavigationView, {backgroundColor: theme.background, zIndex:30, height:340}]}>
           <View style={{width:"100%", alignItems:'center'}}>
            <Text style={{color: theme.color, fontSize: 20, marginTop:10, fontWeight:'700' }}>{fio}</Text>
            </View> 
            <View style={{width:"100%", alignItems:'center'}}>
            <Text style={{color: theme.color, fontSize: 23, marginTop:25, fontWeight:'700', textAlign:'center', lineHeight: 35}}>{i18n.t('birtdayTitle')}</Text>
            </View> 
            <Text style={{color: theme.color, marginTop:30, fontSize: 18, textAlign:'center', }}>{i18n.t('birtdayText')}</Text>

          </View>
</BottomSheet>

        <TouchableOpacity 
          style={{width:70, height:70, borderColor: isDarkMode === true ? '#C0D5EE' : '#D64D43', borderWidth:2, borderRadius:50, alignItems:'center', justifyContent:'center'}} 
          onPress={toggleBottomNavigationView1}>
            <Text style={{fontSize:30}}>🎁</Text>
        </TouchableOpacity>
      </View>

    )
}

const styles = StyleSheet.create({
    bottomNavigationView: {
        width: '100%',
        height: 250,
        padding:20,
        borderTopLeftRadius:25,
        borderTopRightRadius:25
      }
})