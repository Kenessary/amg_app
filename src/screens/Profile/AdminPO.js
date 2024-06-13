import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Linking,
} from "react-native";
import React, { Component, useContext, useEffect, useState } from "react";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import themeContext from "../../cores/themeContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import qs from "qs";
import axios from "axios";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function AdminPO() {
  const theme = useContext(themeContext);

  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Load the user's preference from AsyncStorage
    loadDarkModePreference();
  }, []);

  const loadDarkModePreference = async () => {
    try {
      const preference = await AsyncStorage.getItem("darkMode");
      if (preference !== null) {
        setIsDarkMode(JSON.parse(preference));
      }
    } catch (error) {
      console.log("Error loading dark mode preference:", error);
    }
  };

  const num = "7103843421";
  const val = "4bc59783253947119f4b1e0336871e8171cb98dbe3264aa781";

  const sendCode = () => {
    const data = qs.stringify({
      chatId: "77082611298@c.us",
      message: "5555",
    });
    const config = {
      method: "post",
      url: "https://api.green-api.com/waInstance + `{num}` + /sendMessage/a1bb0ffee55f4c7c9dfe2639ee3692016b950ff8d2904e628d",
      headers: {
        Authorization: "Basic OTgwNjI0MzUxNDc2OjIyMjI=",
        "Content-Type": "application/json",
      },
      data: data,
    };
    axios(config)
      .then(function (response) {
        let idMess = response.data;
        console.log(idMess);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <ScrollView>
        <View style={{ alignItems: "center" }}>
          <View
            style={{
              width: windowWidth - 20,
              borderWidth: 1,
              paddingLeft: 15,
              paddingRight: 15,
              paddingTop: 10,
              paddingBottom: 10,
              borderRadius: 15,
              marginTop: 20,
              borderColor: "#E4E4E4",
            }}
          >
            <Text
              style={{ fontSize: 16, fontWeight: "600", color: theme.color }}
            >
              Центр IT, отдел программного обеспечения
            </Text>
            <View style={{ marginTop: 15 }}>
              <View style={{ flexDirection: "row" }}>
                <Text style={{ fontSize: 16, color: theme.color }}>
                  Телефон:
                </Text>
                <TouchableOpacity
                  onPress={() => Linking.openURL(`tel:${87132766272}`)}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginLeft: 7,
                    backgroundColor: "#A3F596",
                    padding: 3,
                    borderRadius: 5,
                  }}
                >
                  <Entypo
                    name="phone"
                    size={15}
                    color="#187D07"
                    style={{ marginRight: 3 }}
                  />
                  <Text style={{ color: "#187D07", fontWeight: "500" }}>
                    +7 (7132) 76-62-72
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={{ marginTop: 15 }}>
              <View style={{ flexDirection: "row" }}>
                <Text style={{ fontSize: 16, color: theme.color }}>
                  E-mail:
                </Text>

                <TouchableOpacity
                  onPress={() => Linking.openURL("mailto:munaygaz@cnpc-amg.kz")}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginLeft: 7,
                    backgroundColor: "#BAE6FD",
                    padding: 3,
                    borderRadius: 5,
                  }}
                >
                  <MaterialIcons
                    name="email"
                    size={15}
                    color="#0A7699"
                    style={{ marginRight: 3 }}
                  />
                  <Text style={{ color: "#0A7699", fontWeight: "500" }}>
                    support@cnpc-amg.kz
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={{ flexDirection: "row", marginTop: 5 }}></View>
            </View>
            <View style={{ marginTop: 10 }}>
              <Text
                style={{ fontSize: 15, fontWeight: "500", color: theme.color }}
              >
                г. Актобе, пр-т 312 стрелковой дивизии, 3,{"\n"}кабинет
                2207-2208
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* <View style={{ alignItems: "center", marginTop: 50 }}>
        <TouchableOpacity
          style={{ backgroundColor: "green", padding: 20, borderRadius: 15 }}
          onPress={() => sendCode()}
        >
          <Text>Отправить код</Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );
}

// import { Entypo } from '@expo/vector-icons';
// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import Collapsible from 'react-native-collapsible';

// const ExpandableList = () => {
//   const [activeSections, setActiveSections] = useState([0, 1, 2]); // Set default state to expanded

//   const SECTIONS = [
//     { title: 'Section 1', content: 'Content for section 1' },
//     { title: 'Section 2', content: 'Content for section 2' },
//     { title: 'Section 3', content: 'Content for section 3' },
//   ];

//   const renderHeader = (section, index, isActive) => {
//     return (

//       <TouchableOpacity
//       style={styles.header}
//       onPress={() => toggleSection(index)}
//     >
//       <Text style={styles.headerText}>{section.title}</Text>
//       <Entypo
//         name={isActive ? 'chevron-down' : 'chevron-up'}
//         size={24}
//         color="#000"
//       />
//     </TouchableOpacity>
//     );
//   };

//   const renderContent = (section) => {
//     return (
//       <View style={styles.content}>
//         <Text>{section.content}</Text>
//       </View>
//     );
//   };

