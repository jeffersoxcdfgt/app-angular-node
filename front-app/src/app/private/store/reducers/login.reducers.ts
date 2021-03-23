import {  AppAction } from '../../../app.action';
import { createFeatureSelector , createSelector, on , createReducer , Action  } from '@ngrx/store';
import { User } from '../../shared/user';
import * as loginActions from '../actions/login.actions';

export interface State {
  data: User[];
  selected: User | any;
  action: string;
  done: boolean;
  error?: Error;
}

const initialState: State  = {
  data: [],
  selected: null,
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
  // User is logged
  on(loginActions.userIslogged, (state, { user }) => ({ 
    ...state, 
    selected:user, 
    action:loginActions.LoginActionTypes.IS_USER_LOGGED,
    done:false, 
    error:null 
  })),
  on(loginActions.userIsloggedSuccess, (state, { user }) => ({ 
    ...state, 
     selected :user,
     done: 
     true, error:  
     null
  })),
  on(loginActions.userIsloggedError, (state, { err }) => ({ 
    ...state, 
    done:true, 
    selected:null, 
    error:err 
  }))
);

export function reducer(state: State | undefined, action: AppAction): any{
  return userdReducer(state, action);
}
export const getUsersState = createFeatureSelector < State > ('user');

// Selector logging user

export const isLogged = createSelector( getUsersState , ( state: State ) => {
    if (state.action ===  loginActions.LoginActionTypes.LOGIN_USER && state.done && !state.error){
      return state.selected;
    } else{
      return null;
    }
});


export const erroLogging = createSelector( getUsersState , (state: State) => {
      return state.action === loginActions.LoginActionTypes.LOGIN_USER
       ? state.error
       : null;
});


//Is user is logged
export const userisLogged = createSelector( getUsersState , ( state: State ) => {
  if (state.action ===  loginActions.LoginActionTypes.IS_USER_LOGGED && state.done && !state.error){
    return state.selected;
  } else{
    return null;
  }
});

export const userisLoggedError = createSelector( getUsersState , (state: State) => {
  return state.action === loginActions.LoginActionTypes.IS_USER_LOGGED
   ? state.error
   : null;
});
