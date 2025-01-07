import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  enterCodeView: {
    paddingTop: 60,
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  backTouchable: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  enterCodedText: {
    fontSize: 18,
    fontWeight: '700',
    left: 10,
  },
  codeInputView: {
    flex: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 32,
    paddingHorizontal: 27,
  },
  verificationCodeText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '700',
    marginTop: 50,
    marginBottom: 30,
  },
  enterCodeText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '300',
    marginBottom: 0,
  },
  userEmailText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 30,
    textDecorationLine: 'underline',
  },
  resendText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
    marginTop: 17,
    textDecorationLine: 'underline',
  },
  loginBtn: {
    width: '40%',
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginVertical: 30,
  },
  loginTxt: {fontSize: 20, color: 'white', fontWeight: 'bold'},
  codeFieldRoot: {marginTop: 20, width: '100%'},
  cell: {
    flex: 1,
    fontSize: 25,
    color: '#fff',
    borderColor: 'grey',
    textAlign: 'center',
    fontWeight: '600',
    paddingTop: 15,
    marginRight: 5,
    marginLeft: 5,
    height: 67,
    width: 55,
    borderWidth: 1,
    borderRadius: 4,
  },
  focusCell: {
    borderColor: '#fff',
    fontSize: 25,
    fontWeight: '600',
  },
  CodeWrapper: {
    shadowColor: '#fff',
    shadowRadius: 7,
    elevation: 5,
    paddingHorizontal: 20,
    paddingBottom: 25,
  },
  button: {
    marginTop: 25,
    height: 52,
    width: '100%',
  },
});

export default styles;
