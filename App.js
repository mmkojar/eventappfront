import React,{Fragment } from 'react';
import { Provider as PaperProvider,withTheme } from 'react-native-paper';
import Nav from './components/Nav';
import Spinner from './components/utils/Spinner';
import { navigationRef,navigate } from './services/RootNavigation';
import { localNotificationService } from './services/LocalNotificationService';
import { fcmService } from './services/FCMService';
import { checkToken } from './components/redux/actions/authActions';
import { theme } from './components/utils/ThemeStyle';
import SplashScreen from 'react-native-splash-screen'
import factory from './components/redux/store';

const { store } = factory(); 

class App extends React.Component {
 
  componentDidMount() {
    fcmService.registerAppWithFCM();
    fcmService.register(this.onRegister,this.onNotification,this.onOpenNotification)
    localNotificationService.configure(this.onOpenNotification);
    // localNotificationService.getAllChannels();
    SplashScreen.hide();
  }

  onRegister = (res) => {    
    store.dispatch(checkToken(res));
  }

  onNotification = (notify) => {
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
  }; 
  
  onOpenNotification = async (notify) => {
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
  };

  render() {
    return (
      <PaperProvider theme={theme}>
        <Fragment>
          <Nav color={theme.colors.primary} refer={navigationRef}/>        
          <Spinner/>
        </Fragment>
      </PaperProvider>
    );
  }
};


export default withTheme(App);
