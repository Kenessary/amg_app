import React, { useContext, useEffect, useState, useRef } from "react";
import { Text, View, StyleSheet, Dimensions, TouchableOpacity, Modal, Pressable, SafeAreaView, Alert, BackHandler, Linking, Platform, ScrollView, AppState, Image, TextInput } from "react-native";
import { List, RadioButton } from "react-native-paper";
import { AuthContext } from "../../context/AuthContext";
import { BirthdayIcon, EventIcon, InfoguideIcon, NewsIcon, Addcon, Appdev, EventIconDark, InfoguideIconDark, BirthdayIconDark, NewsIconDark, AddconDark, AppdevDark, DocumentForReviewDark, DocumentForReview, InfoguideIconSecond, DocumentForReviewSecond, EventIconSecond, BirthdayIconSecond, NewsIconSecond, AddMenuSecond, AddconSecond, AppdevSecond} from "../../cores/helpers/icon";
import { FontAwesome, Entypo, MaterialCommunityIcons, Feather, AntDesign, Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import i18n from 'i18n-js'
import { kz, ru, ch } from '../../languages/localizations';
import axios from "axios";
import qs from "qs"
import FoodAddSecond from "./FoodAddSecond";
import MenuHideSecond from "./MenuHideSecond";
import { WaveIndicator } from "react-native-indicators";
import "react-native-gesture-handler"
import {BottomSheet} from "react-native-btr"
import { BlurView } from 'expo-blur';





const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import LottieView from "lottie-react-native"
import themeContext from "../../cores/themeContext";
import moment from "moment";
import VerifyForPassword from "../Profile/VerifyForPassword";
import UserVerification from "./UserVerification";
import { DeviceType, deviceName, deviceYearClass } from "expo-device";

export default function HomeScreenSecond({navigation}){


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

  // change version before update
  const version = "1.3.6"

  const {iin, historyOpened} = useContext(AuthContext)
  let [apparat, setApparat] = useState('');
  let [interfaces, setInterfaces] = useState('');
  let [interfacesSwitch, setInterfacesSwitch] = useState('');
  let [stol, setStol] = useState('');
  let [fio, setFio] = useState('');
  let [verified, setVerified] = useState('');
  let [isForeign, setisForeign] = useState('');
  let [opros, setOpros] = useState(false)
  let [isLoading, setIsLoading] = useState(false)
  let [isLoading1, setIsLoading1] = useState(false)
  let [isLoadingVer, setIsLoadingVer] = useState(false)
  let [menu, setMenu] = useState('')
  let [update, setUpdate] = useState('')
  let [modalResult, setModalResult] = useState(false)
  let [modalUpdate, setModalUpdate] = useState(false)
  let [buttonShow, setButtonShow] = useState(false)
  // let [checkVerification, setCheckVerification] = useState(true)
  let [respass, setresPass] = useState('')
  let [iin1, setIin1] = useState('')
 
  let [modalSocial, setModalSocial] = useState(false)
  let [modalVerification, setModalVerification] = useState(false)
  // let [modalResult1, setModalResult1] = useState(true)
  let [otvetOpros, setOtvetOpros] = useState('')
  let [locale, setLocale] = useState('');
  let [lang, setLang] = useState('')
  i18n.fallbacks = true
  i18n.translations = { kz, ru, ch };
  i18n.locale = lang;
  i18n.defaultLocale = 'kz'

  const [rating, setRating] = useState(0);
  // console.log(rating)

  // console.log(Constants.manifest2.extra.expoClient.version)

  // console.log(update)

// useEffect(()=>{
  
// },[])

const [visible, setVisible] = useState(false);
const [visible1, setVisible1] = useState(false);
const [visible2, setVisible2] = useState(false);
const [ docsArrayLength, setDocsArrayLength ] = useState(null)

const toggleBottomNavigationView = () => {
  //Toggling the visibility state of the bottom sheet
  setVisible(!visible);
};

const toggleBottomNavigationView1 = () => {
  //Toggling the visibility state of the bottom sheet
  setVisible1(!visible1);
};

const toggleBottomNavigationView2 = () => {
  //Toggling the visibility state of the bottom sheet
  setVisible2(!visible2);
};
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
      // console.log(parsed) 
    })
  } catch (error) {
    console.error(error)}
  }

  useEffect(()=>{
    fetchDataEdo()
  },[])

  // console.log(rating === 3)

  //--------- ВЕРСИЯ ПРИЛОЖЕНИЯ --------- //
  const fetchDataVersion = () => {
    try {
      const data = qs.stringify({
      'addinfoversionontableiin': iin,
      'addinfoversionontablever': version
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
      // console.log(parsed) 
    })
  } catch (error) {
    console.error(error)}
  }

  useEffect(()=>{
    fetchDataVersion()
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
      console.log(parse_third)
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
    url: `http://95.57.218.120/?apitest.helloAPIObnova={"ver":"${version}"}`,
    headers: {  }
  }
  axios(config)
  .then(function(response){
    let info = response.data.replace(/<[^>]*>/g, '').replace(/-->/g, '')
    let parse_first = JSON.parse(info)
    let parse_second = parse_first.response

    // console.log(parse_second)
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

//======================================

  useEffect(()=>{
    getInterface()
  },[])
  
  const getInterface = () => { 
    try {
      AsyncStorage.getItem('mainPageInterface')
      .then(value => {
        if(value != null){
          setInterfaces(value)
        }
      })
      } catch(error){
        console.log(error)
      }
  }

  // console.log(interfaces)

  //======================================

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
                <Text style={{color: theme.color, fontSize: 16}} key={Math.random()}>{eat}</Text>
            </View>
        </View> 
    )
  }


  // useEffect(()=>{
  //   setIsLoading(true)
  //   setVisible1(false)
  //     const data = qs.stringify({
  //       'infoiin': iin
  //     });
  //     const config = {
  //       method: 'post',
  //       url: 'http://95.57.218.120/?index',
  //       headers: { 
  //         'Authorization': 'Basic OTgwNjI0MzUxNDc2OjIyMjI=', 
  //         'Content-Type': 'application/x-www-form-urlencoded'
  //       },
  //       data : data
  //     };
  //     axios(config)
  //     .then(async function(response){
  //         let user = response.data.replace(/<[^>]*>/g, '').replace(/-->/g, '')
  //         let parsed = JSON.parse(user)
  //         let telephone = parsed.tel
  //         let ver = parsed.verified
  //         if (telephone === null){
  //             setresPass(telephone)
  //             AsyncStorage.setItem('restorepass', JSON.stringify(telephone))
              
  //         }
  //         setresPass(telephone)
  //         setVerified(ver)
  //         AsyncStorage.setItem('restorepass', JSON.stringify(telephone))
  //         setIsLoading(false)
          
  //     })
    
  //     .catch(function(error){
  //         console.log(error)
  //         setIsLoading(false)
  //     }) 
  // },[])


  // useEffect(()=>{
  //   setIsLoadingVer(true)
  //   const data = qs.stringify({
  //     'infoiin': iin 
  //   });
  //   const config = {
  //     method: 'post',
  //     url: 'http://95.57.218.120/?index',
  //     headers: { 
  //       'Authorization': 'Basic OTgwNjI0MzUxNDc2OjIyMjI=', 
  //       'Content-Type': 'application/x-www-form-urlencoded'
  //     },
  //     data : data
  //   };
  //   axios(config)
  //   .then(async function(response){
  //       let user = response.data.replace(/<[^>]*>/g, '').replace(/-->/g, '')
  //       let parsed = JSON.parse(user)
  //       let telephone = parsed.tel
  //       let ver = parsed.verified
  //       // let iin = parsed.iin
  //       if (telephone === null){
  //           setresPass(telephone)
  //           AsyncStorage.setItem('restorepass', JSON.stringify(telephone))
            
  //       }
  //       setresPass(telephone)
  //       setFio(parsed.fio)
  //       setVerified(ver)
  //       console.log(ver)
  
  //       const day = moment().format(`DD`)
  //       const mm = moment().format(`MM`)
  //       const iinMonth = iin.slice(2,4)
  //       const iinDay = iin.slice(4,6)

  //       if(day === iinDay && mm === iinMonth){
  //         setButtonShow(true)
  //       } else {
  //         setButtonShow(false)
  //       }
  //       // console.log(iinDay)
  
  //       // console.log(day === iinDay)
  
  // //       await registerIndieID(`${iin}`, 5464, 'cq3oCzyrxvjyjKu8iBQDal');
  
  //       setIsLoadingVer(false)
  //   })
  
  //   .catch(function(error){
  //       console.log(error)
  //       setIsLoadingVer(false)
  //   }) 
  // },[])

  const docDefaultDate = (documentiin, god, mes ) => {
    setIsLoading(true)
      const data = qs.stringify({
          // 'documentiin': '831120400361',
          'documentiin': documentiin,
          'documentname': 'exec',
          'god': god,
          'mes': mes
        });
      const config = {
          method: 'post',
          url: 'http://95.57.218.120/?index',
          headers: { 
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          data : data
        };
      axios(config)
       .then(function(response){
        const info = response.data.replace(/<[^>]*>/g, '').replace(/-->/g, '')
        const parsed = (JSON.parse(info))
        const arrayWithoutParam =  Object.values(parsed)
        // console.log(arrayWithoutParam.length)
        setDocsArrayLength(arrayWithoutParam.length)
        setIsLoading(false)
       })
       .catch(function (error) {
        console.log(error);
        setIsLoading(false)
       })
  }


  const infoIin = () => {
    setIsLoadingVer(true)
    const data = qs.stringify({
      'infoiin': iin 
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
        let telephone = parsed.tel
        let ver = parsed.verified
        let forin = parsed.isforeign
        if (telephone === null){
            setresPass(telephone)
            AsyncStorage.setItem('restorepass', JSON.stringify(telephone))
            
        }
        setresPass(telephone)
        setFio(parsed.fio)
        setVerified(ver)
        setisForeign(forin)
        // console.log(parsed)
        // console.log(parsed)
  
        const day = moment().format(`DD`)
        const mm = moment().format(`MM`)
        const iinMonth = iin.slice(2,4)
        const iinDay = iin.slice(4,6)

        if(day === iinDay && mm === iinMonth){
          setButtonShow(true)
        } else {
          setButtonShow(false)
        }
        // console.log(iinDay)
  
        // console.log(day === iinDay)
  
  //       await registerIndieID(`${iin}`, 5464, 'cq3oCzyrxvjyjKu8iBQDal');
  
        setIsLoadingVer(false)
    })
  
    .catch(function(error){
        console.log(error)
        setIsLoadingVer(false)
    }) 

  }

  // console.log(stol)

  useEffect(()=>{
    infoIin()
    docDefaultDate(iin, '', '')
  },[])


  //--------- ИНДИКАТОР ЗАГРУЗКИ --------- //
  if(menu.length === 0 && isLoadingVer) {
    return(
      <View style={{flex: 1, justifyContent:'center', alignItems: 'center', backgroundColor: isDarkMode === true ? '#262C38':''}}>
      <WaveIndicator color={theme.loading}/>
    </View>
    )
  }


  const openAppStore = () => {
    Linking.openURL('https://apps.apple.com/kz/app/amg-life/id1594409514'); // Replace with your app's App Store URL
  };

  const openGooglePlayStore = () => {
    Linking.openURL('https://play.google.com/store/apps/details?id=kz.portmasterplus.cnpcamglife'); // Replace with your app's Google Play Store URL
  };

  const handleStarPress = (newRating) => {
    setRating(newRating);
  };
  
  const renderStars = () => {
    const stars = [];

    for (let i = 1; i <= 5; i++) {
      const starColor = i <= rating ? 'gold' : 'gray';
      stars.push(
        <TouchableOpacity
          key={i}
          onPress={() => handleStarPress(i)}
          style={styles.starContainer11}
        >
          <FontAwesome name="star" size={40} color={starColor} />
        </TouchableOpacity>
      );
    }

    return stars;
  };

  // console.log(Platform.OS)

//--------- ФРОНТЕНД СТРАНИЦЫ --------- //  
  return (
    <View style={{...styles.container, opacity: modalSocial ? 0.3 : 1, backgroundColor: theme.background, flex:1, zIndex:10}}>
      
      <UserVerification respass={respass} verified={verified} setVerClose={infoIin}  foreign={isForeign} />
      <View style={{position:'absolute', bottom:20, right:20, zIndex:30, display: buttonShow === true ? 'flex' : 'none'}}>
        <TouchableOpacity style={{width:70, height:70, borderColor: isDarkMode === true ? '#C0D5EE' : '#D64D43', borderWidth:2, borderRadius:50, alignItems:'center', justifyContent:'center'}} onPress={toggleBottomNavigationView1}>
          <Text style={{fontSize:30}}>🎁</Text>
        {/* <Feather name="gift" size={30} color="white" /> */}
        </TouchableOpacity>
      </View>



<BottomSheet
          visible={visible}

          //setting the visibility state of the bottom shee
          onBackButtonPress={toggleBottomNavigationView}
          //Toggling the visibility state on the click of the back botton
          onBackdropPress={toggleBottomNavigationView}
          //Toggling the visibility state on the clicking out side of the sheet
        >
          {/*Bottom Sheet inner View*/}
          <View style={[styles.bottomNavigationView, {backgroundColor: theme.background, zIndex:30}]}>
            <View
              style={{
              }}>
                <View style={{alignItems:'center'}}>
                <Text
                style={{
                  marginTop:5,
                  fontSize: 22,
                  fontWeight:"700",
                  // backgroundColor:'red'
                  color: theme.color
                }}>
                AMG-Life
              </Text>
                </View>

              <View style={{flexDirection:'row', justifyContent:'space-around', marginTop:15}}>
                <TouchableOpacity 
                  style={{padding:8, borderWidth:2, borderRadius:15, borderColor:'#e4e4e4'}}
                  onPress={()=>Linking.openURL(`instagram://user?username=cnpc_kazakhstan`)}
                >
                  <View style={{flexDirection:'row', justifyContent:'center'}}>
                    <Image source={require('../../../assets/instagram.png')} style={{height:18, width:18}}/>
                    <Text style={{marginLeft:5, fontSize:14, color:theme.color,}}>cnpc_kazakhstan</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={{padding:8, borderWidth:2, borderRadius:15, borderColor:'#e4e4e4'}}
                  onPress={()=>Linking.openURL('vnd.youtube://@cnpc-amg7239/CNPC-AMG/')}
                >
                  <View style={{flexDirection:'row', justifyContent:'center'}}>
                    <Entypo name="youtube" size={18} color="#FF0000" />
                    <Text style={{marginLeft:5, fontSize:14, color:theme.color,}}>CNPC AMG-Life</Text>
                  </View>
                </TouchableOpacity>
              </View>

              <View style={{flexDirection:'row', justifyContent:'space-around', marginTop:15}}>
                <TouchableOpacity 
                  style={{padding:8, borderWidth:2, borderRadius:15, borderColor:'#e4e4e4'}}
                  onPress={()=>Linking.openURL('http://facebook.com/cnpc.kazakhstan')}
                >
                  <View style={{flexDirection:'row', justifyContent:'center'}}>
                    <Image source={require('../../../assets/facebook.png')} style={{height:18, width:18}}/>
                    <Text style={{marginLeft:5, fontSize:14, color:theme.color,}}>cnpc.kazakhstan</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={{padding:8, borderWidth:2, borderRadius:15, borderColor:'#e4e4e4'}}
                  onPress={()=>Linking.openURL('http://www.cnpc-amg.kz/')}
                >
                  <View style={{flexDirection:'row', justifyContent:'center'}}>
                    <MaterialCommunityIcons name="web" size={18} color="#3771C8" />
                    <Text style={{marginLeft:5, fontSize:14, color:theme.color,}}>cnpc-amg.kz</Text>
                  </View>
                </TouchableOpacity>
              </View>

              <View style={{alignItems:'center'}}>
                <Text
                style={{
                  marginTop:25,
                  fontSize: 16,
                  fontWeight:"500",
                  // backgroundColor:'red'
                  color:theme.color
                }}>
                Версия приложения: {version}
              </Text>
                </View>


              
            </View>
          </View>
</BottomSheet>

<BottomSheet
          visible={visible2}

          //setting the visibility state of the bottom shee
          onBackButtonPress={toggleBottomNavigationView2}
          //Toggling the visibility state on the click of the back botton
          onBackdropPress={toggleBottomNavigationView2}
          //Toggling the visibility state on the clicking out side of the sheet
        >
          {/*Bottom Sheet inner View*/}
          <View style={[styles.bottomNavigationView, {backgroundColor: theme.background, zIndex:30}]}>
            <View
              style={{
              }}>
                <View style={{alignItems:'center'}}>
                <Text
                style={{
                  marginTop:5,
                  fontSize: 22,
                  fontWeight:"700",
                  // backgroundColor:'red'
                  color: theme.color
                }}>
                Интерфейс
              </Text>
                </View>

                <View style={{flexDirection:'row', marginTop:30, justifyContent:'space-evenly'}}>

                  <TouchableOpacity 
                    onPress={()=>{AsyncStorage.setItem('mainPageInterface', interfacesSwitch); setInterfacesSwitch('false'); setVisible2(false); navigation.navigate('HomeScreen')}}
                    style={{borderWidth: 3, borderColor:'#D5463C', alignItems:'center', width: 90, height: 90, justifyContent:'center', borderRadius:15}}
                  >
                  <Ionicons name="md-list" size={40} color="#D5463C" />
                  </TouchableOpacity>

                  
                  <TouchableOpacity 
                    onPress={()=>{AsyncStorage.setItem('mainPageInterface', interfacesSwitch); setInterfacesSwitch('true'); setVisible2(false); navigation.navigate('HomeScreenSecond')}}
                    style={{borderWidth: 1, borderColor:'#9D9D9D', alignItems:'center', width: 90, height: 90, justifyContent:'center', borderRadius:15}}
                  >
                  <Ionicons name="grid" size={36} color="#9D9D9D" />
                  </TouchableOpacity>

                </View>

             


              
            </View>
          </View>
</BottomSheet>

<BottomSheet
          visible={visible1}

          //setting the visibility state of the bottom shee
          onBackButtonPress={toggleBottomNavigationView1}
          //Toggling the visibility state on the click of the back botton
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


      <StatusBar style= {isDarkMode ? 'light' : 'dark' } />

      <View style={{alignItems:'center'}}>
        <View style={styles.header}>
          <Text style={[styles.headerTitle, {color: theme.color}]}>{i18n.t('main')}</Text>
          <View style={{flexDirection:'row'}}>
          <TouchableOpacity 
            style={{padding:5,paddingLeft:10, paddingRight:10, backgroundColor: theme.background, flexDirection:'row', alignItems:'center', borderRadius:5, borderWidth: isDarkMode ? 1.3 : 0.8, borderColor: theme.borderColor}}
            // onPress={() => setModalSocial(true)}
            onPress={toggleBottomNavigationView}
            >
            <Image source={require('../../../assets/androidpush.png')} style={{width:20, height:20, marginRight:8}}/>
            <Text style={{fontSize:15, fontWeight:'600', color: theme.color}}>AMG-Life</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={{padding:5,paddingLeft:10, paddingRight:10, backgroundColor: theme.background, flexDirection:'row', alignItems:'center', justifyContent:'center', borderRadius:5, borderWidth: isDarkMode ? 1.3 : 0.8, borderColor: theme.borderColor, marginLeft:10}}
            // onPress={() => setModalSocial(true)}
            onPress={toggleBottomNavigationView2}
            >
              <AntDesign name="swap" size={16} color="#4d4d4d"  />
          </TouchableOpacity>
          </View>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator= {false}>
      
        <View style={{alignItems:'center', marginTop:15}}>

<View style={{flexDirection:'row', width:windowWidth-20, justifyContent:'space-between'}}>
<TextInput placeholder="Поиск по сотруднику" placeholderTextColor={"#4d4d4d"} style={{width:"85%", height:35, borderRadius:10, borderWidth: 1 , borderColor: theme.borderColor , paddingLeft:10, marginBottom:15}}/>
        <TouchableOpacity style={{width:"13%", height:35, borderRadius:10, borderWidth: 1 , borderColor: theme.borderColor, alignItems:'center', justifyContent:'center' }}>
        <Feather name="search" size={16} color={theme.color} />
        </TouchableOpacity>
</View>

          <View style={{width:windowWidth-20, flexDirection:'row', justifyContent: (stol !== 'Yes' && apparat !== 'Yes' ? 'space-between' : 'space-around'), marginBottom:15, flexWrap:'wrap'}}>
           
          {stol === 'Yes' ? <FoodAddSecond onPress={()=> navigation.navigate('FoodMenuPanel')}/>: ''}

            <TouchableOpacity 
              style={{width:"32%", alignItems:'center', borderWidth: 0.7, padding:3, borderColor: theme.borderColor, borderRadius: 10, marginBottom:10}}
              onPress = {() => {navigation.navigate('InfoguideScreen')}}
            >
              <InfoguideIconSecond/>
              <Text style={{textAlign:'center', fontSize:12, marginTop:3, fontWeight:'500'}}>{i18n.t('infoguide')}</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={{width:"32%", alignItems:'center', borderWidth: 0.7, padding:3, borderColor: theme.borderColor, borderRadius: 10,marginBottom:10}}
              onPress = {() => {navigation.navigate('DocumentListScreen')}}
            >
              <DocumentForReviewSecond />
              <Text style={{textAlign:'center',fontSize:12, marginTop:3, fontWeight:'500'}}>{i18n.t('docLoad')}</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={{width:"32%", alignItems:'center', borderWidth: 0.7, padding:3, borderColor: theme.borderColor, borderRadius: 10, marginBottom:10}}
              onPress = {() => {navigation.navigate('EventsScreen')}}
            >
              <EventIconSecond/>
              <Text style={{textAlign:'center', fontSize:12, marginTop:3, fontWeight:'500'}}>{i18n.t('events')}</Text>
            </TouchableOpacity>

            {apparat === 'Yes' ? <MenuHideSecond onPress={()=> navigation.navigate('FoodMenuScreen')}/>: <></>}

            <TouchableOpacity 
              style={{width:"32%", alignItems:'center', borderWidth: 0.7, padding:3, borderColor: theme.borderColor, borderRadius: 10, marginBottom:10}}
              onPress = {() => {navigation.navigate('BirthdayScreen')}}
            >
            <BirthdayIconSecond/>
              <Text style={{textAlign:'center', fontSize:12, marginTop:3, fontWeight:'500'}}>{i18n.t('birthdays')}</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              onPress = {() => {navigation.navigate('NewsScreen')}}
              style={{width:"32%", alignItems:'center', borderWidth: 0.7, padding:3, borderColor: theme.borderColor, borderRadius: 10, marginBottom:10}}
            >
              <NewsIconSecond/>
              <Text style={{textAlign:'center', fontSize:12, marginTop:3, fontWeight:'500'}}>{i18n.t('news')}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{width:"32%", alignItems:'center', borderWidth: 0.7, padding:3, borderColor: theme.borderColor, borderRadius: 10, marginBottom:10}}>
              <AddconSecond/>
              <Text style={{textAlign:'center', fontSize:12, marginTop:3, fontWeight:'500'}}>{i18n.t('contacts')}</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={{width:"32%", alignItems:'center', borderWidth: 0.7, padding:3, borderColor: theme.borderColor, borderRadius: 10, marginBottom:10}}>
              <AppdevSecond/>
              <Text style={{textAlign:'center', fontSize:12, marginTop:3, fontWeight:'500'}}>{i18n.t('adminpo')}</Text>
            </TouchableOpacity>
            {/* <FoodAdd/> */}
            {/* <MenuHide/>
             */}

        </View>
        </View>
        <View style={{marginBottom:60}}></View> 
      </ScrollView>

      
      <Modal animationType="fade" transparent={false} visible={modalUpdate}>

         <View style={{width:'100%', height:'100%', justifyContent:'flex-end', backgroundColor: theme.background}}>
          <View style={{alignItems:'center', marginBottom:60}}>
            <Text style={{textAlign:'center', fontSize:22, fontWeight:'600', color: theme.color}}>
            {i18n.t('updateAlert')}
            </Text>

            {/* <Text style={{fontSize:20, color:'black'}}>{Platform.constants.Version}</Text> */}

          <TouchableOpacity onPress = {() => Platform.OS === 'ios' ? openAppStore() : openGooglePlayStore()} style={{width:windowWidth-80, height:50, backgroundColor: isDarkMode === true ? "#C0D5EE" : '#D64D43', marginTop:20, borderRadius:15, alignItems:'center', justifyContent:'center', flexDirection:'row'}}>
          <Feather name="download" size={20} color={theme.background} style={{marginRight:10}} />
            <Text style={{color:theme.background, fontSize:20, fontWeight:'500'}}>{i18n.t('updateApp')}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>Linking.openURL('http://www.cnpc-amg.kz/?p=ann_6')} style={{width:windowWidth-80, height:50, borderColor: isDarkMode === true ? "#C0D5EE" : 'grey', borderWidth:0.6, marginTop:20, borderRadius:15, alignItems:'center', justifyContent:'center', flexDirection:'row'}}>
          <Image
        source={require('../../../assets/huawei-logo-transparent-2.png')}
        style={{width:50, height:50}}
        // style={styles.bottomImage}
      /> 
            <Text style={{color:theme.color, fontSize:18, fontWeight:'500', marginLeft:-2}}>Huawei</Text>
          </TouchableOpacity>
          </View>
          {isDarkMode ===true  ?      <Image
        source={require('../../../assets/mobileUpdateDark.jpg')}
        style={{width:'100%', height:"50%"}}
        // style={styles.bottomImage}
      /> : <Image
      source={require('../../../assets/mobileupdate.jpg')}
      style={{width:'100%', height:"50%"}}
      // style={styles.bottomImage}
    /> }
         </View>
        </Modal>

        {/* <Modal animationType="slide" transparent={false} visible={false}>
        <SafeAreaView style={{flex:1, alignItems:'center', justifyContent:'center'}}>
          <View style={{alignItems:'center', width:windowWidth-60}}>
            <Text style={{textAlign:'center', fontSize:20, lineHeight:27, fontWeight:"bold", marginBottom:20, color:'#4d4d4d'}}>В целях безопасности необходимо верифицировать номер телефона</Text>
            <LottieView
            source={require("../../../assets/animation/98065-security-tick.json")}
            autoPlay
            loop={true}
            speed={1.2}
            style={{width:230, height:230, marginBottom:20}}
          />

          <TouchableOpacity style={{width:"100%", height:50, backgroundColor:'#2684FF', alignItems:'center', justifyContent:'center', borderRadius:15}} onPress = {() => {setModalVerification(true)}}>
            <Text style={{color:'white', fontSize:17, fontWeight:'bold'}}>Верифицировать</Text>
          </TouchableOpacity>
          </View>
        </SafeAreaView>

        <Modal animationType="slide" transparent={false} visible={false}>
        <SafeAreaView style={{flex:1, alignItems:'center', justifyContent:'center'}}>
          <Text>verification</Text>
        </SafeAreaView>
        </Modal>


  

        </Modal> */}

        {/* <VerifyForPassword/> */}
   



      <Modal animationType="slide" transparent={false} visible={opros}>
        <SafeAreaView style={[styles.menuOpros, {backgroundColor: theme.background}]}>
          <View style={styles.menuOprosHeader}>
            <View style={styles.menuOprosTitleCenter}>
              <Text style={[styles.menuOprosTitle, {color: isDarkMode === true ? 'white' : '#D64D43' }]}>Меню на сегодня</Text>
            </View>
            {foods}
          </View>
          <Text style={{fontSize:20, color: theme.color}}>Будете сегодня обедать?</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.buttonYes, {backgroundColor: isDarkMode === true ? "#C0D5EE" : '#D64D43'}]} onPress={()=> otvet(iin, 1)}>
              <Text style={[styles.buttonYesText, {color: theme.background}]}>Да</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.buttonNo, {borderColor: isDarkMode === true ? "#C0D5EE" : "#D64D43"}]} onPress={()=> otvet(iin, 2)}>
              <Text style={[styles.buttonNoText, {color: theme.color}]}>Нет</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>

        <Modal animationType="fade" transparent={true} visible={modalResult}>
          <View style={styles.centeredView}>
            <View style={[styles.modalView, { backgroundColor: isDarkMode === true ? "#C0D5EE" : "white",}]}>
              {/* <FontAwesome name="check-circle" size={70} color="#1CA510" /> */}
              <LottieView
            source={require("../../../assets/animation/done.json")}
            autoPlay
            loop={false}
            speed={1.6}
            style={{width:150, height:150}}
          />
              <View style={styles.modalContainer}>
                <Text style={[styles.otvetOpros,{color: isDarkMode === true ?  "#262C38" :'#1CA510'}]}>{otvetOpros}</Text>
                <Pressable style={[styles.button, styles.buttonClose ,{borderColor: isDarkMode ? '#262C38' : '#D64D43'} ]} onPress={() => setOpros(false)}>
                  <Text style={styles.textStyle}>OK</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>


        

        <Modal animationType="fade" transparent={true} visible={isLoading1}>
          <View style={styles.centeredView}>
            <View style={[styles.modalViewLoad,{backgroundColor: theme.background}]}>
              <WaveIndicator color={theme.loading}/>
            </View>
          </View>
        </Modal>
        
      </Modal>



      {/* <BlurView
        style={styles.background}
        intensity={25} // Adjust the blur intensity (0 to 100)
      >

<View style={styles.content}>
      <Text style={styles.title11}>Оцените приложение</Text>
      <View style={styles.starRating11}>{renderStars()}</View>
      <Text style={[styles.ratingText11, {display:'none'}]}>
      Вы оценили это приложение: {rating} из 5.
      </Text>

      <TextInput multiline={true} placeholder="Ваша мнение и предложения" placeholderTextColor={'grey'} style={{  marginTop: 20,
    width: '100%',
    borderWidth: 1,
    height:100,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 15,
    paddingTop:10,
    paddingBottom:10,
    alignItems:'baseline',
    display: rating <=3 ? 'flex' : 'none'
    }}/>

    <TouchableOpacity style={{alignItems:'center', justifyContent:'center', backgroundColor:'#3678DD', width: windowWidth-50, height:40, marginTop:20, borderRadius:10}}>
      <Text style={{color:'white', fontSize:16, fontWeight:'500'}}>Отправить</Text>
    </TouchableOpacity>

      </View>
      
      </BlurView> */}
    </View>
  )
}

