import React,{useEffect, useState} from 'react'
import {  View,FlatList,Pressable,RefreshControl } from 'react-native';
import { Card,IconButton,Avatar } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { getAllDelegates } from '../components/redux/actions/delegateActions';
import Config from '../components/utils/Config';
import GlobalStyle from '../components/utils/GlobalStyle';

const GStyle = GlobalStyle;

const Delegates = ({ navigation }) => {

    const dispatch = useDispatch();
    const delglist = useSelector((state) => state.delegate.delegates);
    const authData = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(getAllDelegates());
        
    }, [dispatch])
        
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
            user_image: Config.imgurl+item.user_image
        });
    }

    return (
        <View style={GlobalStyle.container}>
            <FlatList
                keyExtractor={(item) => item.id}            
                data={delglist && delglist.filter((item) => item.id !== authData.data.user_id)}
                renderItem={({item}) => (
                    <Pressable onPress={() => pressHandler(item)}>
                        <Card.Title              
                            style={GStyle.cardTitle}
                            title={item.first_name+' '+item.last_name}
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


export default Delegates
