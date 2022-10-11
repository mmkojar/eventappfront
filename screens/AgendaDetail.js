import React from 'react'
import {  View } from 'react-native';
import { Card,Title,Subheading } from 'react-native-paper';
import GlobalStyle from '../components/utils/GlobalStyle';

function AgendaDetail({route}) {

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
