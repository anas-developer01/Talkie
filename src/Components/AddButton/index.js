import {StyleSheet, Platform, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {useThemeColor} from '../../Screens/ThemeProvider/redux/saga';

export default function AddButton() {
  const navigation = useNavigation();
  const backgroundColor = useThemeColor('headerColor');

  return (
    <View style={[styles.btnContainer, {backgroundColor: backgroundColor}]}>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.navigate('AddUser')}>
        <Text style={styles.btnText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  btnContainer: {
    marginBottom: Platform.OS == 'ios' ? 20 : 0,
    position: 'absolute',
    alignItems: 'flex-end',
    height: 67,
    width: 67,
    backgroundColor: '#333333',
    borderRadius: 32,
    bottom: 30,
    right: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },

  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 70,
    height: 70,
  },

  btnText: {
    color: 'white',
    fontSize: 30,
    textAlign: 'center',
  },
});
