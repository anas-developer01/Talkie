import {
  Image,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {Toast} from 'react-native-toast-notifications';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Foundation from 'react-native-vector-icons/Foundation';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import {yupResolver} from '@hookform/resolvers/yup';
import {Controller, useForm} from 'react-hook-form';

import * as yup from 'yup';

import CameraModal from '../../Components/ImageModal';
import {emailRegex} from '../../Utils/function';
import {useImages} from '../../Utils/Images';
import Button from '../../Components/Button';
import {signup as signupAction} from './redux/action';
import styles from './style';
import {connect} from 'react-redux';
import Input from '../../Components/Input';
import Error from '../../Components/Input/Error';
import {useThemeColor} from '../ThemeProvider/redux/saga';

const schema = yup.object({
  name: yup.string().required('This field is required'),
  email: yup
    .string()
    .required('This field is required')
    .matches(emailRegex, 'Email is invalid'),
  phone: yup.string().required('This field is required'),
  password: yup.string().required('This field is required'),
  confirmPassword: yup.string().required('This field is required'),
});

const Signup = ({navigation, signupAction, requesting}) => {
  const [pictureModalVisible, setPictureModalVisible] = useState(false);
  const [profileImage, setProfileImage] = useState('');
  const [passwordView, setPasswordView] = useState(false);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(schema),
  });
  const {images} = useImages();

  const signupButton = data => {
    if (data.password !== data.confirmPassword) {
      Toast.show('Password must be same');
    } else {
      const payload = new FormData();
      if (profileImage) {
        payload.append('profile_image', {
          name: profileImage.path + 'new image.jpeg',
          type: profileImage.mime,
          uri: profileImage.path,
        });
      }
      payload.append('name', data.name);
      payload.append('email', data.email);
      payload.append('phone', data.phone.trim());
      payload.append('password', data.password.trim());
      signupAction(payload, callBack);
    }
  };
  const callBack = () => {
    navigation.navigate('Login');
  };

  const backgroundColor = useThemeColor('primary');
  const textColor = useThemeColor('text');
  const cardBackgroundColor = useThemeColor('headerColor');
  const buttonColor = useThemeColor('buttonColor');
  const inputBackgroundColor = useThemeColor('activeTab');
  const placeholderColor = useThemeColor('placeholder');

  return (
    <>
      <View style={[styles.main, {backgroundColor: backgroundColor}]}>
        <View
          style={[
            styles.newRegistrationView,
            {backgroundColor: backgroundColor},
          ]}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons size={25} color={textColor} name={'arrow-back'} />
          </TouchableOpacity>
          <Text style={[styles.newRegistrationText, {color: textColor}]}>
            New Registration
          </Text>
        </View>
        <View
          style={[
            styles.registrationInputView,
            {backgroundColor: cardBackgroundColor},
          ]}>
          <View style={styles.registrationTextView}>
            <Text style={styles.registrationText}>New Registration</Text>
          </View>
          <Text style={styles.entryInformationText}>
            Please enter the following information to create a new account.
          </Text>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.pictureView}>
              <TouchableOpacity onPress={() => setPictureModalVisible(true)}>
                <ImageBackground
                  style={styles.userPicture}
                  borderRadius={50}
                  source={
                    profileImage ? {uri: profileImage.path} : images.profile
                  }>
                  <Image
                    style={styles.userPictureCircleWithCamera}
                    source={images.userImageUpload}
                  />
                </ImageBackground>
              </TouchableOpacity>
            </View>

            <Text style={styles.labelStyle}>User Name</Text>

            <View
              style={[
                styles.inputFocus,
                {backgroundColor: inputBackgroundColor},
              ]}>
              <View style={styles.emailImgView}>
                <Entypo size={17} color={'white'} name={'user'} />
              </View>
              <Controller
                control={control}
                render={({field: {onChange, onBlur, value}}) => (
                  <Input
                    placeholderColor={placeholderColor}
                    placeholder={'John'}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
                name="name"
              />
            </View>

            <Error errors={errors?.name} />

            <Text style={styles.labelStyle}>Email</Text>

            <View
              style={[
                styles.inputFocus,
                {backgroundColor: inputBackgroundColor},
              ]}>
              <View style={styles.emailImgView}>
                <MaterialCommunityIcons
                  size={17}
                  color={'white'}
                  name={'email'}
                />
              </View>
              <Controller
                control={control}
                render={({field: {onChange, onBlur, value}}) => (
                  <Input
                    placeholderColor={placeholderColor}
                    placeholder={'example@test.com'}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
                name="email"
              />
            </View>

            <Error errors={errors?.email} />

            <Text style={styles.labelStyle}>Phone_no</Text>

            <View
              style={[
                styles.inputFocus,
                {backgroundColor: inputBackgroundColor},
              ]}>
              <View style={styles.emailImgView}>
                <MaterialCommunityIcons
                  size={17}
                  color={'white'}
                  name={'phone'}
                />
              </View>
              <Controller
                control={control}
                render={({field: {onChange, onBlur, value}}) => (
                  <Input
                    placeholderColor={placeholderColor}
                    placeholder={'123456789'}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
                name="phone"
              />
            </View>
            <Error errors={errors?.phone} />

            <Text style={styles.labelStyle}>Password</Text>
            <View
              style={[
                styles.inputFocus,
                {backgroundColor: inputBackgroundColor},
              ]}>
              <View
                style={[styles.passView, {justifyContent: 'space-between'}]}>
                <View style={{flexDirection: 'row', width: '89%'}}>
                  <View style={styles.emailImgView}>
                    <Foundation size={17} color={'white'} name={'key'} />
                  </View>
                  <Controller
                    control={control}
                    render={({field: {onChange, onBlur, value}}) => (
                      <Input
                        placeholderColor={placeholderColor}
                        placeholder={'password'}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        showPassword={passwordView}
                        secureTextEntry={true}
                      />
                    )}
                    name="password"
                  />
                </View>
                <TouchableOpacity
                  onPress={() => setPasswordView(!passwordView)}
                  style={{justifyContent: 'center', marginRight: 5}}>
                  <FontAwesome5
                    size={15}
                    fontSize
                    color={'white'}
                    name={passwordView ? 'eye' : 'eye-slash'}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <Error errors={errors?.password} />

            <Text style={styles.labelStyle}>Confirm Password</Text>
            <View
              style={[
                styles.inputFocus,
                {backgroundColor: inputBackgroundColor},
              ]}>
              <View
                style={[styles.passView, {justifyContent: 'space-between'}]}>
                <View style={{flexDirection: 'row', width: '89%'}}>
                  <View style={styles.emailImgView}>
                    <Foundation size={17} color={'white'} name={'key'} />
                  </View>
                  <Controller
                    control={control}
                    render={({field: {onChange, onBlur, value}}) => (
                      <Input
                        placeholderColor={placeholderColor}
                        placeholder={'c_password'}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        showPassword={passwordView}
                        secureTextEntry={true}
                      />
                    )}
                    name="confirmPassword"
                  />
                </View>
                <TouchableOpacity
                  onPress={() => setPasswordView(!passwordView)}
                  style={{justifyContent: 'center', marginRight: 5}}>
                  <FontAwesome5
                    size={15}
                    color={'white'}
                    name={passwordView ? 'eye' : 'eye-slash'}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <Error errors={errors?.confirmPassword} />

            <Button
              onPress={handleSubmit(signupButton)}
              text={'Register'}
              textStyle={{
                fontSize: 20,
                fontWeight: 'bold',
              }}
              loading={requesting}
              containerStyle={[
                styles.button,
                {
                  backgroundColor: buttonColor,
                },
              ]}
            />
          </ScrollView>
        </View>
      </View>
      <CameraModal
        pictureModalVisible={pictureModalVisible}
        setPictureModalVisible={setPictureModalVisible}
        setProfileImage={setProfileImage}
      />
    </>
  );
};

const mapStateToProps = state => ({
  requesting: state?.signUp?.requesting,
});

const mapDispatchToProps = dispatch => ({
  signupAction: (data, callBack) => dispatch(signupAction(data, callBack)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
