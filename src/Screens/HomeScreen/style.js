import {StyleSheet, Dimensions} from 'react-native';
import {getThemeColor} from '../ThemeProvider/redux/saga';
const width = Dimensions.get('screen').width;
export const getStyles = theme =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: getThemeColor('primary', theme),
    },
    header: {
      backgroundColor: getThemeColor('headerColor', theme),
      height: 80,
      borderBottomRightRadius: 26,
      borderBottomLeftRadius: 26,
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      alignItems: 'flex-end',
      paddingBottom: 20,
      flexDirection: 'row',
    },
    headerText: {
      color: 'white',
      fontSize: 18,
      fontWeight: '500',
    },
    searchContainer: {
      width: '95%',
      height: 45,
      borderRadius: 8,
      alignItems: 'center',
      flexDirection: 'row',
    },
    imageContainer: {
      backgroundColor: getThemeColor('black', theme),
      width: 42,
      height: 42,
      marginHorizontal: 3,
      borderRadius: 30,
      justifyContent: 'center',
      borderWidth: 2,
      borderColor: getThemeColor('white', theme),
    },
    chatContainer: {
      marginHorizontal: 10,
      marginTop: 20,
      flexDirection: 'row',
      width: width - 50,
      borderBottomWidth: 1,
      paddingBottom: 10,
    },
    imgText: {
      color: getThemeColor('white', theme),
      fontSize: 17,
      alignSelf: 'center',
    },
    image: {
      width: 37,
      height: 36,
      alignSelf: 'center',
      borderRadius: 30,
    },
    textContainer: {
      alignItems: 'center',
      flexDirection: 'row',
      width: '70%',
      borderRadius: 30,
    },
    userName: {color: getThemeColor('text', theme), fontSize: 16},
    message: {color: getThemeColor('text', theme)},
    dateView: {justifyContent: 'flex-end', right: 10},
    date: {color: 'grey', fontSize: 12},
  });
