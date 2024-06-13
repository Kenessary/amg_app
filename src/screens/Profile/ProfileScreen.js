import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  Platform,
  ScrollView,
  Modal,
  Pressable,
  SafeAreaView,
  Image,
  Switch,
} from "react-native";
// import Button from '../components/Button'
import Header from "../../components/Header";
import { AuthContext } from "../../context/AuthContext";
import Button from "../../components/Button";
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
} from "react-native-table-component";
import { List } from "react-native-paper";
import axios from "axios";
import qs from "qs";
import { WaveIndicator } from "react-native-indicators";
import {
  BirthdayIcon,
  EventIcon,
  InfoguideIcon,
  MenuIcon,
  NewsIcon,
  ArrowIcon,
} from "../../cores/helpers/icon";
import { Ionicons, FontAwesome, Entypo, AntDesign } from "@expo/vector-icons";
// import { registerIndieID } from 'native-notify';
import {
  MaterialIcons,
  MaterialCommunityIcons,
  FontAwesome5,
} from "@expo/vector-icons";
import LottieView from "lottie-react-native";
import { BottomSheet } from "react-native-btr";
import { EventRegister } from "react-native-event-listeners";
import themeContext from "../../cores/themeContext";
import moment from "moment";
import { Logs } from "expo";

import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";

