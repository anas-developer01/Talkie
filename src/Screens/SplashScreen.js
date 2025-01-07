import {Image, SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import React from 'react';
import {useImages} from '../Utils/Images';

export default function SplashScreen() {
  const {images} = useImages();

  return (
    <SafeAreaView style={[styles.main, {backgroundColor: 'white'}]}>
      <StatusBar
        animated={true}
        backgroundColor={'white'}
        barStyle={'dark-content'}
      />
      <Image source={images.appLogo} style={styles.logo} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {width: 250, height: 215},
});
