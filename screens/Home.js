import React,{useEffect} from 'react'
import {  View,StyleSheet,Image,ScrollView,Pressable, Dimensions,Platform  } from 'react-native';
import { Button,Card,Text } from 'react-native-paper';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import useThemeStyle from '../components/utils/useThemeStyle';
import Config from '../components/utils/Config';
import { fcmService } from '../services/FCMService';
import { useDispatch, useSelector } from 'react-redux';
import { checkToken } from '../components/redux/actions/authActions';

function Home({ navigation }) {

    const [theme,GlobalStyle, themeoptions, displaysetting] = useThemeStyle();
    const authData = useSelector((state) => state.auth);

    useEffect(() => {
        
        const tokeninterval = setInterval(() => {            
            fcmService.getToken(onRegister)
        }, 5000);

        return () => {
            clearInterval(tokeninterval);
        }
    }, [])

    const dispatch = useDispatch();
    const onRegister = (res) => {
        dispatch(checkToken(authData.data.user_id,res));
    }

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <View>
                    <Image
                        style={{height:40,width:40,marginLeft:8}}                        
                        source={(themeoptions && themeoptions.hp_logo !== null) ? {uri:Config.imgurl+(themeoptions && themeoptions.hp_logo)} : require('../assets/homelogo.png')}
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
                      size={Platform.OS=='ios'?25:30}
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
            {
                 displaysetting && displaysetting.hp_main_logo == '1'?
                 <Image
                    style={{height:120,width:310,alignSelf:'center'}}
                    source={(themeoptions && themeoptions.hp_main_logo !== null) ? {uri:Config.imgurl+(themeoptions && themeoptions.hp_main_logo)} : require('../assets/app_banner.png')}
                /> :null
            }
            
            <View style={styles.container}>
                    {
                        displaysetting && displaysetting.about == '1'?
                            <Pressable onPress={() => navigation.navigate('EventOverview')}>
                            <Card style={styles.innerItem}elevation={3}>
                                    <Image
                                        style={styles.image}
                                        source={(themeoptions && themeoptions.about_file !== null) ? {uri:Config.imgurl+(themeoptions && themeoptions.about_file)} : require('../assets/Icons/1.png')}
                                    >
                                    </Image>
                                    <Text style={GlobalStyle.homeIconText}>{(themeoptions && themeoptions.about !== null) ? themeoptions.about : 'Event OverView'}</Text>
                            </Card>
                        </Pressable>:null
                    }
                    {displaysetting && displaysetting.event_feed == '1'? 
                    <Pressable onPress={() => navigation.navigate('EventFeed')}> 
                        <Card style={styles.innerItem} elevation={3}>
                            <Image
                                style={styles.image}                 
                                source={(themeoptions && themeoptions.event_feed_file !== null) ? {uri:Config.imgurl+(themeoptions && themeoptions.event_feed_file)} : require('../assets/Icons/1.png')}
                            >
                            </Image>
                            <Text style={GlobalStyle.homeIconText}>{(themeoptions && themeoptions.event_feed != null) ? themeoptions.event_feed : 'Event Feed'}</Text>
                        </Card>
                    </Pressable>:null
                    }
                    {
                        displaysetting && displaysetting.agenda == '1'?                     
                        <Pressable onPress={() => navigation.navigate('Agenda')}> 
                            <Card style={styles.innerItem}elevation={3}>
                                <Image
                                    style={styles.image}
                                    source={(themeoptions && themeoptions.agenda_file !== null) ? {uri:Config.imgurl+(themeoptions && themeoptions.agenda_file)} : require('../assets/Icons/2.png')}
                                >
                                </Image>
                                <Text style={GlobalStyle.homeIconText}>{(themeoptions && themeoptions.agenda !== null) ? themeoptions.agenda : 'Agenda'}</Text>
                            </Card>
                        </Pressable>:null
                    }     
                    {displaysetting && displaysetting.delg == '1'? 
                        <Pressable onPress={() => navigation.navigate('Delegates')}>
                        <Card style={styles.innerItem}elevation={3}>
                            <Image
                                style={styles.image}                                
                                source={(themeoptions && themeoptions.delg_file !== null) ? {uri:Config.imgurl+(themeoptions && themeoptions.delg_file)} : require('../assets/Icons/4.png')}
                            >
                            </Image>
                            <Text style={GlobalStyle.homeIconText}>{(themeoptions && themeoptions.delg != null) ? themeoptions.delg : 'Delegates'}</Text>
                        </Card>
                    </Pressable>:null
                    }
                    {displaysetting && displaysetting.chat == '1'? 
                        <Pressable onPress={() => navigation.navigate('ChatList')}> 
                        <Card style={styles.innerItem}elevation={3}>
                            <Image
                                style={styles.image}                                
                                source={(themeoptions && themeoptions.chat_file !== null) ? {uri:Config.imgurl+(themeoptions && themeoptions.chat_file)} : require('../assets/Icons/6.png')}
                            >
                            </Image>
                            <Text style={GlobalStyle.homeIconText}>{(themeoptions && themeoptions.chat != null) ? themeoptions.chat : 'Chat'}</Text>
                        </Card>
                    </Pressable>:null
                    }
                    {displaysetting && displaysetting.notify == '1'? 
                        <Pressable onPress={() => navigation.navigate('Notification')}> 
                        <Card style={styles.innerItem}elevation={3}>
                            <Image
                                style={styles.image}                                
                                source={(themeoptions && themeoptions.notify_file !== null) ? {uri:Config.imgurl+(themeoptions && themeoptions.notify_file)} : require('../assets/Icons/8.png')}
                            >
                            </Image>
                            <Text style={GlobalStyle.homeIconText}>{(themeoptions && themeoptions.notify != null) ? themeoptions.notify : 'Notification'}</Text>
                        </Card>
                    </Pressable>:null
                    }
                    {displaysetting && displaysetting.support == '1'? 
                        <Pressable onPress={() => navigation.navigate('Support')}> 
                        <Card style={styles.innerItem} elevation={3}>
                            <Image
                                style={styles.image}                                
                                source={(themeoptions && themeoptions.support_file !== null) ? {uri:Config.imgurl+(themeoptions && themeoptions.support_file)} : require('../assets/Icons/14.png')}
                            >
                            </Image>
                            <Text style={GlobalStyle.homeIconText}>{(themeoptions && themeoptions.support != null) ? themeoptions.support : 'Support'}</Text>
                        </Card>
                    </Pressable>:null
                    }
                    {displaysetting && displaysetting.polls == '1'? 
                        <Pressable onPress={() => navigation.navigate('Polling')}> 
                        <Card style={styles.innerItem}elevation={3}>
                            <Image
                                style={styles.image}                                
                                source={(themeoptions && themeoptions.polls_file !== null) ? {uri:Config.imgurl+(themeoptions && themeoptions.polls_file)} : require('../assets/Icons/15.png')}
                            >
                            </Image>
                            <Text style={GlobalStyle.homeIconText}>{(themeoptions && themeoptions.polls != null) ? themeoptions.polls : 'Polling'}</Text>
                        </Card>
                    </Pressable>:null
                    }
                    {displaysetting && displaysetting.qr == '1' ? 
                        <Pressable onPress={() => navigation.navigate('QRScan')}> 
                        <Card style={styles.innerItem}elevation={3}>
                            <Image
                                style={styles.image}                                
                                source={(themeoptions && themeoptions.qr_file !== null) ? {uri:Config.imgurl+(themeoptions && themeoptions.qr_file)} : require('../assets/Icons/13.png')}
                            >
                            </Image>
                            <Text style={GlobalStyle.homeIconText}>{(themeoptions && themeoptions.qr != null) ? themeoptions.qr : 'QRScan'}</Text>
                        </Card>
                    </Pressable>:null
                    }
                    {displaysetting && displaysetting.speaker == '1'? 
                        <Pressable onPress={() => navigation.navigate('Speakers')}> 
                        <Card style={styles.innerItem} elevation={3}>
                            <Image
                                style={styles.image}                                
                                source={(themeoptions && themeoptions.speaker_file !== null) ? {uri:Config.imgurl+(themeoptions && themeoptions.speaker_file)} : require('../assets/Icons/3.png')}
                            >
                            </Image>
                            <Text style={GlobalStyle.homeIconText}>{(themeoptions && themeoptions.speaker != null) ? themeoptions.speaker : 'Speakers'}</Text>
                        </Card>
                    </Pressable>:null
                    }
                    {displaysetting && displaysetting.sponsors == '1'? 
                        <Pressable onPress={() => navigation.navigate('Artist')}> 
                        <Card style={styles.innerItem} elevation={3}>
                            <Image
                                style={styles.image}                                
                                source={(themeoptions && themeoptions.sponsors_file !== null) ? {uri:Config.imgurl+(themeoptions && themeoptions.sponsors_file)} : require('../assets/Icons/5.png')}
                            >
                            </Image>
                            <Text style={GlobalStyle.homeIconText}>{(themeoptions && themeoptions.sponsors != null) ? themeoptions.sponsors : 'Sponsors'}</Text>
                        </Card>
                    </Pressable>:null
                    }
                    {displaysetting && displaysetting.exhi == '1'? 
                        <Pressable onPress={() => navigation.navigate('Exhibitors')}> 
                        <Card style={styles.innerItem} elevation={3}>
                            <Image
                                style={styles.image}                                
                                source={(themeoptions && themeoptions.exhi_file !== null) ? {uri:Config.imgurl+(themeoptions && themeoptions.exhi_file)} : require('../assets/Icons/12.png')}
                            >
                            </Image>
                            <Text style={GlobalStyle.homeIconText}>{(themeoptions && themeoptions.exhi != null) ? themeoptions.exhi : 'Exhibitors'}</Text>
                        </Card>
                    </Pressable>:null
                    }
                    {displaysetting && displaysetting.faq == '1'? 
                        <Pressable onPress={() => navigation.navigate('FAQ')}>
                        <Card style={styles.innerItem} elevation={3}>
                            <Image
                                style={styles.image}                                
                                source={(themeoptions && themeoptions.faq_file !== null) ? {uri:Config.imgurl+(themeoptions && themeoptions.faq_file)} : require('../assets/Icons/9.png')}
                            >
                            </Image>
                        <Text style={GlobalStyle.homeIconText}>{(themeoptions && themeoptions.faq != null) ? themeoptions.faq : 'FAQ'}</Text>
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
