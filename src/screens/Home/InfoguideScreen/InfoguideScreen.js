import React, { useContext, useEffect, useState } from "react";
import { Text, View, StyleSheet, Image, ScrollView, SafeAreaView, TextInput, FlatList, TouchableOpacity, Dimensions, Alert, Keyboard, Platform } from "react-native";
import { SelectList } from "react-native-dropdown-select-list"
import axios from "axios";
// import Button from "../../../components/Button";
// import TextInput from "../components/TextInput";
import { AntDesign, FontAwesome, FontAwesome5, Fontisto, Octicons } from '@expo/vector-icons'
import SelectDropdown from 'react-native-select-dropdown'

import { Ionicons } from '@expo/vector-icons';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import { WaveIndicator } from 'react-native-indicators';
import BackButton from "../../../components/BackButton";
import { Entypo } from '@expo/vector-icons';

import AsyncStorage from "@react-native-async-storage/async-storage";
import i18n from 'i18n-js'
import { kz, ru, ch } from '../../../languages/localizations';
import themeContext from "../../../cores/themeContext";
import { ActivityIndicator } from "react-native";
import { Modal } from "react-native-paper";
import { AuthContext } from "../../../context/AuthContext";
import { Department } from "./components/Department";
import Constants from 'expo-constants';
import { StatusBar } from "expo-status-bar";

const statusBarHeight =
Platform.OS === 'android'
  ? Constants.statusBarHeight 
  : Platform.OS === 'ios'
  ? 30 // For iOS status bar
  : 0;






