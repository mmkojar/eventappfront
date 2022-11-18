import React, { useState,useEffect } from 'react';
import {  View, TextInput, StyleSheet, Alert, Platform, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Image } from 'react-native';
import { Card } from 'react-native-paper';
import CustomButtons from '../components/utils/CustomButtons';
import { useDispatch } from 'react-redux';
import { loginAction } from '../components/redux/actions/authActions';
import { fcmService } from '../services/FCMService';
import useThemeStyle from '../components/utils/useThemeStyle';
import Config from '../components/utils/Config';

function Login() {

    const [theme,GlobalStyle,themeoptions] = useThemeStyle();
    useEffect(() => {
        fcmService.getToken(onRegister)
    }, [])

    const onRegister = (token) => {
        SetToken(token);
    }
        
    const [identity,SetIdentity] = useState('');
    const [token,SetToken] = useState('');

    const dispatch = useDispatch();
    
    const pressHandler = (e) => {
        
        e.preventDefault();
        if(identity == '') {
            Alert.alert('Error','Enter Email Id',[
                {text: 'OK'}
              ],{cancelable:true})
        }
        else {            
            Keyboard.dismiss();            
            // console.log(token);
            dispatch(loginAction(token,Platform.OS,identity));
        }
    }
    
    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{flex:1}}>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={styles.loginMain}>
                    {/* <ImageBackground source={require('../assets/login_screen.png')} resizeMode="cover" style={{flex: 1,justifyContent:'flex-end'}}>*/}
                        <Card style={styles.card}>
                            <Image
                                style={{height:120,width:120,alignSelf:'center'}}
                                source={(themeoptions && themeoptions.lc_logo !== null) ? {uri:Config.imgurl+(themeoptions && themeoptions.lc_logo)} : require('../assets/logo.png')}
                            />   
                            {/* <Text style={styles.heading}>Login To Continue !</Text> */}
                            <Card.Content>
                                <TextInput
                                    style={[GlobalStyle.textinput,{marginVertical:30,borderWidth:1}]}
                                    onChangeText={(val) => SetIdentity(val)}
                                    placeholder="Enter Email"
                                    placeholderTextColor={GlobalStyle.primarycolor.color}
                                    keyboardType='email-address'
                                    value={identity}
                                />
                            </Card.Content>
                            <View style={styles.action}>
                                <CustomButtons title="Login" pressHandler={pressHandler}></CustomButtons>
                            </View>
                        </Card>
                    {/* </ImageBackground> */}
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    loginMain:{
        flex:1,
        justifyContent:'flex-end',
        backgroundColor:'#1C75BC',
    },
    card:{
        paddingBottom:100,
        paddingTop:50,
        // borderWidth:1,
        borderTopLeftRadius:50,
    },
    /* heading: {
        fontSize:30,
        textAlign:'center',
        marginVertical:30,
        color:GlobalStyle.primarycolor.color,
    }, */
    action : {
        width:'50%',
        alignSelf:'center',
    }
})

export default Login
