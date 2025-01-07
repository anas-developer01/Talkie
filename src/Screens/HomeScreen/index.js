import {
  ActivityIndicator,
  Animated,
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import React, { useState } from 'react';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useIsFocused } from '@react-navigation/native';

import { useImages } from '../../Utils/Images';
import { getUser as getUserAction } from '../NewChat/redux/action';
import { getStyles } from './style';
import { useThemeColor } from '../ThemeProvider/redux/saga';
import AddButton from '../../Components/AddButton';
import database from '@react-native-firebase/database';
import moment from 'moment';
import { Toast } from 'react-native-toast-notifications';
import { GetFCMToken } from '../../Utils/notification';

const Home = ({ userDetail, navigation }) => {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isActive, setIsActive] = useState('');
  const [selectedIds, setselectedIds] = useState([]);
  const [state, setState] = useState({
    loading: false,
    List: [],
    allList: [],
    unread: [],
    searchText: '',
  });

  const { loading, allList, List, searchText } = state;
  const translateX = useRef(new Animated.Value(0)).current;

  const { images } = useImages();
  const isFocused = useIsFocused();
  const styles = getStyles();
  const isDark = useColorScheme();

  const handleChange = (key, value) => {
    setState(pre => ({ ...pre, [key]: value }));
  };

  const selectMutipleCards = item => {
    const findId = selectedIds?.find(id => id === item?.id);
    if (findId) {
      const filterArray = selectedIds.filter(itemID => findId !== itemID);
      setselectedIds(filterArray);
    } else {
      setselectedIds(prev => [...prev, item?.id]);
    }
  };

  const snapshotToArray = snapshot =>
    Object.entries(snapshot).map(e => Object.assign(e[1], { uid: e[0] }));

  const unreadList = messages => {
    const unread = messages?.filter(
      item =>
        (item?.receiverId === userDetail?.id && item?.receiverRead > 0) ||
        (item?.senderId === userDetail?.id && item?.senderRead > 0),
    );
    handleChange('unread', unread);
  };

  const sortByDate = data => {
    return data?.sort(function (a, b) {
      return (
        new Date(
          b?.messages && b?.messages?.length > 0
            ? b?.messages[b?.messages?.length - 1]?.timeStamp
            : b?.timeStamp,
        ) -
        new Date(
          a?.messages && a?.messages?.length > 0
            ? a?.messages[a?.messages?.length - 1]?.timeStamp
            : a?.timeStamp,
        )
      );
    });
  };

  const sortByUser = data => {
    const id = userDetail?.id;
    const filterArray = data?.filter(item => {
      return (
        item?.senderId === id ||
        item?.receiverId === id ||
        item?.participentIds?.includes(id)
      );
    });
    return filterArray;
  };

  const groupSorted = data => {
    const id = userDetail?.id;
    return data?.filter(item => item?.participentIds?.includes(id));
  };

  const getMessages = async () => {
    try {
      handleChange('loading', true);
      database()
        .ref(`Messages`)
        .on('value', snapshot => {
          if (snapshot.val()) {
            const messages = snapshotToArray(snapshot.val());
            handleChange('allList', messages);
            unreadList(messages);
            handleChange('loading', false);
            handleChange('List', messages);
          } else {
            handleChange('loading', false);
          }
        });
    } catch (error) {
      handleChange('loading', false);
    }
  };

  const deleteChatById = async chatId => {
    try {
      handleChange('loading', true);
      await database().ref(`Messages/${chatId}`).remove();
      handleChange('loading', false);
      console.log(`Chat with ID ${chatId} has been deleted.`);
    } catch (error) {
      handleChange('loading', false);
      console.error('Error deleting chat:', error);
    }
  };

  const filtered = (key, value) => {
    handleChange(key, value);

    if (value) {
      const searchValue = value.toLowerCase();

      const filteredList = allList?.filter(entry => {
        if (entry?.type === 'group') {
          return entry?.name?.toLowerCase().includes(searchValue);
        }

        const targetName =
          entry?.senderId !== userDetail?.id
            ? entry?.sender?.name
            : entry?.receiver?.name;

        return targetName?.toLowerCase().includes(searchValue);
      });

      handleChange('List', filteredList);
    } else {
      handleChange('List', allList);
    }
  };

  useEffect(() => {
    if (isSearchActive) {
      Animated.timing(translateX, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(translateX, {
        toValue: -300,
        duration: 300,
        useNativeDriver: true,
      }).start(() => { });
    }
  }, [isSearchActive]);

  useEffect(() => {
    setIsActive('All');
    GetFCMToken()
    getMessages();
    handleChange('List', []);
    handleChange('allList', []);
  }, [isFocused]);

  const backgroundColor = useThemeColor('primary');
  const textColor = useThemeColor('text');
  const headerBackgroundColor = useThemeColor('headerColor');
  const searchBar = useThemeColor('activeTab');
  const placeholderColor = useThemeColor('placeholder');

  const group = List?.filter(item => item.type == 'group');

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: backgroundColor }]}>
      <StatusBar
        animated={true}
        backgroundColor={headerBackgroundColor}
        barStyle={'light-content'}
      />

      <View style={[styles.header, { backgroundColor: headerBackgroundColor }]}>
        {!isSearchActive ? (
          <>
            <Text style={styles.headerText}>Connect Vibe</Text>
            <Pressable onPress={() => setIsSearchActive(true)}>
              <EvilIcons size={28} color={'white'} name={'search'} />
            </Pressable>
          </>
        ) : (
          <Animated.View
            style={[
              styles.searchContainer,
              { transform: [{ translateX }], backgroundColor: searchBar },
            ]}>
            <View
              style={{
                flexDirection: 'row',
                borderRadius: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Pressable
                onPress={() => {
                  setIsSearchActive(false),
                    handleChange('searchText', ''),
                    handleChange('List', allList);
                }}
                style={{ marginHorizontal: 5 }}>
                <Ionicons size={20} color={'white'} name={'arrow-back'} />
              </Pressable>
              <TextInput
                value={searchText}
                placeholderTextColor={placeholderColor}
                placeholder="search"
                style={{ width: '80%', color: 'white', textAlign: 'left' }}
                onChangeText={value => filtered('searchText', value)}
              />
            </View>
          </Animated.View>
        )}
      </View>

      <View
        style={{
          flexDirection: 'row',
          width: 150,
          justifyContent: 'space-between',
          marginTop: 10,
          marginHorizontal: 10,
        }}>
        <TouchableOpacity
          style={{
            borderRadius: 10,
            width: 41,
            height: 36,
            backgroundColor:
              isActive == 'All'
                ? headerBackgroundColor
                : isDark == 'dark'
                  ? '#404244'
                  : '#487E97',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => setIsActive('All')}>
          <Text style={{ color: 'white' }}>All</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            borderRadius: 10,
            width: 92,
            height: 36,
            backgroundColor:
              isActive == 'Groups'
                ? headerBackgroundColor
                : isDark == 'dark'
                  ? '#404244'
                  : '#487E97',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => setIsActive('Groups')}>
          <Text style={{ color: 'white' }}>Groups</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={{ marginVertical: '50%' }}>
          <ActivityIndicator size="small" color={textColor} />
        </View>
      ) : isActive == 'All' ? (
        <FlatList
          data={sortByUser(sortByDate(List))}
          numColumns={1}
          style={{ width: '100%' }}
          noIndent={true}
          keyExtractor={item => item?.timeStamp}
          ListEmptyComponent={() => (
            <View
              style={{
                width: '100%',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  marginTop: 20,
                  color: textColor,
                }}>
                You have no messages
              </Text>
            </View>
          )}
          renderItem={({ item, index }) => {
            const lastMessage =
              item?.messages &&
                Array.isArray(item.messages) &&
                item.messages.length > 0
                ? item.messages[item.messages.length - 1]
                : null;

            const timeStamp =
              Array.isArray(item?.messages) &&
              item.messages.length > 0 &&
              moment(
                item.messages[item.messages.length - 1]?.timeStamp,
              ).fromNow();

            const messagePreview = lastMessage
              ? lastMessage.type === 'image'
                ? 'Sent a photo'
                : lastMessage.text.length > 30
                  ? lastMessage.text.slice(0, 30) + ' ....'
                  : lastMessage.text
              : '';
            return (
              <>
                {lastMessage && (
                  <TouchableOpacity
                    style={[
                      styles.chatContainer,
                      {
                        borderColor: textColor,
                      },
                    ]}
                    onPress={() => {
                      if (item?.type === 'group') {
                        navigation.navigate('GroupChat', {
                          messageuid: item.id,
                        });
                      } else {
                        navigation.navigate('Chat', {
                          messageuid: item?.id,
                          data: item,
                        });
                      }
                    }}
                    onLongPress={() => {
                      if (item.type == 'group') {
                        item.senderId == userDetail.id
                          ? deleteChatById(item.id)
                          : Toast.show('You cannot delete this chat');
                      } else {
                        deleteChatById(item.id);
                      }
                    }}>
                    <View style={styles.imageContainer}>
                      <Image
                        source={
                          item?.type === 'group'
                            ? images.groupImage
                            : item?.senderId === userDetail?.id
                              ? { uri: item?.receiver?.profile_image }
                              : item?.senderId !== userDetail?.id
                                ? { uri: item?.sender?.profile_image }
                                : images.profile
                        }
                        style={styles.image}
                      />
                    </View>
                    <View style={styles.textContainer} key={index}>
                      <View style={{ marginLeft: 10 }}>
                        <Text style={[styles.userName, { color: textColor }]}>
                          {item?.type === 'group'
                            ? item?.name
                            : item?.senderId === userDetail?.id
                              ? item?.receiver?.name
                              : item?.sender?.name}
                        </Text>
                        <Text
                          style={[styles.message, { color: textColor }]}
                          numberOfLines={1}>
                          {messagePreview}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.dateView}>
                      <Text style={styles.date}>
                        {timeStamp == 'a few seconds ago'
                          ? 'Just Now'
                          : timeStamp}
                      </Text>
                    </View>
                  </TouchableOpacity>
                )}
              </>
            );
          }}
        />
      ) : (
        <FlatList
          data={groupSorted(sortByDate(group))}
          numColumns={1}
          style={{ width: '100%' }}
          noIndent={true}
          keyExtractor={item => item?.timeStamp}
          ListEmptyComponent={() => (
            <View
              style={{
                width: '100%',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  marginTop: 20,
                  color: textColor,
                }}>
                You have no messages
              </Text>
            </View>
          )}
          renderItem={({ item, index }) => {
            const lastMessage =
              item?.messages &&
                Array.isArray(item.messages) &&
                item.messages.length > 0
                ? item.messages[item.messages.length - 1]
                : null;

            const timeStamp =
              Array.isArray(item?.messages) &&
              item.messages.length > 0 &&
              moment(
                item.messages[item.messages.length - 1]?.timeStamp,
              ).fromNow();

            const messagePreview = lastMessage
              ? lastMessage.type === 'image'
                ? 'Sent a photo'
                : lastMessage.text.length > 30
                  ? lastMessage.text.slice(0, 30) + ' ....'
                  : lastMessage.text
              : '';
            return (
              <>
                {lastMessage && (
                  <TouchableOpacity
                    style={[
                      styles.chatContainer,
                      {
                        borderColor: textColor,
                      },
                    ]}
                    onPress={() => {
                      navigation.navigate('GroupChat', {
                        messageuid: item.id,
                        data: item,
                      });
                    }}>
                    <View style={[styles.imageContainer]}>
                      <Image
                        source={
                          item?.type == 'group'
                            ? images.groupImage
                            : item?.senderId === userDetail?.id
                              ? item?.receiver?.profile_image
                                ? { uri: item?.receiver?.profile_image }
                                : images.profile
                              : { uri: item?.receiver?.profile_image }
                        }
                        style={styles.image}
                      />
                    </View>
                    <View style={styles.textContainer} key={index}>
                      <View style={{ marginLeft: 10 }}>
                        <Text style={[styles.userName, { color: textColor }]}>
                          {item?.type === 'group'
                            ? item?.name
                            : item?.senderId === userDetail?.id
                              ? item?.receiver?.name
                              : item?.sender?.name}
                        </Text>
                        <Text
                          style={[styles.message, { color: textColor }]}
                          numberOfLines={1}>
                          {messagePreview}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.dateView}>
                      <Text style={styles.date}>
                        {timeStamp == 'a few seconds ago'
                          ? 'Just Now'
                          : timeStamp}
                      </Text>
                    </View>
                  </TouchableOpacity>
                )}
              </>
            );
          }}
        />
      )}

      <AddButton />
    </SafeAreaView>
  );
};

const mapStateToProps = state => ({
  userDetail: state?.login?.userDetail?.user,
  userSearched: state?.searchUser?.profile,
});

const mapDispatchToProps = dispatch => ({
  getProfileAction: data => dispatch(getProfileAction(data)),
  getUserAction: data => dispatch(getUserAction(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
