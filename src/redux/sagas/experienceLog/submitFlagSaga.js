import { createAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { call, all, put, takeLatest } from "redux-saga/effects";
import ApiService from "../../../services/ApiService";
import { setSuccess, startFetching } from "../../reducers/ExpLogReducer";

export const submitFlagLog = createAction("experienceLog/submitFlagLog");

function* submitData({ payload }) {
  console.log("payload: ", payload);
  yield put(startFetching(true))
  try {
    let res = yield call(ApiService.postFlagLog, payload);
    console.log(res.data);
    if(res.data.msg === "Successfully approved Log") {
      yield put(setSuccess(true))
      toast.success('Successfully approved!')
    }
    else if(res.data.msg === "Successfully flagged Log") {
      yield put(setSuccess(true))
      toast.success('Successfully flagged!')
    } else {
      yield put(setSuccess(false));
    }
  } catch (error) {
    console.error('postFlagLog: ', error);
    yield put(setSuccess(false))
    const errors = Object.values(error?.response?.data ?? {});
    toast.error(errors.join(error));
  } 
}

export function* submitFlagSaga() {
  yield takeLatest(submitFlagLog, submitData);
}