export default function InfoguideScreen({navigation}){
    

  // console.log(Constants.statusBarHeight)
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

  const {iin} = useContext(AuthContext)

    const [selectedFull, setSelectedFull] = useState([])
    const [selectedDescr, setSelectedDescr] = useState([])
    const [search, setSearch] = useState([])

    const [showFavDep, setShowFavDep] = useState(false)
    
    const [text , setText] = useState([])

    const [depId, setDepId] = useState('')

    const [departmentIsFav, setDepartmentIsFav] = useState('')

    

    const [shouldShow, setShouldShow] = useState(true);
    const [showed, setShowed] = useState(false);
    globalThis.showed = showed
    const [addFavourite, setAddFaourite] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const [isLoading1, setIsLoading1] = useState(false)

    const [data, setData] = useState(
        [
            {"descr": i18n.t('kmk'), "id": 524,"full": i18n.t('kmkfull'), "favourite": false }, 
            {"descr": i18n.t('vspomogat'), "id": 520, "full": i18n.t('vspomogatfull'), "favourite": false}, 
            {"descr": i18n.t('provkom'), "id": 498, "full": i18n.t('provkomfull'), "favourite": false}, 
            {"descr": i18n.t('su'), "id": 2, "full": i18n.t('sufull'), "favourite": false}, 
            {"descr": i18n.t('cnpcAtk'), "id": 13, "full": i18n.t('cnpcAtkfull'), "favourite": false}, 
            {"descr": i18n.t('usnNP'), "id": 7, "full": i18n.t('usnNPfull'), "favourite": false}, 
            {"descr": i18n.t('uptoKo'), "id": 1, "full": i18n.t('uptoKofull'), "favourite": false}, 
            {"descr": i18n.t('uopT'), "id": 10, "full": i18n.t('uopTfull'), "favourite": false}, 
            {"descr": i18n.t('nursultanPrav'), "id": 12, "full": i18n.t('nursultanPravfull'), "favourite": false}, 
            {"descr": i18n.t('ams'), "id": 14, "full": i18n.t('amsfull'), "favourite": false}, 
            {"descr": i18n.t('jngk'), "id": 11,"full": i18n.t('jngkfull'), "favourite": false}, 
            {"descr": i18n.t('aen'), "id": 15, "full": i18n.t('aenfull'), "favourite": false}, 
            {"descr": i18n.t('ongdu'), "id": 16, "full": i18n.t('ongdufull'), "favourite": false}, 
            {"descr": i18n.t('kngdu'), "id": 17, "full": i18n.t('kngdufull'), "favourite": false}, 
            {"descr": i18n.t('nii'), "id": 276, "full": i18n.t('niifull'), "favourite": false}, 
            {"descr": i18n.t('suoem'), "id": 161, "full": i18n.t('suoemfull'), "favourite": false}, 
            {"descr": i18n.t('db'), "id": 89, "full": i18n.t('dbfull'), "favourite": false}, 
            {"descr": i18n.t('centIT'), "id": 179, "full": i18n.t('centITfull'), "favourite": false}, 
            {"descr": i18n.t('ad'), "id": 82, "full": i18n.t('adfull'), "favourite": false}, 
            {"descr": i18n.t('drK'), "id": 168, "full": i18n.t('drKfull'),"favourite": false}, 
            {"descr": i18n.t('df'), "id": 142, "full": i18n.t('dffull'),"favourite": false}, 
            {"descr": i18n.t('dpoz'), "id": 118, "full": i18n.t('dpozfull'), "favourite": false}, 
            {"descr": i18n.t('dpd'), "id": 123, "full": i18n.t('dpdfull'), "favourite": false}, 
            {"descr": i18n.t('dtr'), "id": 136, "full": i18n.t('dtrfull'), "favourite": false}, 
            {"descr": i18n.t('ped'), "id": 149, "full": i18n.t('pedfull'), "favourite": false}, 
            {"descr": i18n.t('dks'), "id": 102, "full":i18n.t('dksfull'), "favourite": false}, 
            {"descr": i18n.t('dot'), "id": 113, "full":i18n.t('dotfull'), "favourite": false}, 
            {"descr": i18n.t('dRazvetki'), "id": 128, "full":i18n.t('dRazvetkifull'), "favourite": false}, 
            {"descr": i18n.t('dRazrabotki'), "id": 131, "full":i18n.t('dRazrabotkifull'), "favourite": false}, 
            {"descr": i18n.t('dBurenie'), "id": 93, "full":i18n.t('dBureniefull'), "favourite": false}, 
            {"descr": i18n.t('do'), "id": 72, "full":i18n.t('dofull'), "favourite": false}, 
            {"descr": i18n.t('ddn'), "id": 97, "full":i18n.t('ddnfull'), "favourite": false}, 
            {"descr": i18n.t('dkptr'), "id": 107, "full":i18n.t('dkptrfull'), "favourite": false}, 
            {"descr": i18n.t('skbp'), "id": 177, "full":i18n.t('skbpfull'), "favourite": false}, 
            {"descr": i18n.t('rukovot'), "id": 184, "full":i18n.t('rukovotfull'), "favourite": false}, 
            {"descr": i18n.t('agd'), "id": 77, "full": i18n.t('agdfull'), "favourite": false}, 
            {"descr": i18n.t('asp'), "id": 156, "full":i18n.t('aspfull'), "favourite": false}
        ]
    )

    // console.log(data)


    globalThis.a = depId

    globalThis.s = selectedFull
    globalThis.d = selectedDescr






    const [newArray, setNewArray] = useState([]);
    // console.log(newArray)

    const handleAddButtonPress = (newItem) => {
      setNewArray([...newArray, newItem]);
    };



    // const saveChangedData = async (depData) => {
    //   try {
    //     await AsyncStorage.setItem('changedFav', depData);
    //   } catch (error) {
    //     console.error('Error saving chosen interface:', error);
    //   }
    // }

    useEffect(() => {
      const loadData = async () => {
        try {
          setIsLoading(true)
          const savedData = await AsyncStorage.getItem('dataUpdated'); // Change 'yourDataKey' to a unique key
          if (savedData !== null) {
            setData(JSON.parse(savedData));
          }
          setIsLoading(false);
        } catch (error) {
          console.error('Error loading data: ', error);
        }
      };
  
      loadData();
    }, []);


    const setFavourite = (itemId) => {
      setIsLoading(true)
      const updatedData = data.map(item => {
        if (item.id === itemId) {
          return { ...item, favourite: !item.favourite };
        }
        return item;
      });
      setData(updatedData);
      AsyncStorage.setItem('dataUpdated', JSON.stringify(updatedData));
      setIsLoading(false)
    };

    // console.log(data)
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
                      // setIsLoading(true)
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



    const [ department, setDepartment ] = useState('') 
  
   const getDep = (id) => {
    setIsLoading(true)

    // const startTime = performance.now();
     const config = {
       method:'get',
       url: `http://95.57.218.120/?apitest.helloAPIWithParams4444={"id":"${iin === '111111111111'? 179 : id}"}`,
       headers: {  }
    }
    axios(config)
    .then(function(response){
      let info = response.data.replace(/<[^>]*>/g, '').replace(/-->/g, '')
      let parse_third = (JSON.parse(JSON.parse(info).response)).list
      let newArray = parse_third.map((list)=>{
         return {
          id: list.id, 
          name: list.name, 
          roditel: list.roditel, 
          prioritet: list.prioritet, 
          children: list.children, 
          employees: list.employees}
       })
      setDepartment(newArray)
      setIsLoading(false)
      setShowed(true)

      // const endTime = performance.now(); // Record the end time
      // const executionTime = endTime - startTime; // Calculate execution time in milliseconds
      // console.log(`Response execution time: ${executionTime} ms`);
      })
      .catch(function (error) {
       console.log(error);
       setIsLoading(false)
      })

   }
 


        const [showPopup, setShowPopup] = useState(false);

        useEffect(() => {
          if (showPopup) {
            // Set a timeout to hide the popup after 5 seconds
            const timeout = setTimeout(() => {
              setShowPopup(false);
            }, 5000);
      
            return () => {
              // Clear the timeout if the component unmounts or if showPopup is set to false
              clearTimeout(timeout);
            };
          }
        }, [showPopup]);


        




        // console.log(data)

        if(isLoading) {
            return(
                <View style={{flex: 1, justifyContent:'center', alignItems: 'center', backgroundColor:'white'}}>
                    <WaveIndicator color="#D64D43"/>
                </View>
            )
          }




    const sortedData = [...data]; // Create a copy of the original array to avoid modifying it directly

sortedData.sort((a, b) => {
    return a.descr.localeCompare(b.descr);
});


const favoriteItems = data.filter(item => item.favourite === true);

// console.log(favoriteItems.length === 0)

    

    const departmentCard = []

    for(let i = 0; i < sortedData.length; i++){
     globalThis.fav = sortedData[i].favourite
      departmentCard.push(
        <TouchableOpacity 
        onPress={()=>{setDepId(sortedData[i].id); setSelectedFull(sortedData[i].full); setSelectedDescr(sortedData[i].descr); getDep(sortedData[i].id); setDepartmentIsFav(sortedData[i].favourite); handleAddButtonPress(sortedData[i])}}
         key={i} style={{ width:'100%', padding:15, marginBottom:10, borderRadius:15, borderWidth:1, borderColor:theme.borderColor}}>
          <View style={{ flexDirection:'row', justifyContent:'space-between'}}>
          <Text style={{fontSize:20, fontWeight:'600', color: theme.color}}>{sortedData[i].descr}</Text>
          {/* <TouchableOpacity onPress={()=>{setFavourite(sortedData[i].id)}} >
            {
              sortedData[i].favourite ? 
              <FontAwesome name="bookmark" size={22} color="#FFC806" style={{marginRight:8}} /> :  <FontAwesome name="bookmark-o" size={22} color="#A7A7A7" style={{marginRight:8}} />
            }
          </TouchableOpacity> */}

          </View>
        <View style={{alignItems:'center', marginTop:5, marginBottom:5}}>
          <View style={{width:"100%", height:1, backgroundColor:theme.borderColor}}/>
        </View>
        <Text style={{fontSize:12, color: theme.color}}>{sortedData[i].full}</Text>
      </TouchableOpacity>
      )
    }


    const departmentCardFavourite = []

    for(let i = 0; i < favoriteItems.length; i++){
     globalThis.fav = favoriteItems[i].favourite
      departmentCardFavourite.push(
        
        <TouchableOpacity 
        onPress={()=>{setDepId(favoriteItems[i].id); setSelectedFull(favoriteItems[i].full); setSelectedDescr(favoriteItems[i].descr); getDep(favoriteItems[i].id); setDepartmentIsFav(favoriteItems[i].favourite); handleAddButtonPress(favoriteItems[i])}}
         key={i} style={{ width:'100%', padding:15, marginBottom:10, borderRadius:15, borderWidth:1, borderColor:theme.borderColor}}>
          <View style={{ flexDirection:'row', justifyContent:'space-between'}}>
          <Text style={{fontSize:20, fontWeight:'600', color: theme.color}}>{favoriteItems[i].descr}</Text>
          <TouchableOpacity onPress={()=>{setFavourite(favoriteItems[i].id)}} >
            {
              favoriteItems[i].favourite ? 
              <FontAwesome name="bookmark" size={22} color="#FFC806" style={{marginRight:8}} /> :  <FontAwesome name="bookmark-o" size={22} color="#A7A7A7" style={{marginRight:8}} />
            }
          </TouchableOpacity>

          </View>
        <View style={{alignItems:'center', marginTop:5, marginBottom:5}}>
          <View style={{width:"100%", height:1, backgroundColor:theme.borderColor}}/>
        </View>
        <Text style={{fontSize:12, color: theme.color}}>{favoriteItems[i].full}</Text>
      </TouchableOpacity>
      )
    }

    return(
        <View style={{flex:1, alignItems:"center", backgroundColor: isDarkMode === true ? '#262C38' : 'white', zIndex:10, paddingTop: statusBarHeight}}>
          {/* <StatusBar style='inverted' /> */}
          <View style={{ width:windowWidth-20, paddingTop:10, paddingBottom:10, flexDirection:'row', alignItems:'center',paddingLeft: 10, display: showed ? 'none': 'flex'}}>
            <TouchableOpacity onPress={()=> navigation.goBack()}>
              <AntDesign name="leftcircle" size={22} color="grey" />
            </TouchableOpacity>
          <Text style={{fontSize: 20, fontWeight: '500', marginLeft: 15, color: '#4d4d4d'}}>{i18n.t('infoguide')}</Text>

          </View>

          <View style={{height:40, width:windowWidth-20, flexDirection:'row', marginTop:10, marginBottom:10, display: showed ? 'none': 'flex'}}>
            <TouchableOpacity onPress={()=>{setShowFavDep(false)}} style={{padding:5, paddingLeft:15, paddingRight:15,height:'100%', alignItems:'center', justifyContent:'center', marginRight:10, borderWidth: !showFavDep ? 3 : 1, borderColor: !showFavDep ? "#D5463C" : theme.borderColor, borderRadius:10}}>
              <Text style={{fontSize:16, fontWeight: !showFavDep ? '500': '400'}}>Все</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{setShowFavDep(true)}} style={{padding:5,paddingLeft:10, paddingRight:10,height:'100%', alignItems:'center' , justifyContent:'center', marginRight:10, borderWidth: showFavDep ? 3 : 1, borderColor: showFavDep ? "#D5463C" : theme.borderColor, borderRadius:10}}>
              <Text style={{fontSize:16, fontWeight: showFavDep ? '500': '400'}}>Избранное</Text>
            </TouchableOpacity>
          </View>

        

        <View style={{alignItems:'center', justifyContent:'center',  display: !showed ? 'flex' : 'none'}}>
        <View style={{marginTop:5, width:windowWidth-20}}>
          <ScrollView style={{marginBottom:120}}>
            { showFavDep 
              ? favoriteItems.length === 0 
                ? <View style={{alignItems:'center', marginTop:20}}>
                  <FontAwesome name="bookmark" size={100} color={theme.borderColor} style={{marginRight:8}}/>
                  <Text style={{fontSize: 16, fontWeight: '600', marginTop:10, color: theme.color}}>Список избранного пуст</Text>
                </View> 
                :departmentCardFavourite 
              : departmentCard
            }
          </ScrollView>
 

        </View>
        </View>


        <Department showed={showed} data={data} department={department} setShowed={setShowed} setDepartment={setDepartment} setFavourite={setFavourite} departmentIsFav={departmentIsFav} depId={depId} />


        
    

        </View>
    )
}

