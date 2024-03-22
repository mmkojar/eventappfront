import React, { Fragment, useEffect } from 'react';
import { Platform } from 'react-native';
import { Provider as PaperProvider, withTheme } from 'react-native-paper';
import Nav from './components/Nav';
import Spinner from './components/utils/Spinner';
import { navigationRef, navigate } from './services/RootNavigation';
import messaging from '@react-native-firebase/messaging';
import { localNotificationService } from './services/LocalNotificationService';
import { fcmService } from './services/FCMService';
import SplashScreen from 'react-native-splash-screen'
import useThemeStyle from './components/utils/useThemeStyle';
import { useSelector } from 'react-redux';
// import factory from './components/redux/store';

// const { store } = factory();

const App = () => {
 
  const [theme ] = useThemeStyle();

  const authData = useSelector((state) => state.auth);

  useEffect(() => {
    fcmService.registerAppWithFCM();
    fcmService.register(onRegister,onOpenNotification)
    localNotificationService.createChannel()
    localNotificationService.configure(onOpenNotification);
    // console.log(localNotificationService.getAllChannels());
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      // console.log("remoteMessage:",remoteMessage);
      if (remoteMessage) {
        // let rid = Platform.OS === 'ios' ? remoteMessage.notification.receiver_id : remoteMessage.data.receiver_id
        if(navigationRef.current.getCurrentRoute().name !== 'ChatBox') {
          onNotification(remoteMessage);
        } else {
          if(authData.data.user_id!==remoteMessage.data.receiver_id) {
            onNotification(remoteMessage);
            /* if (Platform.OS === 'ios') {
              onNotification(remoteMessage.notification);
            } else {
              onNotification(remoteMessage.data);
            } */
          }
        }
      }
    });
    SplashScreen.hide();
    return () => {
      unsubscribe();
    };
  },[])   

  const onRegister = (res) => {
    // store.dispatch(checkToken(res));
  }

  const onNotification = (notify) => {
    // console.log("nnn:",notify);
    const options = {
      soundName: 'default',
      playSound: true,
      priority:'high'
    }
    // if(navigationRef.current.getCurrentRoute().name !== 'ChatBox') {
      localNotificationService.showNotification(
        notify.data.title,
        notify.data.body,
        notify,
        options,
      )
    // }
  }; 
  
  const onOpenNotification = async (notify) => {
    // check for auth    
    console.log("notify click:",notify.data);
    if(notify.userInteraction == true) { 
      if(notify.data.type=="message") {
        navigate('ChatBox', {
          id: notify.data.sender_id,
          full_name: notify.data.sender_name,
        });
      }
      else if(notify.data.type=="polling")  {
        navigate('Polling');
      } else {
        navigate('Notification');
      }
    }
  };

    return (
      <PaperProvider theme={theme}>
        <Fragment>
          <Nav color={theme.colors.primary} refer={navigationRef}/>        
          <Spinner/>
        </Fragment>
      </PaperProvider>
    );
};


export default withTheme(App);
