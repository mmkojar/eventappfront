import messaging from '@react-native-firebase/messaging';
import { Platform } from 'react-native';
// import { localNotificationService } from './LocalNotificationService';
// import {PermissionsAndroid} from 'react-native';
import {request, RESULTS, PERMISSIONS} from 'react-native-permissions';
import DeviceInfo from 'react-native-device-info';

class FCMService {
    register  (onRegister, onOpenNotification) {
        this.checkPermission(onRegister);
        if(Platform.OS === 'android') {
            DeviceInfo.getApiLevel().then((apiLevel) => {
                // console.log(apiLevel);
                if(apiLevel>=33) {
                    request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS).then((result) => {
                        switch (result) {
                        case RESULTS.UNAVAILABLE:
                            console.log('This feature is not available (on this device / in this context)');
                            break;
                        case RESULTS.DENIED:
                            console.log('The permission has not been requested / is denied but requestable');
                            break;
                        case RESULTS.LIMITED:
                            console.log('The permission is limited: some actions are possible');
                            break;
                        case RESULTS.GRANTED:
                            console.log('The permission is granted');
                            break;
                        case RESULTS.BLOCKED:
                            console.log('The permission is denied and not requestable anymore');
                            break;
                        }
                    });
                }
              });
            // this.checkAndroidPermission();
        }
        this.createNotificationListeners(onRegister, onOpenNotification);
    }

    registerAppWithFCM = async () => {
        if (Platform.OS === 'ios') {
            // await messaging().registerDeviceForRemoteMessages();
            await messaging().setAutoInitEnabled(true);
        }
    }

   /*  checkAndroidPermission = async () => {
    if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.POST_NOTIFICATION, // or POST_NOTIFICATIONS
                    {
                      'title': 'TEST',
                      'message': ('permissions.locationPermissionMessage')
                    }
                  )
                  if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                        console.log('permission granted');
                  } else {
                    console.log('permission granted');
                  }
            } catch (error) {
                console.log(error);
            }
        }
    }; */

    checkPermission = (onRegister) => {
        messaging().hasPermission()
            .then(enabled => {
                if (enabled) {
                    // User has permission
                    this.getToken(onRegister);
                } else {
                    // User don't have permission
                    this.requestPermission(onRegister);
                }
            }).catch(error => {
                //console.log("[FCMService] Permission Rejected", error);
            })
    }

    getToken = (onRegister) => {
        messaging().getToken()
            .then(fcmToken => {
                if (fcmToken) {
                    onRegister(fcmToken)
                } else {
                    //console.log("[FCMService] User does not have a devices token")
                }
            }).catch(error => {
                //console.log("[FCMService] getToken Rejected", error);
            })
    }

    requestPermission = (onRegister) => {
        messaging().requestPermission({provisional: true,sound: true})
            .then(() => {
                this.getToken(onRegister);
            }).catch(error => {
                //console.log("[FCMService] Request Permission Rejected", error);
            })
    }

    deleteToken = () => {
        //console.log("[FCMService] Delete Token");
        messaging().deleteToken()
            .catch(error => {
                //console.log("[FCMService] Delete Token Error", error);
            })
    }

    createNotificationListeners = (onRegister, onOpenNotification) => {
        
        //Forground state message
       /*  this.messageListener = messaging().onMessage(async remoteMessage => {
            localNotificationService.cancelAllLocalNotifications();
            if (remoteMessage) {
                //console.log("[FCMService] A new FCm message arrived", remoteMessage);
                let notification = null;
                if (Platform.OS === 'ios') {
                    notification = remoteMessage.notification
                } else {
                    notification = remoteMessage.data
                }
                onNotification(notification);
            }
        }); */

        /* messaging().setBackgroundMessageHandler(async remoteMessage => {
            localNotificationService.cancelAllLocalNotifications();
            if (remoteMessage) {
                //console.log("[FCMService] A new FCM message arrived from background", remoteMessage);
                let notification = null;
                if (Platform.OS === 'ios') {
                    notification = remoteMessage.notification
                } else {
                    notification = remoteMessage.data
                }
                // onNotification(notification);
            }
        }); */

        // When Application Running on Background
        messaging().onNotificationOpenedApp(remoteMessage => {
            //console.log("[FCMService] A new FCM message Opened from background", remoteMessage);
            if (remoteMessage) {
                const notification = remoteMessage;
                notification.userInteraction = true;
                onOpenNotification(notification);
            }
        });

        //When Application open from quit state
        messaging().getInitialNotification()
            .then(remoteMessage => {
                //console.log("[FCMService] From quit State", remoteMessage);
                if (remoteMessage) {
                    const notification = remoteMessage;
                    notification.userInteraction = true;
                    // localNotificationService.cancelAllLocalNotifications();
                    onOpenNotification(notification);
                }
            });


        // Triggered when have new Token
        messaging().onTokenRefresh(fcmToken => {
            //console.log("[FCMService] New token refresh", fcmToken);
            onRegister(fcmToken);
        });
    }

    // Background state message
    bgheadlessTask = () => {
        messaging().setBackgroundMessageHandler(async remoteMessage => {
            if (remoteMessage) {
                // //console.log("[FCMService] A new FCm message arrived from background", remoteMessage);
                // let notification = null;
                // if (Platform.OS === 'ios') {
                //     notification = remoteMessage.notification
                // } else {
                //     notification = remoteMessage.data
                // }
                // onNotification(notification);
            }
        });
    }

    /* unRegister = () => {
        this.messageListener();
    }

    stopAlarmRing = async () => {
        if (Platform.OS != 'ios') {
            await messaging().stopAlarmRing();
            //console.log('sdfghjkldfgh', "stopAlarmRing");
        }
    } */
}

export const fcmService = new FCMService()