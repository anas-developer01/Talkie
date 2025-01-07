import {call, put, takeLatest, all} from 'redux-saga/effects';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GET_USER} from './types';
import {BASE_URL} from '../../../Config/app';
import {getUserSuccess, getUserFailure} from './action';
import XHR from '../../../Utils/XHR';

async function getUserApi(data) {
  const URL = `${BASE_URL}/api/v1/search/?name=${data}`;
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

function* getUserApiCall({data}) {
  try {
    const response = yield call(getUserApi, data);
    yield put(getUserSuccess(response.data));
  } catch (e) {
    const {response} = e;
    yield put(getUserFailure(response));
  }
}

export default all([takeLatest(GET_USER, getUserApiCall)]);
