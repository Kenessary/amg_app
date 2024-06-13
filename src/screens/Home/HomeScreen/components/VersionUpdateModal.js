import { Text, View, StyleSheet, Dimensions, TouchableOpacity, Modal, Pressable, SafeAreaView, Linking, Platform, Image } from "react-native";
import { multiLanguage } from "../../../language";
import React, { useContext, useEffect, useState } from "react";
import i18n from 'i18n-js'
import { ru, ch, kz } from "../../../../languages/localizations";
import { Feather } from "@expo/vector-icons";
import { openAppStore, openGooglePlayStore } from "../responses/HomeApi";
import themeContext from "../../../../cores/themeContext";
import { loadDarkMode } from "../../../loadDarkMode";


const windowWidth = Dimensions.get('window').width;
export function VersionUpdateModal ({modalUpdate}) {
    const theme = useContext(themeContext)
    let [isDarkMode, setIsDarkMode] = useState(false)
    
    let [locale, setLocale] = useState('');
    let [lang, setLang] = useState('')

    multiLanguage(locale, setLang)

    i18n.fallbacks = true
    i18n.translations = { kz, ru, ch };
    i18n.locale = lang;
    i18n.defaultLocale = 'kz'

    useEffect(()=>{
        loadDarkMode(setIsDarkMode)
    },[])


    return(
        
      <Modal animationType="fade" transparent={false} visible={modalUpdate}>

      <View style={{width:'100%', height:'100%', justifyContent:'flex-end', backgroundColor: theme.background}}>
       <View style={{alignItems:'center', marginBottom:60}}>
         <Text style={{textAlign:'center', fontSize:22, fontWeight:'600', color: theme.color}}>
         {i18n.t('updateAlert')}
         </Text>


       <TouchableOpacity onPress = {() => Platform.OS === 'ios' ? openAppStore() : openGooglePlayStore()} style={{width:windowWidth-80, height:50, backgroundColor: isDarkMode === true ? "#C0D5EE" : '#D64D43', marginTop:20, borderRadius:15, alignItems:'center', justifyContent:'center', flexDirection:'row'}}>
       <Feather name="download" size={20} color={theme.background} style={{marginRight:10}} />
         <Text style={{color:theme.background, fontSize:20, fontWeight:'500'}}>{i18n.t('updateApp')}</Text>
       </TouchableOpacity>
       <TouchableOpacity onPress={()=>Linking.openURL('http://www.cnpc-amg.kz/?p=ann_6')} style={{width:windowWidth-80, height:50, borderColor: isDarkMode === true ? "#C0D5EE" : 'grey', borderWidth:0.6, marginTop:20, borderRadius:15, alignItems:'center', justifyContent:'center', flexDirection:'row'}}>
       <Image
     source={require('../../../../../assets/huawei-logo-transparent-2.png')}
     style={{width:50, height:50}}
     // style={styles.bottomImage}
   /> 
         <Text style={{color:theme.color, fontSize:18, fontWeight:'500', marginLeft:-2}}>Huawei</Text>
       </TouchableOpacity>
       </View>
       {isDarkMode ===true  ?      <Image
     source={require('../../../../../assets/mobileUpdateDark.jpg')}
     style={{width:'100%', height:"50%"}}
     // style={styles.bottomImage}
   /> : <Image
   source={require('../../../../../assets/mobileupdate.jpg')}
   style={{width:'100%', height:"50%"}}
   // style={styles.bottomImage}
 /> }
      </View>
   </Modal>
    )
}