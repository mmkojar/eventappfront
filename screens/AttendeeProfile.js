import React from 'react'
import { View,Image,StyleSheet,ScrollView,TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Card, Text, Caption, Subheading  } from 'react-native-paper';
import CustomButtons from '../components/utils/CustomButtons';
import GlobalStyle from '../components/utils/GlobalStyle';

const GStyle = GlobalStyle;

function AttendeeProfile({ route, navigation }) {

    const { id, full_name,company,user_image } = route.params;

    const pressHandler = () => {
        navigation.navigate('ChatBox', {
            id: id,
            full_name: full_name,
        });
    }
    return (
        <ScrollView>
            <TouchableWithoutFeedback  onPress={() => Keyboard.dismiss()}>
                <View style={styles.profieMain}>                    
                    <Image                             
                        style={{height:120,width:120,borderRadius:50,alignSelf:'center',marginVertical:20}}
                        source={(user_image !== null) ? {uri:user_image} : require('../assets/user.png')}
                    />                    
                    <Card.Title
                        style={[GlobalStyle.cardTitle,{minHeight:50,marginBottom:0}]}
                        title={full_name}
                        left={(props) =>  <Text {...props} style={styles.leftText}>Name</Text>}
                        leftStyle={styles.left}
                    />
                    <Caption></Caption>
                    <Card.Title
                        style={[GlobalStyle.cardTitle,{minHeight:50,marginBottom:0}]}
                        title={company}                        
                        left={(props) =>  <Text {...props} style={styles.leftText}>Company</Text>}
                        leftStyle={styles.left}
                    />
                    <Subheading style={{textAlign:'center',marginVertical:14}}>-----------------Connect Via-----------------</Subheading>
                    <View style={{marginHorizontal:8}}>
                        <CustomButtons title="Request Meeting" pressHandler={()=>{}} ></CustomButtons>
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
        marginVertical:30,
    },
    left:{        
        marginLeft:-15,
        borderRadius:50,
        minHeight:60,
        width:90,
        backgroundColor:GStyle.primarycolor.color
    },
    leftText:{
        color:'#fff',
        textAlign:'center',        
    }
})
export default AttendeeProfile
