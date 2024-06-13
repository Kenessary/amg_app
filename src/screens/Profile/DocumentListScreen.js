import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { Component, useContext } from "react";
import { Dimensions } from "react-native";
import Header from "../../components/Header";
import { useState } from "react";
import axios from "axios";
import qs from "qs";
import { useEffect } from "react";
import { UIActivityIndicator, WaveIndicator } from "react-native-indicators";
import BackButton from "../../components/BackButton";
import { AuthContext } from "../../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import themeContext from "../../cores/themeContext";
import {
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Skeleton } from "@rneui/themed";
import DropDownPicker from "react-native-dropdown-picker";

import i18n from "i18n-js";
import { kz, ru, ch } from "../../languages/localizations";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const aas = Dimensions.get("screen").height;

export default function DocumentListScreen({ navigation }) {
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
  const { iin } = useContext(AuthContext);
  const [columns, setColumns] = useState([
    {
      id: 1,
      name: "Подготовка и переподготовка кадров AE-000001",
      date: "20.20.2022",
    },
    { id: 2, name: "Документ", date: "20.20.2022" },
    { id: 3, name: "Документ", date: "20.20.2022" },
    { id: 4, name: "Документ", date: "20.20.2022" },
  ]);
  const [doclist, setDoclist] = useState([]);
  let aaa = [];

  for (let i = 0; i < doclist.length; i++) {
    aaa.push(doclist[i].doc);
  }
  // console.log(aaa[0])

  let [lang, setLang] = useState("");

  i18n.fallbacks = true;
  i18n.translations = { kz, ru, ch };
  // i18n.locale = lang

  useEffect(() => {
    getData1();
  });

  if (lang === "ch") {
    i18n.locale = lang;
  }

  if (lang === "kz") {
    i18n.locale = lang;
  }

  if (lang === "ru") {
    i18n.locale = lang;
  }

  // console.log(lang)

  if (isDarkMode === true) {
    DropDownPicker.setTheme("DARK");
  } else {
    DropDownPicker.setTheme("LIGHT");
  }

  const getData12 = () => {
    try {
      // setIsLoading(true)
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

  const [docsArray, setDocsArray] = useState([]);
  const [docGuid, setDocGuid] = useState("");
  globalThis.docGuid = docGuid;
  const [docType, setDocType] = useState("");
  globalThis.docType = docType;
  const [docsArrayFull, setDocsArrayFull] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [switched, setSwitched] = useState(false);
  const [upDown, setUpDown] = useState(false);
  const [openMonth, setOpenMonth] = useState(false);
  const [valueMonth, setValueMonth] = useState(null);

  const [itemsMonth, setItemsMonth] = useState([
    { label: i18n.t("january1"), value: 1 },
    { label: i18n.t("february1"), value: 2 },
    { label: i18n.t("march1"), value: 3 },
    { label: i18n.t("april1"), value: 4 },
    { label: i18n.t("may1"), value: 5 },
    { label: i18n.t("june1"), value: 6 },
    { label: i18n.t("july1"), value: 7 },
    { label: i18n.t("august1"), value: 8 },
    { label: i18n.t("september1"), value: 9 },
    { label: i18n.t("october1"), value: 10 },
    { label: i18n.t("november1"), value: 11 },
    { label: i18n.t("december1"), value: 12 },
  ]);

  const [openYear, setOpenYear] = useState(false);
  const [valueYear, setValueYear] = useState(null);
  const [itemsYear, setItemsYear] = useState([
    { label: "2026", value: 2026 },
    { label: "2025", value: 2025 },
    { label: "2024", value: 2024 },
    { label: "2023", value: 2023 },
    { label: "2022", value: 2022 },
    { label: "2021", value: 2021 },
    { label: "2020", value: 2020 },
    { label: "2019", value: 2019 },
    { label: "2018", value: 2018 },
    { label: "2017", value: 2017 },
    { label: "2016", value: 2016 },
    { label: "2015", value: 2015 },
    { label: "2014", value: 2014 },
    { label: "2013", value: 2013 },
    { label: "2012", value: 2012 },
    { label: "2011", value: 2011 },
  ]);
  const [textMonth, setTextMonth] = useState([]);

  const docDefaultDate = (documentiin, god, mes) => {
    setIsLoading(true);
    const data = qs.stringify({
      // 'documentiin': '831120400361',
      documentiin: documentiin,
      documentname: "exec",
      godedo: god,
      mesedo: mes,
    });
    const config = {
      method: "post",
      url: "http://95.57.218.120/?index",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: data,
    };
    axios(config)
      .then(function (response) {
        const info = response.data.replace(/<[^>]*>/g, "").replace(/-->/g, "");
        const parsed = JSON.parse(info);
        const arrayWithoutParam = Object.values(parsed);
        // console.log(arrayWithoutParam)
        setDocsArray(arrayWithoutParam);
        setIsLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        setIsLoading(false);
      });
  };

  const docDefaultDateFull = (documentiin, god, mes) => {
    setIsLoading(true);
    const data = qs.stringify({
      // 'documentiin': '831120400361',
      documentiin: documentiin,
      documentname: "full",
      godedo: god,
      mesedo: mes,
    });
    const config = {
      method: "post",
      url: "http://95.57.218.120/?index",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: data,
    };
    axios(config)
      .then(function (response) {
        const info = response.data.replace(/<[^>]*>/g, "").replace(/-->/g, "");
        const parsed = JSON.parse(info);
        const arrayWithoutParam = Object.values(parsed);
        setDocsArrayFull(arrayWithoutParam);
        setIsLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        setIsLoading(false);
      });
  };

  const today = new Date();
  const yyyy = today.getFullYear();
  const yearNumber = JSON.parse(yyyy);

  useEffect(() => {
    setValueYear(yearNumber);
    getData12();
    docDefaultDate(iin, "", "");
    docDefaultDateFull(iin, "", "");
  }, []);

  // console.log(valueMonth)

  useEffect(() => {
    getData1();
  }, []);

  // console.log(JSON.parse(asynEvent))

  const getData1 = () => {
    try {
      AsyncStorage.getItem("doclist").then((value) => {
        if (value != null) {
          setAsyncDocList(value);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  // if(isLoading) {
  //   return(
  //       <View style={{flex: 1, justifyContent:'center', alignItems: 'center', backgroundColor:'white'}}>
  //           <WaveIndicator color="#D64D43"/>
  //       </View>
  //   )
  // }

  let docs = [];

  for (let i = 0; i < docsArray.length; i++) {
    docs.push(
      <TouchableOpacity
        key={i}
        style={{
          width: windowWidth - 20,
          backgroundColor: isDarkMode === true ? "#1C3F5C" : "white",
          borderRadius: 10,
          marginBottom: 10,
          paddingTop: 10,
          paddingBottom: 10,
          alignItems: "center",
        }}
        onPress={() => {
          navigation.navigate("DocumentPdfScreen");
          setDocGuid(docsArray[i].guid);
          setDocType(docsArray[i].type);
        }}
      >
        <View style={{ paddingBottom: 20, width: windowWidth - 50 }}>
          <Text style={{ color: theme.color, fontWeight: "500", fontSize: 16 }}>
            {docsArray[i].Name}
          </Text>
        </View>

        <View
          style={{
            width: windowWidth - 50,
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          <View
            style={{
              padding: 4,
              backgroundColor: isDarkMode === true ? theme.loading : "#EBEBEB",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 5,
            }}
          >
            <Text
              style={{
                color: isDarkMode === true ? "#1C3F5C" : "grey",
                fontSize: 12,
                fontWeight: "600",
              }}
            >
              {docsArray[i].Number}
            </Text>
          </View>
          <Text style={{ color: theme.color, fontSize: 12 }}>
            {docsArray[i].DateDoc}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  let docsFull = [];

  for (let i = 0; i < docsArrayFull.length; i++) {
    docsFull.push(
      <TouchableOpacity
        key={i}
        style={{
          width: windowWidth - 20,
          backgroundColor: isDarkMode === true ? "#1C3F5C" : "white",
          borderRadius: 10,
          marginBottom: 10,
          paddingTop: 10,
          paddingBottom: 10,
          alignItems: "center",
        }}
        onPress={() => {
          navigation.navigate("DocumentPdfScreen");
          setDocGuid(docsArrayFull[i].guid);
          setDocType(docsArrayFull[i].type);
        }}
      >
        <View style={{ paddingBottom: 20, width: windowWidth - 50 }}>
          <Text style={{ color: theme.color, fontWeight: "500", fontSize: 16 }}>
            {docsArrayFull[i].Name}
          </Text>
        </View>

        <View
          style={{
            width: windowWidth - 50,
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          <View
            style={{
              padding: 4,
              backgroundColor: isDarkMode === true ? theme.loading : "#EBEBEB",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 5,
            }}
          >
            <Text
              style={{
                color: isDarkMode === true ? "#1C3F5C" : "grey",
                fontSize: 12,
                fontWeight: "600",
              }}
            >
              {docsArrayFull[i].Number}
            </Text>
          </View>
          <Text style={{ color: theme.color, fontSize: 12 }}>
            {docsArrayFull[i].DateDoc}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: isDarkMode === true ? theme.background : "",
      }}
    >
      <View style={{ alignItems: "center" }}>
        <View
          style={{
            width: windowWidth - 20,
            justifyContent: "space-between",
            marginTop: 10,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text
              style={{
                fontSize: 13,
                fontWeight: "500",
                marginRight: 8,
                marginLeft: 3,
                color: theme.color,
              }}
            >
              {valueMonth === null
                ? i18n.t("choosedDate")
                : `${i18n.t("choosed")} ${
                    valueMonth === null
                      ? `${i18n.t("notChoosed")}`
                      : "0" + valueMonth
                  }/${
                    valueYear === null ? `${i18n.t("notChoosed")}` : valueYear
                  }`}
            </Text>
            {valueMonth !== null && valueYear !== null ? (
              <TouchableOpacity
                onPress={() => {
                  setValueMonth(null),
                    setValueYear(yearNumber),
                    setUpDown(false);
                  docDefaultDate(iin, "", "");
                  docDefaultDateFull(iin, "", "");
                }}
                style={{
                  backgroundColor:
                    isDarkMode === true ? theme.loading : "#DF6E67",
                  padding: 3,
                  borderRadius: 3,
                }}
              >
                <Text
                  style={{
                    fontSize: 13,
                    fontWeight: "500",
                    color: theme.background,
                  }}
                >
                  {i18n.t("reset")}
                </Text>
              </TouchableOpacity>
            ) : (
              ""
            )}
          </View>

          <TouchableOpacity
            style={{
              paddingLeft: 10,
              paddingRight: 10,
              paddingTop: 8,
              paddingBottom: 8,
              backgroundColor: isDarkMode === false ? "white" : "#1C3F5C",
              borderRadius: 10,
              flexDirection: "row",
              alignItems: "center",
            }}
            onPress={() => {
              setUpDown(!upDown);
            }}
          >
            <Text style={{ color: theme.color, marginRight: 5 }}>
              {i18n.t("chooseDate")}
            </Text>
            {upDown === false ? (
              <AntDesign name="caretdown" size={11} color={theme.color} />
            ) : (
              <AntDesign name="caretup" size={11} color={theme.color} />
            )}
          </TouchableOpacity>
        </View>

        <View
          style={{
            display: upDown === true ? "flex" : "none",
            flexDirection: "row",
            backgroundColor: isDarkMode === true ? "#1C3F5C" : "white",
            width: windowWidth - 20,
            marginTop: 10,
            padding: 7,
            borderRadius: 10,
            alignItems: "center",
          }}
        >
          <DropDownPicker
            open={openMonth}
            value={valueMonth}
            items={itemsMonth}
            setOpen={setOpenMonth}
            setValue={setValueMonth}
            setItems={setItemsMonth}
            labelStyle={{ color: theme.color }}
            style={{
              width: 120,
              borderWidth: 0.5,
              borderColor: "#4d4d4d",
              backgroundColor: theme.background,
            }}
            containerStyle={{ width: 120, borderRadius: 0, marginRight: 10 }}
            badgeSeparatorStyle={{ borderWidth: 2 }}
            itemSeparator={true}
            itemSeparatorStyle={{
              width: windowWidth,
              marginLeft: 5,
              opacity: 0.1,
            }}
            placeholder={i18n.t("month")}
            searchable={false}
            modalTitle={i18n.t("chooseMonth")}
            modalAnimationType="slide"
            listMode="MODAL"
            modalContentContainerStyle={{
              backgroundColor: theme.background,
            }}
            modalTitleStyle={{
              fontWeight: "bold",
              color: theme.color,
            }}
          />

          <DropDownPicker
            open={openYear}
            value={valueYear}
            items={itemsYear}
            setOpen={setOpenYear}
            setValue={setValueYear}
            setItems={setItemsYear}
            labelStyle={{ color: theme.color }}
            style={{
              width: 120,
              borderWidth: 0.5,
              borderColor: "#4d4d4d",
              backgroundColor: theme.background,
            }}
            containerStyle={{ width: 120, borderRadius: 0 }}
            dropDownContainerStyle={{ width: 120, borderWidth: 0 }}
            badgeSeparatorStyle={{ borderWidth: 2 }}
            itemSeparator={true}
            itemSeparatorStyle={{
              width: windowWidth,
              marginLeft: 5,
              opacity: 0.1,
            }}
            placeholder="Год"
            searchable={false}
            modalTitle={i18n.t("chooseYear")}
            modalAnimationType="slide"
            listMode="MODAL"
            modalContentContainerStyle={{
              backgroundColor: theme.background,
            }}
            modalTitleStyle={{
              fontWeight: "bold",
              color: theme.color,
            }}
          />
          <TouchableOpacity
            style={{ marginLeft: 15 }}
            onPress={() => {
              docDefaultDate(iin, valueYear, valueMonth);
              docDefaultDateFull(iin, valueYear, valueMonth);
            }}
          >
            <AntDesign
              name="rightcircle"
              size={40}
              color={isDarkMode === true ? theme.loading : "#DF6E67"}
            />
          </TouchableOpacity>
        </View>

        {/* 831120400361 */}

        <View
          style={{
            width: windowWidth - 20,
            flexDirection: "row",
            marginTop: 10,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              setSwitched(false), docDefaultDate(iin, "", "");
            }}
            style={{
              width: "50%",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor:
                switched === false
                  ? isDarkMode === true
                    ? "#1C3F5C"
                    : "#DF6E67"
                  : isDarkMode === true
                  ? "#C0D5EE"
                  : "white",
              height: 36,
              borderTopLeftRadius: 10,
              borderBottomLeftRadius: 10,
            }}
          >
            <Text
              style={{
                fontSize: 14,
                color: switched === false ? "white" : "#4d4d4d",
              }}
            >
              {i18n.t("toExecute")}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setSwitched(true);
              docDefaultDateFull(iin, "", "");
            }}
            style={{
              width: "50%",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor:
                switched === false
                  ? isDarkMode === true
                    ? "#C0D5EE"
                    : "white"
                  : isDarkMode === true
                  ? "#1C3F5C"
                  : "#DF6E67",
              height: 36,
              borderTopRightRadius: 10,
              borderBottomRightRadius: 10,
            }}
          >
            <Text
              style={{
                fontSize: 14,
                color: switched === false ? "#4d4d4d" : "white",
              }}
            >
              {i18n.t("executed")}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView style={{ width: "100%", marginTop: 10 }}>
        <View>
          <View
            style={{
              alignItems: "center",
              display: switched === false ? "flex" : "none",
            }}
          >
            {isLoading === true ? (
              <UIActivityIndicator
                color={theme.loading}
                size={30}
                style={{ marginTop: 20 }}
              />
            ) : docsArray.length === 0 ? (
              <View style={{ alignItems: "center", marginTop: 20 }}>
                <Ionicons
                  name="documents-sharp"
                  size={100}
                  color={theme.color}
                />
                <Text
                  style={{
                    marginTop: 10,
                    fontSize: 22,
                    color: theme.color,
                    fontWeight: "500",
                  }}
                >
                  {i18n.t("noData")}
                </Text>
              </View>
            ) : (
              docs
            )}
            <View style={{ marginBottom: 100 }} />
          </View>

          <View
            style={{
              alignItems: "center",
              display: switched === true ? "flex" : "none",
            }}
          >
            {isLoading === true ? (
              <UIActivityIndicator
                color={theme.loading}
                size={30}
                style={{ marginTop: 20 }}
              />
            ) : docsArrayFull.length === 0 ? (
              <View style={{ alignItems: "center", marginTop: 20 }}>
                <Ionicons
                  name="documents-sharp"
                  size={100}
                  color={theme.color}
                />
                <Text
                  style={{
                    marginTop: 10,
                    fontSize: 22,
                    color: theme.color,
                    fontWeight: "500",
                  }}
                >
                  {i18n.t("noData")}
                </Text>
              </View>
            ) : (
              docsFull
            )}
            <View style={{ marginBottom: 100 }} />
          </View>
        </View>

        {/* <View style={{alignItems:'center', justifyContent:'center', display: upDown === true ? 'flex' : 'none' }}>
  <Text>вы сейчас выбираете датуююю</Text>
</View> */}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    height: windowHeight,
  },
  container1: {
    // marginLeft: 10
  },
  title: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 20,
  },

  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#F5DA81",
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
    height: 50,
  },
  headerText: {
    alignItems: "center",
    justifyContent: "center",
    fontSize: 18,
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: "row",
    height: 60,
    border: 1,
    ":last-child": {
      borderBottomEndRadius: 10,
      borderBottomStartRadius: 10,
    },
  },

  columnHeader: {
    width: "25%",
    justifyContent: "center",
    alignItems: "center",
  },
  columnHeader1: {
    width: "10%",
    justifyContent: "center",
    alignItems: "center",
  },
  columnHeader2: {
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
  },
  columnHeader3: {
    width: "25%",
    justifyContent: "center",
    alignItems: "center",
  },
  columnHeaderTxt: {
    color: "black",
    fontWeight: "bold",
    fontSize: 10,
  },
  columnRowTxt1: {
    textAlign: "center",
    width: "10%",
    fontSize: 10,
  },
  columnRowTxt2: {
    textAlign: "center",
    width: "90%",
    fontSize: 10,
  },
  columnRowTxt3: {
    textAlign: "center",
    width: "25%",
    fontSize: 10,
  },
  columnRowTxtRoom: {
    textAlign: "center",
    fontSize: 10,
    // width:40,
    width: "25%",
    color: "black",
  },
});

// дата и время
// doc: (list.doc).split(' от ')[0],
// date: ((list.doc).split(' от ')[1]).split(' ')[0],
// hour: ((list.doc).split(' от ')[1]).split(' ')[1],
