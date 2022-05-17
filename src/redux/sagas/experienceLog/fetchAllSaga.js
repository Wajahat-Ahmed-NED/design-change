import { createAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import ApiService from "../../../services/ApiService";
import { startFetching, setLogs, setErrors } from "../../reducers/ExpLogReducer";

export const fetchAll = createAction("experienceLog/fetchAll");

function* fetchData() {
  yield put(startFetching(true))
  try {
    let res = yield call(ApiService.getAll);
    if(res.data.results)
        yield put(setLogs(res.data.results));
  } catch (error) {
    console.log({ error });
    yield put(setErrors(error))
  }
}

export function* fetchAllSaga() {
  yield takeLatest(fetchAll, fetchData);
}

