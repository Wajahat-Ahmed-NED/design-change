import { createAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import ApiService from "../../../services/ApiService";
import { startFetching, setFlagged, setPastFlagged, setErrors } from "../../reducers/ExpLogReducer";

export const fetchFlagged = createAction("experienceLog/fetchFlagged");

function* fetchData() {
  yield put(startFetching(true))
  try {
    let res = yield call(ApiService.getFlagged);
    if(res.data.results)
        yield put(setFlagged(res.data.results));
  } catch (error) {
    console.log({ error });
    yield put(setErrors(error))
  }
}

export function* fetchFlaggedSaga() {
  yield takeLatest(fetchFlagged, fetchData);
}

export const fetchPastFlagged = createAction("experienceLog/fetchPastFlagged");

function* fetchData2() {
  yield put(startFetching(true))
  let pending=[], approved=[];
  try {
    let res = yield call(ApiService.getApproved);
    let res2 = yield call(ApiService.getPending);
    console.log('res: ', res.data)
    console.log('res2: ', res2.data)
    if(res.data.results)
      approved = approved.concat(res.data.results)
    if(res2.data.results)
      pending = pending.concat(res2.data.results)    
    yield put(setPastFlagged([ ...approved, ...pending ]));
  } catch (error) {
    console.log({ error });
    yield put(setErrors(error))
  }
}

export function* fetchPastFlaggedSaga() {
  yield takeLatest(fetchPastFlagged, fetchData2);
}