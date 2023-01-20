import React,{ useEffect } from 'react'
import { Fragment } from 'react';
import {  View, FlatList, Image } from 'react-native';
import { Caption, Card, Paragraph} from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { getSpeakers } from '../components/redux/actions/delegateActions';
import Config from '../components/utils/Config';
import useThemeStyle from '../components/utils/useThemeStyle';

function Speakers() {

    const [theme,GlobalStyle] = useThemeStyle();
    const dispatch = useDispatch();
    const speaker = useSelector((state) => state.delegate.speaker);

    useEffect(() => {  
        dispatch(getSpeakers());
    }, [])

    return (
        <View style={GlobalStyle.container}>
            <FlatList
            data={speaker}
            numColumns={2}
            keyExtractor={(item) => item.id}
            renderItem={({item}) => (
                    <Fragment>
                        <Card style={[GlobalStyle.card,{flex:1}]}>
                            <Image source={{uri: Config.imgurl+item.image}} style={GlobalStyle.avatar}/>                        
                            <Card.Content style={GlobalStyle.carContent}>
                                <Paragraph style={[GlobalStyle.layoutPara,{fontSize:18,marginTop:6}]}>{item.name}</Paragraph>
                                <Caption style={GlobalStyle.layoutPara}>{item.company_name}</Caption>
                            </Card.Content>
                        </Card>
                    </Fragment>
            )}
            />
        </View>      
    )
}
export default Speakers
