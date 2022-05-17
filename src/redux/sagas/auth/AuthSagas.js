import { createAction } from "@reduxjs/toolkit";
import ApiService from "../../../services/ApiService";
import { AUTH_TOKEN, USER_DATA } from "../../../utils/CONSTANTS";
import LocalStorage from "../../../services/LocalStorage";
import { call, put, takeLatest } from "redux-saga/effects";
import { logoutUser, setAuthToken, setError, setSuccess, setUser, setUserIsSupervisor, startLogin } from "../../reducers/AuthReducer";
import { toast } from 'react-toastify';


export const signInAction = createAction("auth/signIn");

function* login({ payload }) {
  console.log("payload: ", payload);
  yield put(startLogin(null))
  try {
    let res = yield call(ApiService.login, payload);
    console.log('login res: ', res.data);
    if(res.data.non_field_errors) 
      toast.error(res.data.non_field_errors[0])
    if (res.data.token) {
      const { token, user } = res.data;
      ApiService.setAuthHeader(token);
      LocalStorage.storeData(AUTH_TOKEN, token);
      LocalStorage.storeData(USER_DATA, user);
      yield put(setUser(user));
      yield put(setAuthToken(token))
      toast.success('Successfully logged in', { autoClose: 3000 });
    }
    if(res.data.detail) 
      toast.info(res.data.detail);
  } catch (error) {
    console.log({ error });
    yield put(setError(error))
    const errors = Object.values(error?.response?.data ?? {});
    toast.error(errors.join(error));
  }
}
export function* loginSaga() {
  yield takeLatest(signInAction, login)
}

export const signUpAction = createAction("auth/signUp");

function* signup ({ payload }) {
  console.log("payload: ", payload);
  yield put(startLogin(null))
  try {
    let res = yield call(ApiService.signup, payload);
    console.log('signup res: ', res.data);
    if (res.data) {
      const user = res.data;
      if(user.id) {
        LocalStorage.storeData(USER_DATA, user);
        yield put(setUser(user));
        toast.success('Successfully registered', { autoClose: 3000 });  
      }
    }
    if(res.data.detail) 
      toast.info(res.data.detail);
  } catch (error) {
    console.log({ error });
    yield put(setError(error))
    const errors = Object.values(error?.response?.data ?? {});
    toast.error(errors.join(error));
  }
}
export function* signupSaga() {
  yield takeLatest(signUpAction, signup)
}

export const verifyEmailAction = createAction("auth/verifyEmail");

function* verifyEmail ({ payload }) {
  console.log("payload: ", payload);
  yield put(startLogin(null))
  try {
    let res = yield call(ApiService.verifyEmail, payload);
    console.log('verifyEmail res: ', res.data);
    if(res.data.message === 'Succesfully User activated') {
      toast.success(res.data.message);
      yield put(setSuccess(true))
      const token = res.data.token; 
      ApiService.setAuthHeader(token);
      LocalStorage.storeData(AUTH_TOKEN, token);
      yield put(setAuthToken(token))
    } else {
        toast.error(res.data.message);
        yield put(setSuccess(false))
    }
  } catch (error) {
    console.log({ error });
    yield put(setError(error))
    const errors = Object.values(error?.response?.data ?? {});
    toast.error(errors.join(error));
    yield put(setSuccess(false))
  }
}
export function* verifyEmailSaga() {
  yield takeLatest(verifyEmailAction, verifyEmail)
}


export const signOutAction = createAction("auth/signOut");

function* logout() {
    LocalStorage.delete(AUTH_TOKEN);
    LocalStorage.delete(USER_DATA);
    ApiService.removeAuthHeader();
    yield put(logoutUser(null))
}
export function* logoutSaga() {
  yield takeLatest(signOutAction, logout)
}
