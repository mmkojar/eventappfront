import React from 'react'
import { View,Image,StyleSheet,ScrollView,TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Card, Text, Caption, Subheading  } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { sendMettingRequest } from '../components/redux/actions/chatActions';
import CustomButtons from '../components/utils/CustomButtons';
import useThemeStyle from '../components/utils/useThemeStyle';
import Config from '../components/utils/Config';

function AttendeeProfile({ route, navigation }) {

    const [theme,GlobalStyle,themeoptions] = useThemeStyle();
    
    const { id, full_name,company,user_image } = route.params;
    const authData = useSelector((state) => state.auth);

    const pressHandler = () => {
        navigation.navigate('ChatBox', {
            id: id,
            full_name: full_name,
        });
    }

    const dispatch = useDispatch();
    const mettinghandler = () => {
        dispatch(sendMettingRequest(authData.data.user_id,id));
    }

    const du_image = (themeoptions && themeoptions.du_image !== null) ? {uri:Config.imgurl+(themeoptions && themeoptions.du_image)} : require('../assets/user.png');

    return (
        <ScrollView>
            <TouchableWithoutFeedback  onPress={() => Keyboard.dismiss()}>
                <View style={styles.profieMain}>
                    <Image                             
                        style={{height:120,width:120,borderRadius:50,alignSelf:'center',marginVertical:20}}
                        source={(user_image !== null) ? {uri:Config.imgurl+user_image} : du_image}
                    />                    
                    <Card.Title
                        style={[GlobalStyle.cardTitle,{minHeight:50,marginBottom:0}]}
                        title={full_name}
                        left={(props) =>  <Text {...props} style={styles.leftText}>Name</Text>}
                        leftStyle={[styles.left,{backgroundColor:GlobalStyle.primarycolor.color}]}
                    />
                    <Caption></Caption>
                    <Card.Title
                        style={[GlobalStyle.cardTitle,{minHeight:50,marginBottom:0}]}
                        title={company}                        
                        left={(props) =>  <Text {...props} style={styles.leftText}>Company</Text>}
                        leftStyle={[styles.left,{backgroundColor:GlobalStyle.primarycolor.color}]}
                    />
                    <Caption></Caption>
                    <Subheading style={{textAlign:'center',marginVertical:14}}>-----------------Connect Via-----------------</Subheading>
                    <View style={{marginHorizontal:8}}>
                        <CustomButtons title="Request Meeting" pressHandler={mettinghandler} ></CustomButtons>
                        <Subheading style={{textAlign:'center',marginVertical:6}}>OR</Subheading>
                        <CustomButtons title="Chat" pressHandler={pressHandler}></CustomButtons>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    profieMain : {
        flex:1,
        marginVertical:20,
    },
    left:{        
        marginLeft:-15,
        borderRadius:50,
        minHeight:50,
        width:90,
    },
    leftText:{
        color:'#fff',
        textAlign:'center',        
    }
})
export default AttendeeProfile
