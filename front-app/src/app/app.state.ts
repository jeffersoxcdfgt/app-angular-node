import * as fromLogin from './private/store/reducers/login.reducers';

export interface AppState {
  user:fromLogin.State;
}
