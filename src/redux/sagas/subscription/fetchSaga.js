import { createAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import ApiService from "../../../services/ApiService";
import { setData, startFetching, setUserSubscription, setError } from "../../reducers/SubscriptionReducer";

export const fetchSubscriptions = createAction("subscription/fetchSubscriptions");

function* fetchData() {
  yield put(startFetching(true))
  try {
    let res = yield call(ApiService.getSubscriptions);
    if(res.data.results)
        yield put(setData(res.data.results));
  } catch (error) {
    console.log({ error });
  }
}

export function* fetchSubscriptionSaga() {
  yield takeLatest(fetchSubscriptions, fetchData);
}

export const fetchUserSubscription = createAction("subscription/fetchUserSubscription");

function* userSubscription() {
  yield put(startFetching(true))
  try {
    let res = yield call(ApiService.getUserSubscription);
    console.log('userSubscription res.data: ', res.data)
    if(res.data.results && res.data.results.length)
        yield put(setUserSubscription(res.data.results[0]));
    else 
      yield put(setError('Not subscribed yet.'))
  } catch (error) {
    console.log({ error });
    yield put(setError('Unable to load subsciption data.'))
  }
}

export function* fetchUserSubscriptionSaga() {
  yield takeLatest(fetchUserSubscription, userSubscription);
}
