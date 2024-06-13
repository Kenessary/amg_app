import { Ionicons } from '@expo/vector-icons'
import React, { useContext, useEffect, useState } from 'react'
import { Text } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { View } from 'react-native'
import { docDefaultDate } from './HomeScreen/responses/HomeApi'
import { AuthContext } from '../../context/AuthContext'
import { WaveIndicator } from 'react-native-indicators'

export default function DocumentsMenu({navigation}) {
    const {iin} = useContext(AuthContext)
    // useEffect(()=>{
    //     docDefaultDate(iin, '', '', setIsLoading, setDocsArrayLength)
    // },[])

    let [isLoading, setIsLoading] = useState(false)
    const [ docsArrayLength, setDocsArrayLength ] = useState('1')

    if(isLoading) {
        return(
          <View style={{flex:1, alignItems: 'center', justifyContent:'center'}}>
             <WaveIndicator color='#D64D43'/>
        </View>
        )
    }


    return (
    <View style={{flex: 1, alignItems:'center'}}>
        <TouchableOpacity style={{backgroundColor:'white', padding:15, width: '90%', marginTop:20, borderRadius:10, flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
            <View style={{flexDirection:'row', alignItems:'center'}}>
                <Ionicons name="documents" size={30} color="#D64D43" />
                <Text style={{color: '#4d4d4d', fontSize:16, fontWeight: '600', marginLeft:10}}>Документы ЭДО</Text>
            </View>
            <View style={{width:22, height:22, backgroundColor:'tomato', alignItems:'center', justifyContent:'center', borderRadius:20, display: docsArrayLength === 0 || docsArrayLength === null ? 'none' : 'flex'}}><Text style={{fontSize:14, color:'white', fontWeight:'600'}}>{docsArrayLength}</Text></View>
        </TouchableOpacity>
        <TouchableOpacity style={{backgroundColor:'white', padding:15, width: '90%', marginTop:20, borderRadius:10, flexDirection:'row', alignItems:'center'}}>
            <Ionicons name="documents" size={30} color="#D64D43" />
            <Text style={{color: '#4d4d4d', fontSize:16, fontWeight: '600', marginLeft:10}}>Документы ОА</Text>
        </TouchableOpacity>
    </View>
  )
}
