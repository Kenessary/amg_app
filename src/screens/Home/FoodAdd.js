import { Text, StyleSheet, View, TouchableOpacity, Dimensions } from 'react-native'
import React, { Component } from 'react'
import { List } from "react-native-paper";
import { BirthdayIcon, EventIcon, InfoguideIcon, MenuIcon, NewsIcon, AddMenu} from "../../cores/helpers/icon";


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


export default function FoodAdd ({onPress}) {
    return (
        <View style={{alignItems:'center'}}>
        <TouchableOpacity style={styles.listwrapper}>
            <List.Item
                style={styles.title}
                title = 'Ввод меню.'
                rippleColor='transparent'
                onPress = {onPress}
                left = {color => <AddMenu fill={color}/>}
                titleStyle={{fontSize:17, color:'#4D4D4D', fontWeight: '600'}}
        />
        </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    listwrapper: {
        marginBottom: 0,
        width: windowWidth-30,
      },

})