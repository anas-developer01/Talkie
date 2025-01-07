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
      borderBottomRightRadius: 26,
      borderBottomLeftRadius: 26,
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      alignItems: 'flex-end',
      paddingBottom: 20,
      flexDirection: 'row',
    },
  });
