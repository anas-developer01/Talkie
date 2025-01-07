import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#EDF4F6',
  },
  newRegistrationView: {
    backgroundColor: '#EDF4F6',
    paddingTop: 60,
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  newRegistrationText: {
    color: '#10445C',
    fontSize: 18,
    left: 6,
    fontWeight: '700',
  },
  registrationInputView: {
    flex: 1,
    backgroundColor: '#10445C',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 32,
    gap: 11,
    paddingHorizontal: 27,
  },
  registrationTextView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  registrationText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '400',
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

  entryInformationText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '300',
    alignSelf: 'flex-start',
  },
  pictureView: {
    marginTop: 30,
    flexDirection: 'row',
    marginBottom: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pictureText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '300',
    textAlign: 'center',
    width: 87,
  },
  userPictureCircleWithCamera: {
    width: 103,
    height: 103,
  },
  userPicture: {
    width: 75,
    height: 75,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputStyle: {
    borderWidth: 1.5,
    borderRadius: 5,
    borderColor: 'grey',
    marginTop: 3,
    paddingLeft: 14,
    height: 42,
    backgroundColor: '#3a6579',
  },
  byClickText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '400',
    marginTop: 15,
  },
  termsAndConditionText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
    marginTop: 2,
    textDecorationLine: 'underline',
  },
  button:{
    backgroundColor: '#00a1e9',
    marginTop: 30,
    marginBottom: 25,
  }
});

export default styles;
