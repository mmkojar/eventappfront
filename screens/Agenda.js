import React, { useEffect } from 'react'
import { View, StyleSheet, ScrollView, Platform } from 'react-native';
// import { Card, IconButton, Text } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { getAgenda } from '../components/redux/actions/delegateActions';
import useThemeStyle from '../components/utils/useThemeStyle';
import { Table, Row, Rows } from 'react-native-table-component';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

const tabPages = (tableData) => {

    const widthArr = [100, 140, 240]
    const tableHead = ['Time', 'Agenda', 'Venue'];

    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }} >
            <ScrollView horizontal={true}>
                <View>
                    <Table borderStyle={{ borderWidth: 1, borderColor: '#c8e1ff' }}>
                        <Row data={tableHead} widthArr={widthArr} style={styles.head} textStyle={{ textAlign: 'center',color:'#000',fontSize:18,fontFamily:Platform.OS == 'ios' ?  'FontAwesome' : 'VarelaRound-Regular' }} />
                    </Table>
                    <ScrollView style={{ marginTop: -1 }}>
                        <Table borderStyle={{ borderWidth: 1, borderColor: '#c8e1ff' }}>
                            {
                                tableData.map((rowData, index) => (
                                    <Row
                                        key={index}
                                        data={rowData}
                                        widthArr={widthArr}
                                        style={[styles.row, index % 2 && { backgroundColor: '#F7F6E7' }]}
                                        textStyle={{ textAlign: 'center',color:'#000',fontFamily:Platform.OS == 'ios' ?  'FontAwesome' : 'VarelaRound-Regular' }}
                                    />
                                ))
                            }
                        </Table>
                    </ScrollView>
                </View>
            </ScrollView>
        </View>
    )
}

const tabPages1 = () => {

    const agenda = useSelector((state) => state.delegate.agenda); 
    
    const tableData = [];
    agenda&&agenda.filter((item) => {
        if (item.title_id === '1') {
            tableData.push([item.agenda_time, item.agenda_name, item.agenda_venue]);
        }
    })

    return tabPages(tableData)
}
const tabPages2 = () => {

    const agenda = useSelector((state) => state.delegate.agenda); 
    
    const tableData = [];
    agenda&&agenda.filter((item) => {
        if (item.title_id === '2') {
            tableData.push([item.agenda_time, item.agenda_name, item.agenda_venue]);
        }
    })

    return tabPages(tableData)
}
const tabPages3 = () => {

    const agenda = useSelector((state) => state.delegate.agenda); 
    
    const tableData = [];
    agenda&&agenda.filter((item) => {
        if (item.title_id === '3') {
            tableData.push([item.agenda_time, item.agenda_name, item.agenda_venue]);
        }
    })

    return tabPages(tableData)
}
const tabPages4 = () => {

    const agenda = useSelector((state) => state.delegate.agenda); 
    
    const tableData = [];
    agenda&&agenda.filter((item) => {
        if (item.title_id === '4') {
            tableData.push([item.agenda_time, item.agenda_name, item.agenda_venue]);
        }
    })

    return tabPages(tableData)
}

const Agenda = ({ navigation }) => {

    const dispatch = useDispatch();

    
    useEffect(() => {
        dispatch(getAgenda());
    }, [])

    /* const pressHandler = (item) => {
        navigation.navigate('AgendaDetail', {
            id: item.id,
            name: item.agenda_name,
            date: item.agenda_date,
            time: item.agenda_time,
            speaker_name: item.speaker_name,
            venue: item.agenda_venue,
        });
    } */

    return (
        <Tab.Navigator>
            <Tab.Screen name="Day1" component={tabPages1} />
            <Tab.Screen name="Day2" component={tabPages2} />
            <Tab.Screen name="Day3" component={tabPages3} />
            <Tab.Screen name="Day4" component={tabPages4} />
        </Tab.Navigator>
    )
    {/* <FlatList
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
        /> */}
}


const styles = StyleSheet.create({
    title: {
        fontSize: 16,
        lineHeight: 18,
        marginLeft: -10,
        textAlignVertical: 'center'
    },
    right: {
        // widht:90,
        borderRadius: 50,
        minHeight: 60,
        textAlignVertical: 'center',
    },
    rightText: {
        // width:126,
        padding: 12,
        color: '#fff',
        textAlign: 'center',
    },
    head: { height: 40, backgroundColor: '#f1f8ff' },
    row: { height: 60, backgroundColor: '#E7E6E1' }
})

export default React.memo(Agenda)