import AsyncStorage from "@react-native-async-storage/async-storage";
import i18n from "i18n-js";
import { kz, ru, ch } from "../../languages/localizations";
import { StatusBar } from "expo-status-bar";
import VerifyForPassword from "./VerifyForPassword";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function ProfileScreen({ navigation }) {
  const theme = useContext(themeContext);
  const [isDarkMode, setIsDarkMode] = useState(false);
  globalThis.dm = isDarkMode;

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

  const saveDarkModePreference = async (value) => {
    try {
      setIsDarkMode(value);
      await AsyncStorage.setItem("darkMode", JSON.stringify(value));
    } catch (error) {
      console.log("Error saving dark mode preference:", error);
    }
  };

  const toggleDarkMode = (value) => {
    saveDarkModePreference(value);
  };

  let [locale, setLocale] = useState("");
  let [lang, setLang] = useState("");

  i18n.fallbacks = true;
  i18n.translations = { kz, ru, ch };
  i18n.locale = lang;
  i18n.defaultLocale = "kz";

  useEffect(() => {
    if (locale !== "") {
      AsyncStorage.setItem("appLanguage", locale);
    }
  });

  useEffect(() => {
    getData1();
  });

  const getData1 = () => {
    try {
      AsyncStorage.getItem("appLanguage").then((value) => {
        if (value != null) {
          //   console.log(value)
          setLang(value);
        }
      });
      // setIsLoading(false)
    } catch (error) {
      // setIsLoading(false)
      console.log(error);
    }
  };

  const { logout, iin } = useContext(AuthContext);
  const [list, setList] = useState([]);
  const [userp, setUserp] = useState([]);
  // console.log(userp);

  const [sot, setSot] = useState("");
  const [deleted, setDeleted] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingPhoto, setIsLoadingPhoto] = useState(false);
  const [isLoading1, setIsLoading1] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible1, setModalVisible1] = useState(false);
  const [modalResult, setModalResult] = useState(false);
  const [iinforeign, setIinForeign] = useState("");
  // console.log()
  const [isVerified, setIsVerified] = useState("");
  // const {logout, iin, restore} = useContext(AuthContext)
  const [visible, setVisible] = useState(false);
  const [type, setType] = useState("");

  const [image, setImage] = useState();
  // console.log(image)
  globalThis.type = type;
  // console.log(globalThis.type === 'pass')

  const toggleBottomNavigationView = () => {
    //Toggling the visibility state of the bottom sheet
    setVisible(!visible);
  };

  const [title, setTitle] = useState(["ФИО", "ИИН", "Номер\nтелефона"]);

  const profile = [];

  useEffect(() => {
    setIsLoading(true);
    const data = qs.stringify({
      infoiin: iin,
    });
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
        // console.log(parsed);
        setUserp(parsed);
        parsed.photos === null ? setImage("") : setImage(parsed.photos[0]);
        setIsVerified(parsed.verified);
        setIinForeign(parsed.isforeign);
        // setUserp(parsed);
        setIsLoading(false);
      })

      .catch(function (error) {
        console.log(error);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    getSot();
  }, []);

  const getSot = () => {
    try {
      AsyncStorage.getItem("userSotrpm").then((value) => {
        if (value != null) {
          //   console.log(value)
          setSot(value);
        }
      });
      // setIsLoading(false)
    } catch (error) {
      // setIsLoading(false)
      console.log(error);
    }
  };

  const deleteUserToken = () => {
    setIsLoading(true);
    const data = qs.stringify({
      deletetokenfromtableiin: iin,
    });
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
        console.log(parsed);
        setIsLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        setIsLoading(false);
      });
  };

  // console.log(iin)

  const deleteAccount = () => {
    setIsLoading1(true);
    const data = qs.stringify({
      delacciin: iin,
    });
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
        if (parsed.status === "Аккаунт успешно удален") {
          setModalResult(true);
          // setModalVisible1(false)
        }
        setDeleted(parsed.status);
        setIsLoading1(false);
      })

      .catch(function (error) {
        console.log(error);
        setIsLoading(false);
      });
  };

  const sendPhoto = (iin, image) => {
    // setIsLoadingPhoto(true)
    const data = qs.stringify({
      faceiin: iin,
      facephoto: image,
    });
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
        // console.log(parsed)
      })

      .catch(function (error) {
        console.log(error);
        // setIsLoading(false)
      });
  };

  const uploadImage = async () => {
    try {
      await ImagePicker.requestCameraPermissionsAsync();
      let result = await ImagePicker.launchCameraAsync({
        cameraType: ImagePicker.CameraType.front,
        // allowsEditing:true,
        aspect: [1, 1],
        quality: 1,
        base64: true,
      });

      if (!result.canceled) {
        // setImage(result.assets[0].base64)
        const manipResult = await ImageManipulator.manipulateAsync(
          result.assets[0].uri,
          [{ resize: { width: 240, height: 300 } }], // Adjust the dimensions as needed
          { compress: 0.5, format: ImageManipulator.SaveFormat.JPEG } // Adjust the quality as needed
        );

        let base64Image = await fetch(manipResult.uri);
        let blob = await base64Image.blob();
        let reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = function () {
          let base64data = reader.result.replace(
            /^data:image\/jpeg;base64,/,
            ""
          );
          setImage(base64data); // This is your base64-encoded image
          setIsLoadingPhoto(true);
          const data = qs.stringify({
            faceiin: iin,
            facephoto: base64data,
          });
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
              let user = response.data
                .replace(/<[^>]*>/g, "")
                .replace(/-->/g, "");
              let parsed = JSON.parse(user);
              console.log("photo sended");
              setIsLoadingPhoto(false);
            })

            .catch(function (error) {
              console.log(error);
              setIsLoadingPhoto(false);
            });
        };
      }
    } catch (error) {
      alert("Error uploading image: " + error.message);
    }
  };

  const saveImage = async (image) => {
    try {
      setImage(image);
      sendPhoto(iin, image);
    } catch (error) {
      throw error;
    }
  };

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

  profile.push(userp.fio, userp.iin, userp.tel);
  // console.log(type)

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: theme.background,
          height: "100%",
          width: "100%",
        }}
      >
        <WaveIndicator color={theme.loading} />
        {/* <LottieView
            source={require("../../../assets/animation/profile_loading.json")}
            autoPlay
            loop={true}
            speed={1.45}
          /> */}
      </View>
    );
  }

  if (isLoadingPhoto) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: theme.background,
          height: "100%",
          width: "100%",
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: "600", color: "#4d4d4d" }}>
          Загружается фото
        </Text>
        <WaveIndicator color={theme.loading} />
      </View>
    );
  }

  return (
    <View
      style={{
        ...styles.container,
        opacity: modalVisible || modalVisible1 ? 0.3 : 1,
      }}
    >
      <StatusBar style={isDarkMode === true ? "light" : "dark"} />

      <BottomSheet
        visible={visible}
        //setting the visibility state of the bottom shee
        onBackButtonPress={toggleBottomNavigationView}
        //Toggling the visibility state on the click of the back botton
        onBackdropPress={toggleBottomNavigationView}
        //Toggling the visibility state on the clicking out side of the sheet
      >
        {/*Bottom Sheet inner View*/}
        <View
          style={[
            styles.bottomNavigationView,
            {
              backgroundColor: theme.background,
              opacity: modalVisible || modalVisible1 ? 0.6 : 1,
            },
          ]}
        >
          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View
                style={[
                  styles.modalView,
                  { backgroundColor: theme.background },
                ]}
              >
                <Text style={[styles.modalText, { color: theme.color }]}>
                  {i18n.t("exitWarning")}
                </Text>
                <View style={{ flexDirection: "row" }}>
                  {/* buttonClose: {
    backgroundColor: "#D64D43",
  },
  buttonClose1: {
    backgroundColor:'white'
  }, */}
                  <Pressable
                    style={[
                      styles.button,
                      {
                        backgroundColor:
                          isDarkMode === true ? "#C0D5EE" : "#D64D43",
                        borderColor:
                          isDarkMode === true ? "#C0D5EE" : "#D64D43",
                      },
                    ]}
                    onPress={() => {
                      logout();
                      deleteUserToken();
                    }}
                  >
                    <Text
                      style={[styles.textStyle, { color: theme.background }]}
                    >
                      {i18n.t("daYes")}
                    </Text>
                  </Pressable>

                  <Pressable
                    style={[
                      styles.button,
                      {
                        backgroundColor: isDarkMode === true ? "" : "",
                        borderColor:
                          isDarkMode === true ? "#C0D5EE" : "#D64D43",
                      },
                    ]}
                    onPress={() => setModalVisible(!modalVisible)}
                  >
                    <Text
                      style={{
                        color: isDarkMode === true ? "#C0D5EE" : "#D64D43",
                        fontWeight: "bold",
                        textAlign: "center",
                        fontSize: 16,
                      }}
                    >
                      {i18n.t("netNo")}
                    </Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>

          <View style={{}}>
            <View>
              <Text
                style={{
                  marginTop: 5,
                  marginLeft: 5,
                  fontSize: 24,
                  fontWeight: "bold",
                  // backgroundColor:'red'
                  color: theme.color,
                }}
              >
                {i18n.t("settings")}
              </Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <View
                style={{
                  marginTop: 20,
                  alignItems: "center",
                  borderWidth: 1,
                  width: windowWidth - 40,
                  borderRadius: 15,
                  borderColor: "#E4E4E4",
                }}
              >
                <View style={{ width: windowWidth - 30, marginBottom: 2 }}>
                  <List.Item
                    title={i18n.t("changeParol")}
                    titleStyle={{ color: theme.color }}
                    onPress={() => {
                      iinforeign === "1"
                        ? navigation.navigate("ChangePassword")
                        : navigation.navigate("VerifyForPassword");
                      toggleBottomNavigationView();
                    }}
                    // right = {() => <MaterialIcons name="arrow-forward-ios" size={18} color="#4D4D4D" />}
                    left={() => (
                      <MaterialCommunityIcons
                        name="form-textbox-password"
                        style={{ marginLeft: 20, marginRight: -5 }}
                        size={20}
                        color={theme.color}
                      />
                    )}
                    rippleColor="transparent"
                  />
                </View>
              </View>

              <View
                style={{
                  marginTop: 10,
                  alignItems: "center",
                  borderWidth: 1,
                  width: windowWidth - 40,
                  borderRadius: 15,
                  borderColor: "#E4E4E4",
                }}
              >
                <View style={{ width: windowWidth - 30, marginBottom: 2 }}>
                  <List.Item
                    title={i18n.t("changePhone")}
                    titleStyle={{ color: theme.color }}
                    onPress={() => {
                      iinforeign === "1"
                        ? navigation.navigate("ChangePhone")
                        : navigation.navigate("VerifyForPhone");
                      toggleBottomNavigationView();
                    }}
                    // right = {() => <MaterialIcons name="arrow-forward-ios" size={18} color="#4D4D4D" />}
                    left={() => (
                      <MaterialIcons
                        name="phone-iphone"
                        style={{ marginLeft: 20, marginRight: -5 }}
                        size={20}
                        color={theme.color}
                      />
                    )}
                    rippleColor="transparent"
                  />
                </View>
              </View>

              <View
                style={{
                  marginTop: 10,
                  alignItems: "center",
                  borderWidth: 1,
                  width: windowWidth - 40,
                  borderRadius: 15,
                  borderColor: "#E4E4E4",
                }}
              >
                <View style={{ width: windowWidth - 30, marginBottom: 2 }}>
                  <List.Item
                    title={i18n.t("changeLanguage")}
                    titleStyle={{ color: theme.color }}
                    onPress={() => {
                      navigation.navigate("ChangeLang");
                      toggleBottomNavigationView();
                    }}
                    // right = {() => <MaterialIcons name="arrow-forward-ios" size={18} color="#4D4D4D" />}
                    left={() => (
                      <MaterialIcons
                        name="language"
                        style={{ marginLeft: 20, marginRight: -5 }}
                        size={20}
                        color={theme.color}
                      />
                    )}
                    rippleColor="transparent"
                  />
                </View>
              </View>
              {/* 
  <View style={{display:'none'}}>
    <VerifyForPassword check={type} />

  </View> */}

              <View
                style={{
                  marginTop: 10,
                  borderWidth: 1,
                  padding: 15,
                  width: windowWidth - 40,
                  borderRadius: 15,
                  borderColor: "#E4E4E4",
                  height: 50,
                  justifyContent: "center",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View style={{ alignItems: "center", flexDirection: "row" }}>
                    {isDarkMode === true ? (
                      <Ionicons
                        name="moon"
                        size={19}
                        color={theme.color}
                        style={{ marginRight: 10 }}
                      />
                    ) : (
                      <Ionicons
                        name="sunny"
                        size={20}
                        color={theme.color}
                        style={{ marginRight: 10 }}
                      />
                    )}
                    <Text style={{ fontSize: 16, color: theme.color }}>
                      {i18n.t("darkTheme")}
                    </Text>
                  </View>

                  <Switch
                    value={isDarkMode}
                    onValueChange={(value) => {
                      toggleDarkMode(value);
                      EventRegister.emit("changeTheme", value);
                    }}
                  />
                </View>
              </View>

              <TouchableOpacity
                // onPress = {()=> logout()}
                onPress={() => setModalVisible(true)}
                style={{
                  width: windowWidth - 40,
                  // backgroundColor: '#F5DBDA',
                  flexDirection: "row",
                  borderWidth: 1,
                  borderColor: theme.red,
                  height: 44,
                  borderRadius: 10,
                  marginTop: 10,
                  // marginTop: 200,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "600",
                    color: theme.red,
                    marginRight: 10,
                  }}
                >
                  {i18n.t("exit")}
                </Text>
                <Ionicons name="exit-outline" size={20} color={theme.red} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </BottomSheet>

      {/* <Modal
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
                </Modal> */}

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible1}
        onRequestClose={() => {
          setModalVisible(!modalVisible1);
        }}
      >
        <View style={styles.centeredView}>
          <View
            style={[styles.modalView, { backgroundColor: theme.background }]}
          >
            <Text style={[styles.modalText, { color: theme.color }]}>
              {i18n.t("deleteWarning")}
            </Text>
            <View style={{ flexDirection: "row" }}>
              <Pressable
                style={[
                  styles.button,
                  {
                    backgroundColor:
                      isDarkMode === true ? "#C0D5EE" : "#D64D43",
                    borderColor: isDarkMode === true ? "#C0D5EE" : "#D64D43",
                  },
                ]}
                onPress={() => deleteAccount()}
              >
                <Text style={[styles.textStyle, { color: theme.background }]}>
                  {i18n.t("daYes")}
                </Text>
              </Pressable>

              <Pressable
                style={[
                  styles.button,
                  {
                    backgroundColor: isDarkMode === true ? "" : "",
                    borderColor: isDarkMode === true ? "#C0D5EE" : "#D64D43",
                  },
                ]}
                onPress={() => setModalVisible1(!modalVisible1)}
              >
                <Text
                  style={{
                    color: isDarkMode === true ? "#C0D5EE" : "#D64D43",
                    fontWeight: "bold",
                    textAlign: "center",
                    fontSize: 16,
                  }}
                >
                  {i18n.t("netNo")}
                </Text>
              </Pressable>
            </View>
          </View>

          <Modal animationType="fade" transparent={true} visible={isLoading1}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <WaveIndicator color="#D64D43" />
              </View>
            </View>
          </Modal>

          <Modal animationType="fade" transparent={true} visible={modalResult}>
            <View style={styles.centeredView}>
              <View style={styles.modalView1}>
                {/* <FontAwesome name="check-circle" size={140} color="#1CA510" /> */}

                <LottieView
                  source={require("../../../assets/animation/done.json")}
                  autoPlay
                  loop={false}
                  speed={1.4}
                  style={{ width: 135, height: 135 }}
                />
                <View style={styles.modalContainer}>
                  <Text style={{ marginBottom: 20, fontSize: 18 }}>
                    {deleted}
                  </Text>
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => logout()}
                  >
                    <Text style={styles.textStyle}>OK</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      </Modal>

      <View style={{ alignItems: "center" }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: windowWidth - 60,
            alignItems: "center",
            marginTop: Platform.OS === "ios" ? 40 : 30,
          }}
        >
          <View>
            <Text style={[styles.header, { color: theme.color }]}>
              {i18n.t("profile")}
            </Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            {iin === "980624351476" ||
            iin === "000614551739" ||
            iin === "860902303264" ||
            iin === "111111111111" ? (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("PushSendScreen");
                }}
                style={{
                  width: 50,
                  height: 26,
                  paddingVertical: 0,
                  backgroundColor: isDarkMode === true ? "#C0D5EE" : "#E2E2E2",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 5,
                }}
              >
                <Ionicons
                  name="send"
                  style={styles.btn}
                  size={18}
                  color={isDarkMode === true ? "#1C3F5C" : "#4d4d4d"}
                />
              </TouchableOpacity>
            ) : (
              <></>
            )}
            <TouchableOpacity
              onPress={toggleBottomNavigationView}
              style={{
                width: 50,
                height: 26,
                paddingVertical: 0,
                backgroundColor: isDarkMode === true ? "#C0D5EE" : "#E2E2E2",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 5,
                marginLeft: 10,
              }}
            >
              <Ionicons
                name="settings-sharp"
                size={18}
                color={isDarkMode === true ? "#1C3F5C" : "#4d4d4d"}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* <View style={{alignItems:'center', marginTop:10}}>

