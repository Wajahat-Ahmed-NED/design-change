import { createAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import ApiService from "../../../services/ApiService";
import { startFetching, setLogs, setErrors } from "../../reducers/ExpLogReducer";

export const fetchDatedPendingLogs = createAction("experienceLog/fetchDatedPendingLogs");

function* fetchData({ payload }) {
  yield put(startFetching(true))
  try {
    let res = yield call(ApiService.getPendingByDate, payload);
    if(res.data.results)
        yield put(setLogs(res.data.results));
  } catch (error) {
    console.log({ error });
    yield put(setErrors(error))
  }
}

export function* fetchPendingByDateSaga() {
  yield takeLatest(fetchDatedPendingLogs, fetchData);
}

