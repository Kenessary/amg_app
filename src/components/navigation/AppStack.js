import React, { useContext, useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Button, LogBox, TouchableOpacity, View } from "react-native";
import { WaveIndicator } from "react-native-indicators";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import qs from "qs";

import {
  HomeScreen,
  InfoguideScreen,
  InfoDepartment,
  BirthdayScreen,
  EventScreen,
  EventPdfScreen,
  FoodMenuScreen,
  NewsScreen,
  PaperScreen,
  DocumentListScreen,
  SettingScreen,
  ProfileScreen,
  VacationScreen,
  SpecformScreen,
  DocumentScreen,
  TestScreen,
  BiometricScreen,
  RepBiometricScreen,
  PinlockScreen,
  SingleNewsScreen,
  ChangeLanguage,
  ChangePassword,
  ContactsScreen,
  AdminPO,
  Infodep,
  FoodMenuPanel,
  FoodAdd,
  MenuHistory,
  MenuStatistics,
  OpenQr,
  Camera,
  CameraPhone,
  PushSendScreen,
  ChangePhone,
  NotificationHistory,
  ChangeLang,
  LoginVerify,
  DocumentPdfScreen,
  Ongdu,
} from "../../screens";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../../context/AuthContext";
import { useTranslation } from "react-i18next";
import i18n from "i18n-js";
import { kz, ru, ch } from "../../languages/localizations";
import { MaterialIcons } from "@expo/vector-icons";
import UserPassChange from "../../screens/Profile/UserPassChange";
import { G } from "react-native-svg";
import themeContext from "../../cores/themeContext";
import VerifyForPassword from "../../screens/Profile/VerifyForPassword";
import RestorePassword from "../../screens/Auth/RestorePassword";
import VerifyForPhone from "../../screens/Profile/VerifyForPhone";
import HomeScreenSecond from "../../screens/Home/HomeScreenSecond";
import { Department } from "../../screens/Home/InfoguideScreen/components/Department";
import OngduList from "../../screens/Home/OngduList";
import DocumentsMenu from "../../screens/Home/DocumentsMenu";
import Inventarization from "../../screens/Document/Inventarization";
import InventSend from "../../screens/Document/InventSend";
import InventarizationList from "../../screens/Document/InventarizationList";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function AppStack() {
  const theme = useContext(themeContext);
  const navigation = useNavigation();

  // const {t} = useTranslation();
  const { iin, openedLength } = useContext(AuthContext);
  const [firstPassword, setFirstPassword] = useState("");
  const [secondPassword, setSecondPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // console.log(secondPassword)
  let [locale, setLocale] = useState("");
  let [lang, setLang] = useState("");

  // console.log()

  i18n.fallbacks = true;
  i18n.translations = { kz, ru, ch };
  i18n.locale = lang;
  i18n.defaultLocale = "kz";

  const theme1 = useContext(themeContext);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Load the user's preference from AsyncStorage
    loadDarkModePreference();
  });

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

  // console.log(openedLength)
  let previousArray = [];

  // console.log(openedLength === '')

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

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    try {
      AsyncStorage.getItem("secondPass").then((value) => {
        if (value != null) {
          setSecondPassword(value);
        }
      });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: theme.background,
        }}
      >
        <WaveIndicator color="#D64D43" />
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {secondPassword !== "" ? (
        <Stack.Screen
          name="PinlockScreen"
          component={PinlockScreen}
          options={{ animation: "fade", animationDuration: 400 }}
        />
      ) : (
        <Stack.Screen
          name="BiometricScreen"
          component={BiometricScreen}
          options={{ animation: "fade", animationDuration: 400 }}
        />
      )}
      <Stack.Screen
        name="HomeScreen"
        component={BottommNavigation}
        options={{ gestureEnabled: false }}
      ></Stack.Screen>
      <Stack.Screen name="OpenQr" component={BottommNavigation}></Stack.Screen>
      <Stack.Screen
        name="DocumentScreen"
        component={DocumentScreen}
      ></Stack.Screen>
      <Stack.Screen
        name="Inventarization"
        component={Inventarization}
      ></Stack.Screen>
      <Stack.Screen
        name="InventarizationList"
        component={InventarizationList}
        options={{
          headerShown: true,
          headerTitle: "Список инвентаризации",
          headerTitleStyle: {
            fontSize: 18,
            color: theme.color,
          },
          headerTitleAlign: "center",
          //   headerBackTitleVisible: false,
          headerBackTitle: "Назад",
          headerTintColor: theme.color,
          headerStyle: { backgroundColor: theme.bottomNavigationColor },
        }}
      ></Stack.Screen>

      {/* <Stack.Screen name="InfoguideScreen" component={InfoguideScreen}></Stack.Screen> */}
      <Stack.Screen
        name="InfoguideScreen"
        component={InfoguideScreen}
        options={{
          headerShown: false,
          headerTitle: i18n.t("infoguide"),
          headerTitleStyle: {
            fontSize: 18,
            color: theme.color,
          },
          headerTitleAlign: "center",
          //   headerBackTitleVisible: false,
          headerBackTitle: "Назад",
          headerTintColor: theme.color,
          headerStyle: { backgroundColor: theme.bottomNavigationColor },
        }}
      ></Stack.Screen>

      <Stack.Screen
        name="InfoDepartment"
        component={InfoDepartment}
        options={{
          headerShown: true,
          headerTitle: i18n.t("infoguide"),
          headerTitleStyle: {
            fontSize: 18,
            color: theme.color,
          },
          headerTitleAlign: "center",
          //   headerBackTitleVisible: false,
          headerBackTitle: "Назад",
          headerTintColor: theme.color,
          headerStyle: { backgroundColor: theme.bottomNavigationColor },
          // animation:'slide_from_bottom',
        }}
      ></Stack.Screen>

      {/* <Stack.Screen name="EventsScreen" component={EventScreen}></Stack.Screen> */}
      <Stack.Screen
        name="EventsScreen"
        component={EventScreen}
        options={{
          headerShown: true,
          headerTitle: i18n.t("events"),
          headerTitleStyle: {
            fontSize: 18,
            color: theme.color,
          },
          headerTitleAlign: "center",
          //   headerBackTitleVisible: false,
          headerBackTitle: "Назад",
          headerTintColor: theme.color,
          headerStyle: { backgroundColor: theme.bottomNavigationColor },
        }}
      ></Stack.Screen>

      <Stack.Screen
        name="Infodep"
        component={Infodep}
        options={{
          headerShown: true,
          headerTitle: "Экран для теста",
          headerTitleStyle: {
            fontSize: 18,
            color: theme.color,
          },
          headerTitleAlign: "center",
          headerBackTitle: "Назад",
          //   headerBackTitleVisible: false,
          headerTintColor: theme.color,
          headerStyle: { backgroundColor: theme.bottomNavigationColor },
        }}
      ></Stack.Screen>
      <Stack.Screen
        name="EventPdfScreen"
        component={EventPdfScreen}
        options={{
          headerShown: true,
          headerTitle: i18n.t("events"),
          headerTitleStyle: {
            fontSize: 18,
            color: theme.color,
          },
          headerTitleAlign: "center",
          //   headerBackTitleVisible: false,
          headerTintColor: theme.color,
          headerBackTitle: "Назад",
          headerStyle: { backgroundColor: theme.bottomNavigationColor },
        }}
      ></Stack.Screen>

      <Stack.Screen
        name="DocumentPdfScreen"
        component={DocumentPdfScreen}
        options={{
          headerShown: true,
          headerTitle: "Документ",
          headerTitleStyle: {
            fontSize: 18,
            color: theme.color,
          },
          headerTitleAlign: "center",
          headerBackTitle: "Назад",
          //   headerBackTitleVisible: false,
          headerTintColor: theme.color,
          headerStyle: { backgroundColor: theme.bottomNavigationColor },
        }}
      ></Stack.Screen>
      {/* <Stack.Screen name="BirthdayScreen" component={BirthdayScreen}></Stack.Screen> */}
      <Stack.Screen
        name="BirthdayScreen"
        component={BirthdayScreen}
        options={{
          headerShown: true,
          headerTitle: i18n.t("birthdays"),
          headerTitleStyle: {
            fontSize: 18,
            color: theme.color,
          },
          headerTitleAlign: "center",
          //   headerBackTitleVisible: false,
          headerBackTitle: "Назад",
          headerTintColor: theme.color,
          headerStyle: { backgroundColor: theme.bottomNavigationColor },
        }}
      ></Stack.Screen>
      <Stack.Screen
        name="DocumentsMenu"
        component={DocumentsMenu}
        options={{
          headerShown: true,
          headerTitle: i18n.t("docLoad"),
          headerTitleStyle: {
            fontSize: 18,
            color: theme.color,
          },
          headerTitleAlign: "center",
          headerBackTitle: "Назад",
          //   headerBackTitleVisible: false,
          headerTintColor: theme.color,
          headerStyle: { backgroundColor: theme.bottomNavigationColor },
        }}
      ></Stack.Screen>

      {/* <Stack.Screen name="FoodMenuScreen" component={FoodMenuScreen}></Stack.Screen> */}
      <Stack.Screen
        name="FoodMenuScreen"
        component={FoodMenuScreen}
        options={{
          headerShown: true,
          headerTitle: i18n.t("foodmenu"),
          headerStyle: {
            backgroundColor: "#D64D43",
          },
          headerTitleStyle: {
            fontSize: 18,
            color: "white",
          },
          headerTitleAlign: "center",
          headerBackTitle: "Назад",
          //   headerBackTitleVisible: false,
          headerTintColor: "white",
          headerStyle: { backgroundColor: theme.menuHeader },
        }}
      ></Stack.Screen>
      {/* <Stack.Screen name="NewsScreen" component={NewsScreen}></Stack.Screen> */}

      <Stack.Screen
        name="NewsScreen"
        component={NewsScreen}
        options={{
          headerShown: true,
          headerTitle: i18n.t("news"),
          headerTitleStyle: {
            fontSize: 18,
            color: theme.color,
          },
          headerTitleAlign: "center",
          //   headerBackTitleVisible: false,
          headerBackTitle: "Назад",
          headerTintColor: theme.color,
          headerStyle: { backgroundColor: theme.bottomNavigationColor },
        }}
      ></Stack.Screen>
      <Stack.Screen
        name="SingleNewsScreen"
        component={SingleNewsScreen}
        options={{
          headerShown: true,
          headerTitle: i18n.t("news"),
          headerTitleStyle: {
            fontSize: 18,
            color: theme.color,
          },
          headerTitleAlign: "center",
          headerBackTitle: "Назад",
          //   headerBackTitleVisible: false,
          headerTintColor: theme.color,
          headerStyle: { backgroundColor: theme.bottomNavigationColor },
        }}
      ></Stack.Screen>

      <Stack.Screen
        name="FoodMenuPanel"
        component={FoodMenuPanel}
        options={{
          headerShown: true,
          headerTitle: "Ввод меню",
          headerTitleStyle: {
            fontSize: 18,
            color: theme.color,
          },
          headerTitleAlign: "center",
          headerBackTitle: "Назад",
          //   headerBackTitleVisible: false,
          headerTintColor: theme.color,
          headerStyle: { backgroundColor: theme.bottomNavigationColor },
          // headerRight: <MaterialIcons name="history" size={24} color="black" />
          headerRight: () => (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TouchableOpacity style={{ marginRight: 20 }}>
                <MaterialIcons
                  name="history"
                  size={24}
                  color={theme1.color}
                  onPress={() => {
                    navigation.navigate("MenuHistory");
                  }}
                />
              </TouchableOpacity>

              <TouchableOpacity>
                <Ionicons
                  name="stats-chart"
                  size={22}
                  color={theme1.color}
                  onPress={() => {
                    navigation.navigate("MenuStatistics");
                  }}
                />
              </TouchableOpacity>
            </View>
          ),
        }}
      ></Stack.Screen>

      <Stack.Screen
        name="MenuHistory"
        component={MenuHistory}
        options={{
          headerShown: true,
          headerTitle: "История меню",
          headerTitleStyle: {
            fontSize: 18,
            color: theme.color,
          },
          headerTitleAlign: "center",
          //   headerBackTitleVisible: false,
          headerTintColor: theme.color,
          headerBackTitle: "Назад",
          headerStyle: { backgroundColor: theme.bottomNavigationColor },
          animation: "fade_from_bottom",
          animationDuration: 400,
        }}
      ></Stack.Screen>

      <Stack.Screen
        name="MenuStatistics"
        component={MenuStatistics}
        options={{
          headerShown: true,
          headerTitle: "Статистика опроса",
          headerTitleStyle: {
            fontSize: 18,
            color: theme.color,
          },
          headerTitleAlign: "center",
          //   headerBackTitleVisible: false,
          headerTintColor: theme.color,
          headerBackTitle: "Назад",
          headerStyle: { backgroundColor: theme.bottomNavigationColor },
          animation: "fade_from_bottom",
          animationDuration: 400,
        }}
      ></Stack.Screen>
      {/*             
            <Stack.Screen name="FoodAdd" component={FoodAdd}
                    options={{
                        headerShown: true, 
                        headerTitle: 'Менюді еңгізу / Ввод меню', 
                        headerTitleStyle:{
                            fontSize:18,
                            color: '#4D4D4D'
                        }, 
                        headerTitleAlign: 'center',
                        headerBackTitleVisible: false,
                        headerTintColor:'#4D4D4D',
                        }}
            ></Stack.Screen> */}

      <Stack.Screen
        name="ProfileScreen"
        component={BottommNavigation}
      ></Stack.Screen>
      <Stack.Screen
        name="PaperScreen"
        component={PaperScreen}
        options={{
          headerShown: true,
          headerTitle: i18n.t("raschet"),
          headerTitleStyle: {
            fontSize: 18,
            color: theme.color,
          },
          headerTitleAlign: "center",
          //   headerBackTitleVisible: false,
          headerTintColor: theme.color,
          headerBackTitle: "Назад",
          headerStyle: { backgroundColor: theme.bottomNavigationColor },
          // headerLeft: {label: 'Выйти'}
        }}
      ></Stack.Screen>
      <Stack.Screen
        name="DocumentListScreen"
        component={DocumentListScreen}
        options={{
          headerShown: true,
          headerTitle: i18n.t("docLoad"),
          headerTitleStyle: {
            fontSize: 18,
            color: theme.color,
          },
          headerTitleAlign: "center",
          //   headerBackTitleVisible: false,
          headerTintColor: theme.color,
          headerBackTitle: "Назад",
          headerStyle: { backgroundColor: theme.bottomNavigationColor },
          // headerLeft: {label: 'Выйти'}
        }}
      ></Stack.Screen>
      <Stack.Screen
        name="SettingScreen"
        component={SettingScreen}
        options={{
          headerShown: true,
          headerTitle: i18n.t("settings"),
          headerTitleStyle: {
            fontSize: 18,
            color: theme.color,
          },
          headerTitleAlign: "center",
          //   headerBackTitleVisible: false,
          headerTintColor: theme.color,
          headerBackTitle: "Назад",
          headerStyle: { backgroundColor: theme.bottomNavigationColor },
          // headerLeft: {label: 'Выйти'}
        }}
      ></Stack.Screen>
      <Stack.Screen
        name="ChangeLanguage"
        component={ChangeLanguage}
        options={{
          headerShown: true,
          headerTitle: i18n.t("changeLanguage"),
          headerTitleStyle: {
            fontSize: 18,
            color: theme.color,
          },
          headerTitleAlign: "center",
          //   headerBackTitleVisible: false,
          headerTintColor: theme.color,
          headerBackTitle: "Назад",
          headerStyle: { backgroundColor: theme.bottomNavigationColor },
        }}
      ></Stack.Screen>
      <Stack.Screen
        name="ChangeLang"
        component={ChangeLang}
        options={{
          headerShown: true,
          headerTitle: i18n.t("changeLanguage"),
          headerTitleStyle: {
            fontSize: 18,
            color: theme.color,
          },
          headerTitleAlign: "center",
          //   headerBackTitleVisible: false,
          headerTintColor: theme.color,
          headerBackTitle: "Назад",
          headerStyle: { backgroundColor: theme.bottomNavigationColor },
        }}
      ></Stack.Screen>
      <Stack.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{
          headerShown: false,
          headerTitle: i18n.t("changeParol"),
          headerTitleStyle: {
            fontSize: 18,
            color: theme.color,
          },
          headerTitleAlign: "center",
          //   headerBackTitleVisible: false,
          headerTintColor: theme.color,

          headerStyle: { backgroundColor: theme.bottomNavigationColor },
        }}
      ></Stack.Screen>
      <Stack.Screen
        name="ContactsScreen"
        component={ContactsScreen}
        options={{
          headerShown: true,
          headerTitle: i18n.t("contacts"),
          headerTitleStyle: {
            fontSize: 18,
            color: theme.color,
          },
          headerTitleAlign: "center",
          headerBackTitle: "Назад",
          //   headerBackTitleVisible: false,
          headerTintColor: theme.color,
          headerStyle: { backgroundColor: theme.bottomNavigationColor },
        }}
      ></Stack.Screen>

      <Stack.Screen
        name="AdminPO"
        component={AdminPO}
        options={{
          headerShown: true,
          headerTitle: i18n.t("adminpo"),
          headerTitleStyle: {
            fontSize: 18,
            color: theme.color,
          },
          headerTitleAlign: "center",
          headerBackTitle: "Назад",
          //   headerBackTitleVisible: false,
          headerTintColor: theme.color,
          headerStyle: { backgroundColor: theme.bottomNavigationColor },
        }}
      ></Stack.Screen>

      <Stack.Screen
        name="VacationScreen"
        component={VacationScreen}
        options={{
          headerShown: true,
          headerTitle: i18n.t("vacation"),
          headerTitleStyle: {
            fontSize: 18,
            color: theme.color,
          },
          headerTitleAlign: "center",
          // headerBackTitleVisible: false,
          headerBackTitle: "Назад",
          headerTintColor: theme.color,
          headerStyle: { backgroundColor: theme.bottomNavigationColor },
        }}
      ></Stack.Screen>

      <Stack.Screen
        name="SpecformScreen"
        component={SpecformScreen}
        options={{
          headerShown: true,
          headerTitle: i18n.t("clothes"),
          headerTitleStyle: {
            fontSize: 18,
            color: theme.color,
          },
          headerTitleAlign: "center",
          // headerBackTitleVisible: false,
          headerBackTitle: "Назад",
          headerTintColor: theme.color,
          headerStyle: { backgroundColor: theme.bottomNavigationColor },
        }}
      ></Stack.Screen>
      <Stack.Screen
        name="CameraPhone"
        component={CameraPhone}
        options={{
          headerShown: false,
          headerTitle: "CameraPhone",
          headerTitleStyle: {
            fontSize: 18,
            color: "#4D4D4D",
          },
          headerTitleAlign: "center",
          //   headerBackTitleVisible: false,
          headerTintColor: "#4D4D4D",
        }}
      ></Stack.Screen>

      <Stack.Screen
        name="UserPassChange"
        component={UserPassChange}
        options={{
          headerShown: true,
          headerTitle: `Изменить пароль`,
          headerTitleStyle: {
            fontSize: 18,
            color: theme.color,
          },
          headerTitleAlign: "center",
          //   headerBackTitleVisible: false,
          headerBackTitle: "Назад",
          headerTintColor: theme.color,
          headerStyle: { backgroundColor: theme.bottomNavigationColor },
        }}
      ></Stack.Screen>

      <Stack.Screen
        name="PushSendScreen"
        component={PushSendScreen}
        options={{
          headerShown: true,
          headerTitle: `Отправить уведомления`,
          headerTitleStyle: {
            fontSize: 18,
            color: theme.color,
          },
          headerTitleAlign: "center",
          headerBackTitle: "Назад",
          //   headerBackTitleVisible: false,
          headerTintColor: theme.color,
          headerStyle: { backgroundColor: theme.bottomNavigationColor },
        }}
      ></Stack.Screen>

      <Stack.Screen
        name="ChangePhone"
        component={ChangePhone}
        options={{
          headerShown: false,
          headerTitle: i18n.t("changePhone"),
          headerTitleStyle: {
            fontSize: 18,
            color: "#4D4D4D",
          },
          headerTitleAlign: "center",
          headerBackTitleVisible: false,
          headerTintColor: "#4D4D4D",
          headerStyle: { backgroundColor: theme.bottomNavigationColor },
        }}
      ></Stack.Screen>

      <Stack.Screen
        name="VerifyForPassword"
        component={VerifyForPassword}
        options={{
          headerShown: false,
          headerTitle: `Верификация`,
          headerTitleStyle: {
            fontSize: 18,
            color: theme.color,
          },
          headerTitleAlign: "center",
          //   headerBackTitleVisible: false,
          headerTintColor: theme.color,
          headerStyle: { backgroundColor: theme.bottomNavigationColor },
        }}
      ></Stack.Screen>

      <Stack.Screen
        name="VerifyForPhone"
        component={VerifyForPhone}
        options={{
          headerShown: false,
          headerTitle: `Верификация`,
          headerTitleStyle: {
            fontSize: 18,
            color: theme.color,
          },
          headerTitleAlign: "center",
          //   headerBackTitleVisible: false,
          headerTintColor: theme.color,
          headerStyle: { backgroundColor: theme.bottomNavigationColor },
        }}
      ></Stack.Screen>

      <Stack.Screen
        name="LoginVerify"
        component={LoginVerify}
        options={{
          headerShown: false,
          headerTitle: `Верификация`,
          headerTitleStyle: {
            fontSize: 18,
            color: theme.color,
          },
          headerTitleAlign: "center",
          //   headerBackTitleVisible: false,
          headerTintColor: theme.color,
          headerStyle: { backgroundColor: theme.bottomNavigationColor },
        }}
      ></Stack.Screen>

      <Stack.Screen
        name="Ongdu"
        component={Ongdu}
        options={{
          headerShown: false,
          headerTitle: "ОНГДУ",
          headerTitleStyle: {
            fontSize: 18,
            color: theme.color,
          },
          headerTitleAlign: "center",
          headerBackTitleVisible: false,
          headerTintColor: theme.color,
          headerStyle: { backgroundColor: theme.bottomNavigationColor },
        }}
      ></Stack.Screen>

      <Stack.Screen
        name="OngduList"
        component={OngduList}
        options={{
          headerShown: true,
          headerTitle: "ОНГДУ список",
          headerTitleStyle: {
            fontSize: 18,
            color: theme.color,
          },
          headerTitleAlign: "center",
          headerBackTitleVisible: false,
          headerTintColor: theme.color,
          headerStyle: { backgroundColor: theme.bottomNavigationColor },
        }}
      ></Stack.Screen>

      {/* <Stack.Screen name="SpecformScreen" component={SpecformScreen}></Stack.Screen> */}
    </Stack.Navigator>
  );

  function BottommNavigation() {
    return (
      <Tab.Navigator
        activeColor="#D64D43"
        labelStyle={{ fontSize: 12 }}
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: theme.activeColor,
          tabBarStyle: {
            backgroundColor: theme.bottomNavigationColor,
            borderTopColor: theme.borderColor1,
          },
        }}
      >
        <Tab.Screen
          name="Основное"
          component={HomeScreen}
          options={{
            gestureEnabled: false,
            tabBarLabel: i18n.t("home"),

            tabBarLabelStyle: { fontSize: 12, fontWeight: "500" },
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="home" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="QR"
          component={OpenQr}
          options={{
            tabBarLabel: i18n.t("documentqr"),
            tabBarLabelStyle: { fontSize: 12, fontWeight: "500" },
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="qrcode-scan"
                color={color}
                size={23}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Notifications"
          component={NotificationHistory}
          options={{
            tabBarLabel: i18n.t("notification"),
            tabBarLabelStyle: { fontSize: 12, fontWeight: "500" },
            tabBarBadge: `${openedLength}`,
            tabBarBadgeStyle: {
              fontSize: 11,
              backgroundColor: "#FF7F7F",
              color: "white",
              display:
                openedLength === 0 || openedLength === "" ? "none" : "flex",
            },
            tabBarIcon: ({ color }) => (
              // <MaterialCommunityIcons name="qrcode-scan" color={color} size={23} />
              <Ionicons name="notifications" size={24} color={color} />
            ),
          }}
        />

        <Tab.Screen
          name="Личный кабинет"
          component={ProfileScreen}
          options={{
            tabBarLabel: i18n.t("profile"),
            tabBarLabelStyle: { fontSize: 12, fontWeight: "500" },
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="account" color={color} size={26} />
            ),
            tabBarColor: false,
          }}
        />
      </Tab.Navigator>
    );
  }
}
