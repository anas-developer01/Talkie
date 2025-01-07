import {Platform} from 'react-native';
import {all, call, put, takeLatest} from 'redux-saga/effects';
import {Toast} from 'react-native-toast-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {BASE_URL} from '../../../Config/app';
import {addDevice as addDeviceAction} from '../../HomeScreen/redux/actions';

import XHR from '../../../Utils/XHR';

import {
  loginFailure,
  loginSuccess,
  facebookLoginSuccess,
  facebookLoginFailure,
  googleLoginSuccess,
  googleLoginFailure,
  accountDisableSuccess,
  accountDisableFailure,
} from './actions';

import {LOGIN, FACEBOOK_LOGIN, GOOGLE_LOGIN, ACCOUNT_DISABLE} from './types';

async function loginAPi(data) {
  const URL = `${BASE_URL}/api/v1/login/`;
  const option = {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    data,
  };
  return XHR(URL, option);
}

async function facebookLoginAPi(data) {
  const URL = `${BASE_URL}/modules/social-auth/facebook/login/`;
  const option = {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    data,
  };
  return XHR(URL, option);
}

async function googleLoginAPi(data) {
  const URL = `${BASE_URL}/modules/social-auth/google/login/`;
  const option = {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    data,
  };
  return XHR(URL, option);
}

async function accountDisableAPi(data) {
  const URL = `${BASE_URL}/api/v1/deactivate-account/${data.id}/`;
  const accessToken = await AsyncStorage.getItem('accessToken');
  const option = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${accessToken}`,
    },
    method: 'PATCH',
    data,
  };
  return XHR(URL, option);
}

function* loginApiCall({data, fcmToken}) {
  try {
    const response = yield call(loginAPi, data);
    if (response?.data?.token) {
      AsyncStorage.setItem('accessToken', response.data.token);
      // const fcmData = {
      //   registration_id: fcmToken,
      //   type: Platform.OS,
      // };
      // yield put(addDeviceAction(fcmData));
      yield put(loginSuccess(response.data));
    }
  } catch (e) {
    const {response} = e;
    yield put(loginFailure(response));
    if (response?.data?.non_field_errors) {
      Toast.show(response?.data?.non_field_errors);
    } else {
      Toast.show('Something went wrong');
    }
  }
}

function* facebookLoginApiCall({data}) {
  try {
    const response = yield call(facebookLoginAPi, data);
    yield put(facebookLoginSuccess(response.data));

    if (response?.data?.token) {
      AsyncStorage.setItem('accessToken', response.data.token);
    }
  } catch (e) {
    const {response} = e;
    yield put(facebookLoginFailure(response));
  }
}

function* googleLoginApiCall({data}) {
  try {
    const response = yield call(googleLoginAPi, data);
    yield put(googleLoginSuccess(response.data));

    if (response?.data?.token) {
      AsyncStorage.setItem('accessToken', response.data.token);
    }
  } catch (e) {
    const {response} = e;
    yield put(googleLoginFailure(response));
  }
}

function* accountDisableApiCall({data, hideModal}) {
  try {
    const response = yield call(accountDisableAPi, data);
    hideModal();
    yield put(accountDisableSuccess(response.data));
    // yield put(logout());
  } catch (e) {
    const {response} = e;
    yield put(accountDisableFailure(response));
  }
}

export default all([
  takeLatest(LOGIN, loginApiCall),
  takeLatest(FACEBOOK_LOGIN, facebookLoginApiCall),
  takeLatest(GOOGLE_LOGIN, googleLoginApiCall),
  takeLatest(ACCOUNT_DISABLE, accountDisableApiCall),
]);