<View style={{width: windowWidth - 40, marginBottom: 0, paddingBottom:15,paddingTop:15, borderTopLeftRadius: 15,borderTopRightRadius: 15, borderWidth: isDarkMode === true ? 0.5 : 1, borderColor:'#E4E4E4'}}>
  <View style={{marginBottom:10, marginLeft:15, marginRight: 15}}>
  <Text style={{fontSize: 20, fontWeight: '500', color: theme.color}}>{userp.fio}</Text>

{isVerified === true ?   
<View style={{flexDirection:'row', alignItems:'center', justifyContent:'center', backgroundColor:'#B0F9AA', padding:5,paddingLeft:7, paddingRight:7, borderRadius:5, marginTop:7}}>
  <AntDesign name="checkcircle" size={14} color="#0E8204" />

    <Text style={{fontSize:14, marginLeft:5, color:'#0E8204', fontWeight:'500'}}>{i18n.t('verifidenumber1')}</Text>
  </View> :<TouchableOpacity style={{flexDirection:'row', alignItems:'center', justifyContent:'center', backgroundColor:'#FDE1BF', padding:5, borderRadius:5, marginTop:7}}>
  <AntDesign name="exclamationcircle" size={15} color="#BE6906" />

    <Text style={{fontSize:15, marginLeft:5, color:'#BE6906', fontWeight:'500'}}>{i18n.t('notverifidenumber1')}</Text>
  </TouchableOpacity> }



  </View>
  <View style={{backgroundColor:'#E4E4E4', width: "100%", height:isDarkMode === true ? 0.5 : 1}}></View>
  <View style={{flexDirection:'row', marginTop: 10, marginLeft:15,marginRight: 15}}>
    <Text style={{marginRight:10, fontWeight:'bold', color: theme.color}}>{i18n.t('iin')}:</Text>
    <Text style={{color: theme.color}}>{userp.iin}</Text>
  </View>
  <View style={{flexDirection:'row', marginTop: 10, marginLeft:15,marginRight: 15}}>
    <Text style={{marginRight:10, fontWeight:'bold', color: theme.color}}>{i18n.t('telephoneNumber')}:</Text>
    <Text style={{color: theme.color}}>{userp.tel}</Text>
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
                            borderWidth:isDarkMode === true ? 0.5 : 1, 
                            borderTopWidth:0,
                            borderColor:'#E4E4E4',
                            backgroundColor: theme.background,
                            height: 40, 
                            borderBottomLeftRadius: 15,
                            borderBottomRightRadius: 15, 
                            // marginTop: 200, 
                            alignItems:'center', 
                            justifyContent: 'center', 
                            marginTop:0
                            }}>
                    <View style={{width: windowWidth - 80,  flexDirection:'row', alignItems:'center',justifyContent:'center'}}>
                    <MaterialIcons name="delete" size={20} color={theme.red} />
                    <Text style={{fontSize: 16, fontWeight: '500', color:theme.red, marginLeft: 10}}>{i18n.t('deleteAccount')}</Text>
                    </View>
                </TouchableOpacity>
