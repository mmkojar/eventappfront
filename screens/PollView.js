import React,{ useEffect, useState } from 'react'
import { View, StyleSheet, FlatList, Pressable } from "react-native";
import { Subheading, Text,Title } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { getPollView, updatePolls } from '../components/redux/actions/delegateActions';
import axios from 'axios';
import Config from '../components/utils/Config';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import useThemeStyle from '../components/utils/useThemeStyle';

const PollView = ({ route }) => {
  
    const [theme,GlobalStyle] = useThemeStyle();
    const dispatch = useDispatch();
     
    const authData = useSelector((state) => state.auth);
    const [choiceById, setChoiceById] = useState('');
    const pollview = useSelector((state) => state.delegate.poll);

    useEffect(() => {
        dispatch(getPollView(route.params.poll_id));
        checkVote(route.params.poll_id);
                 
        return () => {
        } 
    }, [dispatch])    
        
    const handlePollSubmit = (res) => {
      dispatch(updatePolls(res.pid,res.paid,authData.data.user_id));
      checkVote(route.params.poll_id);
    }  

    const checkVote = (pid) => {
      
      const formdata = new FormData();
      formdata.append('pid',pid)
      formdata.append('user_id',authData.data.user_id)   
      axios.post(Config.api_url+'polling/checkUserVote', formdata ,{
          headers: { 
              "Access-Control-Allow-Origin": "*",
              'encryptedd':'api-token'
          }
      })
      .then((res) => {
          if(res.data && res.data.status === 'true') {
            setChoiceById(res.data.data.poll_answer_id);
          }
          else {
            setChoiceById('');
          }
      })
      .catch((err) => {
          alert(err);
      });
    }        
    
    return (
        <View style={GlobalStyle.container}>
          <Text
            style={{
              marginVertical: 20,
              fontSize: 24,
              textAlign:'center'
            }}
          >
            {pollview && pollview[0].title}
          </Text>
          <FlatList
          keyExtractor={(item) => item.paid}            
          data={pollview && pollview}
          renderItem={({item}) => (
            <View style={{marginHorizontal:8}}>
              <Subheading style={{color:GlobalStyle.primarycolor.color}}>{item.choice} ({item.votes})</Subheading>
              <Pressable onPress={() => handlePollSubmit(item)} disabled={(choiceById && choiceById) ? true : false}>
              {
                (item.votes > 0) ?
                <View style={[styles.resultbar,{backgroundColor:GlobalStyle.secondarycolor.color}]}>
                    <Text style={[styles.percent,{backgroundColor:GlobalStyle.primarycolor.color,width:`${Math.round((item.votes/item.total_votes)*100)}%`}]}>
                      {`${Math.round((item.votes/item.total_votes)*100)}%`}
                      {
                          (choiceById === item.paid) ? 
                            <FontAwesome5
                              name="check-circle"
                              size={18}
                              color="#fff"                              
                            />   
                          : null
                      }
                    </Text>
                </View>
                : <View style={[styles.resultbar,{backgroundColor:GlobalStyle.secondarycolor.color}]}>
                    <Text style={[styles.percent,{width:'0%',backgroundColor:GlobalStyle.primarycolor.color}]}>0%</Text>
                  </View>
              }        
              </Pressable>
            </View>
          )}
        ></FlatList>      
        </View>
        
    )
}

const styles = StyleSheet.create({  
  resultbar:{
    marginVertical:8,
    height:50,
    borderRadius:20,
  },

  percent:{
    minWidth:'10%',
    color:'#fff',
    fontSize:18, 
    height:50,
    lineHeight:50,
    borderRadius:20,
    textAlign:'center',
  }
})

export default PollView