import {call, put, all, takeLatest} from 'redux-saga/effects';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {ADD_DEVICE} from './types';

import {addDeviceSuccess, addDeviceFailure} from './actions';
import {BASE_URL} from '../../../Config/app';
import XHR from '../../../Utils/XHR';

async function addDeviceAPi(data) {
  const URL = `${BASE_URL}/firebase_push_notifications/user_fcm_device_add/`;
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

function* addDeviceApiCall({data}) {
  try {
    const response =  yield call(addDeviceAPi, data);
    yield put(addDeviceSuccess());
  } catch (e) {
    const {response} = e;
    yield put(addDeviceFailure(response));
  }
}

export default all([takeLatest(ADD_DEVICE, addDeviceApiCall)]);
