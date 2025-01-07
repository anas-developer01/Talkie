import {Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import styles from './style';
import {connect} from 'react-redux';
import {
  forgotToken as forgotTokenAction,
  forgotPassword as forgotPasswordAction,
} from '../ForgotPasswordScreen/redux/actions';
import Button from '../../Components/Button';
import {useThemeColor} from '../ThemeProvider/redux/saga';

const CELL_COUNT = 4;

const ForgotCode = ({
  navigation,
  forgotTokenAction,
  tokenRequesting,
  route,
  forgotPasswordAction,
}) => {
  const [value, setValue] = useState('');
  const [valueError, setValueError] = useState(false);
  const [mail, setMail] = useState(route?.params?.email);
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const onConfirmCode = () => {
    if (value) {
      const data = {
        token: value,
      };
      forgotTokenAction(data, callBack);
    } else {
      setValueError(true);
    }
    callBack();
  };

  const callBack = () => {
    navigation.navigate('SetNewPassword', {
      code: value,
    });
  };

  const onResendButton = () => {
    const data = {
      email: mail,
    };
    forgotPasswordAction(data, verificationCode);
  };

  const verificationCode = () => {
    navigation.navigate('ForgotCode');
  };

  const backgroundColor = useThemeColor('primary');
  const textColor = useThemeColor('text');
  const cardBackgroundColor = useThemeColor('headerColor');
  const buttonColor = useThemeColor('buttonColor');
  const cellBackgroundColor = useThemeColor('activeTab');
  return (
    <View style={[styles.main, {backgroundColor: backgroundColor}]}>
      <View style={[styles.enterCodeView, {backgroundColor: backgroundColor}]}>
        <TouchableOpacity
          style={styles.backTouchable}
          onPress={() => navigation.goBack()}>
          <Ionicons size={25} color={textColor} name={'arrow-back'} />
        </TouchableOpacity>
        <Text style={[styles.enterCodedText, {color: textColor}]}>
          Enter the code
        </Text>
      </View>
      <View
        style={[styles.codeInputView, {backgroundColor: cardBackgroundColor}]}>
        <Text style={styles.verificationCodeText}>
          Enter the verification code
        </Text>
        <Text style={styles.enterCodeText}>
          Please enter the code sent to the following e-mail
        </Text>
        <View
          style={{
            alignItems: 'flex-start',
          }}>
          <Text style={styles.userEmailText}>{mail}</Text>
        </View>
        <View style={styles.CodeWrapper}>
          <CodeField
            ref={ref}
            {...props}
            value={value}
            onChangeText={e => {
              setValue(e), setValueError(false);
            }}
            cellCount={CELL_COUNT}
            rootStyle={styles.codeFieldRoot}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={({index, symbol, isFocused}) => (
              <Text
                key={index}
                style={[
                  styles.cell,
                  {backgroundColor: cellBackgroundColor},
                  isFocused && styles.focusCell,
                ]}
                onLayout={getCellOnLayoutHandler(index)}>
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            )}
          />
          {valueError ? (
            <Text style={{marginHorizontal: 5, top: 6, color: 'red'}}>
              Please enter the code
            </Text>
          ) : (
            ''
          )}
        </View>

        <Button
          onPress={onConfirmCode}
          text={'Submit'}
          loading={tokenRequesting}
          containerStyle={[
            styles.button,
            {
              backgroundColor: buttonColor,
            },
          ]}
          disabled={tokenRequesting}
        />
        <TouchableOpacity onPress={onResendButton}>
          <Text style={styles.resendText}>Resend</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const mapStateToProps = state => ({
  tokenRequesting: state.forgotPassword.tokenRequesting,
});
const mapDispatchToProps = dispatch => ({
  forgotTokenAction: (data, callBack) =>
    dispatch(forgotTokenAction(data, callBack)),
  forgotPasswordAction: (data, callBack) =>
    dispatch(forgotPasswordAction(data, callBack)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ForgotCode);
