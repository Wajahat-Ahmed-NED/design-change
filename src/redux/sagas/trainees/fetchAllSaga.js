import { createAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import ApiService from "../../../services/ApiService";
import { startFetching, setData, setError } from "../../reducers/TraineesReducer";

export const fetchAllTrainees = createAction("trainee/fetchAll");

function* fetchData() {
  yield put(startFetching(true))
  try {
    let res = yield call(ApiService.getTrainees);
    if(res.data.results)
        yield put(setData(res.data.results));
  } catch (error) {
    console.log({ error });
    yield put(setError(error))
  }
}

export function* fetchAllTraineesSaga() {
  yield takeLatest(fetchAllTrainees, fetchData);
}

