import { useCallback, useEffect, useState, useMemo } from "react"
import { useDispatch } from "react-redux"
import { useLocation } from "react-router-dom"
// import { fetchMyProfile } from "../redux/actions/ProfileActions";
import { setAuthToken, setUser, setUserIsSupervisor, useIsSupervisor } from "../redux/reducers/AuthReducer"
import ApiService from "../services/ApiService"
import LocalStorage from "../services/LocalStorage"
import { AUTH_TOKEN, USER_DATA } from "./CONSTANTS"

export function useToken() {
  const dispatch = useDispatch()
  const token = LocalStorage.getData(AUTH_TOKEN)
  const user = LocalStorage.getData(USER_DATA)
  if (token) {
    ApiService.setAuthHeader(token)
    dispatch(setAuthToken(token))
    dispatch(setUser(user))
    // dispatch(fetchMyProfile());
  }
  return token
}

export function useSupervisor() {
  const dispatch = useDispatch();
  let isSupervisor = useIsSupervisor(); 
  if(isSupervisor===null) {
    const user = LocalStorage.getData(USER_DATA);
    if(user){
      isSupervisor = user.is_supervisor;
      dispatch(setUserIsSupervisor(user.is_supervisor));
    }
  }
  return isSupervisor
}

export const useDispatchEffect = (sagaAction, params=null, condition=true) => {
  const dispatch = useDispatch()
  useEffect(() => {
    if (condition) dispatch(sagaAction(params))
  }, [condition])

  const onRefresh = () => {
    dispatch(sagaAction(params))
  }
  return onRefresh
}

export function useQuery() {
  const { search } = useLocation();

  return useMemo(() => new URLSearchParams(search), [search]);
}
