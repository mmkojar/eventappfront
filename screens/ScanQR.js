import React,{useRef, useState} from 'react'
import {
    Platform,
    Alert,
    Linking
  } from 'react-native';
  import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
// import Config from '../components/utils/Config';

import axios from 'axios';
import { useSelector } from 'react-redux';

const ScanQR = ({navigation}) => {


    const authData = useSelector((state) => state.auth);
    /* const scan_by = "";
    const [scanBy,setScanBy] = useState('');
    if(authData.data.group=="admin") {
      setScanBy(authData.data.first_name+' '+authData.data.last_name+' (admin)');
    } else {
      setScanBy(authData.data.first_name+' '+authData.data.last_name);
    } */
    // console.log(scanBy);
    const scanner = useRef();
    const onSuccess = (e) => {
        /* Linking.openURL(e.data).catch(err =>
            console.error('An error occured', err)
        ); */
        var myarray = e.data.split(',');
        if(myarray.length != '3') {
          Alert.alert('Error','Invalid QR Code',[
            {text: 'Go Back', onPress: () => navigation.navigate('Home')}
          ],{cancelable:true})
        }
        else if((authData.data.user_id!==myarray[1])&&authData.data.group!=="admin"){
          Alert.alert('Error','QR Code mismatch',[
            {text: 'Go Back', onPress: () => navigation.navigate('Home')}
          ],{cancelable:true})
        }
        else {
          if(authData.data.group=="admin") {
            var url = 'https://info2ideas.com/event_app/select_event/'+myarray[1]+'/'+myarray[0]+'/'+authData.data.first_name+'-'+authData.data.last_name+'-ADMIN';
          } else {
            var url = 'https://info2ideas.com/event_app/select_event/'+myarray[1]+'/'+myarray[0]+'/'+authData.data.first_name+'-'+authData.data.last_name;
          }
            Linking.openURL(url).catch(err =>
              console.error('An error occured', err)
          );
          /* const formdata = JSON.stringify({"user_id":myarray[1],"qr_code_id":myarray[0],"device":Platform.OS})
          axios.post(Config.api_url+'QR/scanned', formdata ,{
            headers: { 
                "Access-Control-Allow-Origin": "*",
                'encryptedd':'api-token'
            }
          })
          .then((res) => {
              if(res && res.data.status == 'false') {
                Alert.alert('Error',res.data.message,[
                    {text:'Ok',onPress: () => scanner.current.reactivate()}
                ],{cancelable:true})
                
              }
              else {
                Alert.alert('Success','Scan Success',[
                  {text:'Ok',onPress: () => scanner.current.reactivate()}
                ],{cancelable:true})
                // navigation.navigate('Home');
              }              
          })
          .catch((err) => {
              alert(err);
          });      */     
        }
    };

    return (
    <QRCodeScanner
        onRead={onSuccess}
        flashMode={RNCamera.Constants.FlashMode.auto}
        fadeIn={false}
        reactivate={false}
        reactivateTimeout={1000}
        showMarker={true}
        ref={scanner}
        // ref={scanner}
        // bottomContent={
        //     <TouchableOpacity style={styles.buttonTouchable} onPress={()=>scanner.current.reactivate()}>
        //       <Text style={styles.buttonText}>Scan Again</Text>
        //     </TouchableOpacity>
        // }
        />
  )
}

/* const styles = StyleSheet.create({
    buttonText: {
      fontSize: 21,
      color: '#000000'
    },
    buttonTouchable: {
      marginTop: 40
    }
}); */

export default ScanQR