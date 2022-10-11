import React,{ useEffect } from 'react'
import {  View,FlatList, StyleSheet, Pressable } from 'react-native';
import { Card, IconButton, Text } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { getFAQ } from '../components/redux/actions/delegateActions';
import GlobalStyle from '../components/utils/GlobalStyle';

function FAQ() {

    const dispatch = useDispatch();
    const result = useSelector((state) => state.delegate);
    const { faq } = result;
    
    useEffect(() => {  
        dispatch(getFAQ());
    }, [dispatch])


    const [expanded, setExpanded] = React.useState(false);
    const [eid,setEid] = React.useState();

    const handlePress = (item) => {
        setEid(item.id);
        if (eid === item.id) {
            setExpanded(!expanded);
        }
    };

    return (
        <View style={GlobalStyle.container}>
            <FlatList
                data={faq}
                keyExtractor={(item) => item.id}
                renderItem={({item}) => (
                    <View style={{marginBottom:10}}>
                        <Pressable onPress={() => handlePress(item)}>
                            <Card.Title
                                style={[expanded && (eid==item.id) ? styles.ecardTitle : styles.cardTitle,styles.dcardTitle]}
                                title={item.title}
                                titleStyle={{color:GlobalStyle.primarycolor.color}}                              
                                right={(props) => <IconButton {...props} size={30} icon={(expanded && (eid==item.id)) ? 'chevron-up' : 'chevron-down'} color={GlobalStyle.primarycolor.color} onPress={() => handlePress(item)}/>}
                            />
                        </Pressable>
                        {
                            (expanded && (eid==item.id)) && 
                            <Card.Content style={GlobalStyle.bottomContent}>
                                <Text style={{fontSize:16}}>
                                    {item.description}
                                </Text>
                            </Card.Content>
                        }                        
                    </View>
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({

    dcardTitle:{
        backgroundColor:GlobalStyle.secondarycolor.color,
        marginHorizontal:8,
        minHeight:60
    },
    ecardTitle:{
        borderTopLeftRadius:20,
        borderTopRightRadius:20,
    },
    cardTitle:{        
        borderRadius:20,
    }
})

export default FAQ
