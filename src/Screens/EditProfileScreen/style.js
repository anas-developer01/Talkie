import {StyleSheet} from 'react-native';
import {getThemeColor} from '../ThemeProvider/redux/saga';
export const getStyles = theme =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: getThemeColor('primary', theme),
    },
    header: {
      backgroundColor: getThemeColor('headerColor', theme),
      height: 80,
      flexDirection: 'row',
      alignItems: 'flex-end',
      gap: 10,
      borderBottomRightRadius: 26,
      borderBottomLeftRadius: 26,
      paddingHorizontal: 20,
      paddingBottom: 20,
    },
    headerText: {
      color: 'white',
      textAlign: 'center',
      fontSize: 18,
      left: 10,
      top: 9,
      height: 45,
      fontWeight: '500',
    },
    ImgView: {
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 30,
    },
    profileImg: {
      margin: -0.7,
      height: '100%',
      width: '100%',
      borderRadius: 75,
    },
    imageView: {
      height: 150,
      backgroundColor: 'white',

      width: 150,
      borderRadius: 75,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 5,
    },
    imgTxt: {
      color: '#10445C',
      fontSize: 40,
      fontWeight: '600',
    },
    camImg: {
      position: 'relative',
      left: 45,
      borderWidth: 1,
      borderColor: 'white',
      backgroundColor: '#10445C',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 20,
      bottom: 40,
      height: 40,
      width: 40,
      overflow: 'hidden',
    },
    input: {
      backgroundColor: 'transparent',
      marginVertical: 5,
    },
    text: {
      color: getThemeColor('text', theme),
    },
    placeholder: {color: getThemeColor('placeholder', theme)},
    buttonCon: {
      alignSelf: 'flex-end',
      marginHorizontal: 20,
      width: 100,
      height: 54,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 15,
      marginVertical: 20,
    },
    btnText: {color: 'white', fontSize: 20},
  });
