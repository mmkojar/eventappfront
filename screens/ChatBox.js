import React,{useEffect, useState} from 'react'
import { View,StyleSheet,FlatList,Keyboard, RefreshControl,KeyboardAvoidingView, Platform, TouchableWithoutFeedback } from 'react-native';
import { Text,TextInput } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { sendMessage, getAllChats } from '../components/redux/actions/chatActions';
// import { START_LOADER, STOP_LOADER } from '../components/redux/actions/type';
import useThemeStyle from '../components/utils/useThemeStyle';

const ChatBox = ({ route, navigation }) => {
    
    const [theme,GlobalStyle] = useThemeStyle();

    const receiver_id = route.params.id;
    
    const dispatch = useDispatch();
    const authData = useSelector((state) => state.auth);
    const chatMsgs = useSelector((state) => state.chats.data);
    const [message,Setmessage] = useState();

    useEffect(() => {
        
        // dispatch({
        //     type: START_LOADER,
        // });
        const chatInterval = setInterval(() => {            
            dispatch(getAllChats(authData.data.user_id,receiver_id));
        }, 100);

        return () => {             
            clearInterval(chatInterval);
            // dispatch({
            //     type: STOP_LOADER,
            // });
        }
    }, [])
    
    const [referesing,setReferesing] = useState(false);
    const onReferesh = () => {
        setReferesing(true)
        dispatch(getAllChats(authData.data.user_id,receiver_id));
        setReferesing(false)
    }
    React.useLayoutEffect(() => {
        navigation.setOptions({
           title:route.params.full_name,
        });
    }, [navigation]);
        
    const pressHandler = () => {
        dispatch(sendMessage(authData.data.user_id,receiver_id,message));
        dispatch(getAllChats(authData.data.user_id,receiver_id));
        Setmessage('');
    }

    const keydate = new Date();
    return (
        <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding" : ""} style={{flex:1}}
            keyboardVerticalOffset={Platform.OS === 'ios' && 90}
        >
            {/* <TouchableWithoutFeedback  onPress={() => Keyboard.dismiss()}> */}
                <View style={styles.Main}>
                    <FlatList
                        keyExtractor={(item) => item.chat_detail_id+'-'+keydate}
                        data={chatMsgs}
                        inverted={true}
                        renderItem={({item}) => (
                            <View>
                                {
                                    (item.user_id == authData.data.user_id && item.receiver_id == receiver_id) ? 
                                    <Text style={[styles.rightalign,{backgroundColor:GlobalStyle.secondarycolor.color}]}><Text style={[styles.innerText,{color:'#000'}]}>{item.message}</Text></Text> : 
                                    (item.user_id == receiver_id && item.receiver_id == authData.data.user_id) ?
                                    <Text  style={[styles.leftalign,{backgroundColor:GlobalStyle.primarycolor.color}]}><Text style={[styles.innerText,{color:'#fff'}]}>{item.message}</Text></Text> : 
                                    <Text></Text>
                                }
                            </View>
                        )}
                        refreshControl= {
                            <RefreshControl 
                            refreshing={referesing}
                            onRefresh={onReferesh}
                            />
                        }
                    />
                    <TextInput
                        onChangeText={(val) => Setmessage(val)}
                        value={message}
                        right={<TextInput.Icon name="send" onPress={pressHandler} disabled={message == 'null' ? true : false}/>}
                    />
                </View>
            {/* </TouchableWithoutFeedback> */}
        </KeyboardAvoidingView>
    )
}
const styles = StyleSheet.create({
    Main:{
        flex:1,
        // marginVertical:20,
    },
    rightalign:{        
        padding:12,        
        margin:4,
        borderRadius:20,
        alignSelf:'flex-end',
    },
    leftalign:{
        padding:12,
        margin:4,        
        borderRadius:20,
        // justifyContent:'flex-start',
        alignSelf:'flex-start',
    },
    innerText:{
        fontSize:16,
    }
})

export default ChatBox
