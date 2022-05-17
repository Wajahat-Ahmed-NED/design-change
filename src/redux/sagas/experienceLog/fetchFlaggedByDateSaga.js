import { createAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import ApiService from "../../../services/ApiService";
import { startFetching, setLogs, setErrors, setFlagged } from "../../reducers/ExpLogReducer";

export const fetchDatedFlaggedLogs = createAction("experienceLog/fetchDatedFlaggedLogs");

function* fetchData({ payload }) {
  yield put(startFetching(true))
  try {
    let res = yield call(ApiService.getFlaggedByDate, payload);
    if(res.data.results)
        yield put(setFlagged(res.data.results));
  } catch (error) {
    console.log({ error });
    yield put(setErrors(error))
  }
}

export function* fetchFlaggedByDateSaga() {
  yield takeLatest(fetchDatedFlaggedLogs, fetchData);
}

