import React,{Fragment,useEffect } from 'react';
import { Provider as PaperProvider,withTheme } from 'react-native-paper';
import Nav from './components/Nav';
import Spinner from './components/utils/Spinner';
import { navigationRef,navigate } from './services/RootNavigation';
import { localNotificationService } from './services/LocalNotificationService';
import { fcmService } from './services/FCMService';
import axios from 'axios';
import Config from './components/utils/Config';
import { useDispatch } from 'react-redux';
import { logoutAction } from './components/redux/actions/authActions';
import { theme } from './components/utils/ThemeStyle';

const App = () => {

  // const [token,SetToken] = useState('');    
  useEffect(() => {
    fcmService.registerAppWithFCM();
    fcmService.register(onRegister,onNotification,onOpenNotification)
    localNotificationService.configure(onOpenNotification);    
    localNotificationService.getAllChannels();

    // const tokenInterval = setInterval(() => {
    //   checkToken(token);
    // }, 1500);

    // return () => {
    //   clearInterval(tokenInterval);
    // }
  }, []);   

  const dispatch = useDispatch();    
  const onRegister = (res) => {
    // SetToken(res);
    checkToken(res);
  }

  const checkToken = (token) => {
    axios.get(Config.api_url+`user/checktoken/${token}`, {
      headers: { 
          "Access-Control-Allow-Origin": "*",
          'encryptedd':'api-token'
      }
    })
    .then((res) => {     
        if(res && res.data.status == 'false') {
          dispatch(logoutAction());
          // alert('Token Expired!');
        }
    })
    .catch((err) => {
        alert(err);
    });
  }  
  const onNotification = (notify) => {
    const options = {
      soundName: 'default',
      playSound: true,
      priority:'high'
    }
    // if(navigationRef.current.getCurrentRoute().name !== 'ChatBox') {
      localNotificationService.showNotification(
        notify.title,
        notify.body,
        notify,
        options,
      )
    // }
  }
  
  
  const onOpenNotification = async (notify) => {
    // check for auth    
    console.log("notify:",notify);
    if(notify.userInteraction == true) { 
      if(notify.data.type=="message") {
        navigate('ChatBox', {
          id: notify.data.sender_id,
          full_name: notify.data.sender_name,
        });
      }
      else if(notify.data.type=="polling")  {
        navigate('Polling');
      }
    }
  }

  return (    
    <PaperProvider theme={theme}>
      <Fragment>
        <Nav color={theme.colors.primary} refer={navigationRef}/>        
        {/* <Spinner/> */}
      </Fragment>
    </PaperProvider>
  );
};


export default withTheme(App);
