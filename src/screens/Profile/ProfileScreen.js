import React, { useCallback, useContext, useEffect, useState } from 'react'
import { View, StyleSheet, Text, Dimensions, TouchableOpacity, Platform, ScrollView, Modal, Pressable, SafeAreaView } from 'react-native'
// import Button from '../components/Button'
import Header from '../../components/Header'
import { AuthContext } from '../../context/AuthContext'
import Button from '../../components/Button'
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';
import { List } from "react-native-paper";
import axios from "axios";
import qs from "qs"
import { WaveIndicator } from 'react-native-indicators';
import { BirthdayIcon, EventIcon, InfoguideIcon, MenuIcon, NewsIcon, ArrowIcon } from "../../cores/helpers/icon";
import { Ionicons, FontAwesome } from '@expo/vector-icons'
// import { registerIndieID } from 'native-notify';
import { MaterialIcons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';


import AsyncStorage from "@react-native-async-storage/async-storage";
import i18n from 'i18n-js'
import { kz, ru, ch } from '../../languages/localizations';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function ProfileScreen({navigation}) {

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
      getData1()
  })
  
  const getData1 = () => { 
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




  const {logout, iin} = useContext(AuthContext)
  const[list, setList] = useState([])
  const [userp, setUserp] = useState([])
  const [sot, setSot] = useState('')
  const [deleted, setDeleted] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isLoading1, setIsLoading1] = useState(false)
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible1, setModalVisible1] = useState(false);
  const [modalResult, setModalResult] = useState(false);
  // const {logout, iin, restore} = useContext(AuthContext)

  const [ title, setTitle ] = useState([
    "ФИО",
    "ИИН",
    "Номер\nтелефона"
  ])

  const profile = []

useEffect(()=>{
  setIsLoading(true)
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
      setUserp(parsed)

//       await registerIndieID(`${iin}`, 5464, 'cq3oCzyrxvjyjKu8iBQDal');

//       axios.post(`https://app.nativenotify.com/api/indie/notification`, {
//       subID: `${iin}`,
//       appId: 5464,
//       appToken: 'cq3oCzyrxvjyjKu8iBQDal',
//       title: 'AMG Life',
//       message: `Вы вошли в Профиль - ${iin}`
// });
      setIsLoading(false)
  })

  .catch(function(error){
      console.log(error)
      setIsLoading(false)
  }) 
},[])

useEffect(()=>{
  getSot()
},[])

const getSot = () => { 
  try {
      AsyncStorage.getItem('userSotrpm')
          .then(value => {
              if(value != null){
              //   console.log(value)
                  setSot(value)
              }
          })
      // setIsLoading(false)
  } catch(error){
      // setIsLoading(false)
      console.log(error)
  }
}

const deleteUserToken = () => { 
  setIsLoading(true)
  const data = qs.stringify({
    'deletetokenfromtableiin': iin 
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
      setIsLoading(false)
  })
  .catch(function(error){
      console.log(error)
      setIsLoading(false)
  }) 
}


// console.log(iin)

const deleteAccount = () =>{
  setIsLoading1(true)
  const data = qs.stringify({
    'delacciin': iin 
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
      if(parsed.status === 'Аккаунт успешно удален'){
        setModalResult(true)
        // setModalVisible1(false)
      }
      setDeleted(parsed.status)
      setIsLoading1(false)
  })

  .catch(function(error){
      console.log(error)
      setIsLoading(false)
  }) 

}

// console.log(sot)


// useEffect(()=>{
//   setIsLoading(true)
//   const data = qs.stringify({
//     'pushedoiin': '830719350672'
//   });
//     const config = {
//       method: 'post',
//       url: 'http://95.57.218.120/?index',
//       headers: { 
//         'Content-Type': 'application/x-www-form-urlencoded'
//       },
//       data : data
//     };
//     axios(config)
//     .then(async function(response){
//       let user = response.data.replace(/<[^>]*>/g, '').replace(/-->/g, '')
//       let parsed = JSON.parse(user)
//       globalThis.parsedBoolean = parsed.status
//       globalThis.parsedkol = parsed.kol
//       console.log( '2222' + globalThis.parsedBoolean == 'true')
//        setIsLoading(false)
//   })
//     .catch(function (error) {
//      console.log(error);
//      setIsLoading(false)
//     })

