import React from 'react'
import {  View,StyleSheet,Image,ScrollView,Pressable, Dimensions  } from 'react-native';
import { Button,Card,Text } from 'react-native-paper';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import useThemeStyle from '../components/utils/useThemeStyle';
import Config from '../components/utils/Config';

function Home({ navigation }) {

    const [theme,GlobalStyle, themeoptions] = useThemeStyle();

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <View>
                    <Image
                        style={{height:40,width:40,marginLeft:8}}                        
                        source={(themeoptions && themeoptions.hp_logo.name !== null) ? {uri:Config.imgurl+(themeoptions && themeoptions.hp_logo.name)} : require('../assets/homelogo.png')}
                    >
                    </Image>
                </View>
            ),
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
            <Image
                style={{height:120,width:310,alignSelf:'center'}}
                source={require('../assets/app_banner.png')}
            />  
            <View style={styles.container}>
                    {
                        themeoptions && themeoptions.about.status == '1'?
                            <Pressable onPress={() => navigation.navigate('EventOverview')}>
                            <Card style={styles.innerItem}elevation={3}>
                                    <Image
                                        style={styles.image}
                                        source={(themeoptions && themeoptions.about_file.name !== null) ? {uri:Config.imgurl+(themeoptions && themeoptions.about_file.name)} : require('../assets/Icons/1.png')}
                                    >
                                    </Image>
                                    <Text style={GlobalStyle.homeIconText}>{(themeoptions && themeoptions.about.name !== null) ? themeoptions.about.name : 'Event OverView'}</Text>
                            </Card>
                        </Pressable>:null
                    }
                    {
                        themeoptions && themeoptions.agenda.status == '1'?                     
                        <Pressable onPress={() => navigation.navigate('Agenda')}> 
                            <Card style={styles.innerItem}elevation={3}>
                                <Image
                                    style={styles.image}
                                    // source={require('../assets/Icons/2.png')}
                                    source={(themeoptions && themeoptions.agenda_file.name !== null) ? {uri:Config.imgurl+(themeoptions && themeoptions.agenda_file.name)} : require('../assets/Icons/2.png')}
                                >
                                </Image>
                                <Text style={GlobalStyle.homeIconText}>{(themeoptions && themeoptions.agenda.name !== null) ? themeoptions.agenda.name : 'Agenda'}</Text>
                            </Card>
                        </Pressable>:null
                    }     
                    {themeoptions && themeoptions.delg.status == '1'? 
                        <Pressable onPress={() => navigation.navigate('Delegates')}>
                        <Card style={styles.innerItem}elevation={3}>
                            <Image
                                style={styles.image}                                
                                source={(themeoptions && themeoptions.delg_file.name !== null) ? {uri:Config.imgurl+(themeoptions && themeoptions.delg_file.name)} : require('../assets/Icons/4.png')}
                            >
                            </Image>
                            <Text style={GlobalStyle.homeIconText}>{(themeoptions && themeoptions.delg.name != null) ? themeoptions.delg.name : 'Delegates'}</Text>
                        </Card>
                    </Pressable>:null
                    }
                    {themeoptions && themeoptions.chat.status == '1'? 
                        <Pressable onPress={() => navigation.navigate('ChatList')}> 
                        <Card style={styles.innerItem}elevation={3}>
                            <Image
                                style={styles.image}                                
                                source={(themeoptions && themeoptions.chat_file.name !== null) ? {uri:Config.imgurl+(themeoptions && themeoptions.chat_file.name)} : require('../assets/Icons/6.png')}
                            >
                            </Image>
                            <Text style={GlobalStyle.homeIconText}>{(themeoptions && themeoptions.chat.name != null) ? themeoptions.chat.name : 'Chat'}</Text>
                        </Card>
                    </Pressable>:null
                    }
                    {themeoptions && themeoptions.notify.status == '1'? 
                        <Pressable onPress={() => navigation.navigate('Notification')}> 
                        <Card style={styles.innerItem}elevation={3}>
                            <Image
                                style={styles.image}                                
                                source={(themeoptions && themeoptions.notify_file.name !== null) ? {uri:Config.imgurl+(themeoptions && themeoptions.notify_file.name)} : require('../assets/Icons/8.png')}
                            >
                            </Image>
                            <Text style={GlobalStyle.homeIconText}>{(themeoptions && themeoptions.notify.name != null) ? themeoptions.notify.name : 'Notification'}</Text>
                        </Card>
                    </Pressable>:null
                    }
                    {themeoptions && themeoptions.polls.status == '1'? 
                        <Pressable onPress={() => navigation.navigate('Polling')}> 
                        <Card style={styles.innerItem}elevation={3}>
                            <Image
                                style={styles.image}                                
                                source={(themeoptions && themeoptions.polls_file.name !== null) ? {uri:Config.imgurl+(themeoptions && themeoptions.polls_file.name)} : require('../assets/Icons/15.png')}
                            >
                            </Image>
                            <Text style={GlobalStyle.homeIconText}>{(themeoptions && themeoptions.polls.name != null) ? themeoptions.polls.name : 'Polling'}</Text>
                        </Card>
                    </Pressable>:null
                    }
                    {themeoptions && themeoptions.qr.status == '1'? 
                        <Pressable onPress={() => navigation.navigate('QRScan')}> 
                        <Card style={styles.innerItem}elevation={3}>
                            <Image
                                style={styles.image}                                
                                source={(themeoptions && themeoptions.qr_file.name !== null) ? {uri:Config.imgurl+(themeoptions && themeoptions.qr_file.name)} : require('../assets/Icons/13.png')}
                            >
                            </Image>
                            <Text style={GlobalStyle.homeIconText}>{(themeoptions && themeoptions.qr.name != null) ? themeoptions.qr.name : 'QRScan'}</Text>
                        </Card>
                    </Pressable>:null
                    }
                    {themeoptions && themeoptions.speaker.status == '1'? 
                        <Pressable onPress={() => navigation.navigate('Speakers')}> 
                        <Card style={styles.innerItem} elevation={3}>
                            <Image
                                style={styles.image}                                
                                source={(themeoptions && themeoptions.speaker_file.name !== null) ? {uri:Config.imgurl+(themeoptions && themeoptions.speaker_file.name)} : require('../assets/Icons/3.png')}
                            >
                            </Image>
                            <Text style={GlobalStyle.homeIconText}>{(themeoptions && themeoptions.speaker.name != null) ? themeoptions.speaker.name : 'Speakers'}</Text>
                        </Card>
                    </Pressable>:null
                    }
                    {themeoptions && themeoptions.sponsors.status == '1'? 
                        <Pressable onPress={() => navigation.navigate('Artist')}> 
                        <Card style={styles.innerItem} elevation={3}>
                            <Image
                                style={styles.image}                                
                                source={(themeoptions && themeoptions.sponsors_file.name !== null) ? {uri:Config.imgurl+(themeoptions && themeoptions.sponsors_file.name)} : require('../assets/Icons/5.png')}
                            >
                            </Image>
                            <Text style={GlobalStyle.homeIconText}>{(themeoptions && themeoptions.sponsors.name != null) ? themeoptions.sponsors.name : 'Sponsors'}</Text>
                        </Card>
                    </Pressable>:null
                    }
                    {themeoptions && themeoptions.exhi.status == '1'? 
                        <Pressable onPress={() => navigation.navigate('Exhibitors')}> 
                        <Card style={styles.innerItem} elevation={3}>
                            <Image
                                style={styles.image}                                
                                source={(themeoptions && themeoptions.exhi_file.name !== null) ? {uri:Config.imgurl+(themeoptions && themeoptions.exhi_file.name)} : require('../assets/Icons/12.png')}
                            >
                            </Image>
                            <Text style={GlobalStyle.homeIconText}>{(themeoptions && themeoptions.exhi.name != null) ? themeoptions.exhi.name : 'Exhibitors'}</Text>
                        </Card>
                    </Pressable>:null
                    }
                    {themeoptions && themeoptions.faq.status == '1'? 
                        <Pressable onPress={() => navigation.navigate('FAQ')}>
                        <Card style={styles.innerItem} elevation={3}>
                            <Image
                                style={styles.image}                                
                                source={(themeoptions && themeoptions.faq_file.name !== null) ? {uri:Config.imgurl+(themeoptions && themeoptions.faq_file.name)} : require('../assets/Icons/9.png')}
                            >
                            </Image>
                        <Text style={GlobalStyle.homeIconText}>{(themeoptions && themeoptions.faq.name != null) ? themeoptions.faq.name : 'FAQ'}</Text>
                        </Card>
                    </Pressable>:null
                    }
                    {themeoptions && themeoptions.support.status == '1'? 
                        <Pressable onPress={() => navigation.navigate('Support')}> 
                        <Card style={styles.innerItem} elevation={3}>
                            <Image
                                style={styles.image}                                
                                source={(themeoptions && themeoptions.support_file.name !== null) ? {uri:Config.imgurl+(themeoptions && themeoptions.support_file.name)} : require('../assets/Icons/14.png')}
                            >
                            </Image>
                            <Text style={GlobalStyle.homeIconText}>{(themeoptions && themeoptions.support.name != null) ? themeoptions.support.name : 'Support'}</Text>
                        </Card>
                    </Pressable>:null
                    }
                    {themeoptions && themeoptions.event_feed.status == '1'? 
                    <Pressable onPress={() => navigation.navigate('EventFeed')}> 
                        <Card style={styles.innerItem} elevation={3}>
                            <Image
                                style={styles.image}                 
                                source={(themeoptions && themeoptions.event_feed_file.name !== null) ? {uri:Config.imgurl+(themeoptions && themeoptions.event_feed_file.name)} : require('../assets/Icons/1.png')}
                            >
                            </Image>
                            <Text style={GlobalStyle.homeIconText}>Event Feed</Text>
                        </Card>
                    </Pressable>:null
                    }
                    
            </View>
        </ScrollView>
    )
}

const width = Dimensions.get('window').width;

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
})

export default Home
