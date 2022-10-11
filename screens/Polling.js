import React,{ useEffect } from 'react'
import { View,  StyleSheet, FlatList, Pressable } from "react-native";
import { Title,Headline, Card } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { getPollsList } from '../components/redux/actions/delegateActions';
import GlobalStyle from '../components/utils/GlobalStyle';


const Polling = ({ navigation }) => {

    const dispatch = useDispatch();
    const pollslist = useSelector((state) => state.delegate.polls);  
   
    useEffect(() => {
        dispatch(getPollsList());        
        return () => {

        } 
    }, [dispatch])

    const pressHandler = (id) => {
      navigation.navigate('PollView', {
        poll_id: id
      });
    }

    return (
          <View style={GlobalStyle.container}>
            <Headline style={{marginVertical: 20,textAlign:'center'}}>Select Poll to Vote</Headline>
            <FlatList
              keyExtractor={(item) => item.id}
              data={pollslist}
              renderItem={({item}) => (
                  <Pressable onPress={() => pressHandler(item.id)}>                      
                      <Card.Title
                            style={[GlobalStyle.cardTitle,{backgroundColor:GlobalStyle.primarycolor.color}]}
                            title={item.title}
                            titleStyle={{marginTop:0,color:'#fff'}}
                        />
                  </Pressable>
              )}
            >              
            </FlatList>            
         </View>
    )
}

export default Polling