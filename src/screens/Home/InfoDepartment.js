import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, ScrollView, LogBox, Dimensions, Linking } from 'react-native';
// import { Divider, select } from "@react-native-material/core"
import _ from "lodash"
import axios from 'axios';
import moment from 'moment';

import { AuthContext } from '../../context/AuthContext';
import { WaveIndicator } from 'react-native-indicators';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import AsyncStorage from "@react-native-async-storage/async-storage";
import i18n from 'i18n-js'
import { kz, ru, ch } from '../../languages/localizations';
import { Entypo } from '@expo/vector-icons';
import themeContext from '../../cores/themeContext';




export default function InfoDeparment({navigation}) {
  
  const theme = useContext(themeContext)

  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    // Load the user's preference from AsyncStorage
    loadDarkModePreference();
  }, []);

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
    const {iin} = useContext(AuthContext)

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


 
  const [isLoading, setIsLoading] = useState(true)
  const [show, setShow] = useState(true)
  const [ department, setDepartment ] = useState([]) 


  // console.log(department)
  

  useEffect(()=>{
    setIsLoading(true)
    const config = {
      method:'get',
      url: `http://95.57.218.120/?apitest.helloAPIWithParams4444={"id":"${iin === '111111111111'? 179 : globalThis.a}"}`,
      headers: {  }
    }
    axios(config)
     .then(function(response){
      let info = response.data.replace(/<[^>]*>/g, '').replace(/-->/g, '')
      let parse_first = JSON.parse(info)
      let parse_second = JSON.parse(parse_first.response)
      let parse_third = parse_second.list

      let newArray = parse_third.map((list)=>{
        return {id: list.id, name: list.name, roditel: list.roditel, prioritet: list.prioritet, children: list.children, employees: list.employees}
      })

      setDepartment(newArray)

   
        setIsLoading(false)

     })
     .catch(function (error) {
      console.log(error);
      setIsLoading(false)
     })
  },[])



  const date = moment().format('"YYYY-MM-DD 00:00:00"')

  const tableHeader = (a) => (
  <View>
    <View>
    </View>
  
  <View style={[styles.tableHeader ,{backgroundColor: theme.tableHeaderBack}]}>
      <TouchableOpacity 
          style={styles.columnHeader} >
          <Text style={[styles.columnHeaderTxt, {color: theme.color}]}>
              {i18n.t('fioImia')}
          </Text>   
      </TouchableOpacity>
      <TouchableOpacity 
          style={styles.columnHeader} >
          <Text style={[styles.columnHeaderTxt, {color: theme.color}]}>
            {i18n.t('doljnost')}
          </Text> 
      </TouchableOpacity>
      <TouchableOpacity 
          style={styles.columnHeader} >
          <Text style={[styles.columnHeaderTxt, {color: theme.color}]}>
          {i18n.t('telphoneNum')}
          </Text>
          <Text style={[styles.columnHeaderTxt, {color: theme.color}]}>
          {i18n.t('cabinet')}
          </Text>  
      </TouchableOpacity>
      <TouchableOpacity 
          style={styles.columnHeader} >
          <Text style={[styles.columnHeaderTxt, {color: theme.color}]}>
          {i18n.t('sotovi')}
          </Text>
          <Text style={[styles.columnHeaderTxt, {color: theme.color}]}>
          {i18n.t('pochta')}
          </Text>  
      </TouchableOpacity>
  </View>
  </View>
  )

  let depr = []

  for ( let i = 0; i < department.length; i++){
    
    const a = department[i].id
    const children = department[i].children
    const ncd = department[i].employees
    let deprChild = []
    
    for(let j = 0; j < children.length; j++){

      const bwer = children[j].id

      deprChild.push(
        <View key={j}>
          <View style={{alignItems:'center'}}>
        <Text style={{color:isDarkMode === true ? 'white' : '#4d4d4d', marginTop:8, marginBottom:8, width: windowWidth-40, textAlign:'center'}}>{children[j].name}</Text>

          </View>
        <FlatList 
                  data={children[j].employees}
                  style={{width: windowWidth}}
                  ListHeaderComponent={tableHeader}
                  stickyHeaderIndices={[0]}
                  horizontal={false}
                  scrollEnabled={false}
                  renderItem={({item, index})=> {
                    return (
                      <View style={{...styles.tableRow, backgroundColor:  isDarkMode === true ? index % 2 == 1 ? "#191E2D" : "#262C38" :  index % 2 == 1 ? "#F0EFEF" : "white"}}>
                        <Text style={{...styles.columnRowTxt, fontWeight:"bold", color: theme.color}}>{item.fio}</Text>
                        <Text style={[styles.columnRowTxt, {color: theme.color}]}>{item.doljnost}</Text>
                        <Text style={[styles.columnRowTxt, {color: theme.color}]}>{item.raboch_tel}{"\n"}<Text style={{...styles.columnRowTxtRoom, backgroundColor: item.timein>JSON.parse(date) && item.timein >item.timeout ? theme.green : "", color: isDarkMode === true ? 'white' : 'black',  }}>{item.cabinet}</Text></Text>
                        <Text style={[styles.columnRowTxt, {color: theme.color}]}>
                          <TouchableOpacity onPress={()=> Linking.openURL(`tel:${'8'+Number(String(item.sot_tel).slice(1))}`)} style={{alignItems:'center'}}>
                        <Text style={{color:'#187D07', fontSize:11, marginTop:5,fontWeight:'600',textAlign:'center'}}>{item.sot_tel}</Text>
                    </TouchableOpacity>{"\n"}<Text style={[styles.columnRowTxt, {color: theme.color}]}>{item.email}</Text></Text>
                      </View>
                    )}}
                />
  
  
      </View>
      )

    }

      depr.push(
          <View key={i} style={styles.container}>
            <ScrollView nestedScrollEnabled={true}>
            <ScrollView  horizontal={true} style={{ width: "100%" }}>
              <View>
            
                <View
                style={{ alignItems:'center', width: windowWidth, padding:5, borderWidth:0.4, borderColor: isDarkMode === true ? 'white' : '#4d4d4d', marginBottom:8, marginTop:10, borderLeftWidth:0, borderRightWidth:0}}
                >
                <View style={{width:windowWidth-50, flexDirection:'row',justifyContent:'center', alignItems:'center',}}>
                  <Text style={{color:isDarkMode === true ? 'white' : '#4d4d4d', textAlign:'center' }}>{department[i].name}</Text>
                </View>
                </View>

           
                <View style={[styles.container1, {display: (department[i].children).length !== 0 ? 'flex': 'none' }] } >
                  {deprChild}

                </View>
                <View style={[styles.container1, {display: (department[i].children).length === 0 ? 'flex': 'none' }] }>
                <FlatList 
                  data={ncd}
                  style={{width: windowWidth-0, display: show === true ? 'flex' : 'none'}}
                  ListHeaderComponent={tableHeader}
                  stickyHeaderIndices={[0]}
                  horizontal={false}
                  scrollEnabled={false}
                  renderItem={({item, index})=> {
                    return (
                      <View style={{...styles.tableRow, backgroundColor:  isDarkMode === true ? index % 2 == 1 ? "#191E2D" : "#262C38" :  index % 2 == 1 ? "#F0EFEF" : "white"}}>
                        <Text style={{...styles.columnRowTxt, fontWeight:"bold", color: theme.color}}>{item.fio}</Text>
                        <Text style={[styles.columnRowTxt, {color: theme.color}]}>{item.doljnost}</Text>
                        <Text style={[styles.columnRowTxt, {color: theme.color}]}>{item.raboch_tel}{"\n"}<Text style={{...styles.columnRowTxtRoom, backgroundColor: item.timein>JSON.parse(date) && item.timein >item.timeout ? theme.green : "", color: isDarkMode === true ? 'white' : 'black' }}>{item.cabinet}</Text></Text>
                        <Text style={[styles.columnRowTxt, {color: theme.color}]}>
                          <TouchableOpacity onPress={()=> Linking.openURL(`tel:${'8'+Number(String(item.sot_tel).slice(1))}`)} style={{alignItems:'center'}}>
                        <Text style={{color:'#187D07', fontSize:11, marginTop:5,fontWeight:'600',textAlign:'center'}}>{item.sot_tel}</Text>
                    </TouchableOpacity>{"\n"}<Text style={[styles.columnRowTxt, {color: theme.color}]}>{item.email}</Text></Text>
                      </View>
                    )}}
                />
                
              </View>
              </View>




              
            </ScrollView>  

            </ScrollView>
          </View>
        ) 
  }





  if(isLoading) {
    return(
      <View style={{flex: 1, justifyContent:'center', alignItems: 'center', backgroundColor: isDarkMode === true ? '#262C38':''}}>
      <WaveIndicator color={theme.loading}/>
    </View>
    )
}



  return(

    <View style={{flex:1,backgroundColor: isDarkMode === true ? '#262C38' : '#F2F2F2'}}>
      {/* <BackButton  goBack = {navigation.goBack}/>
      <Header>{globalThis.s}</Header> */}
      <View style={{alignItems:'center'}}>
      <View style={{flexDirection:'row', width: windowWidth-14, alignItems:'center'}}>
            <View style={{ width:"100%", marginTop:15, marginBottom:20, backgroundColor:theme.bottomNavigationColor, padding:15, borderRadius:15}}>
            <Text style={{fontSize:20, fontWeight:'600', color: theme.color}}>{globalThis.d}</Text>
        <View style={{alignItems:'center', marginTop:5, marginBottom:5}}>
          <View style={{width:"100%", height:1, backgroundColor:theme.borderColor}}/>
        </View>
        <Text style={{fontSize:12, color: theme.color}}>{globalThis.s}</Text>
            </View>
      </View>

      </View>
      <ScrollView nestedScrollEnabled={true} style={{ width: "100%", backgroundColor:theme.bottomNavigationColor, paddingTop:15, borderTopRightRadius:20, borderTopLeftRadius:20}} >
        {depr} 

        <View style={{marginBottom:80}}/>
      </ScrollView>
    </View>)
}

const styles = StyleSheet.create({
  container: {
  },
  container1: {
    marginLeft: 0
  },
  title:{
    marginTop:10,
    marginBottom: 10,
    marginLeft: 20

  },

  tableHeader: {
    flexDirection: "row",
    borderTopEndRadius: 0,
    borderTopStartRadius: 0,
    height: 50,
  },
  headerText:{
    alignItems:'center',
    justifyContent:'center',
    fontSize: 18,
    marginBottom: 10
  },
  tableRow: {
    flexDirection: "row",
    height: 60,
    border:1,
  },
  'tableRow:last-child': {
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
  },
  columnHeader: {
    width: "25%",
    justifyContent: "center",
    alignItems:"center"
  },
  columnHeaderTxt: {
    color: "black",
    fontWeight: "bold",
    fontSize: 10,
  },
  columnRowTxt: {
    textAlign:"center",
    width: "25%",
    fontSize: 10,
  },
  columnRowTxtRoom: {
    textAlign:"center",
    fontSize: 11,
    fontWeight:'600',
    // width:40,
    
    color: 'black',
  }
});