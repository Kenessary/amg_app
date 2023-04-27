import React, { useContext, useEffect, useState, useRef } from "react";
import { Text, View, StyleSheet, Dimensions, TouchableOpacity, Modal, Pressable, SafeAreaView, Alert, BackHandler, Linking, Platform, ScrollView, AppState, Image } from "react-native";
import { List } from "react-native-paper";
import { AuthContext } from "../../context/AuthContext";
import { BirthdayIcon, EventIcon, InfoguideIcon, NewsIcon, Addcon, Appdev} from "../../cores/helpers/icon";
import { theme } from "../../cores/theme";
import { FontAwesome, Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import i18n from 'i18n-js'
import { kz, ru, ch } from '../../languages/localizations';
import axios from "axios";
import qs from "qs"
import FoodAdd from "./FoodAdd";
import MenuHide from "./MenuHide";
import { WaveIndicator } from "react-native-indicators";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function HomeScreen({navigation}){

  const {iin, historyOpened} = useContext(AuthContext)
  let [apparat, setApparat] = useState('');
  let [stol, setStol] = useState('');
  let [opros, setOpros] = useState(false)
  let [isLoading, setIsLoading] = useState(false)
  let [isLoading1, setIsLoading1] = useState(false)
  let [menu, setMenu] = useState('')
  let [update, setUpdate] = useState('')
  let [modalResult, setModalResult] = useState(false)
  let [modalUpdate, setModalUpdate] = useState(false)
 
  let [modalSocial, setModalSocial] = useState(false)
  // let [modalResult1, setModalResult1] = useState(true)
  let [otvetOpros, setOtvetOpros] = useState('')
  let [locale, setLocale] = useState('');
  let [lang, setLang] = useState('')
  i18n.fallbacks = true
  i18n.translations = { kz, ru, ch };
  i18n.locale = lang;
  i18n.defaultLocale = 'kz'

  // console.log(Constants.manifest2.extra.expoClient.version)

  // console.log(update)

// useEffect(()=>{
  
// },[])

//--------- СТОЛОВЫЙ ОПРОС --------- //  
  useEffect(()=>{
    setIsLoading(true)
    const data = qs.stringify({
      'oprosdlyastolovkiiin': iin 
    });
    const config = {
      method: 'post',
      url: 'http://95.57.218.120/?index',
      headers: { 
        'Authorization': 'Basic OTgwNjI0MzUxNDc2OjIyMjI=', 
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data : data
    };
    axios(config)
      .then(async function(response){
      let user = response.data.replace(/<[^>]*>/g, '').replace(/-->/g, '')
      let parsed = JSON.parse(user)
      // historyOpened()
      if(parsed.status === 1){
        setOpros(true)
      }
      if(parsed.status === 0){
        setOpros(false)
      }
        setIsLoading(false)
      })
      .catch(function(error){
          console.log(error)
          setIsLoading(false)
      }) 
    },[])

//--------- ПУШ ТОКЕН --------- //
  const fetchDataEdo = () => {
    try {
      const data = qs.stringify({
      'pushedoiin': iin,
      'pushedotoken': globalThis.asexpo
    });
    const config = {
      method: 'post',
      url: 'http://95.57.218.120/?index',
      headers: { 
        'Authorization': 'Basic OTgwNjI0MzUxNDc2OjIyMjI=', 
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data : data
    };
    axios(config)
    .then(async function(response){
      let user = response.data.replace(/<[^>]*>/g, '').replace(/-->/g, '')
      let parsed = JSON.parse(user)
      console.log(parsed) 
    })
  } catch (error) {
    console.error(error)}
  }

  useEffect(()=>{
    fetchDataEdo()
  },[])

//--------- МЕНЮ ДЛЯ ОПРОСА --------- //
  useEffect(()=>{
    setIsLoading(true)
    const config = {
      method:'get',
      url: `http://95.57.218.120/?apitest.helloAPI5={}`,
      headers: {  }
    }
    axios(config)
    .then(function(response){
      let info = response.data.replace(/<[^>]*>/g, '').replace(/-->/g, '')
      let parse_first = JSON.parse(info)
      let parse_second = JSON.parse(parse_first.response)
      let parse_third = parse_second.status
      setMenu((JSON.stringify(parse_third)).split(';'))
      setIsLoading(false)
    })
      .catch(function (error) {
      console.log(error);
      setIsLoading(false)
    })
  },[])
//--------- ПРОВЕРКА ОБНОВЛЕНИЯ --------- //
useEffect(()=>{
  setIsLoading(true)
  const config = {
    method:'get',
    url: `http://95.57.218.120/?apitest.helloAPIObnova={"ver":"1.2.4"}`,
    headers: {  }
  }
  axios(config)
  .then(function(response){
    let info = response.data.replace(/<[^>]*>/g, '').replace(/-->/g, '')
    let parse_first = JSON.parse(info)
    let parse_second = parse_first.response
    console

    if(parse_second.status === false){
      setModalUpdate(true)
    }
    if(parse_second.status === true){
      setModalUpdate(false)
    }
    setIsLoading(false)
  })
    .catch(function (error) {
    console.log(error);
    setIsLoading(false)
  })
},[])

//--------- ЗАПИСЬ ОТВЕТА ОПРОС --------- //
  const otvet = (oprospitanieiin, oprospitanieotvet) => {
    setIsLoading1(true)
    const data = qs.stringify({
      'oprospitanieiin': oprospitanieiin,
      'oprospitanieotvet': oprospitanieotvet
    });
    const config = {
      method: 'post',
      url: 'http://95.57.218.120/?index',
      headers: { 
        'Authorization': 'Basic OTgwNjI0MzUxNDc2OjIyMjI=', 
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data : data
    };
    axios(config)
    .then(async function(response){
      let user_password = response.data.replace(/<[^>]*>/g, '').replace(/-->/g, '')
      let parsed = JSON.parse(user_password)
      let oprStat = parsed.status
      setOtvetOpros(oprStat)
      if(oprStat.length !== 0){
        setModalResult(true)
      }
        setIsLoading1(false)
    })
    .catch(function(error){
      console.log(error)
      setIsLoading1(false)
    }) 
  }

//--------- ЯЗЫКИ --------- //    
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
          setLang(value)
        }
      })
    } catch(error){
      console.log(error)
    }
  }

