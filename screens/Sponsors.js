import React,{ useEffect } from 'react'
import { Fragment } from 'react';
import {  View, FlatList, Image,Linking } from 'react-native';
import { Text,Card,Paragraph, withTheme, Caption } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { getSponsors } from '../components/redux/actions/delegateActions';
import Config from '../components/utils/Config';
import useThemeStyle from '../components/utils/useThemeStyle';

function Sponsors() {

    const [theme,GlobalStyle] = useThemeStyle();
    const dispatch = useDispatch();
    const result = useSelector((state) => state.delegate);
    const { sponsor } = result;

    useEffect(() => {  
        dispatch(getSponsors());
    }, [dispatch])

    return (
        <View style={GlobalStyle.container}>
            <FlatList
            data={sponsor}
            numColumns={2}
            keyExtractor={(item) => item.id}
            renderItem={({item}) => (
                    <Fragment>
                        <Card style={[GlobalStyle.card,{flex:1}]}>
                            <Image source={{uri: Config.imgurl+item.image}} style={GlobalStyle.avatar}/>                       
                            <Card.Content style={GlobalStyle.carContent}>
                                <Paragraph style={[GlobalStyle.layoutPara,{fontSize:18,marginTop:6}]}>{item.name}</Paragraph>
                                <Caption style={GlobalStyle.layoutPara} onPress={() => Linking.openURL(item.link)}><Text style={{color:GlobalStyle.primarycolor.color}} >{item.link}</Text></Caption>
                            </Card.Content>
                        </Card>
                    </Fragment>
            )}
            />
        </View>      
    )
}
export default withTheme(Sponsors)
