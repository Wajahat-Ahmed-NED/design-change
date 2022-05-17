import { createAction } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';
import { call, put, takeLatest } from "redux-saga/effects";
import ApiService from "../../../services/ApiService";
import { setSuccess, startLogin } from "../../reducers/AuthReducer";

export const forgetPassAction = createAction("auth/forgetPassword");

function* forgetPassword({ payload }) {
  console.log("payload: ", payload);
  yield put(startLogin(null))
  try {
    let res = yield call(ApiService.forgetPassSend, payload);
    console.log('forgetPass res: ', res.data);
    if(res.data.message === 'Succesfully Token sent.') {
      toast.success(res.data.message);
      yield put(setSuccess(true))
    } else {
        toast.error(res.data.message);
        yield put(setSuccess(false))
    }
  } catch (error) {
    console.log({ error });
    const errors = Object.values(error?.response?.data ?? {});
    toast.error(errors.join(error));
    yield put(setSuccess(false))
  }
}
export function* forgetPassSaga() {
  yield takeLatest(forgetPassAction, forgetPassword)
}

export const resetPassAction = createAction("auth/resetPassAction");

function* resetPassword({ payload }) {
  console.log("payload: ", payload);
  yield put(startLogin(null))
  try {
    let res = yield call(ApiService.forgetPassVerify, payload);
    console.log('resetPass res: ', res.data);
    if(res.data.message === 'Succesfully resetted user password.') {
      toast.success(res.data.message);
      yield put(setSuccess(true))
    } else {
        toast.error(res.data.message);
        yield put(setSuccess(false))
    }
  } catch (error) {
    console.log({ error });
    const errors = Object.values(error?.response?.data ?? {});
    toast.error(errors.join(error));
    yield put(setSuccess(false))
  }
}
export function* resetPassSaga() {
  yield takeLatest(resetPassAction, resetPassword)
}
