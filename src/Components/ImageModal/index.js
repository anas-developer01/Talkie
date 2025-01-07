import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import ImageCropPicker from 'react-native-image-crop-picker';
import {useThemeColor} from '../../Screens/ThemeProvider/redux/saga';
import AntDesign from 'react-native-vector-icons/AntDesign';

const CameraModal = ({
  pictureModalVisible,
  setPictureModalVisible,
  setProfileImage,
}) => {
  const openCamera = () => {
    ImageCropPicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      setPictureModalVisible(false);
      setProfileImage(image);
    });
  };

  const openImagePicker = () => {
    ImageCropPicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      setPictureModalVisible(false);
      setProfileImage(image);
    });
  };
  const backgroundColor = useThemeColor('primary');
  const textColor = useThemeColor('text');
  return (
    <Modal
      animationType={'slide'}
      transparent={true}
      isVisible={pictureModalVisible}
      hasBackdrop={true}
      backdropOpacity={0.4}
      style={styles.modalStyle}
      onRequestClose={() => {
        setPictureModalVisible(false);
      }}
      onBackdropPress={() => setPictureModalVisible(false)}>
      <View
        style={[styles.pictureModalView, {backgroundColor: backgroundColor}]}>
        <TouchableOpacity
          style={styles.iconTouchable}
          onPress={openImagePicker}>
          <View style={[styles.iconView, {borderColor: textColor}]}>
            <AntDesign name="link" size={22} color={textColor} />
          </View>
          <Text style={[styles.galleryAndCameraTxt, {color: textColor}]}>
            Gallery
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconTouchable} onPress={openCamera}>
          <View style={[styles.iconView, {borderColor: textColor}]}>
            <AntDesign name="camera" size={22} color={textColor} />
          </View>
          <Text style={[styles.galleryAndCameraTxt, {color: textColor}]}>
            Camera
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default CameraModal;

const styles = StyleSheet.create({
  modalStyle: {
    width: '100%',
    height: '100%',
    margin: 0,
    padding: 0,
    justifyContent: 'flex-end',
  },
  pictureModalView: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 14,
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: '30%',
    width: '100%',
    marginTop: 30,
    paddingBottom: 74,
  },
  iconView: {
    borderWidth: 1,
    borderRadius: 50,
    padding: 20,
  },
  iconTouchable: {
    alignItems: 'center',
  },
  attachmentIcon: {
    width: 20,
    height: 20,
  },
  cameraIcon: {
    width: 24,
    height: 24,
  },
  galleryAndCameraTxt: {
    fontSize: 12,
    fontWeight: '400',
    marginTop: 5,
  },
});
