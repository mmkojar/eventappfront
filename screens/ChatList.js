import React,{useEffect, useState} from 'react'
import {  View,FlatList,Pressable,RefreshControl } from 'react-native';
import { Avatar, Card,IconButton } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { getChatHistory } from '../components/redux/actions/chatActions';
import Config from '../components/utils/Config';
import GlobalStyle from '../components/utils/GlobalStyle';

const GStyle = GlobalStyle;

const ChatList = ({ navigation }) => {

    const dispatch = useDispatch();
    const chathistory = useSelector((state) => state.chats.chathistory);
    const authData = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(getChatHistory(authData.data.user_id));
    }, [dispatch])
        
    
    const [referesing,setReferesing] = useState(false);
    const onReferesh = () => {
        setReferesing(true)
        dispatch(getChatHistory(authData.data.user_id));
        setReferesing(false)
    }

    const pressHandler = (item) => {
        navigation.navigate('ChatBox', {
            id: item.user2_id,
            full_name: item.user_name,
        });
    }

    return (
        <View style={GStyle.container}>
            <FlatList
                keyExtractor={(item) => item.chat_detail_id}            
                data={chathistory}
                renderItem={({item}) => (
                    <Pressable onPress={() => pressHandler(item)}>
                        <Card.Title              
                            style={GStyle.cardTitle}
                            title={item.user_name}
                            titleStyle={{marginTop:0}}
                            subtitle={item.company ? item.company : 'Company Name'}
                            subtitleStyle={{color:'#000'}}
                            left={(props) => <Avatar.Image {...props} size={42} source={(Config.imgurl+item.user_image !== null) ? {uri:Config.imgurl+item.user_image} : require('../assets/user.png')} />}                                
                            right={(props) => <IconButton {...props} size={30} icon="arrow-right" color={GStyle.primarycolor.color} onPress={() => pressHandler(item)} />}
                        />
                    </Pressable >
                )}
                refreshControl= {
                    <RefreshControl
                    refreshing={referesing}
                    onRefresh={onReferesh}
                    />
                }
            />
        </View>
    )
}

export default ChatList
