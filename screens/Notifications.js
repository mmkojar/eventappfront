import React, { useEffect } from 'react'
// import PushNotification from 'react-native-push-notification'
import { getNotify } from '../components/redux/actions/delegateActions';
import { useDispatch, useSelector } from 'react-redux';
import useThemeStyle from '../components/utils/useThemeStyle';
import { FlatList, Pressable, View } from 'react-native';
import { Card, Paragraph, IconButton, Text } from 'react-native-paper';
// import { NOTIFI_COUNT } from '../components/redux/actions/type';

const Notifications = () => {

     const [theme,GlobalStyle] = useThemeStyle();
     const notifi = useSelector((state) => state.delegate.notifi)
     // const notificount = useSelector((state) => state.delegate.notificount)
     
     const dispatch = useDispatch();

     useEffect(() => {
          dispatch(getNotify());
          // dispatch({
          //      type:NOTIFI_COUNT,
          //      payload:notifi,
          // })
     }, [])

    const handlePress = (item) => {
          // dispatch(updateNotification(empcode, item.id, '1', '0'))
          /* for(var i in notificount) {
               if(item.id == notificount[i].id) {
                    notificount[i].is_read = 1;
                    dispatch({
                         type:NOTIFI_COUNT,
                         payload:notificount,
                    })
               }
          } */
     }
     /* 
     const handleDelete = (item) => {
          dispatch(updateNotification(empcode, item.id, '0', '1'))
     } */

     /* const getNotifications = () => {
          PushNotification.getDeliveredNotifications((message) => {
               console.log(message);
          });
     } */

     return (
          <View style={GlobalStyle.container}>
               <FlatList
               data={notifi}
               keyExtractor={(item) => item.id}
               initialNumToRender={5}
               removeClippedSubviews
               renderItem={({item}) => (
                    <Pressable onPress={() => handlePress(item)}>
                         <Card style={[GlobalStyle.card,{padding:10}]} elevation={5}>
                         {/* <Card style={[GlobalStyle.card,{padding:10,backgroundColor:`${item.is_read == '0' ? theme.colors.accent : '#fff'}`}]} elevation={5} > */}
                         <Card.Title 
                              style={{marginTop:-15,marginLeft:-15}}
                              title={item.title}
                              titleStyle={{color:theme.colors.primary}}
                              subtitle={item.created_at}
                              subtitleStyle={{color:'#000',marginBottom:-10}}
                              right={(props) => 
                              {/* <IconButton                            
                                   icon="delete"
                                   iconColor='#000'
                                   size={20}
                                   onPress={() => handleDelete(item)}
                              /> */}
                         }
                         />                    
                         <Paragraph>{item.msg}</Paragraph>                    
                         </Card>
                    </Pressable>
               )}
               />
     </View>
     )
}

export default Notifications