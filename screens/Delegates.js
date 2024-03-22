import React,{useEffect, useState} from 'react'
import {  View,FlatList,Pressable,RefreshControl } from 'react-native';
import { Card,IconButton,Avatar,TextInput } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { getAllDelegates } from '../components/redux/actions/delegateActions';
import Config from '../components/utils/Config';
import useThemeStyle from '../components/utils/useThemeStyle';
import filter from 'lodash.filter';

const Delegates = ({ navigation }) => {

    const [theme,GlobalStyle,themeoptions] = useThemeStyle();
    const dispatch = useDispatch();
    const delglist = useSelector((state) => state.delegate.delegates);
    const authData = useSelector((state) => state.auth);
    const [delgdata, setDelgData] = useState([]);

    // filter Data
    const [query, setQuery] = useState('');
    const [fullData, setFullData] = useState([]);

    useEffect(() => {
        dispatch(getAllDelegates());
        setDelgData(delglist);
        setFullData(delglist);
        return () =>{
            
        }
    }, [])
        
    const [referesing,setReferesing] = useState(false);
    const onReferesh = () => {
        setReferesing(true)
        dispatch(getAllDelegates());
        setReferesing(false)
    }

    const pressHandler = (item) => {
        navigation.navigate('AttendeeProfile', {
            id: item.id,
            full_name: item.first_name+' '+item.last_name,            
            company: item.company,
            user_image: item.user_image
        });
    }

     // filter chats
    const handleSearch = text => {
        const formattedQuery = text.toLowerCase();
        const filteredData = filter(fullData, user => {
          return contains(user, formattedQuery);
        });
        setDelgData(filteredData);
        setQuery(text);
    };

    const contains = (user, query) => {
        const { first_name, last_name, company, email, phone } = user;
        
        if (first_name.toLowerCase().includes(query) || 
            last_name.toLowerCase().includes(query) || 
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
                    <TextInput                        
                        autoCapitalize="none"
                        autoCorrect={false}
                        clearButtonMode="always"
                        value={query}
                        onChangeText={queryText => handleSearch(queryText)}
                        placeholder="Search"
                        style={{ backgroundColor: '#fff'}}
                        />
                    </View>
                }                
                keyExtractor={(item) => item.id}
                data={delgdata && delgdata.filter((item) => item.id !== authData.data.user_id)}
                renderItem={({item}) => (
                    <Pressable onPress={() => pressHandler(item)}>
                        <Card.Title              
                            style={GlobalStyle.cardTitle}
                            title={item.first_name+' '+item.last_name}
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


export default Delegates