//   const toggleSection = (index) => {
//     let activeSectionsCopy = [...activeSections];
//     const isActive = activeSectionsCopy.includes(index);

//     if (isActive) {
//       activeSectionsCopy = activeSectionsCopy.filter((i) => i !== index);
//     } else {
//       activeSectionsCopy.push(index);
//     }

//     setActiveSections(activeSectionsCopy);
//   };

//   return (
//     <View style={styles.container}>
//       {SECTIONS.map((section, index) => (
//         <View key={index}>
//           {renderHeader(section, index, activeSections.includes(index))}
//           <Collapsible collapsed={!activeSections.includes(index)}>
//             {renderContent(section)}
//           </Collapsible>
//         </View>
//       ))}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     paddingTop: 40,
//   },
//   header: {
//     backgroundColor: '#f5f5f5',
//     padding: 10,
//     flexDirection:'row',
//     alignItems:'center'
//   },
//   headerText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   content: {
//     backgroundColor: '#ffffff',
//     padding: 15,
//   },
// });

// export default ExpandableList;

// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

// const ExpandableList = () => {
//   const [sections, setSections] = useState([
//     { id: 1, title: 'Section 1', content: 'Content for section 1', isExpanded: true },
//     { id: 2, title: 'Section 2', content: 'Content for section 2', isExpanded: true },
//     { id: 3, title: 'Section 3', content: 'Content for section 3', isExpanded: true },
//   ]);

//   // console.log(sections[0])

//   const toggleSection = (sectionId) => {
//     setSections((prevSections) =>
//       prevSections.map((section) =>
//         section.id === sectionId ? { ...section, isExpanded: !section.isExpanded } : section
//       )
//     );
//   };

//   const renderHeader = (section) => {
//     return (
//       <TouchableOpacity
//         style={styles.header}
//         onPress={() => toggleSection(section.id)}
//       >
//         <Text style={styles.headerText}>{section.title}</Text>
//       </TouchableOpacity>
//     );
//   };

//   const renderContent = (section) => {
//     if (!section.isExpanded) {
//       return null;
//     }

//     return (
//       <View style={styles.content}>
//         <Text>{section.content}</Text>
//       </View>
//     );
//   };

//   return (
//     <View style={styles.container}>
//       {sections.map((section) => (
//         <View key={section.id}>
//           {renderHeader(section)}
//           {renderContent(section)}
//         </View>
//       ))}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     paddingTop: 40,
//   },
//   header: {
//     backgroundColor: '#f5f5f5',
//     padding: 10,
//   },
//   headerText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   content: {
//     backgroundColor: '#ffffff',
//     padding: 15,
//   },
// });

// export default ExpandableList;

// import { Text, View, StyleSheet, Dimensions, SafeAreaView, ScrollView, TouchableOpacity, Linking, Modal } from 'react-native'
// import React, { Component, useContext, useEffect, useState } from 'react'
// import { Entypo, MaterialIcons } from '@expo/vector-icons'
// import themeContext from '../../cores/themeContext';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { FontAwesome } from '@expo/vector-icons';
// import { BlurView } from 'expo-blur';

// const windowWidth = Dimensions.get('window').width;
// const windowHeight = Dimensions.get('window').height;

// export default function AdminPO() {
//     const theme = useContext(themeContext)

//     const [isDarkMode, setIsDarkMode] = useState(false)
//     const [rating, setRating] = useState(0);

//     const handleStarPress = (newRating) => {
//       setRating(newRating);
//     };

//     const renderStars = () => {
//       const stars = [];

//       for (let i = 1; i <= 5; i++) {
//         const starColor = i <= rating ? 'gold' : 'gray';
//         stars.push(
//           <TouchableOpacity
//             key={i}
//             onPress={() => handleStarPress(i)}
//             style={styles.starContainer}
//           >
//             <FontAwesome name="star" size={40} color={starColor} />
//           </TouchableOpacity>
//         );
//       }

//       return stars;
//     };

//     useEffect(() => {
//       // Load the user's preference from AsyncStorage
//       loadDarkModePreference();
//     }, []);

//     const loadDarkModePreference = async () => {
//       try {
//         const preference = await AsyncStorage.getItem('darkMode');
//         if (preference !== null) {
//           setIsDarkMode(JSON.parse(preference));
//         }
//       } catch (error) {
//         console.log('Error loading dark mode preference:', error);
//       }
//     };
//     return (
//       <View style={{flex:1, backgroundColor:theme.background}}>
//         {/* <Modal animationType="fade" transparent={false} visible={true}>
//           <View style={{flex:1,alignItems:'center', marginTop:80}}>
//           <View style={styles.container}>
//       <Text style={styles.title}>Оцени это приложение</Text>
//       <View style={styles.starRating}>{renderStars()}</View>
//       <Text style={styles.ratingText}>
//       Вы оценили это приложение: {rating} из 5.
//       </Text>
//     </View>
//           </View>

