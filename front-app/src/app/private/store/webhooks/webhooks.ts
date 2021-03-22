import { StoreModule, ActionReducer, MetaReducer } from '@ngrx/store';
import { reducer } from '../reducers/login.reducers';
import { LoginActionTypes } from '../actions/login.actions';
import {  AppState } from '../../../app.state';
import { TraceService } from '../../../shared/utils/traceService';

export function usersHook(traceService: TraceService): MetaReducer<AppState> {
 return (actionreducer: ActionReducer<AppState, any>): ActionReducer<AppState, any> => {
    return (state, action) => {
      arrayFunc[action.type](state, action, traceService);
      return actionreducer(state, action);
    };
  };
}

export const initStore = ((currentstate, currentaction , traceService ) => {});
export const getWebHookUsers = ((currentstate, currentaction, traceService) => {
    traceService.logMetaReducers();
});
export const arrayFunc = {
  '@ngrx/store/init': initStore,
  '@ngrx/effects/init': initStore,
  '[ALL] Users Success': initStore,
  '[All] Users': getWebHookUsers
};
