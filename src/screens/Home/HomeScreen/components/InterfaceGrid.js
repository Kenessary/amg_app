import { Text, View, Dimensions, TouchableOpacity } from "react-native";
import { AddconSecond, AddconSecondDark, AppdevSecond, AppdevSecondDark, BirthdayIconSecond, BirthdayIconSecondDark, DocumentForReviewSecond, DocumentForReviewSecondDark, EventIconSecond, EventIconSecondDark, InfoguideIconSecond, InfoguideIconSecondDark, NewsIconSecond, NewsIconSecondDark } from "../../../../cores/helpers/icon";
import themeContext from "../../../../cores/themeContext";
import { useNavigation } from "@react-navigation/native";
import FoodAddSecond from "../../FoodAddSecond";
import i18n from 'i18n-js'
import { multiLanguage } from "../../../language";
import { ru, ch, kz } from "../../../../languages/localizations";
import { useContext, useEffect, useState } from "react";
import { isApparat, isStolovaya } from "../responses/HomeApi";
import MenuHideSecond from "../../MenuHideSecond";
import { Skeleton } from "@rneui/themed";
import { loadDarkMode } from "../../../loadDarkMode";




const windowWidth = Dimensions.get('window').width;

export function InterfaceGrid({interfacesSwitch}){

    const theme = useContext(themeContext)
    let [locale, setLocale] = useState('');
    let [lang, setLang] = useState('')
    let [stol, setStol] = useState('')
    let [apparat, setApparat] = useState('');
    const [isDarkMode, setIsDarkMode] = useState(false)

    multiLanguage(locale, setLang)

    useEffect(()=>{
        isStolovaya(setStol)
        isApparat(setApparat)
        loadDarkMode(setIsDarkMode)
    },[])

    i18n.fallbacks = true
    i18n.translations = { kz, ru, ch };
    i18n.locale = lang;
    i18n.defaultLocale = 'kz'

    const navigation = useNavigation();

    const nine = 9

    const WaveSkeletonForGrid = []
    for(let i = 0; i < nine; i++){
        WaveSkeletonForGrid.push(
            <Skeleton 
                key={i}
                animation="pulse" 
                style={{backgroundColor: isDarkMode ? theme.iconColor : '#DADADA', borderRadius: 10, marginBottom:10}}
                skeletonStyle={{backgroundColor:"#EBEAEA"}}
                width={"32%"} height={90} 
            />
        )
    }

    if(stol.length === 0 && apparat.length === 0 && interfacesSwitch === 'grid') {
        return(
          <View style={{alignItems: 'center'}}>
            <View style={{width:windowWidth-20, flexDirection:'row', justifyContent: 'space-between', marginBottom:15, flexWrap:'wrap'}}>
                {WaveSkeletonForGrid}
            </View>
        </View>
        )
      }

      

    return(
        <View style={{display: interfacesSwitch === 'grid' ? 'flex': 'none', alignItems:'center'}}>


            <View style={{width:windowWidth-20, flexDirection:'row', justifyContent: (stol !== 'Yes' && apparat !== 'Yes' ? 'space-between' : 'space-around'), marginBottom:15, flexWrap:'wrap'}}>
                {stol === 'Yes' ? <FoodAddSecond onPress={()=> navigation.navigate('FoodMenuPanel')}/>: ''}
                <TouchableOpacity 
                    style={{width:"32%", alignItems:'center', borderWidth: 0.7, padding:3, borderColor: theme.borderColor, borderRadius: 10, marginBottom:10}}
                    onPress = {() => {navigation.navigate('InfoguideScreen')}}
                >
                    {
                        isDarkMode ? <InfoguideIconSecondDark/> : <InfoguideIconSecond/>  
                    }
                    <Text style={{textAlign:'center', fontSize:12, marginTop:3, fontWeight:'500', color: theme.color}}>{interfacesSwitch.interfacesSwitch !== 'false' ?  i18n.t('guide') : i18n.t('infoguide')}</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={{width:"32%", alignItems:'center', borderWidth: 0.7, padding:3, borderColor: theme.borderColor, borderRadius: 10,marginBottom:10}}
                    onPress = {() => {navigation.navigate('DocumentsMenu')}}
                >
                    {
                        isDarkMode ? <DocumentForReviewSecondDark/> : <DocumentForReviewSecond/>
                    }
                    <Text style={{textAlign:'center',fontSize:12, marginTop:3, fontWeight:'500',color: theme.color}}>{i18n.t('docLoad')}</Text>
                </TouchableOpacity>
         
                <TouchableOpacity 
                    style={{width:"32%", alignItems:'center', borderWidth: 0.7, padding:3, borderColor: theme.borderColor, borderRadius: 10, marginBottom:10}}
                    onPress = {() => {navigation.navigate('EventsScreen')}}
                >
                    {
                        isDarkMode ? <EventIconSecondDark/> : <EventIconSecond/>
                    }
                    <Text style={{textAlign:'center', fontSize:12, marginTop:3, fontWeight:'500', color: theme.color}}>{i18n.t('events')}</Text>
                </TouchableOpacity>

                {apparat === 'Yes' ? <MenuHideSecond onPress={()=> navigation.navigate('FoodMenuScreen')}/>: <></>}
                <TouchableOpacity 
                    style={{width:"32%", alignItems:'center', borderWidth: 0.7, padding:3, borderColor: theme.borderColor, borderRadius: 10, marginBottom:10}}
                    onPress = {() => {navigation.navigate('BirthdayScreen')}}
                >
                    {
                        isDarkMode ? <BirthdayIconSecondDark/> : <BirthdayIconSecond/>
                    }
                    <Text style={{textAlign:'center', fontSize:12, marginTop:3, fontWeight:'500', color:theme.color}}>{i18n.t('birthdays')}</Text>
                </TouchableOpacity>
         
                <TouchableOpacity 
                    onPress = {() => {navigation.navigate('NewsScreen')}}
                    style={{width:"32%", alignItems:'center', borderWidth: 0.7, padding:3, borderColor: theme.borderColor, borderRadius: 10, marginBottom:10}}
                >
                    {
                        isDarkMode ? <NewsIconSecondDark/> : <NewsIconSecond/>
                    }
                    <Text style={{textAlign:'center', fontSize:12, marginTop:3, fontWeight:'500', color:theme.color}}>{i18n.t('news')}</Text>
                </TouchableOpacity>
         
                     <TouchableOpacity 
                     onPress = {() => {navigation.navigate('ContactsScreen')}}
                     style={{width:"32%", alignItems:'center', borderWidth: 0.7, padding:3, borderColor: theme.borderColor, borderRadius: 10, marginBottom:10}}>

                       {
                        isDarkMode ? <AddconSecondDark/> : <AddconSecond/>
                    }
                       <Text style={{textAlign:'center', fontSize:12, marginTop:3, fontWeight:'500',color:theme.color}}>{i18n.t('contacts')}</Text>
                     </TouchableOpacity>
         
                     <TouchableOpacity 
                        onPress = {() => {navigation.navigate('AdminPO')}}
                       style={{width:"32%", alignItems:'center', borderWidth: 0.7, padding:3, borderColor: theme.borderColor, borderRadius: 10, marginBottom:10}}>
                       {
                        isDarkMode ? <AppdevSecondDark/> : <AppdevSecond/>
                    }
                       <Text style={{textAlign:'center', fontSize:12, marginTop:3, fontWeight:'500', color:theme.color}}>{i18n.t('adminpo')}</Text>
                     </TouchableOpacity>

                 </View>
        
        </View>
    )
}