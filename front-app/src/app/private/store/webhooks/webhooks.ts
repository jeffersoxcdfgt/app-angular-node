import {  ActionReducer, MetaReducer } from '@ngrx/store';
import { from } from 'rxjs';
import {  AppState } from '../../../app.state';
import { LoginActionTypes } from '../actions/login.actions';

export function usersHook(): MetaReducer<AppState> {
 return (actionreducer: ActionReducer<AppState, any>): ActionReducer<AppState, any> => {
    return (state, action) => {
      if (action.type !== undefined  && (action.type === LoginActionTypes.LOGOUT )){
        state = undefined;
      }
      return actionreducer(state, action);
    };
  };
}

