import React from 'react'
import {  View } from 'react-native';
import { Card,Title,Subheading } from 'react-native-paper';
import useThemeStyle from '../components/utils/useThemeStyle';

function AgendaDetail({route}) {

    const [theme,GlobalStyle] = useThemeStyle();
    const { name, date, time, speaker_name, venue } = route.params;

    return (
        <View style={GlobalStyle.container}>                         
            <Card.Title
                style={GlobalStyle.topContent}
                title={name}
                titleStyle={{color:'#fff'}}
            />
            <Card.Content style={GlobalStyle.bottomContent}>
                <Title>Speaker Name: {speaker_name}</Title>                                
                <Subheading>Venue: {venue}</Subheading>
                <Subheading>Date: {date}</Subheading>                            
                <Subheading>Time: {time}</Subheading>
            </Card.Content>
        </View>
    )
}

export default AgendaDetail
