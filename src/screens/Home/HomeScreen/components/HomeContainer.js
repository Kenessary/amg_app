import {
  Text,
  View,
  TouchableOpacity,
  Pressable,
  Linking,
  Image,
  StyleSheet,
  Dimensions,
  Platform,
} from "react-native";
import { InterfaceList } from "./InterfaceList/";
import { InterfaceGrid } from "./InterfaceGrid/";
import { Search } from "./Search";
import { BottomSheet } from "react-native-btr";
import { useContext, useEffect, useState } from "react";
import {
  Entypo,
  Feather,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { multiLanguage } from "../../../language";
import { loadDarkMode } from "../../../loadDarkMode";
import themeContext from "../../../../cores/themeContext";
import i18n from "i18n-js";
import { ru, ch, kz } from "../../../../languages/localizations";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { WaveIndicator } from "react-native-indicators";
// import { getInterface } from "../responses/HomeApi";

const windowWidth = Dimensions.get("window").width;
export function HomeContainer({
  version,
  interfacesSwitch,
  setInterfacesSwitch,
}) {
  const theme = useContext(themeContext);
  let [isDarkMode, setIsDarkMode] = useState(false);
  let [isLoading, setIsLoading] = useState(false);
  let [locale, setLocale] = useState("");
  let [lang, setLang] = useState("");
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  let [interfaces, setInterfaces] = useState("false");
  i18n.fallbacks = true;
  i18n.translations = { kz, ru, ch };
  i18n.locale = lang;
  i18n.defaultLocale = "kz";

  multiLanguage(locale, setLang);

  useEffect(() => {
    loadDarkMode(setIsDarkMode);
  }, []);

  // useEffect(() => {
  //   loadChosenInterface();
  // }, []);

  const saveChosenInterface = async (interfaceName) => {
    try {
      await AsyncStorage.setItem("chosenInterface", interfaceName);
    } catch (error) {
      console.error("Error saving chosen interface:", error);
    }
  };

  const selectInterface = (interfaceName) => {
    setInterfacesSwitch(interfaceName);
    saveChosenInterface(interfaceName);
  };

  const toggleBottomNavigationView = () => {
    setVisible(!visible);
  };

  const toggleBottomNavigationView2 = () => {
    //Toggling the visibility state of the bottom sheet
    setVisible2(!visible2);
  };

  // if(isLoading) {
  //   return(
  //     <View style={{flex: 1, justifyContent:'center', alignItems: 'center', backgroundColor: isDarkMode === true ? '#262C38':''}}>
  //     <WaveIndicator color={theme.loading}/>
  //   </View>
  //   )
  // }

  return (
    <View>
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
            { backgroundColor: theme.background, zIndex: 30 },
          ]}
        >
          <View style={{}}>
            <View style={{ alignItems: "center" }}>
              <Text
                style={{
                  marginTop: 5,
                  fontSize: 22,
                  fontWeight: "700",
                  // backgroundColor:'red'
                  color: theme.color,
                }}
              >
                AMG-Life
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                marginTop: 15,
              }}
            >
              <TouchableOpacity
                style={{
                  padding: 8,
                  borderWidth: 2,
                  borderRadius: 15,
                  borderColor: "#e4e4e4",
                }}
                onPress={() =>
                  Linking.openURL(`instagram://user?username=cnpc_kazakhstan`)
                }
              >
                <View
                  style={{ flexDirection: "row", justifyContent: "center" }}
                >
                  <Image
                    source={require("../../../../../assets/instagram.png")}
                    style={{ height: 18, width: 18 }}
                  />
                  <Text
                    style={{ marginLeft: 5, fontSize: 14, color: theme.color }}
                  >
                    cnpc_kazakhstan
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  padding: 8,
                  borderWidth: 2,
                  borderRadius: 15,
                  borderColor: "#e4e4e4",
                }}
                onPress={() =>
                  Linking.openURL("vnd.youtube://@cnpc-amg7239/CNPC-AMG/")
                }
              >
                <View
                  style={{ flexDirection: "row", justifyContent: "center" }}
                >
                  <Entypo name="youtube" size={18} color="#FF0000" />
                  <Text
                    style={{ marginLeft: 5, fontSize: 14, color: theme.color }}
                  >
                    CNPC AMG-Life
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                marginTop: 15,
              }}
            >
              <TouchableOpacity
                style={{
                  padding: 8,
                  borderWidth: 2,
                  borderRadius: 15,
                  borderColor: "#e4e4e4",
                }}
                onPress={() =>
                  Linking.openURL("http://facebook.com/cnpc.kazakhstan")
                }
              >
                <View
                  style={{ flexDirection: "row", justifyContent: "center" }}
                >
                  <Image
                    source={require("../../../../../assets/facebook.png")}
                    style={{ height: 18, width: 18 }}
                  />
                  <Text
                    style={{ marginLeft: 5, fontSize: 14, color: theme.color }}
                  >
                    cnpc.kazakhstan
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  padding: 8,
                  borderWidth: 2,
                  borderRadius: 15,
                  borderColor: "#e4e4e4",
                }}
                onPress={() => Linking.openURL("http://www.cnpc-amg.kz/")}
              >
                <View
                  style={{ flexDirection: "row", justifyContent: "center" }}
                >
                  <MaterialCommunityIcons
                    name="web"
                    size={18}
                    color="#3771C8"
                  />
                  <Text
                    style={{ marginLeft: 5, fontSize: 14, color: theme.color }}
                  >
                    cnpc-amg.kz
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={{ alignItems: "center" }}>
              <Text
                style={{
                  marginTop: 25,
                  fontSize: 16,
                  fontWeight: "500",
                  // backgroundColor:'red'
                  color: theme.color,
                }}
              >
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
        <View
          style={[
            styles.bottomNavigationView,
            { backgroundColor: theme.background, zIndex: 30 },
          ]}
        >
          <View style={{}}>
            <View style={{ alignItems: "center" }}>
              <Text
                style={{
                  marginTop: 5,
                  fontSize: 22,
                  fontWeight: "700",
                  // backgroundColor:'red'
                  color: theme.color,
                }}
              >
                Интерфейс
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                marginTop: 30,
                justifyContent: "space-evenly",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  selectInterface("list");
                  setVisible2(false);
                }}
                style={{
                  borderWidth: interfacesSwitch === "list" ? 3 : 1,
                  borderColor:
                    interfacesSwitch === "list"
                      ? isDarkMode
                        ? "#C0D5EE"
                        : "#D5463C"
                      : "#9D9D9D",
                  alignItems: "center",
                  width: 90,
                  height: 90,
                  justifyContent: "center",
                  borderRadius: 15,
                }}
              >
                <Feather
                  name="list"
                  size={40}
                  color={
                    interfacesSwitch === "list"
                      ? isDarkMode
                        ? "#C0D5EE"
                        : "#D5463C"
                      : "#9D9D9D"
                  }
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  selectInterface("grid");
                  setVisible2(false);
                }}
                style={{
                  borderWidth: interfacesSwitch === "grid" ? 3 : 1,
                  borderColor:
                    interfacesSwitch === "grid"
                      ? isDarkMode
                        ? "#C0D5EE"
                        : "#D5463C"
                      : "#9D9D9D",
                  alignItems: "center",
                  width: 90,
                  height: 90,
                  justifyContent: "center",
                  borderRadius: 15,
                }}
              >
                <Ionicons
                  name="grid"
                  size={36}
                  color={
                    interfacesSwitch === "grid"
                      ? isDarkMode
                        ? "#C0D5EE"
                        : "#D5463C"
                      : "#9D9D9D"
                  }
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </BottomSheet>

      <View style={{ alignItems: "center" }}>
        <View style={styles.header}>
          <Text style={[styles.headerTitle, { color: theme.color }]}>
            {i18n.t("main")}
          </Text>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              style={{
                padding: 5,
                paddingLeft: 10,
                paddingRight: 10,
                backgroundColor: theme.background,
                flexDirection: "row",
                alignItems: "center",
                borderRadius: 5,
                borderWidth: isDarkMode ? 1.3 : 0.8,
                borderColor: theme.borderColor,
              }}
              // onPress={() => setModalSocial(true)}
              onPress={toggleBottomNavigationView}
            >
              <Image
                source={require("../../../../../assets/androidpush.png")}
                style={{ width: 20, height: 20, marginRight: 8 }}
              />
              <Text
                style={{ fontSize: 15, fontWeight: "600", color: theme.color }}
              >
                AMG-Life
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                padding: 5,
                paddingLeft: 10,
                paddingRight: 10,
                backgroundColor: theme.background,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 5,
                borderWidth: isDarkMode ? 1.3 : 0.8,
                borderColor: theme.borderColor,
                marginLeft: 10,
              }}
              // onPress={() => setModalSocial(true)}
              onPress={toggleBottomNavigationView2}
            >
              <MaterialIcons
                name="design-services"
                size={20}
                color={theme.color}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <Search />
      {/* <View style={{alignItems:'center', justifyContent:'center'}}>
        <Image style={{width: windowWidth, height:75,borderRadius:20, opacity:0.9}} source={require('../../../../../assets/ny1.png')}/>
        <View style={{...StyleSheet.absoluteFillObject, width: windowWidth-10, height:75, alignItems:'center', justifyContent:'flex-end'}}>
          <Text style={{marginBottom:5, color:'white', fontSize:24, fontWeight:'700'}}>2024 Жаңа жылыңызбен</Text>
        </View>
      </View> */}

      <InterfaceList interfacesSwitch={interfacesSwitch} />
      <InterfaceGrid interfacesSwitch={interfacesSwitch} />

      {/* <Image source={require('../../../../../assets/ny1.png')}/> */}
    </View>
  );
}

const styles = StyleSheet.create({
  bottomNavigationView: {
    width: "100%",
    height: 250,
    padding: 20,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  header: {
    flexDirection: "row",
    marginTop: Platform.OS === "ios" ? 50 : 30,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "space-between",
    width: windowWidth - 40,
  },
});
