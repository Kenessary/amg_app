import {
  androidBackHandler,
  checkUpdate,
  getMenuSurvey,
  infoIin,
  loadChosenInterface,
  menuForSurvey,
  setExpoPushToken,
  setUpdateVersion,
} from "./responses/HomeApi";
import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, Dimensions, Platform } from "react-native";
import { AuthContext } from "../../../context/AuthContext";
import { StatusBar } from "expo-status-bar";
import { WaveIndicator } from "react-native-indicators";
import { loadDarkMode } from "../../loadDarkMode";
import { BirthdayCongratulation } from "./components/BirthdayCongratulation";
import { HomeContainer } from "./components/HomeContainer";
import { ReviewSurvey } from "./components/ReviewSurvey";
import { VersionUpdateModal } from "./components/VersionUpdateModal";
import { MenuSurvey } from "./components/MenuSurvey";
import themeContext from "../../../cores/themeContext";
import UserVerification from "../UserVerification";
import Constants from "expo-constants";

const statusBarHeight =
  Platform.OS === "android"
    ? Constants.statusBarHeight - 10
    : Platform.OS === "ios"
    ? 0 // For iOS status bar
    : 0;

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function HomeScreen() {
  const version = "1.4.0";

  const theme = useContext(themeContext);
  const [isDarkMode, setIsDarkMode] = useState(false);
  loadDarkMode(setIsDarkMode);

  const { iin } = useContext(AuthContext);
  let [isLoadingVer, setIsLoadingVer] = useState(false);
  let [modalUpdate, setModalUpdate] = useState(false);
  let [buttonShow, setButtonShow] = useState(false);
  let [isLoading, setIsLoading] = useState(false);
  let [opros, setOpros] = useState(false);

  let [isForeign, setisForeign] = useState("");
  let [verified, setVerified] = useState("");
  let [respass, setresPass] = useState("");
  let [menu, setMenu] = useState("");
  let [fio, setFio] = useState("");

  let [interfacesSwitch, setInterfacesSwitch] = useState("");

  useEffect(() => {
    setIsLoading(true);
    loadChosenInterface(setInterfacesSwitch);
    infoIin(
      setIsLoadingVer,
      iin,
      setresPass,
      setFio,
      setVerified,
      setisForeign,
      setButtonShow
    );
    getMenuSurvey(iin, setOpros);
    setExpoPushToken(iin, globalThis.asexpo);
    setUpdateVersion(iin, version);
    menuForSurvey(setMenu);
    checkUpdate(version, setModalUpdate);
    androidBackHandler();
    setIsLoading(false);
  }, []);

  // console.log(Constants.statusBarHeight)

  if (menu.length === 0 && interfacesSwitch && isLoadingVer && isLoading) {
    return (
      <View
        style={{
          ...styles.loader,
          backgroundColor: isDarkMode === true ? "#262C38" : "",
        }}
      >
        <WaveIndicator color={theme.loading} />
      </View>
    );
  }

  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: "white",
        paddingTop: statusBarHeight,
      }}
    >
      <StatusBar style={isDarkMode ? "light" : "dark"} />
      <UserVerification
        respass={respass}
        verified={verified}
        setVerClose={infoIin}
        foreign={isForeign}
      />
      <BirthdayCongratulation fio={fio} buttonShow={buttonShow} />
      <HomeContainer
        version={version}
        interfacesSwitch={interfacesSwitch === "" ? "grid" : interfacesSwitch}
        setInterfacesSwitch={setInterfacesSwitch}
      />
      <VersionUpdateModal modalUpdate={modalUpdate} />
      <MenuSurvey menu={menu} iin={iin} opros={opros} setOpros={setOpros} />
      <ReviewSurvey
        setIsLoading={setIsLoading}
        iin={iin}
        isLoading={isLoading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    height: windowHeight,
    flex: 1,
    zIndex: 10,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
