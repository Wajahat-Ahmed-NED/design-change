import { createAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import ApiService from "../../../services/ApiService";
import { startFetching, setUserProfile, setError } from "../../reducers/ProfileReducer";

export const updateProfile = createAction("profile/updateProfile");

function* updateData({ payload }) {
  const { id, profile } = payload; 
  console.log('payload: ', payload);
  yield put(startFetching(true))
  try {
    let res = yield call(ApiService.updateProfile, id, profile);
    if(res.data.results)
        yield put(setUserProfile(res.data.results[0]));
  } catch (error) {
    console.log({ error });
    yield put(setError(error));

  }
}

export function* updateProfileSaga() {
  yield takeLatest(updateProfile, updateData);
}