// }, [])

profile.push(userp.fio, userp.iin, userp.tel)

if(isLoading) {
  return(
      <View style={{flex: 1, justifyContent:'center', alignItems: 'center', backgroundColor:'white'}}>
          <WaveIndicator color="#D64D43"/>
      </View>
  )
}
  return (
<View style={{...styles.container, opacity: modalVisible || modalVisible1 ? 0.3 : 1}}>
 


  <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                    setModalVisible(!modalVisible);
                    }}
                >
                    <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>{i18n.t('exitWarning')}</Text>
                        <View style={{flexDirection:'row'}}>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress = {()=> {logout(); deleteUserToken()}}
                        >
                            <Text style={styles.textStyle}>{i18n.t('daYes')}</Text>
                        </Pressable>

                        <Pressable
                            style={[styles.button, styles.buttonClose1]}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Text style={{color:"#D64D43", fontWeight: "bold", textAlign: "center", fontSize: 16}}>{i18n.t('netNo')}</Text>
                        </Pressable>

                        </View>
                    </View>
                    </View>
                </Modal>

                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalVisible1}
                    onRequestClose={() => {
                    setModalVisible(!modalVisible1);
                    }}
                >
                    <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>{i18n.t('deleteWarning')}</Text>
                        <View style={{flexDirection:'row'}}>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress = {()=> deleteAccount()}
                        >
                            <Text style={styles.textStyle}>{i18n.t('daYes')}</Text>
                        </Pressable>

                        <Pressable
                            style={[styles.button, styles.buttonClose1]}
                            onPress={() => setModalVisible1(!modalVisible1)}
                        >
                            <Text style={{color:"#D64D43", fontWeight: "bold", textAlign: "center", fontSize: 16}}>{i18n.t('netNo')}</Text>
                        </Pressable>

                        </View>
                    </View>

                    <Modal animationType="fade" transparent={true} visible={isLoading1}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
            <WaveIndicator color="#D64D43"/>

            </View>
          </View>
        </Modal>

                    
        <Modal animationType="fade" transparent={true} visible={modalResult}>
          <View style={styles.centeredView}>
            <View style={styles.modalView1}>
              <FontAwesome name="check-circle" size={140} color="#1CA510" />
              <View style={styles.modalContainer}>
                <Text style={{marginBottom:20, fontSize: 18}}>{deleted}</Text>
                <Pressable style={[styles.button, styles.buttonClose]} onPress={() => logout()}>
                  <Text style={styles.textStyle}>OK</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
                    </View>
                </Modal>
            
<View style={{alignItems:'center'}}>
<View style={{flexDirection:'row', justifyContent:'space-between', width: windowWidth-60, alignItems:'center',  marginTop: Platform.OS === 'ios' ? 40 : 30 }}>
  <View><Text style={styles.header}>{i18n.t('profile')}</Text></View>
  <View style={{flexDirection:'row'}}>
  { iin === '980624351476' || iin === '000614551739' || iin === '860902303264' || iin === '111111111111' ? 
  <TouchableOpacity onPress = {() => {navigation.navigate('PushSendScreen')}} style={{width:50, height: 26, paddingVertical: 0,backgroundColor:'#E2E2E2', justifyContent:'center', alignItems:'center',borderRadius:5}}>
    <Ionicons name="md-send" style={styles.btn} size={18} color="black" />
  </TouchableOpacity> : <></>}
  <TouchableOpacity onPress = {() => {navigation.navigate('SettingScreen')}} style={{width:50, height: 26, paddingVertical: 0,backgroundColor:'#E2E2E2', justifyContent:'center', alignItems:'center',borderRadius:5, marginLeft:10}}><Ionicons name="ios-settings-sharp" style={styles.btn} size={18} color="black" /></TouchableOpacity>
    
  </View>
</View>
</View>


<View style={{alignItems:'center', marginTop:10}}>

