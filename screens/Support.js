import React from 'react'
import {  Linking, View } from 'react-native';
import { Card,Title,Subheading, Text } from 'react-native-paper';
import GlobalStyle from '../components/utils/GlobalStyle';

function Support({}) {


    return (
        <View style={GlobalStyle.container}>
            <Text style={{margin:8,fontSize:16}}>We look forward to see you, in case you have any problem, you may please contact:</Text>
            <View style={{marginBottom:10}}>
                <Card.Title
                    style={GlobalStyle.topContent}
                    title='Event Manager'
                    titleStyle={{color:'#fff',fontSize:18}}
                />
                <Card.Content style={GlobalStyle.bottomContent}>
                    <Subheading>Name: Shaunak Karade</Subheading>
                    <Subheading onPress={()=>{Linking.openURL('tel:9833431053');}}>Call: +91 9833431053</Subheading>
                </Card.Content>
            </View>
            <View style={{marginBottom:10}}>
                <Card.Title
                    style={GlobalStyle.topContent}
                    title='Web Assistance'
                    titleStyle={{color:'#fff',fontSize:18}}
                />
                <Card.Content style={GlobalStyle.bottomContent}>
                    <Subheading>Name: Mohammed Kojar</Subheading>
                    <Subheading onPress={()=>{Linking.openURL('tel:9769337909');}}>Call: +91 9769337909</Subheading>
                </Card.Content>
            </View>
        </View>
    )
}

export default Support
