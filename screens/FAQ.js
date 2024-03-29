import React, { useEffect } from 'react';
import { View, FlatList, StyleSheet, Pressable } from 'react-native';
import { Card, IconButton, Text } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { getFAQ } from '../components/redux/actions/delegateActions';
import useThemeStyle from '../components/utils/useThemeStyle';

function FAQ() {
    
    const [theme,GlobalStyle] = useThemeStyle();
    const dispatch = useDispatch();
    const faq = useSelector((state) => state.delegate.faq);    
    
    useEffect(() => {  
        dispatch(getFAQ());
    }, [])


    const [expanded, setExpanded] = React.useState(true);
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
                                style={[expanded && (eid==item.id) ? styles.ecardTitle : styles.cardTitle,[styles.dcardTitle,{backgroundColor:GlobalStyle.secondarycolor.color}]]}
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
        // backgroundColor:GlobalStyle.secondarycolor.color,
        marginHorizontal:8,
        minHeight:60,
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
