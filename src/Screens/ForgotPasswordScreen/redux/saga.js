import {call, put, all, takeLatest} from 'redux-saga/effects';
import {FORGOT_PASSWORD, FORGOT_TOKEN, SET_NEW_PASSWORD} from './types';
import {
  forgotPasswordSuccess,
  forgotPasswordFailure,
  forgotTokenSuccess,
  forgotTokenFailure,
  setNewPasswordFailure,
} from './actions';
import {Toast} from 'react-native-toast-notifications';
import {BASE_URL} from '../../../Config/app';
import XHR from '../../../Utils/XHR';

async function ForgetPasswordApi(data) {
  const URL = `${BASE_URL}/api/v1/forgot-password/`;
  const option = {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    data,
  };
  return XHR(URL, option);
}

async function ForgetTokenApi(data) {
  const URL = `${BASE_URL}/api/v1/forgot-password/validate_token/`;
  const option = {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    data,
  };
  return XHR(URL, option);
}

async function setNewPasswordApi(data) {
  const URL = `${BASE_URL}/api/v1/forgot-password/confirm/`;
  const option = {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    data,
  };
  return XHR(URL, option);
}

function* ForgotPassword({data, callBack}) {
  try {
    const response = yield call(ForgetPasswordApi, data);
    yield put(forgotPasswordSuccess(response.data));
    Toast.show('code-send');
    callBack();
  } catch (e) {
    const {response} = e;
    yield put(forgotPasswordFailure(response));
    let message = 'Something went wrong, please try again later';
    if (response && response.data && response.data.email) {
      message = response?.data?.email;
    }
    Toast.show(message);
  }
}

function* ForgotToken({data, callBack}) {
  try {
    const response = yield call(ForgetTokenApi, data);
    yield put(forgotTokenSuccess(response.data));
    callBack();
  } catch (e) {
    const {response} = e;
    yield put(forgotTokenFailure(response));
    if (response.data.detail) {
      Toast.show('Invalid code');
    }
  }
}

function* SetNEwPassword({data, callBack}) {
  try {
    yield call(setNewPasswordApi, data);
    Toast.show('Password reset successfully');
    callBack();
  } catch (e) {
    const {response} = e;
    yield put(setNewPasswordFailure(response));
    if (response?.data.password) {
      Toast.show(response?.data.password);
    } else {
      Toast.show('Something went wrong');
    }
  }
}

export default all([
  takeLatest(FORGOT_PASSWORD, ForgotPassword),
  takeLatest(FORGOT_TOKEN, ForgotToken),
  takeLatest(SET_NEW_PASSWORD, SetNEwPassword),
]);
