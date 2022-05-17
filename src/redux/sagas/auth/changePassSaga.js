import { createAction } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';
import { call, put, takeLatest } from "redux-saga/effects";
import ApiService from "../../../services/ApiService";
import { setSuccess, startLogin } from "../../reducers/AuthReducer";

export const changePassAction = createAction("auth/changePassword");

function* changePassword({ payload }) {
  console.log("payload: ", payload);
  yield put(startLogin(null))
  try {
    let res = yield call(ApiService.changePassword, payload);
    console.log('changePass res: ', res.data);
    if(res.data.detail === 'New password has been saved.') {
      toast.success(res.data.detail);
      yield put(setSuccess(true))
    } else if(res.data.new_password2){
        toast.error(res.data.new_password2.join(' '));
        yield put(setSuccess(false))
    }
  } catch (error) {
    console.log({ error });
    const errors = Object.values(error?.response?.data ?? {});
    toast.error(errors.join(error));
    yield put(setSuccess(false))
  }
}
export function* changePassSaga() {
  yield takeLatest(changePassAction, changePassword)
}