</View> */}

      <View
        style={{
          alignItems: "center",
          backgroundColor: "white",
          width: "100%",
          paddingVertical: 20,
          paddingHorizontal: 10,
          borderRadius: 15,
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <View style={{ alignItems: "center", width: "100%" }}>
          {image ? (
            <>
              <Image
                source={{ uri: `data:image/jpeg;base64,${image}` }}
                style={{
                  width: 130,
                  height: 130,
                  borderRadius: 100,
                  transform: [{ scaleX: Platform.OS === "android" ? 1 : -1 }],
                }}
              />
              <TouchableOpacity
                onPress={() => uploadImage()}
                style={{
                  backgroundColor: "#ECECEC",
                  borderRadius: 10,
                  padding: 10,
                  paddingHorizontal: 15,
                  marginTop: 10,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <MaterialCommunityIcons
                  name="square-edit-outline"
                  size={18}
                  color="#4d4d4d"
                />
                <Text
                  style={{ color: "#4d4d4d", fontWeight: "700", marginLeft: 5 }}
                >
                  Изменить фото
                </Text>
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity
              style={{
                backgroundColor: "#ECECEC",
                width: 130,
                height: 130,
                borderRadius: 100,
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={() => uploadImage()}
            >
              <MaterialIcons name="add-a-photo" size={40} color="grey" />
            </TouchableOpacity>
          )}
        </View>
        <View style={{ alignItems: "center", width: "90%", marginTop: 10 }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "700",
              color: theme.color,
              marginBottom: 10,
              textAlign: "center",
            }}
          >
            {userp.fio}
          </Text>

          <View
            style={{
              width: "100%",
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 10,
            }}
          >
            <View style={{ width: "48%", alignItems: "center" }}>
              <Text
                style={{
                  fontWeight: "300",
                  color: theme.color,
                  fontSize: 10,
                  marginBottom: 3,
                }}
              >
                {i18n.t("iin")}:
              </Text>
              <Text style={{ color: theme.color }}>{userp.iin}</Text>
            </View>

            <View style={{ width: "48%", alignItems: "center" }}>
              <Text
                style={{
                  fontWeight: "300",
                  color: theme.color,
                  fontSize: 10,
                  marginBottom: 3,
                }}
              >
                {i18n.t("telephoneNumber")}:
              </Text>
              <Text style={{ color: theme.color }}>{userp.tel}</Text>
            </View>
          </View>
        </View>
      </View>

      <></>

      <View style={{ alignItems: "center", width: "100%", marginTop: 20 }}>
        <TouchableOpacity
          style={{
            width: "100%",
            height: 50,
            backgroundColor: "white",
            alignItems: "center",
            paddingHorizontal: 30,
            flexDirection: "row",
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
            justifyContent: "space-between",
            borderBottomColor: "#E2E2E2",
            borderBottomWidth: 0.5,
          }}
          onPress={() => {
            navigation.navigate("PaperScreen");
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <MaterialIcons
              name="payments"
              size={20}
              color={theme.activeColor}
            />
            <Text
              style={{
                color: "#4d4d4d",
                fontSize: 16,
                fontWeight: "500",
                marginLeft: 10,
              }}
            >
              {i18n.t("raschet")}
            </Text>
          </View>
          <MaterialIcons
            name="arrow-forward-ios"
            size={18}
            color={theme.color}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: "100%",
            height: 50,
            backgroundColor: "white",
            alignItems: "center",
            paddingHorizontal: 30,
            flexDirection: "row",
            justifyContent: "space-between",
            borderBottomColor: "#E2E2E2",
            borderBottomWidth: 0.5,
          }}
          onPress={() => {
            navigation.navigate("SpecformScreen");
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <FontAwesome5 name="tshirt" size={16} color={theme.activeColor} />
            <Text
              style={{
                color: "#4d4d4d",
                fontSize: 16,
                fontWeight: "500",
                marginLeft: 10,
              }}
            >
              {i18n.t("clothes")}
            </Text>
          </View>
          <MaterialIcons
            name="arrow-forward-ios"
            size={18}
            color={theme.color}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: "100%",
            height: 50,
            backgroundColor: "white",
            alignItems: "center",
            paddingHorizontal: 30,
            flexDirection: "row",
            borderBottomLeftRadius: 15,
            borderBottomRightRadius: 15,
            justifyContent: "space-between",
          }}
          onPress={() => {
            navigation.navigate("VacationScreen");
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <FontAwesome name="plane" size={20} color={theme.activeColor} />
            <Text
              style={{
                color: "#4d4d4d",
                fontSize: 16,
                fontWeight: "500",
                marginLeft: 10,
              }}
            >
              {i18n.t("vacation")}
            </Text>
          </View>
          <MaterialIcons
            name="arrow-forward-ios"
            size={18}
            color={theme.color}
          />
        </TouchableOpacity>
      </View>

      {sot === "Yes" ? (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("UserPassChange");
          }}
          style={{
            width: "100%",

            backgroundColor: isDarkMode === true ? "#C0D5EE" : "white",
            height: 42,
            borderRadius: 10,
            marginTop: 20,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              width: windowWidth - 80,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <FontAwesome5 name="user-cog" size={18} color={theme.activeColor} />
            <Text
              style={{
                fontSize: 16,
                fontWeight: "500",
                color: theme.color,
                marginLeft: 10,
              }}
            >
              Изменить пароль пользователя
            </Text>
          </View>
        </TouchableOpacity>
      ) : (
        <></>
      )}

      {/* 
<View style={{alignItems:'center', marginBottom:80}}>
<View style={{marginTop: 20, alignItems:'center',  borderRadius:15, borderColor:'#E4E4E4', borderWidth: isDarkMode === true ? 0.5 : 1,backgroundColor:'white', width:"100%"}}>
<View style={{width: windowWidth - 30, marginBottom: 2}}>
                <List.Item
                    title = {i18n.t('raschet')}
                    titleStyle={{color: theme.color}}
                    style = {styles.icon}
                    rippleColor='transparent'
                    onPress = {() => {navigation.navigate('PaperScreen')}}
                    right = {() => <MaterialIcons name="arrow-forward-ios" size={18} color={theme.color} />}
                    left = {() => <MaterialIcons name="payments" style={{marginLeft:20, marginRight:-5}} size={20} color={theme.color} />}
                />
</View>

<View style={{width: windowWidth - 60, backgroundColor: '#E4E4E4', height: isDarkMode === true ? 0.5 : 1, marginBottom: 2}}/>

<View style={{width: windowWidth - 30, marginBottom: 2}}>
                <List.Item
                    title = {i18n.t('docLoad')}
                    titleStyle={{color: theme.color}}
                    style = {styles.icon}
                    rippleColor='transparent'
                    onPress = {() => {navigation.navigate('DocumentListScreen')}}
                    right = {() => <MaterialIcons name="arrow-forward-ios" size={18} color={theme.color} />}
                    left = {() => <Ionicons name="documents-sharp" style={{marginLeft:20, marginRight:-5}} size={20} color={theme.color} />}
                />
</View>

<View style={{width: windowWidth - 60, backgroundColor: '#E4E4E4', height:isDarkMode === true ? 0.5 : 1, marginBottom: 2}}/>

<View style={{width: windowWidth - 30, marginBottom: 2}}>
                <List.Item
                    title = {i18n.t('vacation')}
                    titleStyle={{color: theme.color}}
                    style = {styles.icon}
                    rippleColor='transparent'
                    onPress = {() => {navigation.navigate('VacationScreen')}}
                    right = {() => <MaterialIcons name="arrow-forward-ios" size={18} color={theme.color} />}
                    left = {() => <FontAwesome name="plane" style={{marginLeft:20, marginRight:-4}} size={20} color={theme.color} />}            
                />
</View>

<View style={{width: windowWidth - 60, backgroundColor: '#E4E4E4', height:isDarkMode === true ? 0.5 : 1, marginBottom: 2}}/>

<View style={{width: windowWidth - 30, marginBottom: 2}}>
                <List.Item
                    title = {i18n.t('clothes')}
                    titleStyle={{color: theme.color}}
                    style = {styles.icon}
                    rippleColor='transparent'
                    onPress = {() => {navigation.navigate('SpecformScreen')}}
                    right = {() => <MaterialIcons name="arrow-forward-ios" size={18} color={theme.color} />}
                    left = {() => <FontAwesome5 name="tshirt" style={{marginLeft:20, marginRight: -7}} size={16} color={theme.color} />}
                />
</View>

<View style={{width: windowWidth - 60, backgroundColor: '#E4E4E4', height:isDarkMode === true ? 0.5 : 1, marginBottom: 2}}/>

<View style={{width: windowWidth - 30, marginBottom: 2}}>
                <List.Item
                    title = 'ОНГДУ'
                    titleStyle={{color: theme.color}}
                    style = {styles.icon}
                    rippleColor='transparent'
                    onPress = {() => {navigation.navigate('OngduList')}}
                    right = {() => <MaterialIcons name="arrow-forward-ios" size={18} color={theme.color} />}
                    // right = {() => <Entypo name="creative-commons-share" size={18} color={theme.color} />}
                    left = {() => <AntDesign name="star" style={{marginLeft:20, marginRight: -7}} size={18} color={theme.color} />}
                />
</View>





      <Button mode="contained" 
        onPress = {()=> logout()}
        style={{width: 270}}
      >Выйти</Button>

      <TouchableOpacity>
        <Text style={{fontSize: 20, color: '#D64D43', top: 100}}>Выйти</Text>
      </TouchableOpacity>


            
</View>
   { sot === 'Yes' ?   <TouchableOpacity 
       
                    onPress = {() => {navigation.navigate('UserPassChange')}}
                    style={{width: windowWidth - 40, 
           
                            backgroundColor: isDarkMode === true ? "#C0D5EE" : "#D64D43",
                            height: 42, 
                            borderRadius: 10,  
                            alignItems:'center', 
                            justifyContent: 'center', 
                            marginTop:10
                            }}>
                    <View style={{width: windowWidth - 80,  flexDirection:'row', alignItems:'center'}}>
                    <FontAwesome5 name="user-cog" size={18} color= {theme.background}   />
                    <Text style={{fontSize: 16, fontWeight: '500', color:theme.background, marginLeft: 10}}>Изменить пароль пользователя</Text>
                    </View>
                </TouchableOpacity> : <></>}





</View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    color: "#4D4D4D",
    fontWeight: "bold",
    paddingVertical: 12,
    // marginTop: 50,
    // width: windowWidth
  },
  btn: {
    // color: "#4D4D4D",
    // width: windowWidth
  },
  container: { width: windowWidth, height: windowHeight, alignItems: "center" },
  head: { height: 40, backgroundColor: "white" },
  wrapper: { flexDirection: "row" },
  title: { flex: 1, backgroundColor: "white" },
  row: { height: 28 },
  text: { textAlign: "left" },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    backgroundColor: "#007aff",
    padding: 10,
    borderRadius: 5,
  },
  bottomNavigationView: {
    width: "100%",
    height: 450,
    padding: 25,
    paddingRight: 25,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 0,
  },
  modalView: {
    margin: 20,
    borderRadius: 20,
    width: windowWidth - 50,
    height: 150,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 9,
    elevation: 4,
  },
  modalView1: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    width: windowWidth - 50,
    height: 250,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 9,
    elevation: 4,
  },
  button: {
    borderRadius: 8,
    marginLeft: 15,
    marginRight: 15,
    padding: 10,
    elevation: 2,
    borderWidth: 2,
    borderColor: "#D64D43",
    // backgroundColor:'white'
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },
  modalText: {
    marginBottom: 25,
    textAlign: "center",
    fontSize: 18,
  },
});
