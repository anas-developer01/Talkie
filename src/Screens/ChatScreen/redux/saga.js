import {call, put, all, takeLatest} from 'redux-saga/effects';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {GET_NOTIFICATION, ADD_NOTIFICATION} from './types';
import {
  getNotificationSuccess,
  getNotificationFailure,
  addNotificationSuccess,
  addNotificationFailure,
} from './actions';
import XHR from '../../../Utils/XHR';
import {BASE_URL} from '../../../Config/app';

async function getNotificationAPi() {
  const URL = `${BASE_URL}/firebase_push_notifications/notification/`;
  const accessToken = await AsyncStorage.getItem('accessToken');
  const option = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${accessToken}`,
    },
    method: 'GET',
  };
  return XHR(URL, option);
}

async function addNotificationAPi(data) {
  const URL = `${BASE_URL}/firebase_push_notifications/notification/`;
  const accessToken = await AsyncStorage.getItem('accessToken');
  const option = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${accessToken}`,
    },
    method: 'POST',
    data,
  };
  return XHR(URL, option);
}

function* getNotificationApiCall({}) {
  try {
    const response = yield call(getNotificationAPi);
    yield put(getNotificationSuccess(response.data));
  } catch (e) {
    const {response} = e;
    yield put(getNotificationFailure(response));
  }
}

function* addNotificationApiCall({data}) {
  try {
    const response = yield call(addNotificationAPi, data);
    yield put(addNotificationSuccess(response.data));
  } catch (e) {
    const {response} = e;
    yield put(addNotificationFailure(response));
  }
}

export default all([
  takeLatest(GET_NOTIFICATION, getNotificationApiCall),
  takeLatest(ADD_NOTIFICATION, addNotificationApiCall),
]);
