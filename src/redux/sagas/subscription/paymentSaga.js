import { createAction } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';
import { call, put, takeLatest } from "redux-saga/effects";
import ApiService from "../../../services/ApiService";
import { setSuccess, startFetching,  } from "../../reducers/SubscriptionReducer";

export const addSubscription = createAction("subscription/addSubscription");

function* addSub({ payload }) {
  console.log("payload: ", payload);
  yield put(startFetching(true))
  try {
    let res = yield call(ApiService.addSubscription, payload);
    console.log('addSub res: ', res.data);
    if(res.data.msg === 'Successfully Charged for Subscription') {
      toast.success(res.data.msg);
      yield put(setSuccess(true))
    } else {
        toast.error(res.data.msg);
        yield put(setSuccess(false))
    }
  } catch (error) {
    console.log({ error });
    const errors = Object.values(error?.response?.data ?? {});
    toast.error(errors.join(error));
    yield put(setSuccess(false))
  }
}
export function* addSubscritionSaga() {
  yield takeLatest(addSubscription, addSub)
}

export const updateSubscription = createAction("subscription/updateSubscription");

function* updateSub({ payload }) {
  console.log("payload: ", payload);
  yield put(startFetching(true))
  try {
    let res = yield call(ApiService.updateSubscription, payload);
    console.log('updateSub res: ', res.data);
    if(res.data.msg === 'Successfully Charged for Subscription') {
      toast.success(res.data.msg);
      yield put(setSuccess(true))
    } else {
        toast.error(res.data.msg);
        yield put(setSuccess(false))
    }
  } catch (error) {
    console.log({ error });
    const errors = Object.values(error?.response?.data ?? {});
    toast.error(errors.join(error));
    yield put(setSuccess(false))
  }
}
export function* updateSubscritionSaga() {
  yield takeLatest(updateSubscription, updateSub)
}
