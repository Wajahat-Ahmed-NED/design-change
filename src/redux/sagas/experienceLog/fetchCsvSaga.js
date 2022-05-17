import { createAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import ApiService from "../../../services/ApiService";
import { startFetching, setCsvData, setErrors } from "../../reducers/ExpLogReducer";

export const fetchCsvData = createAction("experienceLog/fetchCsvData");

function* fetchData() {
  yield put(startFetching(true))
  try {
    let res = yield call(ApiService.getCsvData);
    if(res.data)
        yield put(setCsvData(res.data));
  } catch (error) {
    console.log({ error });
    yield put(setErrors(error))
  }
}

export function* fetchCsvSaga() {
  yield takeLatest(fetchCsvData, fetchData);
}

