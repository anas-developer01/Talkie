import {call, put, all, takeLatest} from 'redux-saga/effects';

import {SIGNUP} from './types';
import {BASE_URL} from '../../../Config/app';

import {Toast} from 'react-native-toast-notifications';
import {signupSuccess, signupFailure} from './action';
import XHR from '../../../Utils/XHR';

async function signupApi(data) {
  const URL = `${BASE_URL}/api/v1/signup/`;

  const option = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    method: 'POST',
    data,
  };
  return XHR(URL, option);
}

function* signupAPiCall({data, callBack}) {
  try {
    const response = yield call(signupApi, data);
    yield put(signupSuccess(response.data));
    callBack();
    Toast.show('User created successfully');
  } catch (e) {
    const {response} = e;
    yield put(signupFailure(response));
    if (response?.data?.email) {
      Toast.show(response?.data?.email[0]);
    } else if (response?.data?.phone) {
      Toast.show(response?.data?.phone[0]);
    } else {
      Toast.show('went_wrong');
    }
  }
}

export default all([takeLatest(SIGNUP, signupAPiCall)]);
