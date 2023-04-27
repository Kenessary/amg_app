import { Text, View, StyleSheet, Dimensions, SafeAreaView, ScrollView, TouchableOpacity, Linking } from 'react-native'
import React, { Component } from 'react'
import { Entypo, MaterialIcons } from '@expo/vector-icons'


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function ContactsScreen() {
    return (
      <View style={{flex:1, backgroundColor:'white'}}>
        <ScrollView>
        <View style={{alignItems:'center'}}>
            <View style={{width:windowWidth-20, padding:15, marginTop:10, paddingLeft:5}}>
                <Text style={{fontSize:18, fontWeight:'600', color:'#4D4D4D'}}>Головной офис</Text>
            </View>
            <View style={{width:windowWidth-20, borderWidth:1, paddingLeft:15, paddingRight:15, paddingTop:10, paddingBottom:10, borderRadius:15, borderColor:'#E4E4E4'}}>
                <Text style={{fontSize:16, fontWeight:'600', color:'#4D4D4D'}}>АО "СНПС-Актобемунайгаз"</Text>
                {/* <View style={{width:'100%', height:1, backgroundColor:'black', marginTop:5}}/> */}
                <View style={{marginTop:15}}>

                    <View style={{flexDirection:'row'}}>
                    <Text style={{fontSize:16, color:'#4D4D4D'}}>
                        Канцелярия: 
                    </Text>
                    <TouchableOpacity onPress={()=> Linking.openURL(`tel:${87132966941}`)} style={{flexDirection:'row', alignItems:'center', marginLeft:7, backgroundColor:'#A3F596', padding:3, borderRadius:5}}>
                        <Entypo name="phone" size={15} color="#187D07" style={{marginRight:3}} />
                        <Text style={{color:'#187D07', fontWeight:'500'}}>+7 (7132) 96-69-41</Text>
                    </TouchableOpacity>

                    </View>
                    <View style={{flexDirection:'row', marginTop:5, width:windowWidth-20}}>

                    <TouchableOpacity onPress={()=> Linking.openURL(`tel:${87132966925}`)} style={{flexDirection:'row', alignItems:'center', marginRight:5, backgroundColor:'#A3F596', padding:3, borderRadius:5}}>
                        <Entypo name="phone" size={15} color="#187D07" style={{marginRight:3}} />
                        <Text style={{color:'#187D07', fontWeight:'500'}}>+7 (7132) 96-69-25</Text>
                    </TouchableOpacity>
                    </View>
                </View>

                <View style={{marginTop:15}}>
                    <View style={{flexDirection:'row'}}>
                    <Text style={{fontSize:16, color:'#4D4D4D'}}>
                    Факс: 
                    </Text>

                    <TouchableOpacity onPress={()=> Linking.openURL(`tel:${87132966941}`)} style={{flexDirection:'row', alignItems:'center', marginLeft:7, backgroundColor:'#A3F596', padding:3, borderRadius:5}}>
                        <Entypo name="phone" size={15} color="#187D07" style={{marginRight:3}} />
                        <Text style={{color:'#187D07', fontWeight:'500'}}>+7(7132) 95-53-19</Text>
                    </TouchableOpacity>

                    </View>
                    <View style={{flexDirection:'row', marginTop:5}}>
                    <TouchableOpacity onPress={()=> Linking.openURL('mailto:munaygaz@cnpc-amg.kz')} style={{flexDirection:'row', alignItems:'center', marginRight:5, backgroundColor:'#BAE6FD', padding:3, borderRadius:5}}>
                        <MaterialIcons name="email" size={15} color="#0A7699" style={{marginRight:3}} />
                        <Text style={{color:'#0A7699', fontWeight:'500'}}>munaygaz@cnpc-amg.kz</Text>
                    </TouchableOpacity> 
                    </View>
                </View>

                <View style={{marginTop:15}}>
                    <View style={{flexDirection:'row'}}>
                    <Text style={{fontSize:16, color:'#4D4D4D'}}>
                        Приемная:
                    </Text>

                    <TouchableOpacity onPress={()=> Linking.openURL(`tel:${87132966810}`)} style={{flexDirection:'row', alignItems:'center', marginLeft:7, backgroundColor:'#A3F596', padding:3, borderRadius:5}}>
                        <Entypo name="phone" size={15} color="#187D07" style={{marginRight:3}} />
                        <Text style={{color:'#187D07', fontWeight:'500'}}>+7 (7132) 96-68-10</Text>
                    </TouchableOpacity>

                    </View>
                    <View style={{flexDirection:'row', marginTop:5}}>
                    <TouchableOpacity onPress={()=> Linking.openURL('mailto:munaygaz@cnpc-amg.kz')} style={{flexDirection:'row', alignItems:'center', marginRight:5, backgroundColor:'#BAE6FD', padding:3, borderRadius:5}}>
                        <MaterialIcons name="email" size={15} color="#0A7699" style={{marginRight:3}} />
                        <Text style={{color:'#0A7699', fontWeight:'500'}}>munaygaz@cnpc-amg.kz</Text>
                    </TouchableOpacity> 
                    </View>
                </View>
                <View style={{marginTop:10}}>
                    <Text style={{fontSize:15, fontWeight: '500', color:'#4D4D4D'}}>г. Актобе, пр-т 312 стрелковой дивизии, 3</Text>
                </View>

            </View>
        </View>
        <View style={{alignItems:'center'}}>
            <View style={{width:windowWidth-20, padding:15, marginTop:5, paddingLeft:5}}>
                <Text style={{fontSize:18, fontWeight:'600', color:'#4D4D4D'}}>Подразделения</Text>
            </View>
            <View style={{width:windowWidth-20, borderWidth:1, paddingLeft:15, paddingRight:15, paddingTop:10, paddingBottom:10, borderRadius:15, borderColor:'#E4E4E4'}}>
                <Text style={{fontSize:16, fontWeight:'600', color:'#4D4D4D'}}>Октябрьское нефтегазодобывающее управление</Text>
                {/* <View style={{width:'100%', height:1, backgroundColor:'black', marginTop:5}}/> */}

                <View style={{marginTop:15}}>
                    <View style={{flexDirection:'row'}}>
                    <Text style={{fontSize:16, color:'#4D4D4D'}}>
                        Приемная:
                    </Text>

                    <TouchableOpacity onPress={()=> Linking.openURL(`tel:${87132764068}`)} style={{flexDirection:'row', alignItems:'center', marginLeft:7, backgroundColor:'#A3F596', padding:3, borderRadius:5}}>
                        <Entypo name="phone" size={15} color="#187D07" style={{marginRight:3}} />
                        <Text style={{color:'#187D07', fontWeight:'500'}}>+7 (7132) 76-40-68</Text>
                    </TouchableOpacity>

                    </View>
                    <View style={{flexDirection:'row', marginTop:5}}>
                    <TouchableOpacity onPress={()=> Linking.openURL('mailto:priem_ongdu@cnpc-amg.kz')} style={{flexDirection:'row', alignItems:'center', marginRight:5, backgroundColor:'#BAE6FD', padding:3, borderRadius:5}}>
                        <MaterialIcons name="email" size={15} color="#0A7699" style={{marginRight:3}} />
                        <Text style={{color:'#0A7699', fontWeight:'500'}}>priem_ongdu@cnpc-amg.kz</Text>
                    </TouchableOpacity> 
                    </View>
                </View>
                <View style={{marginTop:10}}>
                    <Text style={{fontSize:15, fontWeight: '500', color:'#4D4D4D'}}>г. Актобе, ул. Некрасова, 158</Text>
                </View>

            </View>

            <View style={{width:windowWidth-20, borderWidth:1, paddingLeft:15, paddingRight:15, paddingTop:10, paddingBottom:10, borderRadius:15, borderColor:'#E4E4E4', marginTop:10}}>
                <Text style={{fontSize:16, fontWeight:'600', color:'#4D4D4D'}}>Кенкиякское нефтегазодобывающее управление</Text>
                {/* <View style={{width:'100%', height:1, backgroundColor:'black', marginTop:5}}/> */}

                <View style={{marginTop:15}}>
                    <View style={{flexDirection:'row'}}>
                    <Text style={{fontSize:16, color:'#4D4D4D'}}>
                        Приемная:
                    </Text>

                    <TouchableOpacity onPress={()=> Linking.openURL(`tel:${ 87132764706}`)} style={{flexDirection:'row', alignItems:'center', marginLeft:7, backgroundColor:'#A3F596', padding:3, borderRadius:5}}>
                        <Entypo name="phone" size={15} color="#187D07" style={{marginRight:3}} />
                        <Text style={{color:'#187D07', fontWeight:'500'}}> +7 (7132) 76-47-06</Text>
                    </TouchableOpacity>

                    </View>
                    <View style={{flexDirection:'row', marginTop:5}}>
                    <TouchableOpacity onPress={()=> Linking.openURL('mailto:kngdu_priem@cnpc-amg.kz')} style={{flexDirection:'row', alignItems:'center', marginRight:5, backgroundColor:'#BAE6FD', padding:3, borderRadius:5}}>
                        <MaterialIcons name="email" size={15} color="#0A7699" style={{marginRight:3}} />
                        <Text style={{color:'#0A7699', fontWeight:'500'}}>kngdu_priem@cnpc-amg.kz</Text>
                    </TouchableOpacity> 
                    </View>
                </View>
                <View style={{marginTop:10}}>
                    <Text style={{fontSize:15, fontWeight: '500', color:'#4D4D4D'}}>Темирский район, пос. Кенкияк, почтовое отделение "Нефтяник"</Text>
                </View>

            </View>

            <View style={{width:windowWidth-20, borderWidth:1, paddingLeft:15, paddingRight:15, paddingTop:10, paddingBottom:10, borderRadius:15, borderColor:'#E4E4E4', marginTop:10}}>
                <Text style={{fontSize:16, fontWeight:'600', color:'#4D4D4D'}}>Жанажольский нефтегазоперерабатывающий комплекс</Text>
                {/* <View style={{width:'100%', height:1, backgroundColor:'black', marginTop:5}}/> */}

                <View style={{marginTop:15}}>
                    <View style={{flexDirection:'row'}}>
                    <Text style={{fontSize:16, color:'#4D4D4D'}}>
                        Приемная:
                    </Text>

                    <TouchableOpacity onPress={()=> Linking.openURL(`tel:${ 87132768511}`)} style={{flexDirection:'row', alignItems:'center', marginLeft:7, backgroundColor:'#A3F596', padding:3, borderRadius:5}}>
                        <Entypo name="phone" size={15} color="#187D07" style={{marginRight:3}} />
                        <Text style={{color:'#187D07', fontWeight:'500'}}> +7 (7132) 76-85-11</Text>
                    </TouchableOpacity>

                    </View>
                    <View style={{flexDirection:'row', marginTop:5}}>
                    <TouchableOpacity onPress={()=> Linking.openURL('mailto:priem_zhgpz@cnpc-amg.kz')} style={{flexDirection:'row', alignItems:'center', marginRight:5, backgroundColor:'#BAE6FD', padding:3, borderRadius:5}}>
                        <MaterialIcons name="email" size={15} color="#0A7699" style={{marginRight:3}} />
                        <Text style={{color:'#0A7699', fontWeight:'500'}}>priem_zhgpz@cnpc-amg.kz</Text>
                    </TouchableOpacity> 
                    </View>
                </View>
                <View style={{marginTop:10}}>
                    <Text style={{fontSize:15, fontWeight: '500', color:'#4D4D4D'}}>г. Актобе, ул. Некрасова, 158</Text>
                </View>

            </View>

            <View style={{width:windowWidth-20, borderWidth:1, paddingLeft:15, paddingRight:15, paddingTop:10, paddingBottom:10, borderRadius:15, borderColor:'#E4E4E4', marginTop:10}}>
                <Text style={{fontSize:16, fontWeight:'600', color:'#4D4D4D'}}>Управление производственно-технического обслуживания и комплектации оборудованием</Text>
                {/* <View style={{width:'100%', height:1, backgroundColor:'black', marginTop:5}}/> */}

                <View style={{marginTop:15}}>
                    <View style={{flexDirection:'row'}}>
                    <Text style={{fontSize:16, color:'#4D4D4D'}}>
                        Приемная:
                    </Text>

                    <TouchableOpacity onPress={()=> Linking.openURL(`tel:${ 87132766153}`)} style={{flexDirection:'row', alignItems:'center', marginLeft:7, backgroundColor:'#A3F596', padding:3, borderRadius:5}}>
                        <Entypo name="phone" size={15} color="#187D07" style={{marginRight:3}} />
                        <Text style={{color:'#187D07', fontWeight:'500'}}> +7 (7132) 76-61-53</Text>
                    </TouchableOpacity>

                    </View>
                    <View style={{flexDirection:'row', marginTop:5}}>
                    <TouchableOpacity onPress={()=> Linking.openURL('mailto:sarmanova@cnpc-amg.kz')} style={{flexDirection:'row', alignItems:'center', marginRight:5, backgroundColor:'#BAE6FD', padding:3, borderRadius:5}}>
                        <MaterialIcons name="email" size={15} color="#0A7699" style={{marginRight:3}} />
                        <Text style={{color:'#0A7699', fontWeight:'500'}}>sarmanova@cnpc-amg.kz</Text>
                    </TouchableOpacity> 
                    </View>
                </View>
                <View style={{marginTop:10}}>
                    <Text style={{fontSize:15, fontWeight: '500', color:'#4D4D4D'}}>г. Актобе, пр-т 312 стрелковой дивизии, 3</Text>
                </View>

            </View>

            <View style={{width:windowWidth-20, borderWidth:1, paddingLeft:15, paddingRight:15, paddingTop:10, paddingBottom:10, borderRadius:15, borderColor:'#E4E4E4', marginTop:10}}>
                <Text style={{fontSize:16, fontWeight:'600', color:'#4D4D4D'}}>Управление сбыта нефти и нефтепродуктов</Text>
                {/* <View style={{width:'100%', height:1, backgroundColor:'black', marginTop:5}}/> */}

                <View style={{marginTop:15}}>
                    <View style={{flexDirection:'row'}}>
                    <Text style={{fontSize:16, color:'#4D4D4D'}}>
                        Приемная:
                    </Text>

                    <TouchableOpacity onPress={()=> Linking.openURL(`tel:${87132768587}`)} style={{flexDirection:'row', alignItems:'center', marginLeft:7, backgroundColor:'#A3F596', padding:3, borderRadius:5}}>
                        <Entypo name="phone" size={15} color="#187D07" style={{marginRight:3}} />
                        <Text style={{color:'#187D07', fontWeight:'500'}}>+7 (7132) 76-85-87</Text>
                    </TouchableOpacity>

                    </View>
                </View>
                <View style={{marginTop:10}}>
                    <Text style={{fontSize:15, fontWeight: '500', color:'#4D4D4D'}}>г. Актобе, пр-т 312 стрелковой дивизии, 3</Text>
                </View>

            </View>

            <View style={{width:windowWidth-20, borderWidth:1, paddingLeft:15, paddingRight:15, paddingTop:10, paddingBottom:10, borderRadius:15, borderColor:'#E4E4E4', marginTop:10}}>
                <Text style={{fontSize:16, fontWeight:'600', color:'#4D4D4D'}}>Актобемунайсервис</Text>
                {/* <View style={{width:'100%', height:1, backgroundColor:'black', marginTop:5}}/> */}

                <View style={{marginTop:15}}>
                    <View style={{flexDirection:'row'}}>
                    <Text style={{fontSize:16, color:'#4D4D4D'}}>
                        Приемная:
                    </Text>

                    <TouchableOpacity onPress={()=> Linking.openURL(`tel:${87132769906}`)} style={{flexDirection:'row', alignItems:'center', marginLeft:7, backgroundColor:'#A3F596', padding:3, borderRadius:5}}>
                        <Entypo name="phone" size={15} color="#187D07" style={{marginRight:3}} />
                        <Text style={{color:'#187D07', fontWeight:'500'}}>+7 (7132) 76-99-06</Text>
                    </TouchableOpacity>

                    </View>

                    <View style={{flexDirection:'row', marginTop:5}}>
                    <TouchableOpacity onPress={()=> Linking.openURL('mailto:ams@cnpc-amg.kz')} style={{flexDirection:'row', alignItems:'center', marginRight:5, backgroundColor:'#BAE6FD', padding:3, borderRadius:5}}>
                        <MaterialIcons name="email" size={15} color="#0A7699" style={{marginRight:3}} />
                        <Text style={{color:'#0A7699', fontWeight:'500'}}>ams@cnpc-amg.kz</Text>
                    </TouchableOpacity> 
                    </View>
                </View>
                <View style={{marginTop:10}}>
                    <Text style={{fontSize:15, fontWeight: '500', color:'#4D4D4D'}}>г. Актобе, ул.Кобозева, 128</Text>
                </View>
            </View>

            <View style={{width:windowWidth-20, borderWidth:1, paddingLeft:15, paddingRight:15, paddingTop:10, paddingBottom:10, borderRadius:15, borderColor:'#E4E4E4', marginTop:10}}>
                <Text style={{fontSize:16, fontWeight:'600', color:'#4D4D4D'}}>Управление "Актобеэнергонефть"</Text>
                {/* <View style={{width:'100%', height:1, backgroundColor:'black', marginTop:5}}/> */}

                <View style={{marginTop:15}}>
                    <View style={{flexDirection:'row'}}>
                    <Text style={{fontSize:16, color:'#4D4D4D'}}>
                        Приемная:
                    </Text>

                    <TouchableOpacity onPress={()=> Linking.openURL(`tel:${87132764503}`)} style={{flexDirection:'row', alignItems:'center', marginLeft:7, backgroundColor:'#A3F596', padding:3, borderRadius:5}}>
                        <Entypo name="phone" size={15} color="#187D07" style={{marginRight:3}} />
                        <Text style={{color:'#187D07', fontWeight:'500'}}>+7 (7132) 76-45-03</Text>
                    </TouchableOpacity>

                    </View>

                    <View style={{flexDirection:'row', marginTop:5}}>
                    <TouchableOpacity onPress={()=> Linking.openURL('mailto:aen@cnpc-amg.kz')} style={{flexDirection:'row', alignItems:'center', marginRight:5, backgroundColor:'#BAE6FD', padding:3, borderRadius:5}}>
                        <MaterialIcons name="email" size={15} color="#0A7699" style={{marginRight:3}} />
                        <Text style={{color:'#0A7699', fontWeight:'500'}}>aen@cnpc-amg.kz</Text>
                    </TouchableOpacity> 
                    </View>
                </View>
                <View style={{marginTop:10}}>
                    <Text style={{fontSize:15, fontWeight: '500', color:'#4D4D4D'}}>г. Актобе, ул.Кобозева, 128</Text>
                </View>
            </View>

            <View style={{width:windowWidth-20, borderWidth:1, paddingLeft:15, paddingRight:15, paddingTop:10, paddingBottom:10, borderRadius:15, borderColor:'#E4E4E4', marginTop:10}}>
                <Text style={{fontSize:16, fontWeight:'600', color:'#4D4D4D'}}>Управление общественного питания и торговли</Text>
                {/* <View style={{width:'100%', height:1, backgroundColor:'black', marginTop:5}}/> */}

                <View style={{marginTop:15}}>
                    <View style={{flexDirection:'row'}}>
                    <Text style={{fontSize:16, color:'#4D4D4D'}}>
                        Приемная:
                    </Text>

                    <TouchableOpacity onPress={()=> Linking.openURL(`tel:${87132768631}`)} style={{flexDirection:'row', alignItems:'center', marginLeft:7, backgroundColor:'#A3F596', padding:3, borderRadius:5}}>
                        <Entypo name="phone" size={15} color="#187D07" style={{marginRight:3}} />
                        <Text style={{color:'#187D07', fontWeight:'500'}}>+7 (7132) 76-86-31</Text>
                    </TouchableOpacity>

                    </View>

                    <View style={{flexDirection:'row', marginTop:5}}>
                    <TouchableOpacity onPress={()=> Linking.openURL('mailto:priem_uopit@cnpc-amg.kz')} style={{flexDirection:'row', alignItems:'center', marginRight:5, backgroundColor:'#BAE6FD', padding:3, borderRadius:5}}>
                        <MaterialIcons name="email" size={15} color="#0A7699" style={{marginRight:3}} />
                        <Text style={{color:'#0A7699', fontWeight:'500'}}>priem_uopit@cnpc-amg.kz</Text>
                    </TouchableOpacity> 
                    </View>
                </View>
                <View style={{marginTop:10}}>
                    <Text style={{fontSize:15, fontWeight: '500', color:'#4D4D4D'}}>г. Актобе, пер. Веселый, 12</Text>
                </View>
            </View>

            <View style={{width:windowWidth-20, borderWidth:1, paddingLeft:15, paddingRight:15, paddingTop:10, paddingBottom:10, borderRadius:15, borderColor:'#E4E4E4', marginTop:10}}>
                <Text style={{fontSize:16, fontWeight:'600', color:'#4D4D4D'}}>Строительное управление</Text>
                {/* <View style={{width:'100%', height:1, backgroundColor:'black', marginTop:5}}/> */}

                <View style={{marginTop:15}}>
                    <View style={{flexDirection:'row'}}>
                    <Text style={{fontSize:16, color:'#4D4D4D'}}>
                        Приемная:
                    </Text>
                    <TouchableOpacity onPress={()=> Linking.openURL(`tel:${87132766405}`)} style={{flexDirection:'row', alignItems:'center', marginLeft:7, backgroundColor:'#A3F596', padding:3, borderRadius:5}}>
                        <Entypo name="phone" size={15} color="#187D07" style={{marginRight:3}} />
                        <Text style={{color:'#187D07', fontWeight:'500'}}>+7 (7132) 76-64-05</Text>
                    </TouchableOpacity>

                    </View>

                    <View style={{flexDirection:'row', marginTop:5}}>
                    <TouchableOpacity onPress={()=> Linking.openURL('mailto:sekretary_su@cnpc-amg.kz')} style={{flexDirection:'row', alignItems:'center', marginRight:5, backgroundColor:'#BAE6FD', padding:3, borderRadius:5}}>
                        <MaterialIcons name="email" size={15} color="#0A7699" style={{marginRight:3}} />
                        <Text style={{color:'#0A7699', fontWeight:'500'}}>sekretary_su@cnpc-amg.kz</Text>
                    </TouchableOpacity> 
                    </View>
                </View>
                <View style={{marginTop:10}}>
                    <Text style={{fontSize:15, fontWeight: '500', color:'#4D4D4D'}}>г. Актобе, ул. Пожарского, 69 </Text>
                </View>
            </View>
            <View style={{marginTop:20}}/>

            
        </View>
        </ScrollView>

        
      </View>
    )
  
}