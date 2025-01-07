import {
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import { useThemeColor } from '../../Screens/ThemeProvider/redux/saga';

const Button = ({
  containerStyle,
  textStyle,
  text,
  onPress,
  loading,
  disabled,
}) => {
  const loaderColor = useThemeColor('white');

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.buttonTouchable, containerStyle]}
      disabled={disabled}>
      {loading ? (
        <ActivityIndicator color={loaderColor} />
      ) : (
        <Text style={[styles.buttonText, textStyle,{color:loaderColor}]}>{text}</Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  buttonTouchable: {
    height: 60,
    borderWidth: 1,
    borderRadius: 10,
    width: 143,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 15,
    fontWeight: '700',
    textAlign: 'center',
  },
  rightImage: {
    width: 20,
    height: 20,
    marginLeft: 7,
  },
});
