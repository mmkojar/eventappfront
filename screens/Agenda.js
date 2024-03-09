import React, { useEffect } from 'react'
import { View, FlatList, Pressable, StyleSheet, useWindowDimensions, ScrollView, Platform } from 'react-native';
import { Card, IconButton, Text } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { getAgenda } from '../components/redux/actions/delegateActions';
import useThemeStyle from '../components/utils/useThemeStyle';
import { TabView,TabBar, SceneMap } from 'react-native-tab-view';
import { Table, Row, Rows } from 'react-native-table-component';

const Agenda = ({ navigation }) => {

    const agenda = useSelector((state) => state.delegate.agenda);

    const layout = useWindowDimensions();

    const [theme, GlobalStyle] = useThemeStyle();

    const dispatch = useDispatch();

    const tableHead = ['Time', 'Agenda', 'Venue'];
    const tableData = [];
    agenda&&agenda.filter((item) => {
        if (item.title_id === '1') {
            tableData.push([item.agenda_time, item.agenda_name, item.agenda_venue]);
        }
    })
    const tableData1 = [];
    agenda&&agenda.filter((item) => {
        if (item.title_id === '2') {
            tableData1.push([item.agenda_time, item.agenda_name, item.agenda_venue]);
        }
    })
    const tableData2 = [];
    agenda&&agenda.filter((item) => {
        if (item.title_id === '3') {
            tableData2.push([item.agenda_time, item.agenda_name, item.agenda_venue]);
        }
    })
    const tableData3 = [];
    agenda&&agenda.filter((item) => {
        if (item.title_id === '4') {
            tableData3.push([item.agenda_time, item.agenda_name, item.agenda_venue]);
        }
    })
    useEffect(() => {
        dispatch(getAgenda());
    }, [])
    const widthArr = [100, 140, 240]
    const FirstRoute = () => (
        <View style={{ flex: 1, backgroundColor: '#fff' }} >
            <ScrollView horizontal={true}>
                <View>
                    <Table borderStyle={{ borderWidth: 1, borderColor: '#c8e1ff' }}>
                        <Row data={tableHead} widthArr={widthArr} style={styles.head} textStyle={{ textAlign: 'center',fontSize:18,fontFamily:Platform.OS == 'ios' ?  'FontAwesome' : 'VarelaRound-Regular' }} />
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
                                        textStyle={{ textAlign: 'center',fontFamily:Platform.OS == 'ios' ?  'FontAwesome' : 'VarelaRound-Regular' }}
                                    />
                                ))
                            }
                        </Table>
                    </ScrollView>
                </View>
            </ScrollView>
        </View>
    );

    const SecondRoute = () => (
        <View style={{ flex: 1, backgroundColor: '#fff' }} >
            <ScrollView horizontal={true}>
                <View>
                    <Table borderStyle={{ borderWidth: 1, borderColor: '#c8e1ff' }}>
                        <Row data={tableHead} widthArr={widthArr} style={styles.head} textStyle={{ textAlign: 'center',fontSize:18,fontFamily:Platform.OS == 'ios' ?  'FontAwesome' : 'VarelaRound-Regular' }} />
                    </Table>
                    <ScrollView style={{ marginTop: -1 }}>
                        <Table borderStyle={{ borderWidth: 1, borderColor: '#c8e1ff' }}>
                            {
                                tableData1.map((rowData, index) => (
                                    <Row
                                        key={index}
                                        data={rowData}
                                        widthArr={widthArr}
                                        style={[styles.row, index % 2 && { backgroundColor: '#F7F6E7' }]}
                                        textStyle={{ textAlign: 'center',fontFamily:Platform.OS == 'ios' ?  'FontAwesome' : 'VarelaRound-Regular' }}
                                    />
                                ))
                            }
                        </Table>
                    </ScrollView>
                </View>
            </ScrollView>
        </View>
    );

    const ThirdRoute = () => (
        <View style={{ flex: 1, backgroundColor: '#fff' }} >
            <ScrollView horizontal={true}>
                <View>
                    <Table borderStyle={{ borderWidth: 1, borderColor: '#c8e1ff' }}>
                        <Row data={tableHead} widthArr={widthArr} style={styles.head} textStyle={{ textAlign: 'center',fontSize:18,fontFamily:Platform.OS == 'ios' ?  'FontAwesome' : 'VarelaRound-Regular' }} />
                    </Table>
                    <ScrollView style={{ marginTop: -1 }}>
                        <Table borderStyle={{ borderWidth: 1, borderColor: '#c8e1ff' }}>
                            {
                                tableData2.map((rowData, index) => (
                                    <Row
                                        key={index}
                                        data={rowData}
                                        widthArr={widthArr}
                                        style={[styles.row, index % 2 && { backgroundColor: '#F7F6E7' }]}
                                        textStyle={{ textAlign: 'center',fontFamily:Platform.OS == 'ios' ?  'FontAwesome' : 'VarelaRound-Regular' }}
                                    />
                                ))
                            }
                        </Table>
                    </ScrollView>
                </View>
            </ScrollView>
        </View>
    );

    const FourthRoute = () => (
        <View style={{ flex: 1, backgroundColor: '#fff' }} >
            <ScrollView horizontal={true}>
                <View>
                    <Table borderStyle={{ borderWidth: 1, borderColor: '#c8e1ff' }}>
                        <Row data={tableHead} widthArr={widthArr} style={styles.head} textStyle={{ textAlign: 'center',fontSize:18,fontFamily:Platform.OS == 'ios' ?  'FontAwesome' : 'VarelaRound-Regular' }} />
                    </Table>
                    <ScrollView style={{ marginTop: -1 }}>
                        <Table borderStyle={{ borderWidth: 1, borderColor: '#c8e1ff' }}>
                            {
                                tableData3.map((rowData, index) => (
                                    <Row
                                        key={index}
                                        data={rowData}
                                        widthArr={widthArr}
                                        style={[styles.row, index % 2 && { backgroundColor: '#F7F6E7' }]}
                                        textStyle={{ textAlign: 'center',fontFamily:Platform.OS == 'ios' ?  'FontAwesome' : 'VarelaRound-Regular' }}
                                    />
                                ))
                            }
                        </Table>
                    </ScrollView>
                </View>
            </ScrollView>
        </View>
    );

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'Day1' },
        { key: 'second', title: 'Day2' },
        { key: 'third', title: 'Day3' },
        { key: 'forth', title: 'Day4' },
    ]);

    const renderScene = SceneMap({
        first: FirstRoute,
        second: SecondRoute,
        third: ThirdRoute,
        forth: FourthRoute,
    });

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
        <View style={GlobalStyle.container}>
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{ width: layout.width }}
                // style={{backgroundColor: theme.colors.primary}}
                renderTabBar={props => <TabBar {...props} style={{backgroundColor: theme.colors.primary}} labelStyle={{fontFamily:Platform.OS == 'ios' ?  'FontAwesome' : 'VarelaRound-Regular'}}/>} 

            />
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
        </View>
    )
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
