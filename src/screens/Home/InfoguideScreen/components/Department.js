import { useContext, useEffect, useState } from "react"
import { StyleSheet, Text, View, FlatList, TouchableOpacity, ScrollView, LogBox, Dimensions, Linking, Platform } from 'react-native';
import themeContext from "../../../../cores/themeContext"
import { AuthContext } from "../../../../context/AuthContext"
import AsyncStorage from "@react-native-async-storage/async-storage";
import i18n from 'i18n-js'
import { ch, kz, ru } from "../../../../languages/localizations";
import moment from "moment";
import Constants from 'expo-constants';
import { AntDesign, Feather, FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";

const statusBarHeight =
Platform.OS === 'android'
  ? Constants.statusBarHeight
  : Platform.OS === 'ios'
  ? 20 // For iOS status bar
  : 0;



const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


export const Department = ({showed, department, setShowed, setDepartment, setFavourite, favourite, departmentIsFav, depId, data}) => {
  const theme = useContext(themeContext)
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    loadDarkModePreference();
  }, [])

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
  const [show, setShow] = useState(true)
  const [depFav, setDepFav] = useState(false)

  i18n.fallbacks = true
  i18n.translations = { kz, ru, ch };
  i18n.locale = lang;
  i18n.defaultLocale = 'kz'

  useEffect(()=>{
    if(departmentIsFav === false){
      setDepFav(false)
    } else {
      setDepFav(true)
    }
  },[])


  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (showPopup) {
      // Set a timeout to hide the popup after 5 seconds
      const timeout = setTimeout(() => {
        setShowPopup(false);
      }, 1800);

      return () => {
        // Clear the timeout if the component unmounts or if showPopup is set to false
        clearTimeout(timeout);
      };
    }
  }, [showPopup]);
  
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



  const date = moment().format('"YYYY-MM-DD 00:00:00"')

  
  const tableHeader = (a) => (
    <View style={{ backgroundColor:'#f1f1f1', borderTopLeftRadius:10, borderTopRightRadius:10, marginBottom:5, marginTop:5 }}>
      <View>
      </View>
    
    <View style={[styles.tableHeader ,{backgroundColor: theme.tableHeaderBack, borderRadius:10}]}>
        <View 
            style={styles.columnHeader} >
            <Text style={[styles.columnHeaderTxt, {color: theme.color}]}>
                {i18n.t('fioImia')}
            </Text>   
        </View>
        <View 
            style={styles.columnHeader} >
            <Text style={[styles.columnHeaderTxt, {color: theme.color}]}>
              {i18n.t('doljnost')}
            </Text> 
        </View>
        <View 
            style={styles.columnHeader} >
            <Text style={[styles.columnHeaderTxt, {color: theme.color}]}>
            {i18n.t('telphoneNum')}
            </Text>
            <Text style={[styles.columnHeaderTxt, {color: theme.color}]}>
            {i18n.t('cabinet')}
            </Text>  
        </View>
        <View 
            style={styles.columnHeader} >
            <Text style={[styles.columnHeaderTxt, {color: theme.color}]}>
            {i18n.t('sotovi')}
            </Text>
            <Text style={[styles.columnHeaderTxt, {color: theme.color}]}>
            {i18n.t('pochta')}
            </Text>  
        </View>
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
          <View style={{alignItems:'center', width: windowWidth, padding:5, borderColor: isDarkMode === true ? 'white' : '#4d4d4d', marginBottom:8, marginTop:8}}>
        <Text style={{color:isDarkMode === true ? 'white' : '#4d4d4d', width: windowWidth-40, textAlign:'center'}}>{children[j].name}</Text>

          </View>
          <View style={{alignItems:'center'}}>
        <FlatList 
                  data={children[j].employees}
                  style={{width: windowWidth-10, backgroundColor:'#F1F1F1', padding:5, borderRadius:10}}
                  ListHeaderComponent={tableHeader}
                  stickyHeaderIndices={[0]}
                  horizontal={false}
                  scrollEnabled={false}
                  renderItem={({item, index})=> {
                    return (
                      <View style={{...styles.tableRow, backgroundColor:  isDarkMode === true ? "#262C38" : "white", borderRadius:10, padding:5, marginBottom:5}}>
                        <Text style={{...styles.columnRowTxt, fontWeight:"bold", color: theme.color}}>{item.fio}</Text>
                        <Text style={[styles.columnRowTxt, {color: theme.color}]}>{item.doljnost}</Text>
                        <Text style={[styles.columnRowTxt, {color: theme.color, lineHeight:14}]}>{item.raboch_tel}{"\n"}{"\n"} <View style={{backgroundColor: item.timein>JSON.parse(date) && item.timein >item.timeout ? '#00A507' : "", color: isDarkMode === true ? 'white' : 'black', padding:3, borderRadius:5, alignItems:'center', justifyContent:'center'}}><Text style={{...styles.columnRowTxtRoom, color: item.timein>JSON.parse(date) && item.timein >item.timeout ? 'white' : "#4d4d4d" }}>{item.cabinet}</Text></View></Text>
                        <Text style={[styles.columnRowTxt, {color: theme.color}]}>
                          <TouchableOpacity onPress={()=> Linking.openURL(`tel:${'8'+Number(String(item.sot_tel).slice(1))}`)} style={{alignItems:'center'}}>
                        <Text style={{color:'#187D07', fontSize:11, marginTop:5,fontWeight:'600',textAlign:'center'}}>{item.sot_tel}</Text>
                    </TouchableOpacity>{"\n"}<Text style={[styles.columnRowTxt, {color: theme.color}]}>{item.email}</Text></Text>
                      </View>
                    )}}
                />

          </View>
  
  
      </View>
      )

    }

      depr.push(
          <View key={i} style={styles.container}>
            <ScrollView nestedScrollEnabled={true}>
            <ScrollView  horizontal={true} style={{ width: "100%" }}>
              <View>
            
                <View
                style={{ alignItems:'center', width: windowWidth, padding:5, borderColor: isDarkMode === true ? 'white' : '#4d4d4d', marginBottom:8, marginTop:8}}
                >
                <View style={{width:windowWidth-50, flexDirection:'row',justifyContent:'center', alignItems:'center',backgroundColor:'#F1F1F1', padding:7, borderRadius:10}}>
                  <Text style={{color:isDarkMode === true ? 'white' : '#4d4d4d', textAlign:'center', fontWeight:'600' }}>{department[i].name}</Text>
                </View>
                </View>

                {/* <View style={{alignItems:'center'}}>
                <View style={{backgroundColor:'#F1F1F1', width:"95%", padding:5, borderRadius:10}}>
                  <View style={{ flexDirection:'row'}}>
                    <View style={{backgroundColor:'#F5DA81', width: '65%', borderTopLeftRadius:8, borderBottomLeftRadius:8,paddingTop:3, paddingBottom:3,paddingLeft:12, paddingRight:12}}>
                      <Text style={{color:'#4d4d4d', fontWeight:'700', marginBottom:2, fontSize: 12}}>
                        ФИО
                      </Text>
                      <View style={{width: '90%', height:0.4, backgroundColor: 'grey'}}>

                      

                      </View>
                      <Text style={{color:'#4d4d4d', fontWeight:'700',marginTop:2, fontSize: 12}}>
                        Должность
                      </Text>
                    </View>

                    <View style={{backgroundColor:'#F5DA81', width: '35%', alignItems:'center',  borderTopRightRadius:8, borderBottomRightRadius:8, paddingTop:3, paddingBottom:3}}>
                    <Text style={{color:'#4d4d4d', fontWeight:'700',marginTop:2, fontSize: 12}}>
                      Телефон
                      </Text>

                      <Text style={{color:'white'}}>
                        Должность
                      </Text>
                      <View style={{width: '90%', height:0.6, backgroundColor: 'grey'}}>

                      

                      </View>
                      <Text style={{color:'#4d4d4d', fontWeight:'700',marginTop:2, fontSize: 12}}>
                        Кабинет
                      </Text>
                      
                      </View>

                  </View>


                  <View style={{ flexDirection:'row', marginTop:5}}>
                    <View style={{backgroundColor:'white', width: '65%', borderTopLeftRadius:8, borderBottomLeftRadius:8,paddingTop:3, paddingBottom:3, paddingLeft:10, paddingRight:10}}>
                      <View style={{ flexDirection:'row', justifyContent:'space-between'}}>
                        <View style={{width:'65%'}}>
                          <Text style={{color:'#4d4d4d', fontWeight:'500', marginBottom:2}}>
                            Сун Сичен
                          </Text>

<Text style={{color:'#4d4d4d', fontWeight:'500',marginTop:2, fontSize:12}}>
  Директор центра
</Text>
                        </View>

      
                        <View style={{width:'30%'}}>
                          <TouchableOpacity style={{width:'100%', backgroundColor:"#C9E4FD", padding:4, alignItems:'center', justifyContent: 'center', flexDirection:'row', marginBottom:5, borderRadius:5}}>
                          <FontAwesome name="phone" size={15} color="#037FF1" style={{marginRight:7}} />
                          <MaterialCommunityIcons name="email" size={15} color="#037FF1" />

                          </TouchableOpacity>

                     
                        </View>

         

                      </View>
           
                    </View>

                    <View style={{backgroundColor:'white', width: '35%', alignItems:'center',  borderTopRightRadius:8, borderBottomRightRadius:8, paddingTop:3, paddingBottom:3}}>
                    <Text style={{color:'#4d4d4d', fontWeight:'500', marginBottom:2}}>
                      766000
                      </Text>

                      <Text style={{color:'white'}}>
                        Должность
                      </Text>
                      <View style={{width: '90%', height:0.6, backgroundColor: 'white'}}>

                      

                      </View>
                      <View style={{padding:3, paddingLeft: 5, paddingRight:5, backgroundColor:'green', borderRadius:5, alignItems:'center', justifyContent:'center'}}>
                      <Text style={{color:'white', fontWeight:'500', fontSize:12}}>
                        2201
                      </Text>

                      </View>
                      
                      </View>

                  </View>

                  
                  <View style={{ flexDirection:'row', marginTop:5}}>
                    <View style={{backgroundColor:'white', width: '65%', borderTopLeftRadius:8, borderBottomLeftRadius:8,paddingTop:3, paddingBottom:3, paddingLeft:10, paddingRight:10}}>
                      <View style={{ flexDirection:'row', justifyContent:'space-between'}}>
                        <View style={{width:'65%'}}>
                          <Text style={{color:'#4d4d4d', fontWeight:'500', marginBottom:2}}>
                            Дуля Александр Николаевич
                          </Text>
                          <View style={{width: '90%', height:0.6, backgroundColor: 'white'}}>

                      

</View>
<Text style={{color:'#4d4d4d', fontWeight:'500',marginTop:2, fontSize:12}}>
  Заместитель директора центра
</Text>
                        </View>

             
                        <View style={{width:'30%'}}>
                          <TouchableOpacity style={{width:'100%', backgroundColor:"#C9E4FD", padding:4, alignItems:'center', justifyContent: 'center', flexDirection:'row', marginBottom:5, borderRadius:5}}>
                          <FontAwesome name="phone" size={15} color="#037FF1" style={{marginRight:7}} />
                          <MaterialCommunityIcons name="email" size={15} color="#037FF1" />

                          </TouchableOpacity>

                     
                        </View>

         

                      </View>
           
                    </View>

                    <View style={{backgroundColor:'white', width: '35%', alignItems:'center',  borderTopRightRadius:8, borderBottomRightRadius:8, paddingTop:3, paddingBottom:3}}>
                    <Text style={{color:'#4d4d4d', fontWeight:'500', marginBottom:2}}>
                      766000
                      </Text>

                      <Text style={{color:'white'}}>
                        Должность
                      </Text>
                      <View style={{width: '90%', height:0.6, backgroundColor: 'white'}}>

                      

                      </View>
                      <View style={{padding:3, backgroundColor:'green', borderRadius:5}}>
                      <Text style={{color:'white', fontWeight:'500', marginTop:2, fontSize:12}}>
                        2202
                      </Text>

                      </View>
                      
                      </View>

                  </View>

                  <View style={{width: '100%', flexDirection:'row', marginTop:5}}>
                    <View style={{backgroundColor:'white', width: '65%', borderTopLeftRadius:8, borderBottomLeftRadius:8,paddingTop:3, paddingBottom:3, paddingLeft:10, paddingRight:10}}>
                      <View style={{width: '100%', flexDirection:'row', justifyContent:'space-between'}}>
                        <View style={{width:'65%'}}>
                          <Text style={{color:'#4d4d4d', fontWeight:'500', marginBottom:2, width:130}}>
                            Нурбаев Нурбол Маратович
                          </Text>

<View style={{width: '100%'}}>
<Text style={{color:'#4d4d4d', fontWeight:'500',marginTop:2, fontSize:12, width:130}}>
  Заместитель директора центра Начальник отдела программного отдела
</Text>

</View>
                        </View>

                        <View style={{width:'30%'}}>
                          <TouchableOpacity style={{width:'100%', backgroundColor:"#C9E4FD", padding:4, alignItems:'center', justifyContent: 'center', flexDirection:'row', marginBottom:5, borderRadius:5}}>
                          <FontAwesome name="phone" size={15} color="#037FF1" style={{marginRight:7}} />
                          <MaterialCommunityIcons name="email" size={15} color="#037FF1" />

                          </TouchableOpacity>

                     
                        </View>

         

                      </View>
           
                    </View>

                    <View style={{backgroundColor:'white', width: '35%', alignItems:'center',  borderTopRightRadius:8, borderBottomRightRadius:8, paddingTop:3, paddingBottom:3}}>
                    <Text style={{color:'#4d4d4d', fontWeight:'500', marginBottom:2}}>
                      766000
                      </Text>

                      <Text style={{color:'white'}}>
                        Должность
                      </Text>
                      <View style={{width: '90%', height:0.6, backgroundColor: 'white'}}>

                      

                      </View>
                      <View style={{padding:3, paddingLeft:5, paddingRight:5, backgroundColor:'green', borderRadius:5}}>
                      <Text style={{color:'white', fontWeight:'500',fontSize:12}}>
                        2202
                      </Text>

                      </View>
                      
                      </View>

                  </View>

                </View>
                </View> */}



           
                <View style={[styles.container1, {display: (department[i].children).length !== 0 ? 'flex': 'none' }] } >
                  {deprChild}

                </View>
                <View style={[styles.container1, {display: (department[i].children).length === 0 ? 'flex': 'none', alignItems:'center' }] }>
                <FlatList 
                  data={ncd}
                  style={{width: windowWidth-10, display: show === true ? 'flex' : 'none', backgroundColor:'#F1F1F1', padding:5, borderRadius:10}}
                  ListHeaderComponent={tableHeader}
                  stickyHeaderIndices={[0]}
                  horizontal={false}
                  scrollEnabled={false}
                  renderItem={({item, index})=> {
                    return (
                      <View style={{}}>
                      <View style={{...styles.tableRow, backgroundColor:  isDarkMode === true ? "#262C38": "white", borderRadius:10, padding:5, marginBottom:5}}>
                        <Text style={{...styles.columnRowTxt, fontWeight:"bold", color: theme.color}}>{item.fio}</Text>
                        <Text style={[styles.columnRowTxt, {color: theme.color}]}>{item.doljnost}</Text>
                        <Text style={[styles.columnRowTxt, {color: theme.color, lineHeight:14}]}>{item.raboch_tel}{"\n"}{"\n"} <View style={{backgroundColor: item.timein>JSON.parse(date) && item.timein >item.timeout ? '#00A507' : "", color: isDarkMode === true ? 'white' : 'black', padding:3, borderRadius:5, alignItems:'center', justifyContent:'center'}}><Text style={{...styles.columnRowTxtRoom, color: item.timein>JSON.parse(date) && item.timein >item.timeout ? 'white' : "#4d4d4d" }}>{item.cabinet}</Text></View></Text>
                        <Text style={[styles.columnRowTxt, {color: theme.color}]}>
                          <TouchableOpacity onPress={()=> Linking.openURL(`tel:${'8'+Number(String(item.sot_tel).slice(1))}`)} style={{alignItems:'center'}}>
                        <Text style={{color:'#187D07', fontSize:11, marginTop:5,fontWeight:'600',textAlign:'center'}}>{item.sot_tel}</Text>
                    </TouchableOpacity>{"\n"}<Text style={[styles.columnRowTxt, {color: theme.color}]}>{item.email}</Text></Text>
                      </View>

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








  return(
   
    <View style={{flex:1,backgroundColor: isDarkMode === true ? '#262C38' : '#F2F2F2', display: showed ? 'flex' : 'none', zIndex:10}}>
      {/* <BackButton  goBack = {navigation.goBack}/>
      <Header>{globalThis.s}</Header> */}
      <View style={{alignItems:'center'}}>
      <View style={{flexDirection:'row', width: windowWidth-14, alignItems:'center', justifyContent:'space-between'}}>
            <View style={{ width:"100%", marginTop:15, marginBottom:10, backgroundColor:theme.bottomNavigationColor, padding:15, borderRadius:15, flexDirection:"row", alignItems:'center', justifyContent:'space-between'}}>
            <TouchableOpacity style={{width: '10%'}} onPress={()=>(setDepartment(''), setShowed(false))} >
              <AntDesign name="leftcircle" size={22} color="grey" />
            </TouchableOpacity>
              <View style={{width: '88%'}}>
                <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                <Text style={{fontSize:20, fontWeight:'600', color: theme.color}}>{globalThis.d}</Text>
                    <TouchableOpacity onPress={()=>{setFavourite(depId); setDepFav(!depFav); setShowPopup(true)}} >
               {
                depFav ? <FontAwesome name="bookmark" size={22} color="#FFC806" style={{marginRight:8}} /> :  <FontAwesome name="bookmark-o" size={22} color="#A7A7A7" style={{marginRight:8}} />
               }

            
          </TouchableOpacity>
                </View>
                {/* <View style={{alignItems:'center', marginTop:5, marginBottom:5}}>
                  <View style={{width:"100%", height:1, backgroundColor:theme.borderColor}}/>
                </View> */}
                <Text style={{fontSize:12, color: theme.color, marginTop:8}}>{globalThis.s}</Text>
              </View>
              
            </View>
      </View>

      </View>
      <ScrollView nestedScrollEnabled={true} style={{ width: "100%", backgroundColor:theme.bottomNavigationColor, paddingTop:15, borderTopRightRadius:20, borderTopLeftRadius:20}} >
        {depr} 

        <View style={{marginBottom:80}}/>
      </ScrollView>
      {/* <View style={{alignItems:'center', display: 'flex'}}> */}
      <View style={{alignItems:'center', display: showPopup ? 'flex' : 'none'}}>
      <View style={{width:windowWidth-20, backgroundColor:'#58B038', padding:12, marginBottom:10, alignItems:'center', display: depFav ? 'flex' : 'none', zIndex:3, borderRadius:10, flexDirection:'row'}}>

      <MaterialCommunityIcons name="bookmark-check" size={20} color="white" />
  <Text style={{color:'white', marginLeft:20}}>{globalThis.d} добавлено в избранное</Text>


</View>

<View style={{width:windowWidth-20, backgroundColor:'#C54635', padding:12, marginBottom:10, alignItems:'center', display: !depFav ? 'flex' : 'none', zIndex:3, borderRadius:10, flexDirection:'row'}}>

<MaterialCommunityIcons name="bookmark-minus" size={20} color="white" />
<Text style={{color:'white', marginLeft:20}}>{globalThis.d} удален из избранных</Text>


</View>

{/* <View style={{width:windowWidth-20, backgroundColor:'green', padding:15, marginBottom:10, alignItems:'center', display: !depFav ? 'flex' : 'none',   zIndex:3, borderRadius:10}}>
  <Text style={{color:'white'}}>deleted</Text>


</View> */}

      </View>
    </View>
  )
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