import React,{useEffect, useState} from 'react'
import {  View,FlatList,Pressable,RefreshControl } from 'react-native';
import { Avatar, Card,IconButton, TextInput } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { getChatHistory } from '../components/redux/actions/chatActions';
import Config from '../components/utils/Config';
import useThemeStyle from '../components/utils/useThemeStyle';
import filter from 'lodash.filter';

const ChatList = ({ navigation }) => {

    const [theme,GlobalStyle,themeoptions] = useThemeStyle();
    const dispatch = useDispatch();
    const chathistory = useSelector((state) => state.chats.chathistory);
    const admins = useSelector((state) => state.chats.admins);

    const authData = useSelector((state) => state.auth);
    const [msgdata, setMsgData] = useState([]);

    // filter Data
    const [query, setQuery] = useState('');
    const [fullData, setFullData] = useState([]);

    useEffect(() => {

        const chatInterval = setInterval(() => {            
        dispatch(getChatHistory(authData.data.user_id));
        }, 1000)
        console.log(chathistory);
        if(authData.data.group=="admin") {
            setMsgData(chathistory);
            setFullData(chathistory);
        } else {
            setMsgData(admins);
        }
        return () =>{
            clearInterval(chatInterval);
        }
    }, [])
        
    
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

     // filter chats
    const handleSearch = text => {
        const formattedQuery = text.toLowerCase();
        const filteredData = filter(fullData, user => {
          return contains(user, formattedQuery);
        });
        setMsgData(filteredData);
        setQuery(text);
    };

    const contains = (user, query) => {
        const { user_name, company, email, phone } = user;
        
        if (user_name.toLowerCase().includes(query) ||
            company.toLowerCase().includes(query) || 
            email.toLowerCase().includes(query) ||
            phone.toLowerCase().includes(query)) {
            return true;
        }
        
        return false;
    };

    const du_image = (themeoptions && themeoptions.du_image !== null) ? {uri:Config.imgurl+(themeoptions && themeoptions.du_image)} : require('../assets/user.png');

    return (
        <View style={GlobalStyle.container}>
            <FlatList
                ListHeaderComponent={
                    <View
                        style={{
                        backgroundColor: '#fff',
                        paddingHorizontal: 10,
                        marginBottom:10,
                        marginTop:-10,
                        borderRadius: 20
                        }}
                    >
                        {
                            authData.data.group=="admin"?
                            <TextInput                        
                                autoCapitalize="none"
                                autoCorrect={false}
                                clearButtonMode="always"
                                value={query}
                                onChangeText={queryText => handleSearch(queryText)}
                                placeholder="Search"
                                style={{ backgroundColor: '#fff'}}
                            />:null
                        }
                    
                    </View>
                }
                keyExtractor={(item) => item.chat_detail_id}            
                data={msgdata}
                renderItem={({item}) => (
                    <Pressable onPress={() => pressHandler(item)}>
                        <Card.Title              
                            style={GlobalStyle.cardTitle}
                            title={item.user_name}
                            titleStyle={{marginTop:0}}
                            subtitle={item.company ? item.company : 'Company Name'}
                            subtitleStyle={{color:'#000'}}
                            left={(props) => <Avatar.Image {...props} size={42} source={(item.user_image !== null) ? {uri:Config.imgurl+item.user_image} : du_image} />}
                            right={(props) => <IconButton {...props} size={30} icon="arrow-right" color={GlobalStyle.primarycolor.color} onPress={() => pressHandler(item)} />}
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
