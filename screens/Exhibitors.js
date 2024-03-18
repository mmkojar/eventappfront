import React,{ useEffect } from 'react'
import { Fragment } from 'react';
import {  View, FlatList, Image,Linking } from 'react-native';
import { Card, Text, Paragraph, withTheme, Caption } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { getExhibitors } from '../components/redux/actions/delegateActions';
import Config from '../components/utils/Config';
import useThemeStyle from '../components/utils/useThemeStyle';

function Exhibitors() {

    const [theme,GlobalStyle] = useThemeStyle();
    const dispatch = useDispatch();
    const exhibitors = useSelector((state) => state.delegate.exhibitors);

    useEffect(() => {  
        dispatch(getExhibitors());
    }, [])

    return (
        <View style={GlobalStyle.container}>
            <FlatList
            data={exhibitors}
            numColumns={2}
            keyExtractor={(item) => item.ex_id}
            renderItem={({item}) => (
                    <Fragment>
                        <Card style={[GlobalStyle.card,{flex:1}]}>
                            <Image source={{uri: Config.imgurl+item.ex_image}} style={GlobalStyle.avatar}/>                       
                            <Card.Content style={GlobalStyle.carContent}>
                                <Paragraph style={[GlobalStyle.layoutPara,{fontSize:18,marginTop:6}]}>{item.ex_name}</Paragraph>
                                <Caption style={GlobalStyle.layoutPara} onPress={() => Linking.openURL(item.web_url)}><Text style={{color:GlobalStyle.primarycolor.color,textAlign:'center'}} >{item.web_url}</Text></Caption>
                            </Card.Content>
                        </Card>
                    </Fragment>
            )}
            />
        </View>      
    )
}

export default withTheme(Exhibitors)
