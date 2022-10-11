import 'react-native-gesture-handler';
import React from 'react'
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { Provider as StoreProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import factory from './components/redux/store';
// import PushNotification from 'react-native-push-notification'

const { store, persistor } = factory();

export const Main = () => {  
        
  /*   PushNotification.configure({
 
        onRegister: function (token) {
            // console.log("onRegister:", token);
        },
        onNotification: function(notification) {
        //   console.log('onNotification ==>', notification)
        },
        requestPermissions: true
    }) */
      return (
          <StoreProvider store={store} >
                <PersistGate loading={null} persistor={persistor} >
                  <App/>
              </PersistGate>
          </StoreProvider>
      )
    
}

AppRegistry.registerComponent(appName, () => Main);

