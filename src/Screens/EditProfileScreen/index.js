import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import React, {useEffect, useLayoutEffect, useState} from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import * as yup from 'yup';
import {TextInput} from 'react-native-paper';
import {yupResolver} from '@hookform/resolvers/yup';
import {Controller, useForm} from 'react-hook-form';
import {connect} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';

import {emailRegex} from '../../Utils/function';
import {getStyles} from './style';
import CameraModal from '../../Components/ImageModal';
import {
  updateProfile as updateProfileAction,
  getProfile as getProfileAction,
} from './redux/actions';
import Button from '../../Components/Button';
import Error from '../../Components/Input/Error';
import {useThemeColor} from '../ThemeProvider/redux/saga';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useStore} from 'react-redux';

const schema = yup.object({
  name: yup.string().trim().required(),
  phone: yup
    .string()
    .matches(/^(?:\D*\d){12}\D*$/, 'Invalid phone number')
    .label('Phone Number'),
  email: yup.string().matches(emailRegex, 'Enter a valid email').label('Email'),
});

const EditProfile = ({
  updateProfileAction,
  requesting,
  profileData,
  theme,
  userDetail,
  getProfileAction,
  navigation,
}) => {
  const {
    control,
    setValue,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [showImageUploadModal, setShowImageUploadModal] = useState(false);
  const [profileImage, setProfileImage] = useState('');
  const [loading, setLoading] = useState(false);

  const isFocused = useIsFocused();
  const styles = getStyles(theme);
  const store = useStore().getState();

  const updateProfileButton = data => {
    const payload = new FormData();
    payload.append('id', profileData?.id);
    if (profileImage) {
      payload.append('profile_image', {
        name: profileImage.path + 'new image.jpeg',
        type: profileImage.mime,
        uri: profileImage.path,
      });
    }
    if (data.name && data.name != profileData?.name) {
      payload.append('name', data.name);
    }
    if (data.phone && data.phone != profileData?.phone) {
      payload.append('phone', data.phone);
    }
    if (data.password !== undefined && data.password !== '') {
      payload.append('new_password', data.password);
    }
    payload?._parts.length > 1 ? updateProfileAction(payload) : '';
  };

  useEffect(() => {
    setLoading(true);
    const data = {
      id: userDetail?.id,
    };
    getProfileAction(data);
  }, [isFocused]);

  useLayoutEffect(() => {
    setProfileImage(profileData?.profile_image);
    setValue('name', profileData?.name);
    setValue('email', profileData?.user_email);
    setValue('phone', profileData?.phone);
  }, [profileData]);

  const backgroundColor = useThemeColor('primary');
  const textColor = useThemeColor('text');
  const headerBackgroundColor = useThemeColor('headerColor');

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: backgroundColor}]}>
      <StatusBar
        animated={true}
        backgroundColor={headerBackgroundColor}
        barStyle={'light-content'}
      />
      <View style={[styles.header, {backgroundColor: headerBackgroundColor}]}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{justifyContent: 'center', height: 45}}>
          <Ionicons size={25} color={'white'} name={'arrow-back'} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Profile</Text>
      </View>
      <ScrollView>
        <View style={styles.ImgView}>
          {profileImage ? (
            <View
              style={[
                styles.imageView,
                {
                  borderColor: textColor,
                },
              ]}>
              <Image
                source={
                  profileImage?.path
                    ? {uri: profileImage?.path}
                    : {uri: profileImage}
                }
                style={styles.profileImg}
              />
            </View>
          ) : (
            <View style={styles.imageView}>
              <Text style={styles.imgTxt}>N/A</Text>
            </View>
          )}
          <TouchableOpacity
            style={styles.camImg}
            onPress={() => setShowImageUploadModal(true)}>
            <Entypo size={25} color={'white'} name={'camera'} />
          </TouchableOpacity>
        </View>
        <View style={{marginHorizontal: 20}}>
          <Controller
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                label="username"
                value={value}
                onChangeText={onChange}
                placeholder={'AdminTest'}
                textColor={textColor}
                activeUnderlineColor={textColor}
                placeholderTextColor={styles.placeholder}
                style={styles.input}
              />
            )}
            name="name"
          />
          <Error errors={errors.name} />
          <Controller
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                label="Email"
                value={value}
                onChangeText={onChange}
                placeholder={'example@test.com'}
                textColor={styles.placeholder.color}
                placeholderTextColor={styles.placeholder}
                style={styles.input}
                editable={false}
              />
            )}
            name="email"
          />
          <Controller
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                label="Phone"
                value={value}
                onChangeText={onChange}
                placeholder={'123456789'}
                textColor={textColor}
                activeUnderlineColor={textColor}
                placeholderTextColor={styles.placeholder}
                style={styles.input}
              />
            )}
            name="phone"
          />
          <Error errors={errors.phone} />

          <Controller
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                label="Password"
                value={value}
                onChangeText={onChange}
                textColor={textColor}
                activeUnderlineColor={textColor}
                placeholder={'12345'}
                placeholderTextColor={styles.placeholder}
                style={styles.input}
              />
            )}
            name="password"
          />
        </View>

        <View>
          <Button
            text={'Save'}
            loading={requesting}
            containerStyle={[
              styles.buttonCon,
              {
                backgroundColor: textColor,
              },
            ]}
            onPress={handleSubmit(updateProfileButton)}
            disabled={requesting}
          />
        </View>
      </ScrollView>
      <CameraModal
        setPictureModalVisible={setShowImageUploadModal}
        pictureModalVisible={showImageUploadModal}
        setProfileImage={setProfileImage}
      />
    </SafeAreaView>
  );
};

const mapStateToProps = state => ({
  requesting: state?.editProfile?.requesting,
  profileData: state?.editProfile?.profile,
  theme: state?.themes?.theme,
  userDetail: state?.login?.userDetail?.user,
});

const mapDispatchToProps = dispatch => ({
  getProfileAction: data => dispatch(getProfileAction(data)),
  updateProfileAction: data => dispatch(updateProfileAction(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
