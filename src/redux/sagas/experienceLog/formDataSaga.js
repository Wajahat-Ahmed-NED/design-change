import { createAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { call, all, put, takeLatest } from "redux-saga/effects";
import ApiService from "../../../services/ApiService";
import { setFormData, setError, startFetching } from "../../reducers/ExpLogReducer";

export const fetchStaticData = createAction("experienceLog/fetchStaticData");

function* fetchData() {
  yield put(startFetching(true))
  let expTypes, setting, supervisors, obsevations, methods, contacts, tasks;
  try {
    expTypes = yield call(ApiService.getExperienceTypes);
    setting = yield call(ApiService.getSetting);
    supervisors = yield call(ApiService.getSupervisors);
    obsevations = yield call(ApiService.getClientObservation);
    methods = yield call(ApiService.getMethodSupervision);
    contacts = yield call(ApiService.getSupervisionContact);
    tasks = yield call(ApiService.getTasks);
  } catch (error) {
    console.log({ error });
  } finally {
    yield put(setFormData({
      expTypes: expTypes?.data?.results || [],
      setting: setting?.data?.results || [],
      supervisors: supervisors?.data?.results || [],
      obsevations: obsevations?.data?.results || [],
      methods: methods?.data?.results || [],
      contacts: contacts?.data?.results || [],
      tasks: tasks?.data?.results || []
    }))
  }
}

export function* formDataSaga() {
  yield takeLatest(fetchStaticData, fetchData);
}
