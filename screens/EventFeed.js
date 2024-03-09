import React,{ useEffect } from 'react'
import { Fragment } from 'react';
import {  View, FlatList, Image,Linking } from 'react-native';
import { Card, Text, Paragraph, withTheme, Caption } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { getEventFeed } from '../components/redux/actions/delegateActions';
import Config from '../components/utils/Config';
import useThemeStyle from '../components/utils/useThemeStyle';

function EventFeed() {

    const [theme,GlobalStyle] = useThemeStyle();
    const dispatch = useDispatch();
    const event_feed = useSelector((state) => state.delegate.event_feed);

    useEffect(() => {  
        dispatch(getEventFeed());
    }, [])

    return (
        <View style={[GlobalStyle.container,{padding:20}]}>
            <FlatList
            data={event_feed}
            numColumns={1}
            keyExtractor={(item) => item.id}
            renderItem={({item}) => (
                    <Fragment>
                        <Card style={[GlobalStyle.card,{flex:1,padding:10}]} elevation={4}>
                            <Image source={{uri: Config.imgurl+item.image}} style={{height:300}}/>                       
                            <Card.Content style={GlobalStyle.carContent}>
                                <Paragraph style={[GlobalStyle.layoutPara,{fontSize:18,marginTop:6}]}>{item.title}</Paragraph>
                                {/* <Caption style={GlobalStyle.layoutPara} onPress={() => Linking.openURL(item.web_url)}><Text style={{color:GlobalStyle.primarycolor.color}} >{item.web_url}</Text></Caption> */}
                            </Card.Content>
                        </Card>
                    </Fragment>
            )}
            />
        </View>      
    )
}

export default withTheme(EventFeed)