//--------- ПРОВЕРКА НАЛИЧИЕ АППАРАТА --------- //
  useEffect(()=>{
    getDataApparat()
  },[])
  
  const getDataApparat = () => { 
    try {
      AsyncStorage.getItem('userApparat')
      .then(value => {
        if(value != null){
          setApparat(value)
        }
      })
      } catch(error){
        console.log(error)
      }
  }

//--------- ПРОВЕРКА НАЛИЧИЕ ПОВАРА --------- //
  useEffect(()=>{
    getDataStolovaya()
  },[])

  const getDataStolovaya = () => { 
    try {
      AsyncStorage.getItem('userStolovaya')
        .then(value => {
          if(value != null){
            setStol(value)
          }
        })
    } catch(error){
      console.log(error)
    }
  }

//--------- ЗАГЛУШКА ДЛЯ АНДРОИДА --------- //
  useEffect(() => {
    const backAction = () => {
      Alert.alert('Выйти из приложения', 'Вы действительно хотите выйти из AMG-Life?!', [
        {
          text: 'Отмена',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'Да', onPress: () => BackHandler.exitApp()},
      ]);
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, []);

//--------- МАССИВ МЕНЮ --------- //
  const foods = []
  for(let i = 0; i< menu.length-1; i++){
    const eat = (menu[i]).replace('"', '').replace(' ', '')
    foods.push(
        <View style={{ height: 40, flexDirection:'row', marginBottom: 12,}} key={Math.random()}>
            <View style={{marginLeft: 5, width: windowWidth/1.3}}>
                <Text style={{color:'black', fontSize: 16}} key={Math.random()}>{eat}</Text>
            </View>
        </View> 
    )
  }

//--------- ИНДИКАТОР ЗАГРУЗКИ --------- //
  if(menu.length === 0) {
    return(
        <View style={{flex: 1, justifyContent:'center', alignItems: 'center', backgroundColor:'white'}}>
            <WaveIndicator color="#D64D43"/>
        </View>
    )
  }


  const openAppStore = () => {
    Linking.openURL('https://apps.apple.com/kz/app/amg-life/id1594409514'); // Replace with your app's App Store URL
  };

  const openGooglePlayStore = () => {
    Linking.openURL('https://play.google.com/store/apps/details?id=kz.portmasterplus.cnpcamglife'); // Replace with your app's Google Play Store URL
  };

  // console.log(Platform.OS)

//--------- ФРОНТЕНД СТРАНИЦЫ --------- //  
  return (
    <View style={{...styles.container, opacity: modalSocial ? 0.3 : 1}}>




<Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalSocial}
                    onRequestClose={() => {
                    setModalVisible(!modalVisible);
                    }}
                >
                    <View style={styles.centeredView}>
                    <View style={styles.modalViewSocial}>
                      <View>

                      <TouchableOpacity 
                        style={{flexDirection:'row', alignItems:'center', marginBottom:10}}
                        onPress={()=>Linking.openURL(`instagram://user?username=cnpc_kazakhstan`)}>
                          <Image source={require('../../../assets/instagram.png')} style={{height:30, width:30}}/>
                          <Text style={{marginLeft:20, fontSize:20, color:'#4d4d4d'}}>@cnpc_kazakhstan</Text>
                      </TouchableOpacity>
                      
                      <View style={{height:2, backgroundColor:'#CFCFCF'}}></View>

                      <TouchableOpacity 
                        style={{flexDirection:'row', alignItems:'center', marginBottom:10, marginTop:10}}
                        onPress={()=>Linking.openURL('vnd.youtube://@cnpc-amg7239/CNPC-AMG/')}>
                          <Entypo name="youtube" size={30} color="#FF0000" />
                          <Text style={{marginLeft:20, fontSize:20, color:'#4d4d4d'}}>CNPC-AMG</Text>
                      </TouchableOpacity>

                      <View style={{height:2, backgroundColor:'#CFCFCF'}}></View>

                      <TouchableOpacity 
                        style={{flexDirection:'row', alignItems:'center', marginBottom:10, marginTop:10}}
                        onPress={()=>Linking.openURL('http://facebook.com/cnpc.kazakhstan')}>
                          <Image source={require('../../../assets/facebook.png')} style={{height:30, width:30}}/>
                          <Text style={{marginLeft:20, fontSize:20, color:'#4d4d4d'}}>cnpc.kazakhstan</Text>
                      </TouchableOpacity>

                      <View style={{height:2, backgroundColor:'#CFCFCF'}}></View>

                      <TouchableOpacity 
                        style={{flexDirection:'row', alignItems:'center', marginTop:10}}
                        onPress={()=>Linking.openURL('http://www.cnpc-amg.kz/')}>
                          <MaterialCommunityIcons name="web" size={32} color="#3771C8" />
                          <Text style={{marginLeft:20, fontSize:20, color:'#4d4d4d'}}>cnpc-amg.kz</Text>
                      </TouchableOpacity>

                      <TouchableOpacity 
                        style={{ alignItems:'center', marginTop:25, backgroundColor:'#FACBCB', padding:5, borderRadius:10}}
                        onPress={() => setModalSocial(false)}>
                          <Text style={{marginLeft:0, fontSize:18, color:'#D5463C', fontWeight:'500'}}>Закрыть</Text>
                      </TouchableOpacity>
                      </View>
                   
                    </View>
                    </View>
                </Modal>

      <StatusBar style='dark'/>
      <View style={{alignItems:'center'}}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>{i18n.t('main')}</Text>
          {/* <View style={styles.socialnet}>
            <TouchableOpacity onPress={()=>Linking.openURL(`instagram://user?username=cnpc_kazakhstan`)}>
              <Entypo name="instagram-with-circle" size={28} color="#D5463C" />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>Linking.openURL('vnd.youtube://@cnpc-amg7239/CNPC-AMG/')}>
              <Entypo name="youtube-with-circle" size={28} color="#D5463C" />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>Linking.openURL('http://facebook.com/cnpc.kazakhstan')}>
              <Entypo name="facebook-with-circle" size={28} color="#D5463C" />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>Linking.openURL('http://www.cnpc-amg.kz/')}>
              <MaterialCommunityIcons name="web" size={29} color="#D5463C" />
            </TouchableOpacity>
          </View> */}
          <TouchableOpacity 
            style={{padding:5,paddingLeft:10, paddingRight:10, backgroundColor:'white', flexDirection:'row', alignItems:'center', borderRadius:15, borderWidth:0.3, borderColor:'#4d4d4d'}}
            onPress={() => setModalSocial(true)}
            >
            <Image source={require('../../../assets/androidpush.png')} style={{width:22, height:22, marginRight:8}}/>
            <Text style={{fontSize:17, fontWeight:'600', color:'#4d4d4d'}}>AMG-Life</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView>
        {stol === 'Yes' ? <FoodAdd onPress={()=> navigation.navigate('FoodMenuPanel')}/>: <></>}
        <View style={styles.centered}>
          <View style={styles.listwrapper1}>
            <List.Item
              title = {i18n.t('infoguide')}
              style = {styles.icon}
              rippleColor='transparent'
              onPress = {() => {navigation.navigate('InfoguideScreen')}}
              left = {color => <InfoguideIcon fill={color}/>}
              titleStyle={styles.listItem}
            />
          </View>
        </View>
        <View style={styles.centered}>
          <TouchableOpacity style={styles.listwrapper}>
            <List.Item
              title = {i18n.t('events')}
              rippleColor='transparent'
              onPress = {() => {navigation.navigate('EventsScreen')}}
              left = {color => <EventIcon fill={color}/>}
              titleStyle={styles.listItem}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.centered}>
          <View style={styles.listwrapper}>
            <List.Item
              title = {i18n.t('birthdays')}
              rippleColor='transparent'
              onPress = {() => {
                navigation.navigate('BirthdayScreen')
              }}
              left = {color => <BirthdayIcon fill={color}/>}
              titleStyle={styles.listItem}
            />
          </View>
        </View>
        {apparat === 'Yes' ? <MenuHide onPress={()=> navigation.navigate('FoodMenuScreen')}/>: <></>}
        <View style={styles.centered}>
          <View style={styles.listwrapper}>
            <List.Item
              title = {i18n.t('news')}
              rippleColor='transparent'
              onPress = {() => {navigation.navigate('NewsScreen')}}
              left = {color => <NewsIcon fill={color}/>}
              titleStyle={styles.listItem}
            />
          </View>
          <View style={styles.listwrapper}>
            <List.Item
              title = {i18n.t('contacts')}
              rippleColor='transparent'
              onPress = {() => {navigation.navigate('ContactsScreen')}}
              left = {color => <Addcon fill={color}/>}
              titleStyle={styles.listItem}
            />
          </View>
          <View style={styles.listwrapper}>
            <List.Item
              title = {i18n.t('adminpo')}
              rippleColor='transparent'
              onPress = {() => {navigation.navigate('AdminPO')}}
              left = {color => <Appdev fill={color}/>}
              titleStyle={styles.listItem}
            />
          </View>
        </View>
        <View style={{marginBottom:60}}></View> 
      </ScrollView>

      
      <Modal animationType="fade" transparent={false} visible={modalUpdate}>
         <View style={{width:'100%', height:'100%', justifyContent:'flex-end'}}>
          <View style={{alignItems:'center', marginBottom:60}}>
            <Text style={{textAlign:'center', fontSize:22, fontWeight:'600', color:'#4d4d4d'}}>
            {i18n.t('updateAlert')}
            </Text>

          <TouchableOpacity onPress = {() => Platform.OS === 'ios' ? openAppStore() : openGooglePlayStore()} style={{width:windowWidth-80, height:60, backgroundColor:'#D64D43', marginTop:20, borderRadius:15, alignItems:'center', justifyContent:'center'}}>
            <Text style={{color:'white', fontSize:20, fontWeight:'500'}}>{i18n.t('updateApp')}</Text>
          </TouchableOpacity>
          </View>
         <Image
        source={require('../../../assets/mobileupdate.jpg')}
        style={{width:'100%', height:"50%"}}
        // style={styles.bottomImage}
      />
         </View>
        </Modal>

      <Modal animationType="slide" transparent={false} visible={opros}>
        <SafeAreaView style={styles.menuOpros}>
          <View style={styles.menuOprosHeader}>
            <View style={styles.menuOprosTitleCenter}>
              <Text style={styles.menuOprosTitle}>Меню на сегодня</Text>
            </View>
            {foods}
          </View>
          <Text style={{fontSize:20}}>Будете сегодня обедать?</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.buttonYes} onPress={()=> otvet(iin, 1)}>
              <Text style={styles.buttonYesText}>Да</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonNo} onPress={()=> otvet(iin, 2)}>
              <Text style={styles.buttonNoText}>Нет</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>

        <Modal animationType="fade" transparent={true} visible={modalResult}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <FontAwesome name="check-circle" size={70} color="#1CA510" />
              <View style={styles.modalContainer}>
                <Text style={styles.otvetOpros}>{otvetOpros}</Text>
                <Pressable style={[styles.button, styles.buttonClose]} onPress={() => setOpros(false)}>
                  <Text style={styles.textStyle}>OK</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>

        <Modal animationType="fade" transparent={true} visible={isLoading1}>
          <View style={styles.centeredView}>
            <View style={styles.modalViewLoad}>
              <WaveIndicator color="#D64D43"/>
            </View>
          </View>
        </Modal>
        
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    backgroundColor:'white',
    width: windowWidth, 
    height: windowHeight
  },
  header:{
    flexDirection:'row', 
    marginTop: Platform.OS === 'ios' ? 40 : 30, 
    alignItems:'center', 
    justifyContent:'space-between', 
    width:windowWidth-40
  },
  modalViewSocial: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    width: windowWidth-50,
    height: 320,
    alignItems: "center",
    justifyContent: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.2,
    shadowRadius: 9,
    elevation: 4
  },
  headerTitle:{
    fontSize: 24,
    color: "#4D4D4D",
    fontWeight:"bold",
  },
  socialnet:{
    alignItems:'center', 
    width:150, 
    padding:5, 
    flexDirection:'row', 
    justifyContent:'space-around'
  },
  listItem:{
    fontSize:17, 
    color:'#4D4D4D'
  },
  centered:{
    alignItems:'center'
  },
  listwrapper: {
    marginBottom: 0,
    width: windowWidth-30,
  },
  listwrapper1: {
    marginBottom: 0,
    width: windowWidth-30,
  },
  menuOpros:{
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  },
  menuOprosHeader:{
    width:windowWidth-40, 
    padding:15, 
    borderRadius:15, 
    paddingBottom:-10
  },
  menuOprosTitleCenter: {
    alignItems:'center', 
    justifyContent:'center'
  },
  menuOprosTitle:{
    fontSize:18, 
    fontWeight:'600', 
    color:'#D64D43', 
    marginBottom: 15
  },
  buttonContainer:{
    width:windowWidth-40, 
    height:60, 
    flexDirection:'row', 
    alignItems:"center", 
    justifyContent:'center',
    marginTop: 20
  },
  buttonYes:{
    alignItems:'center', 
    justifyContent:'center', 
    width:90, 
    height:50, 
    backgroundColor:'#D64D43', 
    marginRight:70, 
    borderRadius:15
  },
  buttonYesText:{
    fontSize:18, 
    fontWeight:'500', 
    color:'white'
  },
  buttonNo:{
    alignItems:'center', 
    justifyContent:'center', 
    width:90, 
    height:50, 
    backgroundColor:'white', 
    borderRadius:15, 
    borderColor:'#D64D43', 
    borderWidth:3
  },
  buttonNoText:{
    fontSize:18,
    fontWeight:'500',
    color:'#D64D43'
  },
  modalContainer:{
    flexDirection:'column', 
    alignItems:'center'
  },
  otvetOpros:{
    fontSize:16, 
    fontWeight:'600', 
    marginBottom:10, 
    marginTop:10, 
    color:'#1CA510'
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 0
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    width: windowWidth-40,
    height: 200,
    alignItems: "center",
    justifyContent: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.2,
    shadowRadius: 9,
    elevation: 4
  },
  button: {
    borderRadius: 10,
    marginLeft: 15,
    marginRight: 15,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "white",
    borderColor:'#D64D43',
    borderWidth: 2
  }
})
