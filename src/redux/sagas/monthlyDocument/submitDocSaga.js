import { createAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { call, all, put, takeLatest } from "redux-saga/effects";
import ApiService from "../../../services/ApiService";
import { setFormData, setError, setErrors, setSuccess, startFetching } from "../../reducers/ExpLogReducer";

export const submitDocument = createAction("experienceLog/submitDocument");


function* submitDoc({ payload }) {
  console.log("payload: ", payload);
  yield put(startFetching(true))
  try {
    let res = yield call(ApiService.postMonthlyDocument, payload);
    console.log(res.data);
    if(res.data.id) {
      yield put(setSuccess(true))
    } else {
      yield put(setSuccess(false));
      const errors = []
      for (const errField in res.data) {
        const error = res.data[errField];
        if(Array.isArray(error) && error.length)
          errors.push(...error.map(err => `${errField}: ${err}!`));
      }
      console.log('errors: ', errors)
      yield put(setErrors(errors));
    }
  } catch (error) {
    console.error('postExpLog: ', error);
    yield put(setSuccess(false))
    const errors = Object.values(error?.response?.data ?? {});
    toast.error(errors.join(error));
  } 
}

export function* submitDocSaga() {
  yield takeLatest(submitDocument, submitDoc);
}
