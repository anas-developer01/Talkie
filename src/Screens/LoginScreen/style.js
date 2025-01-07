import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  mainView: {
    marginHorizontal: 27,
  },
  labelStyle: {
    fontSize: 15,
    lineHeight: 24,
    fontWeight: '700',
    color: 'white',
    marginBottom: 5,
  },
  inputFocus: {
    flexDirection: 'row',
    borderWidth: 1.5,
    borderRadius: 5,
    borderColor: 'grey',
    marginTop: 3,
    paddingLeft: 14,
    height: 42,
  },
  loginImage: {
    marginTop: 100,
    alignSelf: 'center',
    height: 68,
    width: 103,
  },
  cardView: {
    flex: 1,
    paddingTop: 40,
    paddingBottom: 15,
    marginTop: 10,
    borderTopLeftRadius: 42,
    borderTopRightRadius: 42,
  },
  logoImgView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  logoImg: {height: 19, width: 200},
  cardHeader: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signInTxt: {color: 'white', fontWeight: '600', fontSize: 32},
  subTxt: {color: 'white', fontWeight: '400', fontSize: 14, marginTop: 10},
  emailImg: {height: 13, width: 16},
  emailError: {color: 'yellow'},
  forgotPass: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontWeight: '400',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  passError: {color: 'yellow'},
  passView: {flexDirection: 'row'},
  emailImgView: {justifyContent: 'center', marginRight: 10},

  createAnAccountView: {
    flexDirection: 'row',
    gap: 6,
    marginTop: 15,
    justifyContent: 'center',
  },
  createAnAccountText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '400',
  },
  fontWeightBold: {
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
});

export default styles
