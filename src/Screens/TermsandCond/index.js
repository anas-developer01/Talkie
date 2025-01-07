import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useThemeColor} from '../ThemeProvider/redux/saga';
import styles from './style';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function TermAndConditions({navigation}) {
  const backgroundColor = useThemeColor('primary');
  const textColor = useThemeColor('text');
  const headerBackgroundColor = useThemeColor('headerColor');
  return (
    <SafeAreaView style={[styles.container, {backgroundColor}]}>
      <StatusBar
        animated={true}
        backgroundColor={headerBackgroundColor}
        barStyle={'light-content'}
      />
      <View style={[styles.headerContainer]}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{justifyContent: 'center', height: 45}}>
          <Ionicons size={25} color={'textColor'} name={'arrow-back'} />
        </TouchableOpacity>
        <Text
          style={[
            styles.header,
            {
              color: textColor,
            },
          ]}>
          TermAndConditions
        </Text>
      </View>

      <ScrollView>
        <Text style={[styles.description, {color: textColor}]}>
          Welcome to ConnectVibe! These terms and conditions outline the rules
          and regulations for the use of ChatApp's services, located at
          [yourwebsite.com]. By accessing this app, we assume you accept these
          terms and conditions. Do not continue to use ChatApp if you do not
          agree to all of the terms and conditions stated on this page.
        </Text>

        <Text style={[styles.description, {color: textColor}]}>
          To create an account on ChatApp, users must be at least 13 years old
          and provide accurate and complete registration information. Users are
          responsible for maintaining the confidentiality of their account
          information and for all activities that occur under their account. If
          you become aware of any unauthorized use of your account, you must
          notify us immediately.
        </Text>

        <Text style={[styles.description, {color: textColor}]}>
          Users retain ownership of any intellectual property rights that they
          hold in the content they post on ChatApp. By posting content, you
          grant ChatApp a worldwide, non-exclusive, royalty-free license to use,
          reproduce, modify, and distribute your content in connection with the
          operation of the service. You agree not to post any content that is
          illegal, offensive, or infringes on the rights of others.
        </Text>

        <Text style={[styles.description, {color: textColor}]}>
          Users must not use the service for any illegal activities or solicit
          others to perform illegal activities. You must not harass, abuse, or
          harm another person through the service, nor post any defamatory,
          obscene, pornographic, or otherwise objectionable content.
          Additionally, users must not upload viruses or other malicious code
          that could harm the service or other users, or attempt to gain
          unauthorized access to the service or its related systems or networks.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}
