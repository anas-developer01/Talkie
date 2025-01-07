import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#EDF4F6',
  },
  newPasswordView: {
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
  backArrowImage: {
    width: 18,
    height: 13,
  },
  newPasswordText: {
    color: '#10445C',
    fontSize: 18,
    fontWeight: '700',
    left: 10,
  },
  passwordInputView: {
    flex: 1,
    backgroundColor: '#10445C',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 32,
    paddingHorizontal: 27,
  },

  setNewPasswordText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '700',
    marginTop: 50,
    marginBottom: 30,
  },
  labelStyle: {
    fontSize: 15,
    lineHeight: 24,
    fontWeight: '700',
    color: 'white',
    marginTop: 10,
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

  emailImgView: {justifyContent: 'center', marginRight: 10},
  passView: {flexDirection: 'row'},

  button: {
    backgroundColor: '#00a1e9',
    marginTop: 25,
    height: 52,
  },
});
export default styles;
