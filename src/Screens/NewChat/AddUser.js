import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  StatusBar,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
  FlatList,
  Text,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import database from '@react-native-firebase/database';
import {useThemeColor} from '../ThemeProvider/redux/saga';
import {getUser as getUserAction} from './redux/action';
import styles from './style';
import {Toast} from 'react-native-toast-notifications';

const height = Dimensions.get('window').height;

const AddUser = ({
  navigation,
  getUserAction,
  userSearched,
  loading,
  userDetail,
}) => {
  const [searchName, setSearchName] = useState('');
 
  const handleSearch = val => {
    setSearchName(val);
  };

  const createAndNavigate = item => {
    const id = `${userDetail?.id}_${item?.id}`;
    const rid = `${item?.id}_${userDetail?.id}`;
    const db = database();
    db.ref('Messages/' + id).once('value', snapshot => {
      if (snapshot.val()) {
        let value = {
          sender: {...userDetail},
          senderId: userDetail?.id,
          id: id,
          timeStamp: Date.now(),
          receiverRead: 0,
          receiverId: item.id,
          receiver: item,
        };
        database()
          .ref('Messages/' + id)
          .update(value)
          .then(res => {
            navigation.navigate('Chat', {messageuid: id, data: item});
          })
          .catch(err => {
            Toast.show('Something went wrong!');
          });
      } else {
        db.ref('Messages/' + rid).once('value', snapshot => {
          if (snapshot.val()) {
            let value = {
              sender: userDetail,
              senderId: userDetail?.id,
              id: rid,
              timeStamp: Date.now(),
              receiverRead: 0,
              receiverId: item.id,
              receiver: item,
            };
            database()
              .ref('Messages/' + rid)
              .update(value)
              .then(res => {
                navigation.navigate('Chat', {messageuid: rid, data: item});
              })
              .catch(err => {
                Toast.show('Something went wrong!');
              });
          } else {
            let value = {
              sender: userDetail,
              senderId: userDetail?.id,
              id: id,
              timeStamp: Date.now(),
              receiverRead: 0,
              receiverId: item.id,
              receiver: item,
            };
            database()
              .ref('Messages/' + id)
              .update(value)
              .then(res => {
                navigation.navigate('Chat', {messageuid: id, data: item});
              })
              .catch(err => {
                Toast.show('Something went wrong!');
              });
          }
        });
      }
    });
  };

  useEffect(() => {
    if (searchName !== '') {
      getUserAction(searchName);
    }
  }, [searchName]);

  const backgroundColor = useThemeColor('primary');
  const textColor = useThemeColor('text');
  const headerBackgroundColor = useThemeColor('headerColor');
  const imageBackground = useThemeColor('black');
  const placeholderColor = useThemeColor('placeholder');
  const searchBar = useThemeColor('activeTab');

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

        <TextInput
          value={searchName}
          placeholderTextColor={placeholderColor}
          placeholder="search"
          style={[styles.searchContainer, {backgroundColor: searchBar}]}
          onChangeText={handleSearch}
        />
      </View>

      <View style={{width: '90%', marginTop: 10}}>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            paddingBottom: 10,
          }}
          onPress={() => navigation.navigate('CreateGroup')}>
          <Text
            style={{
              color: textColor,
              marginLeft: 10,
            }}>
            Create Group
          </Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          marginVertical: 20,
          marginHorizontal: 20,
          height: height - 110,
        }}>
        {loading ? (
          <View style={{marginVertical: '50%'}}>
            <ActivityIndicator color={textColor} size={'large'} />
          </View>
        ) : userSearched?.length ? (
          <FlatList
            data={searchName == '' ? [] : userSearched}
            renderItem={({item, index}) => (
              <>
                <TouchableOpacity
                  style={styles.chatContainer}
                  onPress={() => createAndNavigate(item)}>
                  <View
                    style={[
                      styles.imageContainer,
                      {backgroundColor: imageBackground},
                    ]}>
                    {item?.profile_image == null ? (
                      <Text style={[styles.imgText, {color: backgroundColor}]}>
                        {`${item?.name[0]?.toUpperCase()}`}
                      </Text>
                    ) : (
                      <Image
                        source={{uri: item?.profile_image}}
                        style={styles.image}
                      />
                    )}
                  </View>
                  <View style={styles.textContainer} key={index}>
                    <View style={{marginLeft: 10}}>
                      <Text style={[styles.userName, {color: textColor}]}>
                        {item?.name}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </>
            )}
          />
        ) : (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginVertical: '50%',
            }}>
            <Text style={{color: textColor}}>No user Found</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = state => ({
  theme: state?.themes?.theme,
  userSearched: state?.searchUser?.profile,
  loading: state?.searchUser?.requesting,
  userDetail: state?.login?.userDetail?.user,
});

const mapDispatchToProps = dispatch => ({
  getUserAction: data => dispatch(getUserAction(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(AddUser);
