import {  AppAction } from '../../../app.action';
import { createFeatureSelector , createSelector, on , createReducer , Action  } from '@ngrx/store';
import { User } from '../../shared/user';
import * as loginActions from '../actions/login.actions';
import * as storage from '../../shared/storage';

export interface State {
  data: User[];
  selected: User | any;
  action: string;
  done: boolean;
  error?: Error;
}

const initialState: State  = {
  data: [],
  selected: storage.getItem('user') !== null ? storage.getItem('user').selected : null,
  action: null,
  done: false,
  error: null
};

const userdReducer = createReducer(
  initialState,
  // Login user
  on(loginActions.loginUser, (state, { user }) => ({
    ...state,
    selected: user,
    action: loginActions.LoginActionTypes.LOGIN_USER,
    done: false,
    error:
    null
  })),
  on(loginActions.loginUserSuccess, (state, { user }) => ({
    ...state,
      selected: user,
      done: true,
    })),
  on(loginActions.loginUserError, (state, { err }) => ({
    ...state,
    done: true,
    selected: null,
    error: err
  })),
  // LogOut
  on(loginActions.logOutuser, state => ({
    ...state,
    action: loginActions.LoginActionTypes.LOGOUT,
    done: false,
    selected: null,
    error: null })),
);

export function reducer(state: State | undefined, action: AppAction): any{
  return userdReducer(state, action);
}
export const getUsersState = createFeatureSelector < State > ('user');

// Selector logging user
export const isLogged = createSelector( getUsersState , ( state: State ) => state.selected );

export const erroLogging = createSelector( getUsersState , (state: State) => {
      return state.action === loginActions.LoginActionTypes.LOGIN_USER
       ? state.error
       : null;
});
