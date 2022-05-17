import { createAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import ApiService from "../../../services/ApiService";
import { startFetching, setUserProfile, setError } from "../../reducers/ProfileReducer";

export const fetchProfile = createAction("profile/fetchProfile");

function* fetchData() {
  yield put(startFetching(true))
  try {
    let res = yield call(ApiService.getProfile);
    if(res.data.results)
        yield put(setUserProfile(res.data.results[0]));
  } catch (error) {
    console.log({ error });
  }
}

export function* fetchProfileSaga() {
  yield takeLatest(fetchProfile, fetchData);
}
