import { takeLatest, put, call } from 'redux-saga/effects'

import api from '../api';

const LOAD_USERS = 'LOAD_USERS';
const LOAD_USERS_SUCCESS = 'LOAD_USERS_SUCCESS';
const LOAD_USERS_FAILURE = 'LOAD_USERS_FAILURE';
const UPDATE_FILTERED_USERS = 'UPDATE_FILTERED_USERS';

const initialState = {
  data: [],
  error: null,
  loading: false,
  filteredUsers: []
};

export function usersReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_USERS:
      return {
        ...state,
        error: null,
        loading: true
      };
    case LOAD_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.data,
        filteredUsers: action.data,
        error: null
      };
    case LOAD_USERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case UPDATE_FILTERED_USERS:
      return {
        ...state,
        filteredUsers: action.filteredUsers
      };
    default:
      return state;
  }
}

export function* fetchUsers() {
  const result = yield call(api.fetchUsers);
  if (result) {
    yield put({type: LOAD_USERS_SUCCESS, data: result.data})
  } else {
    yield put({type: LOAD_USERS_FAILURE, error: 'Something went wrong'})
  }
}

export function* watchRequest() {
  yield takeLatest(LOAD_USERS, fetchUsers);
}

export function onUsersFetch() {
  return {
    type: LOAD_USERS
  };
}

export function onFilterUsers(filteredUsers) {
  return {
    type: UPDATE_FILTERED_USERS,
    filteredUsers
  };
}
