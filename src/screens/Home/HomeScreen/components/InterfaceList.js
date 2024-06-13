import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Platform,
} from "react-native";
import { List } from "react-native-paper";
import FoodAdd from "../../FoodAdd";
import {
  Addcon,
  AddconDark,
  Appdev,
  AppdevDark,
  BirthdayIcon,
  BirthdayIconDark,
  DocumentForReview,
  DocumentForReviewDark,
  EventIcon,
  EventIconDark,
  InfoguideIcon,
  InfoguideIconDark,
  NewsIcon,
  NewsIconDark,
} from "../../../../cores/helpers/icon";
import themeContext from "../../../../cores/themeContext";
import { useNavigation } from "@react-navigation/native";

import i18n from "i18n-js";
import { multiLanguage } from "../../../language";
import { ru, ch, kz } from "../../../../languages/localizations";
import { useContext, useEffect, useState } from "react";
import { loadDarkMode } from "../../../loadDarkMode";
import { docDefaultDate, isApparat, isStolovaya } from "../responses/HomeApi";
import MenuHide from "../../MenuHide";
import { AuthContext } from "../../../../context/AuthContext";
import { Skeleton } from "@rneui/themed";
import { Image } from "expo-image";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export function InterfaceList({ interfacesSwitch }) {
  const { iin } = useContext(AuthContext);
  console.log(iin);

  useEffect(() => {
    loadDarkMode(setIsDarkMode);
    isStolovaya(setStol);
    isApparat(setApparat);
    docDefaultDate(iin, "", "", setIsLoading, setDocsArrayLength);
  }, []);

  const theme = useContext(themeContext);
  let [isDarkMode, setIsDarkMode] = useState(false);
  let [isLoading, setIsLoading] = useState(false);
  let [stol, setStol] = useState("");
  let [apparat, setApparat] = useState("");
  let [locale, setLocale] = useState("");
  let [lang, setLang] = useState("");
  const [docsArrayLength, setDocsArrayLength] = useState(null);
  multiLanguage(locale, setLang);

  i18n.fallbacks = true;
  i18n.translations = { kz, ru, ch };
  i18n.locale = lang;
  i18n.defaultLocale = "kz";

  const navigation = useNavigation();

  const eight = 8;
  // console.log('ssssssss')

  const WaveSkeletonForList = [];
  for (let i = 0; i < eight; i++) {
    WaveSkeletonForList.push(
      <View
        key={i}
        style={[
          styles.listwrapper,
          {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 10,
          },
        ]}
      >
        <Skeleton
          circle
          width={"15%"}
          height={55}
          style={{ marginRight: 10, backgroundColor: "#DADADA" }}
          skeletonStyle={{ backgroundColor: "#EBEAEA" }}
        />
        <Skeleton
          width={"82%"}
          height={50}
          style={{ borderRadius: 20, backgroundColor: "#DADADA" }}
          skeletonStyle={{ backgroundColor: "#EBEAEA" }}
        />
      </View>
    );
  }

  if (
    stol.length === 0 &&
    apparat.length === 0 &&
    isLoading &&
    interfacesSwitch === "list"
  ) {
    return <View style={{ alignItems: "center" }}>{WaveSkeletonForList}</View>;
  }

  return (
    <View
      style={{
        display: interfacesSwitch === "list" ? "flex" : "none",
        alignItems: "center",
      }}
    >
      {/* <View style={{ width: "90%" }}>
        <TouchableOpacity style={styles.btn}>
          <Image
            source={require("../../../../../assets/menuicons/11.png")}
            style={{ width: 34, height: 34, marginRight: 10 }}
          />
          <Text style={{ fontSize: 16, color: "#4d4d4d", fontWeight: "400" }}>
            {i18n.t("infoguide")}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn}>
          <Image
            source={require("../../../../../assets/menuicons/22.png")}
            style={{ width: 34, height: 34, marginRight: 10 }}
          />
          <Text style={{ fontSize: 16, color: "#4d4d4d", fontWeight: "400" }}>
            {i18n.t("docLoad")}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn}>
          <Image
            source={require("../../../../../assets/menuicons/33.png")}
            style={{ width: 34, height: 34, marginRight: 10 }}
          />
          <Text style={{ fontSize: 16, color: "#4d4d4d", fontWeight: "400" }}>
            {i18n.t("events")}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn}>
          <Image
            source={require("../../../../../assets/menuicons/44.png")}
            style={{ width: 34, height: 34, marginRight: 10 }}
          />
          <Text style={{ fontSize: 16, color: "#4d4d4d", fontWeight: "400" }}>
            {i18n.t("birthdays")}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn}>
          <Image
            source={require("../../../../../assets/menuicons/55.png")}
            style={{ width: 34, height: 34, marginRight: 10 }}
          />
          <Text style={{ fontSize: 16, color: "#4d4d4d", fontWeight: "400" }}>
            {" "}
            {i18n.t("foodmenu")}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn}>
          <Image
            source={require("../../../../../assets/menuicons/66.png")}
            style={{ width: 34, height: 34, marginRight: 10 }}
          />
          <Text style={{ fontSize: 16, color: "#4d4d4d", fontWeight: "400" }}>
            {" "}
            {i18n.t("news")}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn}>
          <Image
            source={require("../../../../../assets/menuicons/77.png")}
            style={{ width: 34, height: 34, marginRight: 10 }}
          />
          <Text style={{ fontSize: 16, color: "#4d4d4d", fontWeight: "400" }}>
            {" "}
            {i18n.t("contacts")}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn}>
          <Image
            source={require("../../../../../assets/menuicons/88.png")}
            style={{ width: 34, height: 34, marginRight: 10 }}
          />
          <Text style={{ fontSize: 16, color: "#4d4d4d", fontWeight: "400" }}>
            {" "}
            {i18n.t("adminpo")}
          </Text>
        </TouchableOpacity>
      </View> */}

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ marginBottom: "65%" }}
      >
        {stol === "Yes" ? (
          <FoodAdd onPress={() => navigation.navigate("FoodMenuPanel")} />
        ) : (
          <></>
        )}
        <View style={styles.centered}>
          <View style={styles.listwrapper1}>
            <List.Item
              title={i18n.t("infoguide")}
              style={styles.icon}
              rippleColor="transparent"
              onPress={() => {
                navigation.navigate("InfoguideScreen");
              }}
              left={(color) =>
                isDarkMode === true ? (
                  <InfoguideIconDark fill={color} />
                ) : (
                  <InfoguideIcon fill={color} />
                )
              }
              titleStyle={[styles.listItem, { color: theme.color }]}
            />
          </View>
        </View>

        <View style={styles.centered}>
          <TouchableOpacity style={styles.listwrapper}>
            <List.Item
              title={i18n.t("docLoad")}
              rippleColor="transparent"
              onPress={() => {
                navigation.navigate("DocumentListScreen");
              }}
              left={(color) =>
                isDarkMode === true ? (
                  <DocumentForReviewDark fill={color} />
                ) : (
                  <DocumentForReview fill={color} />
                )
              }
              right={(color) => (
                <View
                  style={{
                    width: 19,
                    height: 19,
                    backgroundColor: "tomato",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 20,
                    display:
                      docsArrayLength === 0 || docsArrayLength === null
                        ? "none"
                        : "flex",
                  }}
                >
                  <Text
                    style={{ fontSize: 11, color: "white", fontWeight: "600" }}
                  >
                    {docsArrayLength}
                  </Text>
                </View>
              )}
              titleStyle={[styles.listItem, { color: theme.color }]}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.centered}>
          <TouchableOpacity style={styles.listwrapper}>
            <List.Item
              title={i18n.t("events")}
              rippleColor="transparent"
              onPress={() => {
                navigation.navigate("EventsScreen");
              }}
              left={(color) =>
                isDarkMode === true ? (
                  <EventIconDark fill={color} />
                ) : (
                  <EventIcon fill={color} />
                )
              }
              titleStyle={[styles.listItem, { color: theme.color }]}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.centered}>
          <View style={styles.listwrapper}>
            <List.Item
              title={i18n.t("birthdays")}
              rippleColor="transparent"
              onPress={() => {
                navigation.navigate("BirthdayScreen");
              }}
              left={(color) =>
                isDarkMode === true ? (
                  <BirthdayIconDark fill={color} />
                ) : (
                  <BirthdayIcon fill={color} />
                )
              }
              titleStyle={[styles.listItem, { color: theme.color }]}
            />
          </View>
        </View>
        {apparat === "Yes" ? (
          <MenuHide onPress={() => navigation.navigate("FoodMenuScreen")} />
        ) : (
          <></>
        )}
        <View style={styles.centered}>
          <View style={styles.listwrapper}>
            <List.Item
              title={i18n.t("news")}
              rippleColor="transparent"
              onPress={() => {
                navigation.navigate("NewsScreen");
              }}
              left={(color) =>
                isDarkMode === true ? (
                  <NewsIconDark fill={color} />
                ) : (
                  <NewsIcon fill={color} />
                )
              }
              titleStyle={[styles.listItem, { color: theme.color }]}
            />
          </View>
          <View style={styles.listwrapper}>
            <List.Item
              title={i18n.t("contacts")}
              rippleColor="transparent"
              onPress={() => {
                navigation.navigate("ContactsScreen");
              }}
              left={(color) =>
                isDarkMode === true ? (
                  <AddconDark fill={color} />
                ) : (
                  <Addcon fill={color} />
                )
              }
              titleStyle={[styles.listItem, { color: theme.color }]}
            />
          </View>
          <View style={styles.listwrapper}>
            <List.Item
              title={i18n.t("adminpo")}
              rippleColor="transparent"
              onPress={() => {
                navigation.navigate("AdminPO");
              }}
              left={(color) =>
                isDarkMode === true ? (
                  <AppdevDark fill={color} />
                ) : (
                  <Appdev fill={color} />
                )
              }
              titleStyle={[styles.listItem, { color: theme.color }]}
            />
          </View>
        </View>
        <View style={{ marginBottom: 60 }}></View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  centered: {
    alignItems: "center",
  },
  listwrapper: {
    marginBottom: 0,
    width: windowWidth - 30,
  },
  listwrapper1: {
    marginBottom: 0,
    width: windowWidth - 30,
  },
  listItem: {
    fontSize: 17,
  },
  btn: {
    width: "100%",
    padding: 10,
    backgroundColor: "white",
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    ...Platform.select({
      ios: {
        shadowColor: "#000000",
        shadowOpacity: 0.02,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
      },
      android: {
        elevation: 5,
      },
    }),
  },
});
