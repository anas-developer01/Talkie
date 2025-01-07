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
      gap: 10,
      borderBottomRightRadius: 26,
      borderBottomLeftRadius: 26,
      paddingHorizontal: 20,
      alignItems: 'flex-end',
      paddingBottom: 20,
      flexDirection: 'row',
    },
    searchContainer: {
      width: '85%',
      height: 45,
      borderRadius: 8,
      marginLeft: 10,
      color: 'white',
    },
    imageDiv: {
      flexDirection: 'row',
      gap: 7,
      top: 5,
      justifyContent: 'center',
    },
    headerText: {
      color: getThemeColor('headerText', theme),
      fontSize: 18,
      fontWeight: '500',
    },
    imgText: {
      color: getThemeColor('white', theme),
      fontSize: 17,
      alignSelf: 'center',
    },
    userName: {
      color: 'white',
      fontSize: 18,
      alignSelf: 'center',
    },
    sentTextHeader: {
      paddingTop: 8,
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
    },
    sentHeaderView: {
      justifyContent: 'flex-end',
      marginLeft: 20,
      borderRadius: 12,
      // borderTopLeftRadius: 40,
      // borderTopRightRadius: 40,
      // borderBottomLeftRadius: 40,
      marginBottom: 10,
      maxWidth: '65%',
      alignItems: 'flex-end',
    },
    sentText: {
      paddingVertical: 15,
      paddingHorizontal: 10,
      color: '#FFF',
      fontSize: 14,
      fontWeight: '400',
      flexWrap: 'wrap',
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
    chatMainHeader: {
      marginHorizontal: 24,
    },
    inputInnerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 10,
      borderRadius: 26,
      marginHorizontal: 10,
      marginBottom: 10,
    },
    leftInputView: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    inputText: {
      fontSize: 14,
      minHeight: 50,
      marginRight: 10,
      flexBasis: '60%',
      color: getThemeColor('text', theme),
    },
    iconContainer: {
      flexDirection: 'row',
      flexBasis: '20%',
      justifyContent: 'space-between',
    },
    sendBtn: {
      backgroundColor: getThemeColor('inputBackground', theme),
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 25,
      width: 50,
      height: 50,
    },
  });
