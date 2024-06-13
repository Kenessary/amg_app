// import React, { useState, useEffect, useContext } from "react";
// import {
//   Text,
//   View,
//   StyleSheet,
//   Button,
//   TouchableOpacity,
//   Alert,
//   Modal,
// } from "react-native";
// import { BarCodeScanner } from "expo-barcode-scanner";
// import axios from "axios";
// import qs from "qs";
// import { AuthContext } from "../../context/AuthContext";
// import { WaveIndicator, MaterialIndicator } from "react-native-indicators";
// import { Ionicons } from "@expo/vector-icons";
// import { CameraView, useCameraPermissions } from "expo-camera";

// export default function Inventarization({ route, navigation }) {
//   const { iin, userInfo } = useContext(AuthContext);
//   const [hasPermission, setHasPermission] = useState(null);
//   const [scanned, setScanned] = useState(false);
//   const [loadingFio, setLoadingFio] = useState(false);
//   const [loadingAdding, setLoadingAdding] = useState(false);
//   const [fio, setFio] = useState("");
//   const [dataFromQr, setDataFromQr] = useState("");
//   const [guid, setGuid] = useState("");
//   const [moveToPage, setMoveToPage] = useState(false);
//   const [visible, setVisible] = useState(false);
//   const [resultMessage, setResultMessage] = useState("");
//   const [permission, requestPermission] = useCameraPermissions();
//   console.log(dataFromQr);

//   const today = new Date();

//   // Format the date to 'YYYY-MM-DD'
//   const formattedDate = `${today.getFullYear()}-${(today.getMonth() + 1)
//     .toString()
//     .padStart(2, "0")}-${today.getDate().toString().padStart(2, "0")}`;

//   // console.log(iin)

//   if (permission && !permission.granted) {
//     return <Text>Нет доступа к камере</Text>;
//   }

//   useEffect(() => {
//     setLoadingFio(true);
//     const data = qs.stringify({
//       infoiin: iin,
//     });
//     const config = {
//       method: "post",
//       url: "http://95.57.218.120/?index",
//       headers: {
//         Authorization: "Basic OTgwNjI0MzUxNDc2OjIyMjI=",
//         "Content-Type": "application/x-www-form-urlencoded",
//       },
//       data: data,
//     };
//     axios(config)
//       .then(async function (response) {
//         let user = response.data.replace(/<[^>]*>/g, "").replace(/-->/g, "");
//         let parsed = JSON.parse(user);
//         setFio(parsed.fio);
//         setLoadingFio(false);
//       })

//       .catch(function (error) {
//         console.log(error);
//         setLoadingFio(false);
//       });
//   }, []);

//   const addInventarization = (scaniin, scanfio, guid, date_otpravki) => {
//     setLoadingAdding(true);
//     const data = qs.stringify({
//       scaniin: scaniin,
//       scanfio: scanfio,
//       guid: guid,
//       date_otpravki: date_otpravki,
//     });
//     const config = {
//       method: "post",
//       url: "http://95.57.218.120/?index",
//       headers: { "Content-Type": "application/x-www-form-urlencoded" },
//       data: data,
//     };
//     axios(config)
//       .then(function (response) {
//         let info = response.data.replace(/<[^>]*>/g, "").replace(/-->/g, "");
//         let parse_info = JSON.parse(info);
//         setResultMessage(parse_info.status);
//         setLoadingAdding(false);
//       })
//       .catch(function (error) {
//         console.log(error);
//         setLoadingAdding(false);
//       });
//   };

//   const handleBarCodeScanned = ({ data }) => {
//     setScanned(true);
//     setGuid(data);