const styles = StyleSheet.create({

  // container11: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  title11: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop:10
  },
  starRating11: {
    flexDirection: 'row',
  },
  starContainer11: {
    marginHorizontal: 5,
  },
  ratingText11: {
    marginTop: 20,
    fontSize: 18,
  },


  background: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems:'center',
    
  },
  content: {
    width: windowWidth-20,
    marginTop:50,
    margin: 16, 
    borderRadius: 10, // Add border radius for rounded corners
    backgroundColor: 'white', // Background color of the content view
    elevation: 10, // Shadow depth
    shadowColor: 'black', // Shadow color
    shadowOffset: { width: 0, height: 3 }, // Shadow offset
    shadowOpacity: 0.3, // Shadow opacity
    shadowRadius: 5, // Shadow radius
    padding: 16,
    alignItems:'center',
    justifyContent:'center' // Add padding to separate content from the shadow
  },

  
  container:{
    width: windowWidth, 
    height: windowHeight
  },
  header:{
    flexDirection:'row', 
    marginTop: Platform.OS === 'ios' ? 40 : 30, 
    marginBottom:10,
    alignItems:'center', 
    justifyContent:'space-between', 
    width:windowWidth-40
  },
  modalViewLoad: {
    borderRadius: 20,
    width: 80,
    height: 80,
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
  bottomNavigationView: {
    width: '100%',
    height: 250,
    padding:20,
    borderTopLeftRadius:25,
    borderTopRightRadius:25
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
    fontSize:17
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
    marginRight:70, 
    borderRadius:15
  },
  buttonYesText:{
    fontSize:18, 
    fontWeight:'500'
  },
  buttonNo:{
    alignItems:'center', 
    justifyContent:'center', 
    width:90, 
    height:50, 
    borderRadius:15, 
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
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 0
  },
  modalView: {
    borderRadius: 20,
    width: windowWidth-40,
    height: 300,
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
    borderWidth: 2
  }
})
