import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#EDF4F6',
  },
  loginView: {
    backgroundColor: '#EDF4F6',
    paddingTop: 60,
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  backTouchable: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  forgetPasswordText: {
    color: '#10445C',
    fontSize: 18,
    left: 10,
    fontWeight: '700',
  },

  EmailInputView: {
    flex: 1,
    backgroundColor: '#10445C',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 32,
    gap: 11,
    paddingHorizontal: 27,
  },

  enterEmailText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '700',
    marginTop: 50,
    marginBottom: 20,
  },
  inputFocus: {
    flexDirection: 'row',
    borderWidth: 1.5,
    borderRadius: 5,
    borderColor: 'grey',
    paddingLeft: 14,
    height: 42,
    backgroundColor: '#3a6579',
  },

  textInputStyle: {
    color: 'white',
    flex: 1,
    marginLeft: 10,
  },
  emailError: {color: 'red', alignSelf: 'flex-start'},
  loginBtn: {
    width: '40%',
    backgroundColor: '#00a1e9',
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginVertical: 30,
  },
  loginTxt: {fontSize: 20, color: 'white', fontWeight: 'bold'},
  emailImgView: {justifyContent: 'center'},
  button: {
    backgroundColor: '#00a1e9',
    marginTop: 25,
    height: 52,
  },
});
export default styles;
