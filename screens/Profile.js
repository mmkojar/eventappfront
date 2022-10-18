import React,{ useState } from 'react'
import { View, Image, TextInput, StyleSheet, ScrollView, Alert, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform } from 'react-native';
import { Text,Card } from 'react-native-paper';
// import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import CustomButtons from '../components/utils/CustomButtons';
import { useDispatch, useSelector } from 'react-redux';
import { profileAction,logoutAction } from '../components/redux/actions/authActions';
import Config from '../components/utils/Config';
import GlobalStyle from '../components/utils/GlobalStyle';

function Profile() {    

    const dispatch = useDispatch();
    const authData = useSelector((state) => state.auth);       
    
    const [firstname,Setfirstname] = useState(authData.data.first_name);
    const [lastname,Setlastname] = useState(authData.data.last_name);
    const [email,SetEmail] = useState(authData.data.email);
    const [phone,SetPhone] = useState(authData.data.phone);
    const [city,SetCity] = useState(authData.data.city);
    // const [userimage,SetUserImage] = useState(authData.data.user_image);

    const userimage = Config.imgurl+authData.data.image;
    
    const customAlert = (msg) => {
        Alert.alert('Error',msg,[
            {text: 'OK'}
        ],{cancelable:true})
    }
   
    const pressHandler = (e) => {

        e.preventDefault();
        
        if(firstname == '') {
            customAlert('Enter First Name');            
        }
        else if(lastname == '') {
            customAlert('Enter Last Name');            
        }
        else if(city == '') {
            customAlert('Enter city');
        }
        else {
            Keyboard.dismiss();
            dispatch(profileAction(authData.data.user_id,firstname,lastname,phone,email,city));
        }        
    }

    const logout = () => {
        Alert.alert('Message','Are You Sure?',[
        {text: 'Yes', onPress:() => {                
            dispatch(logoutAction());
        }},
        {text:'No'}
        ],{cancelable:true})
    }

    return (
       
        <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding" : ""}
            style={{flex: 1}}            
            keyboardVerticalOffset={Platform.OS === 'ios' && 100}
        >
            <ScrollView>
                {/* <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}> */}
                    <View style={{flex:1}}>
                        <Card>
                            <Card.Content>
                                {/* <FontAwesome5 
                                name="user-circle"
                                size={60}
                                color='#000'
                                style={{marginBottom:20,textAlign:'center'}}
                                /> */}
                                <Image                             
                                    style={[GlobalStyle.avatar,{marginBottom:24}]}
                                    source={(userimage !== null) ? {uri:userimage} : require('../assets/user.png')} 
                                />                                
                                <TextInput
                                    style={[GlobalStyle.textinput,{backgroundColor:GlobalStyle.secondarycolor.color}]}
                                    editable={false}
                                    placeholder='First Name'
                                    placeholderTextColor={GlobalStyle.primarycolor.color}
                                    keyboardType='default'
                                    value={firstname}
                                    onChangeText={(val) => Setfirstname(val)}
                                />
                                <Text></Text>
                                <TextInput
                                    style={[GlobalStyle.textinput,{backgroundColor:GlobalStyle.secondarycolor.color}]}
                                    editable={false}
                                    placeholder='Last Name'
                                    placeholderTextColor={GlobalStyle.primarycolor.color}
                                    keyboardType='default'
                                    value={lastname}
                                    onChangeText={(val) => Setlastname(val)}
                                />
                                <Text></Text>
                                <TextInput
                                    style={[GlobalStyle.textinput,{backgroundColor:GlobalStyle.secondarycolor.color}]}
                                    editable={false}
                                    placeholder='Enter Email'
                                    placeholderTextColor={GlobalStyle.primarycolor.color}
                                    keyboardType='email-address'
                                    value={email}
                                    onChangeText={(val) => SetEmail(val)}
                                    disabled={true}
                                />
                                <Text></Text>
                                <TextInput
                                    style={GlobalStyle.textinput}
                                    placeholder='Phone'
                                    placeholderTextColor={GlobalStyle.primarycolor.color}
                                    keyboardType='number-pad'
                                    value={phone}
                                    onChangeText={(val) => SetPhone(val)}
                                    disabled={true}
                                />
                                <Text></Text>
                                <TextInput
                                    style={GlobalStyle.textinput}
                                    placeholder='City'
                                    placeholderTextColor={GlobalStyle.primarycolor.color}
                                    keyboardType='default'
                                    value={city}
                                    onChangeText={(val) => SetCity(val)}
                                />                 
                            </Card.Content>
                            <Card.Actions style={styles.action}>
                                <CustomButtons title="Update" pressHandler={pressHandler}></CustomButtons>
                            </Card.Actions>
                        </Card>
                        <View style={{marginVertical:10,width:150,alignSelf:'center'}}>
                            <CustomButtons title="Logout" pressHandler={logout}></CustomButtons>
                        </View>
                    </View>
                {/* </TouchableWithoutFeedback>           */}
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

// const GStyle = GlobalStyle;
const styles = StyleSheet.create({    
    action : {
        marginVertical:16,
        justifyContent:'center'
    }
})
export default Profile
