import React,{ useEffect } from 'react'
import {  View,FlatList } from 'react-native';
import { Card,Subheading } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { getAboutEvent } from '../components/redux/actions/delegateActions';
import useThemeStyle from '../components/utils/useThemeStyle';

const Event_overview = () => {

    const [theme,GlobalStyle] = useThemeStyle();
    const aboutevent = useSelector((state) => state.delegate.about);

    const dispatch = useDispatch();    

    useEffect(() => {  
        dispatch(getAboutEvent());
    }, [])
    
        
    return (
        <View style={GlobalStyle.container}>
            <FlatList
            keyExtractor={(item) => item.about_id}            
            data={aboutevent}
            renderItem={({item}) => (
                <View>
                    <Card.Title
                        style={GlobalStyle.topContent}
                        title={item.about_heading}
                        titleStyle={{color:'#fff'}}
                    />
                   <Card.Content style={GlobalStyle.bottomContent}>
                        <Subheading style={{fontSize:18}}>{item.about_msg}</Subheading>
                    </Card.Content>
                </View>
            )}
            />
        </View>
    )
}

export default Event_overview