//     setLoadingFio(true);
//     const data1 = qs.stringify({
//       cod: `${data}`,
//     });
//     const config = {
//       method: "post",
//       url: "http://95.57.218.120/?index",
//       headers: { "Content-Type": "application/x-www-form-urlencoded" },
//       data: data1,
//     };
//     axios(config)
//       .then(function (response) {
//         let info = response.data.replace(/<[^>]*>/g, "").replace(/-->/g, "");
//         if (info[0] === "F" || info[0] === "О") {
//           Alert.alert(
//             "Ошибка",
//             "Неправильные данные",
//             [
//               {
//                 text: "OK",
//                 onPress: () => setScanned(false),
//               },
//             ],
//             { cancelable: false }
//           );
//         }
//         let parsed_info = JSON.parse(info);
//         setDataFromQr(parsed_info.complect);
//         setLoadingFio(false);
//         setScanned(true);
//         if (parsed_info.status === "ok") {
//           // setMoveToPage(true)
//           // navigation.navigate('InventarizationInfo',{
//           //   qrDataInfo: parsed_info.complect
//           // })
//           setVisible(true);
//         }
//       })
//       .catch(function (error) {
//         console.log(error);
//         setLoadingFio(false);
//       });
//   };

//   const close = () => {
//     setVisible(false),
//       setScanned(false),
//       setDataFromQr(""),
//       setResultMessage("");
//     setGuid("");
//   };

//   if (!permission) {
//     return <Text>Разрешите использовать камеру чтобы сканировать QR код</Text>;
//   }
//   if (permission && !permission.granted) {
//     return <Text>Нет доступа к камере</Text>;
//   }

//   if (loadingFio) {
//     return (
//       <View
//         style={{
//           flex: 1,
//           justifyContent: "center",
//           alignItems: "center",
//           backgroundColor: "white",
//           height: "100%",
//           width: "100%",
//         }}
//       >
//         <WaveIndicator color="#D64D43" />
//       </View>
//     );
//   }

//   return (
//     <View style={{ ...styles.container }}>
//       <View
//         style={{
//           ...styles.barcodeContainer,
//           display: visible ? "none" : "flex",
//         }}
//       >
//         <Text style={styles.barcodeTitle}>Сканируйте QR-код</Text>
//         <View style={styles.barcodeBorder}>
//           <View style={styles.barcodebox}>
//             <CameraView
//               barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
//               onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
//               style={{ height: 800, width: 400 }}
//             />
//           </View>
//         </View>
//         <TouchableOpacity
//           style={styles.barcodeBackBtn}
//           onPress={() => navigation.goBack()}
//         >
//           <Text style={styles.barcodeBackBtnText}>Назад</Text>
//         </TouchableOpacity>
//       </View>

//       <View
//         style={{
//           display: visible ? "flex" : "none",
//           width: "90%",
//           paddingHorizontal: 20,
//         }}
//       >
//         <View style={{ alignItems: "center" }}>
//           <Text
//             style={{
//               fontSize: 26,
//               color: "black",
//               fontWeight: "700",
//               marginBottom: 30,
//             }}
//           >
//             Инвентаризация
//           </Text>
//         </View>
//         <Text style={{ fontSize: 20, color: "#4d4d4d", fontWeight: "700" }}>
//           {dataFromQr && dataFromQr[0].ComplectName}
//         </Text>

//         <View style={{ marginTop: 15 }}>
//           <Text
//             style={{
//               fontSize: 12,
//               color: "#4d4d4d",
//               fontWeight: "300",
//               marginBottom: 3,
//             }}
//           >
//             Код обьекта
//           </Text>
//           <Text style={{ fontSize: 16, color: "#4d4d4d", fontWeight: "600" }}>
//             {dataFromQr && dataFromQr[0].ComplectCode}
//           </Text>
//         </View>

//         <View style={{ marginTop: 15 }}>
//           <Text
//             style={{
//               fontSize: 12,
//               color: "#4d4d4d",
//               fontWeight: "300",
//               marginBottom: 3,
//             }}
//           >
//             ИИН пользователя
//           </Text>
//           <Text style={{ fontSize: 16, color: "#4d4d4d", fontWeight: "600" }}>
//             {iin}
//           </Text>
//         </View>

//         <View style={{ marginTop: 15 }}>
//           <Text
//             style={{
//               fontSize: 12,
//               color: "#4d4d4d",
//               fontWeight: "300",
//               marginBottom: 3,
//             }}
//           >
//             Пользователь
//           </Text>
//           <Text style={{ fontSize: 16, color: "#4d4d4d", fontWeight: "600" }}>
//             {fio}
//           </Text>
//         </View>