<View style={{width: windowWidth - 40, marginBottom: 0, paddingBottom:15,paddingTop:15, borderTopLeftRadius: 15,borderTopRightRadius: 15, borderWidth:1, borderColor:'#E4E4E4'}}>
  <View style={{marginBottom:10, marginLeft:15, marginRight: 15, flexDirection:'row', alignItems:'center'}}>
  <Text style={{fontSize: 20, fontWeight: '500', color: '#4D4D4D',}}>{userp.fio}</Text>

  </View>
  <View style={{backgroundColor:'#E4E4E4', width: "100%", height:1}}></View>
  <View style={{flexDirection:'row', marginTop: 10, marginLeft:15,marginRight: 15}}>
    <Text style={{marginRight:10, fontWeight:'bold', color: '#4D4D4D'}}>{i18n.t('iin')}:</Text>
    <Text style={{color: '#4D4D4D'}}>{userp.iin}</Text>
  </View>
  <View style={{flexDirection:'row', marginTop: 10, marginLeft:15,marginRight: 15}}>
    <Text style={{marginRight:10, fontWeight:'bold', color: '#4D4D4D'}}>{i18n.t('telephoneNumber')}:</Text>
    <Text style={{color: '#4D4D4D'}}>{userp.tel}</Text>
  </View>
</View>


<TouchableOpacity 
                    // onPress = {()=> logout()}
                    // onPress={() => setModalVisible(true)}
                    // onPress = {() => {navigation.navigate('UserPassChange')}}
                    onPress={() => setModalVisible1(true)}
                    style={{width: windowWidth - 40, 
                            // backgroundColor: '#F5DBDA', 
                           
                            // borderWidth: 1,
                            // borderColor:"#D64D43",
                            borderWidth:1, 
                            borderTopWidth:0,
                            borderColor:'#E4E4E4',
                            backgroundColor:"white",
                            height: 40, 
                            borderBottomLeftRadius: 15,
                            borderBottomRightRadius: 15, 
                            // marginTop: 200, 
                            alignItems:'center', 
                            justifyContent: 'center', 
                            marginTop:0
                            }}>
                    <View style={{width: windowWidth - 80,  flexDirection:'row', alignItems:'center',justifyContent:'center'}}>
                    <MaterialIcons name="delete" size={20} color="#D12B2B" />
                    <Text style={{fontSize: 16, fontWeight: '500', color:'#D12B2B', marginLeft: 10}}>{i18n.t('deleteAccount')}</Text>
                    </View>
                </TouchableOpacity>
</View>



<View style={{alignItems:'center', marginBottom:80}}>
<View style={{marginTop: 20, alignItems:'center',  borderRadius:15, borderColor:'#E4E4E4', borderWidth: 1, width:windowWidth-40}}>
<View style={{width: windowWidth - 30, marginBottom: 2}}>
                <List.Item
                    title = {i18n.t('raschet')}
                    style = {styles.icon}
                    rippleColor='transparent'
                    onPress = {() => {navigation.navigate('PaperScreen')}}
                    right = {() => <MaterialIcons name="arrow-forward-ios" size={18} color="#4D4D4D" />}
                    left = {() => <MaterialIcons name="payments" style={{marginLeft:20, marginRight:-5}} size={20} color="#4D4D4D" />}
                />
</View>

<View style={{width: windowWidth - 60, backgroundColor: '#E4E4E4', height:1, marginBottom: 2}}/>

<View style={{width: windowWidth - 30, marginBottom: 2}}>
                <List.Item
                    title = {i18n.t('docLoad')}
                    style = {styles.icon}
                    rippleColor='transparent'
                    onPress = {() => {navigation.navigate('DocumentListScreen')}}
                    right = {() => <MaterialIcons name="arrow-forward-ios" size={18} color="#4D4D4D" />}
                    left = {() => <Ionicons name="documents-sharp" style={{marginLeft:20, marginRight:-5}} size={20} color="#4D4D4D" />}
                />
</View>

<View style={{width: windowWidth - 60, backgroundColor: '#E4E4E4', height:1, marginBottom: 2}}/>

<View style={{width: windowWidth - 30, marginBottom: 2}}>
                <List.Item
                    title = {i18n.t('vacation')}
                    style = {styles.icon}
                    rippleColor='transparent'
                    onPress = {() => {navigation.navigate('VacationScreen')}}
                    right = {() => <MaterialIcons name="arrow-forward-ios" size={18} color="#4D4D4D" />}
                    left = {() => <FontAwesome name="plane" style={{marginLeft:20, marginRight:-4}} size={20} color="#4D4D4D" />}            
                />
