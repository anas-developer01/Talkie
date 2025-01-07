import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import {logout as logoutAction} from '../../Screens/LoginScreen/redux/actions';
import {connect} from 'react-redux';
import {getThemeColor, useThemeColor} from '../../Screens/ThemeProvider/redux/saga';

const Logout = ({
  isLogOutModelVisible,
  setIsLogOutModalVisible,
  logoutAction,
  theme,
}) => {
  const styles = getStyles(theme);

  const backgroundColor = useThemeColor('primary');
  const textColor = useThemeColor('text');
  const buttontext = useThemeColor('white');
  const subText = useThemeColor('black');

  return (
    <Modal
      animationIn="zoomIn"
      animationOut="zoomOut"
      backdropOpacity={0.5}
      isVisible={isLogOutModelVisible}
      style={styles.addModalContainer}
      hasBackdrop={true}
      onBackdropPress={() => setIsLogOutModalVisible(false)}>
      <View style={[styles.ModalContainer,{backgroundColor:backgroundColor}]}>
        <View style={styles.modalTextContainer}>
          <Text style={[styles.titleText,{color:textColor}]}>Logout</Text>
          <Text style={[styles.descriptionText,{color:subText}]}>
            Are you sure to want to Logout
          </Text>
        </View>
        <View style={styles.btnView}>
          <TouchableOpacity
            onPress={() => setIsLogOutModalVisible(false)}
            style={[styles.cancelView,{borderColor:subText}]}>
            <Text style={[styles.cancelText,{color:subText}]}>No</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.deleteView,{backgroundColor:textColor}]}
            onPress={() => logoutAction()}>
            <Text style={[styles.DeleteText,{color:buttontext}]}>Yes</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export const getStyles = theme =>
  StyleSheet.create({
    addModalContainer: {
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',
    },
    ModalContainer: {
      alignItems: 'center',
      backgroundColor: getThemeColor('primary', theme),
      borderRadius: 20,
      width: '100%',
      paddingHorizontal: 16,
      paddingLeft: 15,
      paddingTop: 30,
      paddingBottom: 20,
    },
    modalTextContainer: {
      paddingTop: 32,
      alignItems: 'center',
      paddingHorizontal: 15,
      paddingBottom: 16,
    },
    titleText: {
      fontSize: 25,
      fontWeight: '700',
      color: getThemeColor('text', theme),
      textAlign: 'center',
      marginBottom: 5,
    },
    descriptionText: {
      fontSize: 18,
      fontWeight: '400',
      color: getThemeColor('black', theme),
      textAlign: 'center',
    },
    btnView: {
      paddingBottom: 14,
      alignContent: 'center',
      justifyContent: 'space-between',
      flexDirection: 'row',
      marginTop: 20,
    },
    cancelView: {
      borderRadius: 10,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: getThemeColor('black', theme),
      marginHorizontal: 5,
      justifyContent: 'center',
      width: 137,
      height: 57,
    },
    cancelText: {
      fontSize: 14,
      color: getThemeColor('black', theme),
      fontWeight: '700',
    },
    deleteView: {
      backgroundColor: getThemeColor('text', theme),
      borderRadius: 10,
      marginHorizontal: 5,
      alignItems: 'center',
      justifyContent: 'center',
      width: 137,
      height: 57,
    },
    DeleteText: {
      color: getThemeColor('white', theme),
      fontSize: 14,
      fontWeight: '700',
    },
  });
const mapStateToProps = state => ({
  theme: state?.themes?.theme,
});
const mapDispatchToProps = dispatch => ({
  logoutAction: () => dispatch(logoutAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
