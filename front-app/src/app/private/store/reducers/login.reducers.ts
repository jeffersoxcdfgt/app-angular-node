import {  AppAction } from '../../../app.action';
import { createFeatureSelector , createSelector, on , createReducer , Action  } from '@ngrx/store';
import { User } from '../../shared/user';
import  * as loginActions from '../actions/login.actions';

export interface State {
  data:User[];
  selected:User;
  action:string;
  done:boolean;
  error?:Error;
}

const initialState: State  = {
  data:[],
  selected:null,
  action:null,
  done:false,
  error:null
}

const userdReducer = createReducer(
  initialState,
  //List Users
  on(loginActions.userGetAll, state => ({ ...state, action:loginActions.UserActionTypes.GET_USERS, done:false, selected:null, error:null })),
  on(loginActions.userGetAllSuccess, (state, { users }) => ({ ...state, data:users, done:true, selected:null, error:null })),
  on(loginActions.userGetAllError, (state, { err }) => ({...state, done:true, selected:null, error:err})),
  //Create User
  on(loginActions.userCreate, (state, { user }) => ({ 
    ...state, 
    selected: user, 
    action: loginActions.UserActionTypes.CREATE_USER, 
    done: false, 
    error:  
    null
  })),
  on(loginActions.userCreateSuccess, (state, { user }) => ({
    ...state, 
      selected: user, 
      done: true,
    })),
  on(loginActions.userCreateError, (state, { err }) => ({
    ...state, 
    done:true, 
    selected:null, 
    error:err
  })),
  //Update user
  on(loginActions.userUpdate, (state, { user }) => ({ 
    ...state, 
    selected: user, 
    action: loginActions.UserActionTypes.UPDATE_USER, 
    done: false, 
    error:  null 
  })),
  on(loginActions.userUpdateSuccess, state => ({...state, data:[...state.data.slice(0,(state.data.findIndex(h => h.id === state.selected.id))), state.selected, ...state.data.slice((state.data.findIndex(h => h.id === state.selected.id)) + 1)], done: true, selected: null, error: null })),
  on(loginActions.userUpdateError, (state, { err }) => ({...state, done:true, selected:null, error:err})),
  //Get user
  on(loginActions.userGet, state => ({ ...state, action:loginActions.UserActionTypes.GET_USER, done:false, selected:null, error:null })),
  on(loginActions.userGetSuccess, (state, { user }) => ({ ...state, selected:user, done: true, error:  null})),
  on(loginActions.userGetError, (state, { err }) => ({ ...state, done:true, selected:null, error:err })),
  //Delete user
  on(loginActions.userDelete, (state, { user }) => ({...state, selected:state.data.find(h => h.id === user), action: loginActions.UserActionTypes.DELETE_USER, done: false, error:null })),
  on(loginActions.userDeleteSuccess, state => ({ ...state, data: state.data.filter( h => h.id !== state.selected.id), selected: null, error: null, done: true  })),
  on(loginActions.userDeleteError, (state, { err }) => ({...state, selected: null, done:true, error:err })),
);

export function reducer(state: State | undefined, action: AppAction) {
  return userdReducer(state, action);
}
export const getUsersState = createFeatureSelector < State > ('user');

//Selector for list users

export const getAllUsers = createSelector( getUsersState , (state: State ) => state.data);
export const getUsersError = createSelector(getUsersState, (state: State) => {
  return state.action === loginActions.UserActionTypes.GET_USERS
    ? state.error
   : null;
});


//Selector for create

export const isLogged = createSelector( getUsersState , ( state : State ) => {
    if(state.action ===  loginActions.UserActionTypes.CREATE_USER && state.done && !state.error){
      return state.selected;
    } else{
      return null;
    }
});


export const getCreateError = createSelector( getUsersState , (state: State) => {
      return state.action === loginActions.UserActionTypes.CREATE_USER
       ? state.error
       : null;
});


//Selector for update

export const isUpdated = createSelector(getUsersState , (state : State ) =>
  state.action === loginActions.UserActionTypes.UPDATE_USER  && state.done && !state.error);

export const getUpdateError = createSelector(getUsersState, (state: State) => {
      return state.action === loginActions.UserActionTypes.UPDATE_USER
        ? state.error
       : null;
    });

//Selector for Get Users

export const getUser = createSelector( getUsersState , ( state : State ) => {
  if(state.action ===  loginActions.UserActionTypes.GET_USERS && state.done){
    return state.selected;
  } else{
    return null;
  }
});

export const getUserError = createSelector(getUsersState, (state: State) => {
  return state.action === loginActions.UserActionTypes.GET_USERS
    ? state.error
   : null;
});

//Selector for Delete User

export const isDeleted = createSelector(getUsersState , (state: State) =>
  state.action === loginActions.UserActionTypes.DELETE_USER && state.done && !state.error);

export const getDeleteError = createSelector(getUsersState, (state: State) => {
  return state.action === loginActions.UserActionTypes.DELETE_USER_SUCCESS
    ? state.error
   : null;
});
