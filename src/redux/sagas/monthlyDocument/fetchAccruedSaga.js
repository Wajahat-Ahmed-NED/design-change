import { createAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import ApiService from "../../../services/ApiService";
import { startFetching, setLogs, setErrors } from "../../reducers/ExpLogReducer";
import { setAccruedData } from "../../reducers/MonthlyDocReducer";

export const fetchAccrued = createAction("monthlyDoc/fetchAccrued");

function* fetchData() {
  yield put(startFetching(true));
  try {
    let res = yield call(ApiService.getAccrued);
    if(res.data)
        yield put(setAccruedData(res.data));
  } catch (error) {
    console.log({ error });
    yield put(setErrors(error))
  }
}

export function* fetchAccruedSaga() {
  yield takeLatest(fetchAccrued, fetchData);
}

