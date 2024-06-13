import * as React from 'react'
import { Alert, View } from 'react-native'
import PDFReader from 'rn-pdf-reader-js'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { WaveIndicator } from 'react-native-indicators';
import { useContext } from 'react';
import themeContext from '../../cores/themeContext';
import qs from 'qs';


export default function DocumentPdfScreen () {
  const [ key, setKey ] = useState([])
  const [isLoading, setIsLoading] = useState(false)
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


// console.log(globalThis.link)
//--------- PDF ДОКУМЕНТ --------- //
  // useEffect(()=>{
  //   setIsLoading(true)
  //   const config = {
  //     method: 'get',
  //     url: `http://95.57.218.120/?apitest.helloAPIWithParams55={"addr":"merop_files/26/att_2689.pdf"}`,
  //     headers: { 
  //       'Content-Type': 'application/x-www-form-urlencoded'
  //     },
  //   }
  //   axios(config)
  //    .then(function(responsed){
  //     const info = responsed.data.replace(/<[^>]*>/g, '').replace(/-->/g, '')
  //     const info1= JSON.parse(info)
  //     const info2 = JSON.parse(info1.response)
  //     setKey(info2)
  //     setIsLoading(false)
  //   })
  //    .catch(function (error) {
  //     console.log(error);
  //     setIsLoading(false)
  //   })
  // },[])



// console.log(globalThis.docType, globalThis.docGuid)

  const openPdf = () => {
    setIsLoading(true)
      const data = qs.stringify({
          // 'documentiin': '831120400361',
          'typepdf': globalThis.docType,
          'guidpdf': globalThis.docGuid
        });
      const config = {
          method: 'post',
          url: 'http://95.57.218.120/?index',
          headers: { 
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          data : data
        };
      axios(config)
       .then(function(response){
        const info = response.data.replace(/<[^>]*>/g, '').replace(/-->/g, '')
        setKey(info)
        if(info.length === 14){
          Alert.alert('Нет подписанных данных')
        }
        setIsLoading(false)
       })
       .catch(function (error) {
        console.log(error);
        setIsLoading(false)
       })
  }

  // console.log(key)


  useEffect(()=>{ 
    openPdf()
  },[])

  if(isLoading) {
    return(
      <View style={{flex: 1, justifyContent:'center', alignItems: 'center', backgroundColor:theme.background}}>
        <WaveIndicator color={theme.loading}/>
      </View>
    )
  }
  const link = `data:application/pdf;base64,${key}`

  return (
    <PDFReader source={{ base64: link }} withScroll={true} withPinchZoom={true}/>
  )
}