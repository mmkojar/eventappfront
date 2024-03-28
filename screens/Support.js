import React, { useEffect } from 'react'
import {  FlatList, Linking, View } from 'react-native';
import { Card,Subheading, Text } from 'react-native-paper';
import useThemeStyle from '../components/utils/useThemeStyle';
import { useDispatch, useSelector } from 'react-redux';
import { getSupport } from '../components/redux/actions/delegateActions';

function Support({}) {

    const [theme,GlobalStyle] = useThemeStyle();

    const support = useSelector((state) => state.delegate.support)

    const dispatch = useDispatch();

     useEffect(() => {
          dispatch(getSupport());
     }, [])

    return (
            <View style={GlobalStyle.container}>
                <Text style={{margin:8,fontSize:16}}>We look forward to see you, in case you have any problem, you may please contact:</Text>
                    <FlatList
                    data={support}
                    keyExtractor={(item) => item.id}
                    removeClippedSubviews
                    renderItem={({item}) => (
                        <View style={{marginBottom:10}}>
                            <Card.Title
                                style={GlobalStyle.topContent}
                                title={item.title}
                                titleStyle={{color:'#fff',fontSize:18}}
                            />
                            <Card.Content style={GlobalStyle.bottomContent}>
                                <Subheading>Name: {item.name}</Subheading>
                                <Subheading onPress={()=>{Linking.openURL('tel:'+item.phone)}}>Call: +91 {item.phone}</Subheading>
                            </Card.Content>
                        </View>
                    )}
                    />
            </View>
    )
}

export default Support
