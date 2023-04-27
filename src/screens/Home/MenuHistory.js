import { Text, View, Dimensions, ScrollView } from 'react-native'
import React, { Component, useState, useEffect } from 'react'
import axios from 'axios';
import { WaveIndicator } from 'react-native-indicators';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function MenuHistory () {
    const [ historyDate, setHistoryDate ] = useState([])
    const [ isLoading, setIsLoading ] = useState(false)

    
    const history = () => {
        setIsLoading(true)
        const config = {
          method:'get',
          url: `http://95.57.218.120//?apitest.helloAPI7={}`,
          headers: {  }
        }
        axios(config)
         .then(function(response){
          let info = response.data.replace(/<[^>]*>/g, '').replace(/-->/g, '')
          let parse_first = JSON.parse(info)
          let parse_second = JSON.parse(parse_first.response)
        //   console.log(parse_second)
          let parse_third = parse_second.status
            // console.log(parse_third)
            setHistoryDate((JSON.stringify(parse_third)).split('; 2'))
            // console.log(historyDate[0])
            setIsLoading(false)
         })
         .catch(function (error) {
          console.log(error);
          setIsLoading(false)
         })
    } 

    useEffect(()=>{
            history()
    },[])


   const historymenu = []

   for(let i = 0; i< historyDate.length; i++){
    historymenu.push(
        <View key={i} style={{alignItems:'center', justifyContent:'center', width:windowWidth-20, backgroundColor:'white', marginTop:20, padding:10, borderRadius:15 }}>
        <Text style={{fontSize:16}}>{ i !== 0 ? '2' + historyDate[i].replace(`" `, '') : historyDate[i].replace(`" `, '')}</Text>
    </View>
    )
}


if(isLoading) {
    return(
        <View style={{flex: 1, justifyContent:'center', alignItems: 'center'}}>
            <WaveIndicator color="#D64D43"/>
        </View>
    )
}



    return (
      <View>
        <View style={{alignItems:'center'}}>
            <ScrollView showsVerticalScrollIndicator={true}>
            {historymenu}
            </ScrollView>
            
        </View>
      </View>
    )
}