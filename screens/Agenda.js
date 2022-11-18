import React,{ useEffect } from 'react'
import {  View,FlatList, Pressable, StyleSheet } from 'react-native';
import { Card,IconButton,Text } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { getAgenda } from '../components/redux/actions/delegateActions';
import useThemeStyle from '../components/utils/useThemeStyle';

function Agenda({navigation}) {

    const [theme,GlobalStyle] = useThemeStyle();
    const dispatch = useDispatch();
    const result = useSelector((state) => state.delegate);
    const { agenda } = result;
    
    useEffect(() => {  
        dispatch(getAgenda());
    }, [dispatch])

    const pressHandler = (item) => {
        navigation.navigate('AgendaDetail', {
            id: item.id,
            name: item.agenda_name,
            date: item.agenda_date,
            time: item.agenda_time,
            speaker_name: item.speaker_name,
            venue: item.agenda_venue,
        });
    }

    return (
        <View style={GlobalStyle.container}>
                <FlatList
                    data={agenda}
                    // numColumns={1}
                    keyExtractor={(item) => item.agenda_id}
                    renderItem={({item}) => (
                        <Pressable onPress={() => pressHandler(item)}>
                            <Card.Title
                                style={GlobalStyle.cardTitle}
                                title={item.agenda_name}
                                titleNumberOfLines={3}
                                titleStyle={styles.title}
                                left={(props) => <IconButton {...props} size={24} icon="send" color={GlobalStyle.primarycolor.color} onPress={() => pressHandler(item)} />}
                                leftStyle={{marginLeft:-10}}
                                right={(props) =>  <Text {...props} style={styles.rightText}>{item.agenda_date}{"\n"}{item.agenda_time}</Text>}
                                rightStyle={[styles.right,{backgroundColor:GlobalStyle.primarycolor.color}]}
                            />
                        </Pressable>
                )}
                />
        </View>
    )
}


const styles = StyleSheet.create({
    title:{
        fontSize:16,
        lineHeight:18,
        marginLeft:-10,
        textAlignVertical:'center'
    },
    right:{        
        // widht:90,
        borderRadius:50,
        minHeight:60,
        textAlignVertical:'center',
    },
    rightText:{
        // width:126,
        padding:12,
        color:'#fff',
        textAlign:'center',
    }
})

export default Agenda