const styles = StyleSheet.create({
    list:{
        fontSize:16,
        marginLeft:30, 
        marginBottom: 5
    },
    subHeader:{
        fontSize:17, 
        fontWeight: '600', 
        marginLeft:30, 
        marginBottom: 10,
        color: "#D64D43",
    
    },
    input: {
        height: 50,
        borderWidth: 1,
        paddingLeft: 21,
        borderColor: "transparent",
        width: windowWidth-95,
        borderRadius: 10,
        fontSize: 16
      },

      container: {
  
    },
    container1: {
      // // flex: 1,
      // paddingTop:30, marginLeft: 15, marginRight:15,
    //   marginLeft: 10
      
    },
    title:{
      marginTop:10,
      marginBottom: 10,
      marginLeft: 20
  
    },
  
    tableHeader: {
      flexDirection: "row",
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
      height: 110,
    },
    columnHeader: {
      width: "21.6%",
      justifyContent: "center",
      alignItems:"center"
    },
    columnHeadert: {
        width: "35%",
        justifyContent: "center",
        alignItems:"center"
      },
    columnHeaderTxt: {
      fontWeight: "bold",
      fontSize: 10,
    },
    columnRowTxt: {
      textAlign:"center",
      width: "21.6%",
      fontSize: 10,
      height: 100
    },
    columnRowTxtt: {
        textAlign:"center",
        width: "35%",
        fontSize: 10,
        height: 100
      },
    columnRowTxtRoom: {
      textAlign:"center",
      fontSize: 10,
      width:40
    }
})