</View>

<View style={{width: windowWidth - 60, backgroundColor: '#E4E4E4', height:1, marginBottom: 2}}/>

<View style={{width: windowWidth - 30, marginBottom: 2}}>
                <List.Item
                    title = {i18n.t('clothes')}
                    style = {styles.icon}
                    rippleColor='transparent'
                    onPress = {() => {navigation.navigate('SpecformScreen')}}
                    right = {() => <MaterialIcons name="arrow-forward-ios" size={18} color="#4D4D4D" />}
                    left = {() => <FontAwesome5 name="tshirt" style={{marginLeft:20, marginRight: -7}} size={16} color="#4D4D4D" />}
                />
</View>



      {/* <Button mode="contained" 
        onPress = {()=> logout()}
        style={{width: 270}}
      >Выйти</Button> */}

      {/* <TouchableOpacity>
        <Text style={{fontSize: 20, color: '#D64D43', top: 100}}>Выйти</Text>
      </TouchableOpacity> */}


            
</View>
   { sot === 'Yes' ?   <TouchableOpacity 
                    // onPress = {()=> logout()}
                    // onPress={() => setModalVisible(true)}
                    onPress = {() => {navigation.navigate('UserPassChange')}}
                    style={{width: windowWidth - 40, 
                            // backgroundColor: '#F5DBDA', 
                           
                            // borderWidth: 1,
                            // borderColor:"#D64D43",
                            backgroundColor:"#D64D43",
                            height: 42, 
                            borderRadius: 10, 
                            // marginTop: 200, 
                            alignItems:'center', 
                            justifyContent: 'center', 
                            marginTop:10
                            }}>
                    <View style={{width: windowWidth - 80,  flexDirection:'row', alignItems:'center'}}>
                    <FontAwesome5 name="user-cog" size={18} color="white"   />
                    <Text style={{fontSize: 16, fontWeight: '500', color:'white', marginLeft: 10}}>Изменить пароль пользователя</Text>
                    </View>
                </TouchableOpacity> : <></>}

                
                <TouchableOpacity 
                    // onPress = {()=> logout()}
                    onPress={() => setModalVisible(true)}
                    style={{
                            width: windowWidth - 40, 
                            // backgroundColor: '#F5DBDA',
                            flexDirection:'row', 
                            borderWidth: 1,
                            borderColor:"#D12B2B",
                            height: 44, 
                            borderRadius: 10, 
                            marginTop: 10,
                            // marginTop: 200, 
                            alignItems:'center', 
                            justifyContent: 'center'
                    
                            }}>
                    <Text style={{fontSize: 16, fontWeight: '600', color:'#D12B2B', marginRight:10}}>{i18n.t('exit')}</Text>
                    <Ionicons name="exit-outline" size={20} color="#D12B2B" />
                </TouchableOpacity>





</View>

  
{/* <Header>Профиль</Header> */}


</View>
  )
}

const styles = StyleSheet.create({
  header:{
    fontSize: 24,
    color: "#4D4D4D",
    fontWeight:"bold",
    paddingVertical: 12,
    // marginTop: 50,
    // width: windowWidth
    
},
btn:{
  color: "#4D4D4D",
  // width: windowWidth
},
  container: {backgroundColor:'white', width: windowWidth, height: windowHeight, alignItems:'center' },
  head: {  height: 40,  backgroundColor: 'white'  },
  wrapper: { flexDirection: 'row' },
  title: { flex: 1, backgroundColor: 'white' },
  row: {  height: 28  },
  text: { textAlign: 'left' },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: '#007aff',
    padding: 10,
    borderRadius: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 0
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    width: windowWidth-50,
    height: 150,
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
  modalView1: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    width: windowWidth-50,
    height: 250,
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
    borderRadius: 8,
    marginLeft: 15,
    marginRight: 15,
    padding: 10,
    elevation: 2,
    borderWidth: 2,
    borderColor:'#D64D43',
    // backgroundColor:'white'
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#D64D43",
  },
  buttonClose1: {
    backgroundColor:'white'
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16
  },
  modalText: {
    marginBottom: 25,
    textAlign: "center",
    fontSize: 18
  }
})
