import {
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  Image,
  StatusBar,
} from 'react-native';
import React, {useState} from 'react';
import Logout from '../../Components/LogoutModal';
import {useImages} from '../../Utils/Images';
import {getStyles} from './style';
import {connect} from 'react-redux';
import {setTheme, toggleTheme} from '../ThemeProvider/redux/action';
import {useThemeColor} from '../ThemeProvider/redux/saga';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Setting = ({theme, navigation}) => {
  const [isLogOutModelVisible, setIsLogOutModalVisible] = useState(false);
  const {images} = useImages();
  const styles = getStyles(theme);

  const data = [
    {
      image: images.profileIcon,
      text: 'Edit Profile',
      navigate: 'EditProfile',
    },
    {
      image: images.book,
      text: 'Terms and Conditions',
      navigate: 'Term&Cond',
    },
    {
      image: images.power,
      text: 'Logout',
      onclick: () => {
        setIsLogOutModalVisible(true);
      },
    },
  ];

  const backgroundColor = useThemeColor('primary');
  const textColor = useThemeColor('text');
  const headerBackgroundColor = useThemeColor('headerColor');

  const renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() =>
        item.navigate
          ? navigation.navigate(item.navigate)
          : item.onclick
          ? item.onclick()
          : ''
      }
      style={styles.bottomItemView}>
      <View style={styles.leftBottomView}>
        <TouchableOpacity
          style={{
            backgroundColor: '#F0F0F0',
            padding: 11,
            borderRadius: 10,
          }}>
          <Image
            source={item.image}
            style={{width: 14.5, height: 16.31}}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <Text style={[styles.bottomText, {color: textColor}]}>{item.text}</Text>
      </View>
      <TouchableOpacity>
        <AntDesign name="right" color={textColor} size={15} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
  return (
    <SafeAreaView style={[styles.container, {backgroundColor}]}>
      <StatusBar
        animated={true}
        backgroundColor={headerBackgroundColor}
        barStyle={'light-content'}
      />
      <View style={[styles.moreMainView, {backgroundColor}]}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <Logout
        setIsLogOutModalVisible={setIsLogOutModalVisible}
        isLogOutModelVisible={isLogOutModelVisible}
      />
    </SafeAreaView>
  );
};

const mapStateToProps = state => ({
  theme: state?.themes?.theme,
});
const mapDispatchToProps = dispatch => ({
  onSelectTheme: theme => dispatch(setTheme(theme)),
  toggle_theme: () => dispatch(toggleTheme()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Setting);
