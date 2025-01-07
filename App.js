import React, {useEffect, useState} from 'react';
import RootNavigator from './src/Navigation';
import {ToastProvider} from 'react-native-toast-notifications';
import {Provider} from 'react-redux';
import store from './src/Redux/store';
import AnimatedSplash from 'react-native-animated-splash-screen';
import SplashScreen from './src/Screens/SplashScreen';
import {Dimensions, Platform} from 'react-native';
import {persistStore} from 'redux-persist';
import {PersistGate} from 'redux-persist/integration/react';

import {ThemeProvider} from './src/Screens/ThemeProvider/ThemeProvider';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from "@react-native-community/push-notification-ios"


const persist = persistStore(store);

export default function App() {
  const [loading, setLoading] = useState(false);
  const {height, width} = Dimensions.get('window');
  const logoHeight = height;
  const logoWidth = width;

  useEffect(() => {
    PushNotification.createChannel({
      channelId: 'com.connectvibe',
      channelName: 'com.connectvibe'
    })
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      var localNotification = {
        id: 0, 
        title: remoteMessage.notification.title, 
        message: remoteMessage.notification.body
        // data: remoteMessage.data
      }

      Platform.OS == 'android' &&
        (localNotification = {
          ...localNotification,
          channelId: 'com.connectvibe'
        })
      PushNotification.localNotification(localNotification)
      PushNotification.configure({
        onRegister: function (token) {
          console.warn('TOKEN:', token)
        },
        onNotification: function (notification) {
          const { data, title } = notification
          notification.finish(PushNotificationIOS.FetchResult.NoData)
        },
        onRegistrationError: function (err) {
          console.warn(err.message, err)
        },
        senderID: '649235013158',
        permissions: {
          alert: true,
          badge: true,
          sound: true
        },
        popInitialNotification: true,
        requestPermissions: true
      })
      console.log("A new FCM message arrived!", JSON.stringify(remoteMessage))
    })

    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage)
    })

    return unsubscribe
  }, [])

  const onloading = () => {
    setTimeout(() => {
      setLoading(true);
    }, 2000);
  };
  useEffect(() => {
    onloading();
  }, []);

  return (
    <ToastProvider>
      <ThemeProvider>
        <AnimatedSplash
          isLoaded={loading}
          customComponent={<SplashScreen />}
          logoWidth={logoWidth}
          logoHeight={logoHeight}>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persist}>
              <RootNavigator />
            </PersistGate>
          </Provider>
        </AnimatedSplash>
      </ThemeProvider>
    </ToastProvider>
  );
}
