import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';

const Input = props => {
  const {
    secureTextEntry,
    placeholder,
    onBlur,
    onChangeText,
    value,
    error,
    containerStyle,
    numberOfLines,
    maxLength,
    textAlign,
    multiline,
    keyboardType,
    editable,
    showPassword,
    placeholderColor,
  } = props;
  return (
    <>
      <View style={[styles.main, containerStyle]}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          editable={editable}
          numberOfLines={numberOfLines}
          maxLength={maxLength}
          multiline={multiline}
          textAlignVertical="top"
          placeholderTextColor={placeholderColor}
          secureTextEntry={secureTextEntry && !showPassword}
          value={value}
          onBlur={onBlur}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          textAlign={textAlign}
        />
      </View>
      {error ? (
        <Text style={{color: 'red', alignSelf: 'flex-start'}}>{error}</Text>
      ) : (
        ''
      )}
    </>
  );
};

export default Input;

const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    fontSize: 14,
    color: 'white',
    fontWeight: '400',
  },
});
