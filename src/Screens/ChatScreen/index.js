import {
  Image,
  Pressable,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  LayoutAnimation,
  UIManager,
  FlatList,
  Alert,
  Platform,
  Modal,
} from 'react-native';
import React, {useState, useRef} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import database from '@react-native-firebase/database';

import ImageCropPicker from 'react-native-image-crop-picker';
import {connect} from 'react-redux';
import {getStyles} from './style';
import {addNotification as addNotificationAction} from './redux/actions';
import {useThemeColor} from '../ThemeProvider/redux/saga';
import {Toast} from 'react-native-toast-notifications';
import {useEffect} from 'react';
import {useImages} from '../../Utils/Images';
import moment from 'moment';
import storage from '@react-native-firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {launchImageLibrary} from 'react-native-image-picker';

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

const Chat = ({route, theme, addNotificationAction, userDetail}) => {
  const [inputValue, setInputValue] = useState('');
  const [preview, setPreview] = useState(false);
  const [assets, setAssets] = useState([]);
  const [linkOpen, setLinkOpen] = useState(false);
  const [state, setState] = useState({
    listHeight: 0,
    scrollViewHeight: 0,
    uploading: false,
    messages: [],
    messageText: '',
    messageData: null,
  });
  const {images} = useImages();
  const navigation = useNavigation();
  const styles = getStyles(theme);
  const {messageData} = state;

  const {messageuid} = route?.params;

  const handleChange = (key, value) => {
    setState(pre => ({...pre, [key]: value}));
  };

  const openCamera = () => {
    ImageCropPicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(async response => {
        if (!response.path) {
          handleChange('uploading', false);
        } else {
          const uri = response.path;
          const filename = Date.now();
          const uploadUri =
            Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
          const task = storage()
            .ref('Chat/' + filename)
            .putFile(uploadUri);
          // set progress state
          task.on('state_changed', snapshot => {});
          try {
            const durl = await task;
            task.snapshot.ref.getDownloadURL().then(downloadURL => {
              handleSendMessage(downloadURL, 'image');
            });
          } catch (e) {
            console.error(e);
          }
          handleChange('uploading', false);
        }
      })
      .catch(err => {
        handleChange('showAlert', false);
        handleChange('uploading', false);
      });
  };

  const openGallery = () => {
    ImageCropPicker.openPicker({
      mediaType: 'video',
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(async response => {
        if (!response.path) {
          handleChange('uploading', false);
        } else {
          const uri = response.path;
          const filename = Date.now();
          const uploadUri =
            Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
          const task = storage()
            .ref('Chat/' + filename)
            .putFile(uploadUri);
          task.on('state_changed', snapshot => {});
          try {
            await task;
            task.snapshot.ref.getDownloadURL().then(downloadURL => {
              handleSendMessage(downloadURL, 'image');
            });
          } catch (e) {
            console.error(e);
          }
          handleChange('uploading', false);
        }
      })
      .catch(err => {
        handleChange('showAlert', false);
        handleChange('uploading', false);
      });
  };

  // const openVideo = async () => {
  //   await launchImageLibrary({
  //     mediaType: 'video',
  //     width: 300,
  //     height: 400,
  //     durationLimit: 20,
  //   })
  //     .then(async response => {
  //       if (!response) {
  //         console.log('response', response?.assets[0]);
  //         return handleChange('uploading', false);
  //       }
  //       console.log(response, 'response');
  //       const uri = response?.assets[0]?.uri;
  //       const filename = Date.now();
  //       const uploadUri =
  //         Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
  //       const task = storage()
  //         .ref('Chat/' + filename)
  //         .putFile(uploadUri);

  //       task.on('state_changed', snapshot => {});
  //       try {
  //         await task;
  //         const downloadURL = await task.snapshot.ref.getDownloadURL();
  //         handleSendMessage(downloadURL, 'video');
  //       } catch (e) {
  //         console.error(e);
  //       } finally {
  //         handleChange('uploading', false);
  //       }
  //     })
  //     .catch(err => {
  //       console.error(err);
  //       handleChange('showAlert', false);
  //       handleChange('uploading', false);
  //     });
  // };

  const toggleAnimation = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setLinkOpen(!linkOpen);
  };

  let scrollView;
  const downButtonHandler = () => {
    if (scrollView !== null) {
      scrollView.scrollToEnd !== null &&
        scrollView.scrollToEnd({animated: true});
    }
  };
  useEffect(() => {
    if (scrollView !== null) {
      downButtonHandler();
    }
  });

  const handleSendMessage = async (text, type) => {
    try {
      setLinkOpen(false);
      const fcmToken = await AsyncStorage.getItem('FCMToken');
      const trimmedInputValue = inputValue.trim();
      if (trimmedInputValue || text) {
        const data = {
          text: trimmedInputValue || text,
          timeStamp: Date.now(),
          type: type || 'text',
          senderId: userDetail?.id,
        };
        const updatedMessages = [...state.messages, data];
        const updatedValues = {
          messages: updatedMessages,
          senderRead: state?.messageData?.senderRead
            ? state.messageData.senderRead + 1
            : 1,
          receiverRead: state?.messageData?.receiverRead
            ? state.messageData.receiverRead + 1
            : 1,
        };
        setState(prevState => ({
          ...prevState,
          loading: true,
        }));
        await Promise.all([
          database()
            .ref('Messages/' + messageuid)
            .update(updatedValues),

          // sendNotification({
          //   access_token: 'your_access_token_here',
          //   title: userDetail?.name,
          //   message: trimmedInputValue || 'Sent a Photo',
          //   receiver: messageData?.receiver?.id,
          //   sender: userDetail?.id,
          // }),
        ]);
        setState(prevState => ({
          ...prevState,
          loading: false,
          messageText: '',
          messages: updatedMessages,
        }));

        setInputValue('');
        downButtonHandler();
      }
    } catch (err) {
      console.error(err);
      Toast.show('Something went wrong!', Toast.LONG);
    }
  };

  const sendNotification = async notificationData => {
    try {
      await addNotificationAction(notificationData);
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  };

  const deleteMessage = async messageId => {
    try {
      await database()
        .ref(`Messages/${messageuid}/messages/${messageId}`)
        .remove();
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  const handleConfirmDelete = id => {
    Alert.alert(
      'Delete Message',
      'Are you sure you want to delete this message?',
      [{text: 'Cancel'}, {text: 'Yes', onPress: () => deleteMessage(id)}],
    );
  };

  const getProfileImage = () => {
    const isSender = messageData?.senderId === userDetail?.id;
    const profileImage = isSender
      ? messageData?.receiver?.profile_image
      : messageData?.sender?.profile_image;

    return profileImage ? {uri: profileImage} : images.profile;
  };

  const imageList = assets?.map(({uri, image}) => ({
    url: uri ? uri : image,
  }));
  useEffect(() => {
    const db = database();
    const updateReadStatus = async (uid, key) => {
      try {
        await db.ref('Messages/' + uid).update({[key]: 0});
        const snapshot = await db.ref('Messages/' + uid).once('value');
        if (snapshot.val()) {
          setState(prevState => ({
            ...prevState,
            messages: snapshot.val().messages || [],
            messageData: snapshot.val(),
          }));
        }
      } catch (err) {
        console.error(err);
      }
    };

    const handleSnapshot = snapshot => {
      if (snapshot.val()) {
        const {senderId, receiverId} = snapshot.val();
        if (senderId === userDetail?.id) {
          updateReadStatus(messageuid, 'senderRead');
        } else if (receiverId === userDetail?.id) {
          updateReadStatus(messageuid, 'receiverRead');
        }
      }
    };

    if (userDetail && messageuid) {
      const messagesRef = db.ref('Messages/' + messageuid);
      messagesRef.on('value', handleSnapshot);
      return () => {
        messagesRef.off('value', handleSnapshot);
      };
    }
  }, [userDetail]);

  const backgroundColor = useThemeColor('primary');
  const textColor = useThemeColor('text');
  const headerBackgroundColor = useThemeColor('headerColor');
  const imageBackground = useThemeColor('black');
  const inputBackground = useThemeColor('inputBackground');
  const placeholderColor = useThemeColor('placeholder');

  return (
    <>
      <SafeAreaView
        style={[styles.container, {backgroundColor: backgroundColor}]}>
        <View style={[styles.header, {backgroundColor: headerBackgroundColor}]}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons size={25} color={'white'} name={'arrow-back'} />
          </TouchableOpacity>
          <View style={styles.imageDiv}>
            <View
              style={[
                styles.imageContainer,
                {backgroundColor: imageBackground},
              ]}>
              <Image
                source={getProfileImage()}
                style={{
                  width: 37,
                  height: 36,
                  borderRadius: 30,
                }}
              />
            </View>
            <Text style={styles.userName}>
              {messageData
                ? messageData?.senderId === userDetail?.id
                  ? messageData?.receiver?.name
                  : messageData?.sender?.name
                : ''}
            </Text>
          </View>
        </View>

        <FlatList
          data={state?.messages}
          keyboardDismissMode="on-drag"
          style={{flex: 1}}
          contentContainerStyle={{
            alignItems: 'flex-start',
            justifyContent: 'flex-end',
          }}
          onContentSizeChange={(contentWidth, contentHeight) => {
            setState(prevState => ({
              ...prevState,
              listHeight: contentHeight,
            }));
          }}
          onLayout={e => {
            const height = e.nativeEvent.layout.height;
            setState(prevState => ({
              ...prevState,
              scrollViewHeight: height,
            }));
          }}
          ref={ref => {
            scrollView = ref;
          }}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index?.toString()}
          renderItem={({item, index}) => {
            if (item == null) {
              return <View />;
            } else if (item?.senderId !== userDetail?.id) {
              return (
                <View
                  key={index}
                  style={{
                    width: '100%',
                    marginVertical: 10,
                  }}>
                  <View
                    style={{
                      width: '100%',
                      flexDirection: 'row',
                      paddingBottom: 10,
                      marginHorizontal: 10,
                    }}>
                    <Image
                      style={{
                        width: 40,
                        borderRadius: 20,
                        height: 40,
                        marginRight: 10,
                      }}
                      resizeMode="cover"
                      source={
                        messageData?.senderId === userDetail?.id
                          ? messageData?.receiver?.profile_image
                            ? {
                                uri: messageData?.receiver?.profile_image,
                              }
                            : images.profile
                          : messageData?.sender?.profile_image
                          ? {
                              uri: messageData?.sender?.profile_image,
                            }
                          : images.groupImage
                      }
                    />

                    {item?.type === 'image' ? (
                      <View
                        style={{
                          borderRadius: 10,
                          padding: 5,
                          backgroundColor: headerBackgroundColor,
                        }}>
                        <Image
                          source={{uri: item?.text}}
                          style={{
                            width: 250,
                            height: 200,
                            resizeMode: 'contain',
                          }}
                        />
                      </View>
                    ) : (
                      //  item?.type == 'video' ? (
                      //   <View
                      //     style={{
                      //       backgroundColor: headerBackgroundColor,
                      //       maxWidth: '90%',
                      //       borderRadius: 10,
                      //       paddingLeft: 10,
                      //       paddingHorizontal: 30,
                      //     }}>
                      //     <View
                      //       style={{
                      //         width: '130%',
                      //         alignItems: 'flex-end',
                      //         marginTop: 10,
                      //       }}>
                      //       <Text
                      //         style={{
                      //           color: 'white',
                      //           fontSize: 10,
                      //           marginHorizontal: 5,
                      //           marginTop: -5,
                      //         }}>
                      //         {moment(item?.timeStamp).format('h:mm a')}
                      //       </Text>
                      //     </View>
                      //   </View>
                      // ) :
                      <View
                        style={{
                          backgroundColor: headerBackgroundColor,
                          maxWidth: '80%',
                          borderRadius: 10,
                          paddingLeft: 10,
                          paddingHorizontal: 30,
                        }}>
                        <Text
                          style={{
                            textAlign: 'left',
                            color: 'white',
                          }}>
                          {item?.text}
                        </Text>

                        <View
                          style={{
                            alignItems: 'flex-end',
                            marginTop: 10,
                          }}>
                          <Text
                            style={{
                              color: 'white',
                              fontSize: 10,
                              marginHorizontal: 5,
                              marginBottom: 5,
                              left: 20,
                            }}>
                            {moment(item?.timeStamp).format('h:mm a')}
                          </Text>
                        </View>
                      </View>
                    )}
                  </View>
                </View>
              );
            } else {
              return (
                <Pressable
                  onLongPress={() => handleConfirmDelete(index)}
                  key={index}
                  style={styles.sentTextHeader}>
                  <View
                    style={{
                      width: '95%',
                      flexDirection: 'row',
                      justifyContent: 'flex-end',
                      alignItems: 'flex-end',
                      paddingBottom: 10,
                    }}>
                    {item?.type === 'image' ? (
                      <Pressable
                        onPress={
                          (() => setAssets([item?.text]), setPreview(true))
                        }
                        style={{
                          borderRadius: 10,
                          padding: 5,
                          backgroundColor: inputBackground,
                        }}>
                        <Image
                          source={{uri: item?.text}}
                          style={{
                            width: 250,
                            height: 200,
                            resizeMode: 'contain',
                          }}
                        />
                      </Pressable>
                    ) : (
                      <View
                        style={{
                          backgroundColor: inputBackground,
                          maxWidth: '85%',
                          alignItems: 'flex-end',
                          borderRadius: 10,
                          borderBottomRightRadius: 0,
                          padding: 10,
                        }}>
                        <Text style={{color: textColor}}>{item?.text}</Text>
                        <Text
                          style={{
                            color: textColor,
                            fontSize: 10,
                            marginTop: 7,
                          }}>
                          {moment(item?.timeStamp).format('h:mm a')}
                        </Text>
                      </View>
                    )}
                  </View>
                </Pressable>
              );
            }
          }}
        />

        {linkOpen && (
          <View
            style={[
              styles.inputInnerContainer,
              {
                height: 100,
                justifyContent: 'space-evenly',
                marginHorizontal: 20,
                backgroundColor: inputBackground,
              },
            ]}>
            {/* <TouchableOpacity
              style={{
                backgroundColor: 'purple',
                width: 50,
                height: 50,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 25,
              }}
              onPress={openVideo}>
              <Ionicons size={25} color={'white'} name={'videocam'} />
            </TouchableOpacity> */}

            <TouchableOpacity
              style={{
                backgroundColor: 'green',
                width: 50,
                height: 50,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 25,
              }}
              onPress={openGallery}>
              <MaterialIcons size={25} color={'white'} name={'insert-photo'} />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: 'black',
                width: 50,
                height: 50,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 25,
              }}
              onPress={openCamera}>
              <MaterialIcons size={25} color={'white'} name={'add-a-photo'} />
            </TouchableOpacity>
          </View>
        )}

        <View style={{flexDirection: 'row'}}>
          <View
            style={[
              styles.inputInnerContainer,
              {backgroundColor: inputBackground},
            ]}>
            <View style={styles.leftInputView}>
              <TextInput
                placeholderTextColor={placeholderColor}
                placeholder="Type here..."
                style={[styles.inputText, {color: textColor}]}
                value={inputValue}
                onChangeText={setInputValue}
              />
            </View>
            <View style={styles.iconContainer}>
              <TouchableOpacity onPress={toggleAnimation}>
                <Entypo size={25} color={textColor} name={'link'} />
              </TouchableOpacity>
              <TouchableOpacity onPress={openCamera}>
                <Entypo size={25} color={textColor} name={'camera'} />
              </TouchableOpacity>
            </View>
          </View>
          <Pressable
            style={[styles.sendBtn, {backgroundColor: inputBackground}]}
            onPress={() =>
              state.messages ? handleSendMessage() : console('')
            }>
            <MaterialCommunityIcons size={25} color={textColor} name={'send'} />
          </Pressable>
        </View>
      </SafeAreaView>
    </>
  );
};

const mapStateToProps = state => ({
  theme: state?.themes?.theme,
  userDetail: state?.login?.userDetail?.user,
});

const mapDispatchToProps = dispatch => ({
  addNotificationAction: data => dispatch(addNotificationAction(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Chat);
