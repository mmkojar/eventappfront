import React from 'react'
import {  View,StyleSheet,Image,ScrollView,Pressable, Dimensions  } from 'react-native';
import { Button,Card,Text } from 'react-native-paper';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import GlobalStyle from '../components/utils/GlobalStyle';

function Home({ navigation }) {

    React.useLayoutEffect(() => {
        navigation.setOptions({
            // headerLeft: () => (
            //     <View>
            //         <Image
            //             style={{height:40,width:40,marginLeft:8}}
            //             source={require('../assets/logo.png')}
            //         >
            //         </Image>
            //     </View>
            // ),
            headerRight: () => (
              <View>
                  <Button onPress={() => {
                      navigation.navigate('Profile');
                    }}>
                    <FontAwesome5
                      name="user-circle"
                      size={30}
                      color="#fff"
                      style={{marginRight:20}}
                    />
                  </Button>
              </View>
            )
        });
    }, [navigation]);

    return (
        <ScrollView>
            <View style={styles.container}>
                    <Pressable onPress={() => navigation.navigate('EventOverview')}>
                        <Card style={styles.innerItem}elevation={3}>
                                <Image
                                    style={styles.image}
                                    source={require('../assets/Icons/1.png')}
                                >
                                </Image>
                                <Text style={styles.textMain}>Event OverView</Text>
                        </Card>
                    </Pressable>                      
                    <Pressable onPress={() => navigation.navigate('Agenda')}> 
                        <Card style={styles.innerItem}elevation={3}>
                            <Image
                                style={styles.image}
                                source={require('../assets/Icons/2.png')}
                            >
                            </Image>
                            <Text style={styles.textMain}>Agenda</Text>
                        </Card>
                    </Pressable>       
                    <Pressable onPress={() => navigation.navigate('Delegates')}>
                        <Card style={styles.innerItem}elevation={3}>
                            <Image
                                style={styles.image}
                                source={require('../assets/Icons/4.png')}
                            >
                            </Image>
                            <Text style={styles.textMain}>Delegates</Text>
                        </Card>
                    </Pressable>
                    <Pressable onPress={() => navigation.navigate('ChatList')}> 
                        <Card style={styles.innerItem}elevation={3}>
                            <Image
                                style={styles.image}
                                source={require('../assets/Icons/6.png')}
                            >
                            </Image>
                            <Text style={styles.textMain}>Chat</Text>
                        </Card>
                    </Pressable>
                    <Pressable onPress={() => navigation.navigate('Notification')}> 
                        <Card style={styles.innerItem}elevation={3}>
                            <Image
                                style={styles.image}
                                source={require('../assets/Icons/8.png')}
                            >
                            </Image>
                            <Text style={styles.textMain}>Notification</Text>
                        </Card>
                    </Pressable>
                    <Pressable onPress={() => navigation.navigate('Polling')}> 
                        <Card style={styles.innerItem}elevation={3}>
                            <Image
                                style={styles.image}
                                source={require('../assets/Icons/15.png')}
                            >
                            </Image>
                            <Text style={styles.textMain}>Polling</Text>
                        </Card>
                    </Pressable>
                    <Pressable onPress={() => navigation.navigate('QRScan')}> 
                        <Card style={styles.innerItem}elevation={3}>
                            <Image
                                style={styles.image}
                                source={require('../assets/Icons/13.png')}
                            >
                            </Image>
                            <Text style={styles.textMain}>QRScan</Text>
                        </Card>
                    </Pressable>
                    <Pressable onPress={() => navigation.navigate('Speakers')}> 
                        <Card style={styles.innerItem} elevation={3}>
                            <Image
                                style={styles.image}
                                source={require('../assets/Icons/3.png')}
                            >
                            </Image>
                            <Text style={styles.textMain}>Speakers</Text>
                        </Card>
                    </Pressable>                     
                    <Pressable onPress={() => navigation.navigate('Sponsors')}> 
                        <Card style={styles.innerItem} elevation={3}>
                            <Image
                                style={styles.image}
                                source={require('../assets/Icons/5.png')}
                            >
                            </Image>
                            <Text style={styles.textMain}>Sponsors</Text>
                        </Card>
                    </Pressable>
                    <Pressable onPress={() => navigation.navigate('Exhibitors')}> 
                        <Card style={styles.innerItem} elevation={3}>
                            <Image
                                style={styles.image}
                                source={require('../assets/Icons/12.png')}
                            >
                            </Image>
                            <Text style={styles.textMain}>Exhibitors</Text>
                        </Card>
                    </Pressable>
                    {/* <Pressable onPress={() => navigation.navigate('Gallery')}> 
                        <Card style={styles.innerItem} elevation={3}>
                            <Image
                                style={styles.image}
                                source={require('../assets/Icons/7.png')}
                            >
                            </Image>
                            <Text style={styles.textMain}>Gallery</Text>
                        </Card>
                    </Pressable> */}
                    
                    <Pressable onPress={() => navigation.navigate('FAQ')}>
                        <Card style={styles.innerItem} elevation={3}>
                            <Image
                                style={styles.image}
                                source={require('../assets/Icons/9.png')}
                            >
                            </Image>
                        <Text style={styles.textMain}>FAQ</Text>
                        </Card>
                    </Pressable>
                    <Pressable onPress={() => navigation.navigate('Support')}> 
                        <Card style={styles.innerItem} elevation={3}>
                            <Image
                                style={styles.image}
                                source={require('../assets/Icons/14.png')}
                            >
                            </Image>
                            <Text style={styles.textMain}>Support</Text>
                        </Card>
                    </Pressable>
                    
            </View>
        </ScrollView>
    )
}

const width = Dimensions.get('window').width;

const Gstyle = GlobalStyle;

const styles = StyleSheet.create({
    container:{
        flex:1,
        marginVertical:6,
        flexDirection:'row',
        flexWrap: 'wrap',
        justifyContent:'center',
        backgroundColor:"#fcfcfc"
    },
    innerItem:{
        width:width/2.1,
        padding:10,
        margin:3,
        borderRadius:6
    },
    image:{
        width:54,
        height:54,
        alignSelf:'center'
    },
    textMain:{
        color:Gstyle.primarycolor.color,
        marginTop:12,
        fontSize:15,
        textAlign:'center',
    }
})

export default Home