//         <View style={{ width: "100%", alignItems: "center" }}>
//           {resultMessage && (
//             <View
//               style={{
//                 backgroundColor: "#CDE9CF",
//                 width: "100%",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 flexDirection: "row",
//                 // height: 50,
//                 borderRadius: 15,
//                 padding: 15,
//                 marginTop: 20,
//                 marginBottom: 10,
//               }}
//             >
//               <Ionicons name="checkmark-circle" size={26} color="#31B43E" />
//               <Text
//                 style={{ fontSize: 16, color: "#31B43E", fontWeight: "700" }}
//               >
//                 {resultMessage}
//               </Text>
//             </View>
//           )}

//           <TouchableOpacity
//             style={{
//               width: "95%",
//               backgroundColor: "#D64D43",
//               alignItems: "center",
//               justifyContent: "center",
//               height: 50,
//               borderRadius: 20,
//               marginBottom: 15,
//               marginTop: 20,
//               display: resultMessage ? "none" : "flex",
//             }}
//             onPress={() => addInventarization(iin, fio, guid, formattedDate)}
//           >
//             {loadingAdding ? (
//               <MaterialIndicator size={25} color="white" />
//             ) : (
//               <Text style={{ fontSize: 16, color: "white" }}>Отправить</Text>
//             )}
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={{
//               width: "95%",
//               backgroundColor: "#E6E6E6",
//               alignItems: "center",
//               justifyContent: "center",
//               padding: 10,
//               borderRadius: 20,
//             }}
//             onPress={() => close()}
//           >
//             <Text style={{ fontSize: 16, color: "#4d4d4d" }}>Закрыть</Text>
//           </TouchableOpacity>

//           {/* <TouchableOpacity disabled={resultMessage} style={{width:"95%", backgroundColor:'#D64D43', alignItems:'center', justifyContent:'center', height:50, borderRadius:20, marginBottom:15}}
//   onPress={()=> addInventarization(iin, fio, guid, formattedDate)}>
//     {loadingAdding ?
//       <MaterialIndicator size={25} color='white'/>
//       : resultMessage
//       ? <View style={{backgroundColor:'white', width:"100%", alignItems:'center', justifyContent:'center', flexDirection:'row', height:50, borderRadius:15,}}>
//         <Ionicons name="checkmark-circle" size={26} color="#31B43E" />
//         <Text style={{fontSize:16, color:'#4d4d4d', fontWeight:'700'}}>{resultMessage}</Text>
//       </View>
//       : <Text style={{fontSize:16, color:'white'}}>Отправить</Text>
//     }
// </TouchableOpacity>

// <TouchableOpacity disabled={loadingAdding} style={{width:"95%", backgroundColor:'#E6E6E6', alignItems:'center', justifyContent:'center', padding:10, borderRadius:20}} onPress={()=> close()}>
//   <Text style={{fontSize:16, color:'#4d4d4d'}}>Закрыть</Text>
// </TouchableOpacity> */}
//         </View>
//       </View>

//       {/* <Modal animationType="fade" transparent={true} visible={scanned}>
//             <View style={styles.centeredView}>
//               <View style={styles.modalView}>

//                 <View>
//                   <View style={{alignItems:'center'}}>
//                     <Text style={{fontSize:26, color:'black', fontWeight:'700', marginBottom:30}}>
//                       Инвентаризация
//                     </Text>
//                   </View>

//                   <Text style={{fontSize:20, color:'#4d4d4d', fontWeight:'700'}}>
//                     {dataFromQr && dataFromQr[0].ComplectName}
//                   </Text>

//                   <View style={{marginTop:15}}>
//                   <Text style={{fontSize:12, color:'#4d4d4d', fontWeight:'300', marginBottom:3}}>
//                     Код обьекта
//                   </Text>
//                   <Text style={{fontSize:16, color:'#4d4d4d', fontWeight:'600'}}>
//                     {dataFromQr && dataFromQr[0].ComplectCode}
//                   </Text>
//                   </View>

//                   <View style={{marginTop:15}}>
//                   <Text style={{fontSize:12, color:'#4d4d4d', fontWeight:'300', marginBottom:3}}>
//                     ИИН пользователя
//                   </Text>
//                   <Text style={{fontSize:16, color:'#4d4d4d', fontWeight:'600'}}>
//                     {iin}
//                   </Text>
//                   </View>

//                   <View style={{marginTop:15}}>
//                   <Text style={{fontSize:12, color:'#4d4d4d', fontWeight:'300', marginBottom:3}}>
//                     Пользователь
//                   </Text>
//                   <Text style={{fontSize:16, color:'#4d4d4d', fontWeight:'600'}}>
//                     {fio}
//                   </Text>
//                   </View>

//                 </View>

//                 <View style={{width:'100%', alignItems:"center"}}>

//                 <TouchableOpacity disabled={loadingAdding || resultMessage} style={{width:"95%", backgroundColor:'#D64D43', alignItems:'center', justifyContent:'center', height:50, borderRadius:20, marginBottom:15}}
//                   onPress={()=> addInventarization(iin, fio, guid, formattedDate)}>
//                     {loadingAdding ?
//                       <MaterialIndicator size={25} color='white'/>
//                       : resultMessage
//                       ? <View style={{backgroundColor:'white', width:"100%", alignItems:'center', justifyContent:'center', flexDirection:'row', height:50, borderRadius:15,}}>
//                         <Ionicons name="checkmark-circle" size={26} color="#31B43E" />
//                         <Text style={{fontSize:16, color:'#4d4d4d', fontWeight:'700'}}>{resultMessage}</Text>
//                       </View>
//                       : <Text style={{fontSize:16, color:'white'}}>Отправить</Text>
//                     }
//                 </TouchableOpacity>

//                 <TouchableOpacity disabled={loadingAdding} style={{width:"95%", backgroundColor:'#E6E6E6', alignItems:'center', justifyContent:'center', padding:10, borderRadius:20}} onPress={()=> close()}>
//                   <Text style={{fontSize:16, color:'#4d4d4d'}}>Закрыть</Text>
//                 </TouchableOpacity>

//                 </View>
//               </View>
//             </View>
//           </Modal> */}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//     width: "100%",
//     height: "100%",
//     backgroundColor: "white",
//   },
//   barcodeContainer: {
//     alignItems: "center",
//   },
//   barcodeTitle: {
//     marginBottom: 20,
//     fontSize: 18,
//     fontWeight: "500",
//     color: "#4d4d4d",
//   },
//   barcodeBorder: {
//     width: 313,
//     height: 313,
//     borderWidth: 12,
//     borderColor: "#D64D43",
//     borderRadius: 36,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   barcodebox: {
//     backgroundColor: "tomato",
//     alignItems: "center",
//     justifyContent: "center",
//     height: 300,
//     width: 300,
//     overflow: "hidden",
//     borderRadius: 30,
//   },
//   barcodeBackBtn: {
//     width: 300,
//     height: 50,
//     backgroundColor: "#F5DBDA",
//     alignItems: "center",
//     justifyContent: "center",
//     marginTop: 20,
//     borderRadius: 15,
//   },
//   barcodeBackBtnText: {
//     fontSize: 18,
//     fontWeight: "600",
//     color: "#D64D43",
//   },
//   centeredView: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     marginTop: 0,
//   },
//   modalView: {
//     backgroundColor: "white",
//     borderRadius: 30,
//     paddingHorizontal: 5,
//     width: "95%",
//     height: 450,
//     paddingVertical: 25,
//     alignItems: "center",
//     // paddingHorizontal:10,
//     justifyContent: "space-between",
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.2,
//     shadowRadius: 9,
//     elevation: 4,
//   },
// });

import React, { useState, useEffect, useContext } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import axios from "axios";
import qs from "qs";
import { AuthContext } from "../../context/AuthContext";
import { WaveIndicator, MaterialIndicator } from "react-native-indicators";
import { Ionicons } from "@expo/vector-icons";
import { CameraView, useCameraPermissions } from "expo-camera";

export default function Inventarization({ navigation }) {
  const { iin, userInfo } = useContext(AuthContext);
  const [scanned, setScanned] = useState(false);
  const [loadingFio, setLoadingFio] = useState(false);
  const [loadingAdding, setLoadingAdding] = useState(false);
  const [fio, setFio] = useState("");
  const [dataFromQr, setDataFromQr] = useState("");
  const [guid, setGuid] = useState("");
  const [visible, setVisible] = useState(false);
  const [resultMessage, setResultMessage] = useState("");
  const [permission, requestPermission] = useCameraPermissions();

  const today = new Date();
  const formattedDate = `${today.getFullYear()}-${(today.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${today.getDate().toString().padStart(2, "0")}`;

  useEffect(() => {
    if (!permission) {
      requestPermission();
    }
  }, []);

  useEffect(() => {
    setLoadingFio(true);
    const data = qs.stringify({ infoiin: iin });
    const config = {
      method: "post",
      url: "http://95.57.218.120/?index",
      headers: {
        Authorization: "Basic OTgwNjI0MzUxNDc2OjIyMjI=",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: data,
    };
    axios(config)
      .then(async function (response) {
        let user = response.data.replace(/<[^>]*>/g, "").replace(/-->/g, "");
        let parsed = JSON.parse(user);
        setFio(parsed.fio);
        setLoadingFio(false);
      })
      .catch(function (error) {
        console.log(error);
        setLoadingFio(false);
      });
  }, []);

  const addInventarization = (scaniin, scanfio, guid, date_otpravki) => {
    setLoadingAdding(true);
    const data = qs.stringify({
      scaniin: scaniin,
      scanfio: scanfio,
      guid: guid,
      date_otpravki: date_otpravki,
    });
    const config = {
      method: "post",
      url: "http://95.57.218.120/?index",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      data: data,
    };
    axios(config)
      .then(function (response) {
        let info = response.data.replace(/<[^>]*>/g, "").replace(/-->/g, "");
        let parse_info = JSON.parse(info);
        setResultMessage(parse_info.status);
        setLoadingAdding(false);
      })
      .catch(function (error) {
        console.log(error);
        setLoadingAdding(false);
      });
  };

  const handleBarCodeScanned = ({ data }) => {
    setScanned(true);
    setGuid(data);
    setLoadingFio(true);
    const data1 = qs.stringify({ cod: `${data}` });
    const config = {
      method: "post",
      url: "http://95.57.218.120/?index",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      data: data1,
    };
    axios(config)
      .then(function (response) {
        let info = response.data.replace(/<[^>]*>/g, "").replace(/-->/g, "");
        if (info[0] === "F" || info[0] === "О") {
          Alert.alert(
            "Ошибка",
            "Неправильные данные",
            [
              {
                text: "OK",
                onPress: () => setScanned(false),
              },
            ],
            { cancelable: false }
          );
        }
        let parsed_info = JSON.parse(info);
        setDataFromQr(parsed_info.complect);
        setLoadingFio(false);
        setScanned(true);
        if (parsed_info.status === "ok") {
          setVisible(true);
        }
      })
      .catch(function (error) {
        console.log(error);
        setLoadingFio(false);
      });
  };

  const close = () => {
    setVisible(false);
    setScanned(false);
    setDataFromQr("");
    setResultMessage("");
    setGuid("");
  };

  if (!permission) {
    return <Text>Разрешите использовать камеру чтобы сканировать QR код</Text>;
  }

  if (permission && !permission.granted) {
    return <Text>Нет доступа к камере</Text>;
  }

  if (loadingFio) {
    return (
      <View style={styles.centeredLoading}>
        <WaveIndicator color="#D64D43" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View
        style={{
          ...styles.barcodeContainer,
          display: visible ? "none" : "flex",
        }}
      >
        <Text style={styles.barcodeTitle}>Сканируйте QR-код</Text>
        <View style={styles.barcodeBorder}>
          <View style={styles.barcodebox}>
            <CameraView
              barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
              onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
              style={{ height: 800, width: 400 }}
            />
          </View>
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate("InventarizationList")}
          style={{ ...styles.barcodeBackBtn, paddingVertical: 15 }}
        >
          <Text
            style={{
              ...styles.barcodeBackBtnText,
              textAlign: "center",
              fontSize: 16,
            }}
          >
            Список отправленных документов
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ ...styles.barcodeBackBtn, backgroundColor: "#ebe6e6" }}
          onPress={() => navigation.goBack()}
        >
          <Text style={{ ...styles.barcodeBackBtnText, color: "grey" }}>
            Назад
          </Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          display: visible ? "flex" : "none",
          width: "90%",
          paddingHorizontal: 20,
        }}
      >
        <View style={{ alignItems: "center" }}>
          <Text style={styles.inventoryTitle}>Инвентаризация</Text>
        </View>
        <Text style={styles.inventoryText}>
          {dataFromQr && dataFromQr[0].ComplectName}
        </Text>
        <View style={styles.inventoryItem}>
          <Text style={styles.inventoryLabel}>Код обьекта</Text>
          <Text style={styles.inventoryValue}>
            {dataFromQr && dataFromQr[0].ComplectCode}
          </Text>
        </View>
        {/* <View style={styles.inventoryItem}>
          <Text style={styles.inventoryLabel}>ИИН пользователя</Text>
          <Text style={styles.inventoryValue}>{iin}</Text>
        </View> */}
        {/* <View style={styles.inventoryItem}>
          <Text style={styles.inventoryLabel}>Пользователь</Text>
          <Text style={styles.inventoryValue}>{fio}</Text>
        </View> */}
        <View style={{ width: "100%", alignItems: "center" }}>
          {resultMessage && (
            <View style={styles.resultMessageContainer}>
              <Ionicons name="checkmark-circle" size={26} color="#31B43E" />
              <Text style={styles.resultMessageText}>{resultMessage}</Text>
            </View>
          )}
          <TouchableOpacity
            style={{
              ...styles.sendButton,
              display: resultMessage ? "none" : "flex",
            }}
            onPress={() => addInventarization(iin, fio, guid, formattedDate)}
          >
            {loadingAdding ? (
              <MaterialIndicator size={25} color="white" />
            ) : (
              <Text style={styles.sendButtonText}>Отправить</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity style={styles.closeButton} onPress={() => close()}>
            <Text style={styles.closeButtonText}>Закрыть</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    backgroundColor: "white",
  },
  centeredLoading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    height: "100%",
    width: "100%",
  },
  barcodeContainer: {
    alignItems: "center",
  },
  barcodeTitle: {
    marginBottom: 20,
    fontSize: 18,
    fontWeight: "500",
    color: "#4d4d4d",
  },
  barcodeBorder: {
    width: 313,
    height: 313,
    borderWidth: 12,
    borderColor: "#D64D43",
    borderRadius: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  barcodebox: {
    backgroundColor: "tomato",
    alignItems: "center",
    justifyContent: "center",
    height: 300,
    width: 300,
    overflow: "hidden",
    borderRadius: 30,
  },
  barcodeBackBtn: {
    width: 300,
    height: 50,
    backgroundColor: "#F5DBDA",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    borderRadius: 15,
  },
  barcodeBackBtnText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#D64D43",
  },
  inventoryTitle: {
    fontSize: 26,
    color: "black",
    fontWeight: "700",
    marginBottom: 30,
  },
  inventoryText: {
    fontSize: 20,
    color: "#4d4d4d",
    fontWeight: "700",
  },
  inventoryItem: {
    marginTop: 15,
  },
  inventoryLabel: {
    fontSize: 12,
    color: "#4d4d4d",
    fontWeight: "300",
    marginBottom: 3,
  },
  inventoryValue: {
    fontSize: 16,
    color: "#4d4d4d",
    fontWeight: "600",
  },
  resultMessageContainer: {
    backgroundColor: "#CDE9CF",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    padding: 15,
    marginTop: 20,
    marginBottom: 10,
    borderRadius: 15,
  },
  resultMessageText: {
    fontSize: 16,
    color: "#31B43E",
    fontWeight: "700",
  },
  sendButton: {
    width: "95%",
    backgroundColor: "#D64D43",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    borderRadius: 20,
    marginBottom: 15,
    marginTop: 20,
  },
  sendButtonText: {
    fontSize: 16,
    color: "white",
  },
  closeButton: {
    width: "95%",
    backgroundColor: "#E6E6E6",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderRadius: 20,
  },
  closeButtonText: {
    fontSize: 16,
    color: "#4d4d4d",
  },
});