//         </Modal> */}
//         <ScrollView>
//         <View style={{alignItems:'center'}}>
//             <View style={{width:windowWidth-20, borderWidth:1, paddingLeft:15, paddingRight:15, paddingTop:10, paddingBottom:10, borderRadius:15,marginTop: 20, borderColor:'#E4E4E4'}}>
//                 <Text style={{fontSize:16, fontWeight:'600', color:theme.color}}>Центр IT, отдел программного обеспечения</Text>
//                 {/* <View style={{width:'100%', height:1, backgroundColor:'black', marginTop:5}}/> */}
//                 <View style={{marginTop:15}}>

//                     <View style={{flexDirection:'row'}}>
//                     <Text style={{fontSize:16, color:theme.color}}>
//                         Телефон:
//                     </Text>
//                     <TouchableOpacity onPress={()=> Linking.openURL(`tel:${87132766272}`)} style={{flexDirection:'row', alignItems:'center', marginLeft:7, backgroundColor:'#A3F596', padding:3, borderRadius:5}}>
//                         <Entypo name="phone" size={15} color="#187D07" style={{marginRight:3}} />
//                         <Text style={{color:'#187D07', fontWeight:'500'}}>+7 (7132) 76-62-72</Text>
//                     </TouchableOpacity>
//                     </View>
//                 </View>

//                 <View style={{marginTop:15}}>
//                     <View style={{flexDirection:'row'}}>
//                     <Text style={{fontSize:16, color:theme.color}}>
//                         E-mail:
//                     </Text>

//                     <TouchableOpacity onPress={()=> Linking.openURL('mailto:munaygaz@cnpc-amg.kz')} style={{flexDirection:'row', alignItems:'center', marginLeft:7, backgroundColor:'#BAE6FD', padding:3, borderRadius:5}}>
//                         <MaterialIcons name="email" size={15} color="#0A7699" style={{marginRight:3}} />
//                         <Text style={{color:'#0A7699', fontWeight:'500'}}>support@cnpc-amg.kz</Text>
//                     </TouchableOpacity>

//                     </View>
//                     <View style={{flexDirection:'row', marginTop:5}}>

//                     </View>
//                 </View>
//                 <View style={{marginTop:10}}>
//                     <Text style={{fontSize:15, fontWeight: '500', color:theme.color}}>г. Актобе, пр-т 312 стрелковой дивизии, 3,{'\n'}кабинет 2207-2208</Text>
//                 </View>

//             </View>

//         </View>
//         </ScrollView>

//       </View>
//     )

// }

// const styles = StyleSheet.create({

//   container11: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   title11: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   starRating11: {
//     flexDirection: 'row',
//   },
//   starContainer11: {
//     marginHorizontal: 5,
//   },
//   ratingText11: {
//     marginTop: 20,
//     fontSize: 18,
//   },

//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   background: {
//     flex: 1,
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//   },
//   text: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: 'white',
//     textAlign: 'center',
//   },
// });

// import React, { useState } from 'react';
// import { View, StyleSheet, TouchableOpacity } from 'react-native';

// const App = () => {
//   const [blocks, setBlocks] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9]);

//   const deleteBlock = (index) => {
//     const updatedBlocks = blocks.filter((_, i) => i !== index);
//     setBlocks(updatedBlocks);
//   };

//   return (
//     <View style={styles.container}>
//       {blocks.map((block, index) => (
//         <TouchableOpacity
//           key={index}
//           onPress={() => deleteBlock(index)}
//           style={styles.block}
//         >
//           <View style={styles.innerBlock}>
//             {/* You can put content inside each block here */}
//           </View>
//         </TouchableOpacity>
//       ))}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//   },
//   block: {
//     width: 50,
//     height: 50,
//     backgroundColor: 'red',
//     margin: 5,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   innerBlock: {
//     // Inner content styles if needed
//   },
// });

// export default App;

// import React, { useState } from 'react';
// import { View, TextInput, Text } from 'react-native';

// export default function App() {
//   const [input1, setInput1] = useState('');
//   const [input2, setInput2] = useState('');

//   const calculateResult = () => {
//     // Convert the input values to numbers and ensure default to 0 if empty
//     const value1 = input1 ? parseFloat(input1) : 0;
//     const value2 = input2 ? parseFloat(input2) : 0;

//     // Perform the calculation
//     const result = value1 + value2;

//     return result.toFixed(2); // Format the result to two decimal places
//   };

//   const result = input1 !== '' && input2 !== '' ? calculateResult() : '0.00';

//   console.log(result)

//   return (
//     <View>
//       <TextInput
//         placeholder="Enter value 1"
//         value={input1}
//         onChangeText={(text) => setInput1(text)}
//         keyboardType='numeric'
//         style={{height:40, width:'80%', marginBottom:10, marginTop:10, backgroundColor:'white'}}
//       />
//       <TextInput
//         placeholder="Enter value 2"
//         value={input2}
//         onChangeText={(text) => setInput2(text)}
//         keyboardType="numeric"
//         style={{height:40, width:'80%', marginBottom:10, marginTop:10, backgroundColor:'white'}}
//       />
//       <Text>Result: {input1 !== '' && input2 !== '' ? result : '0.00'}</Text>
//     </View>
//   );
// }
