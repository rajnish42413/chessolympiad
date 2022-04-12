import { combineReducers } from 'redux';
import UserReducer from './user';

const rootReducer = combineReducers({
  user: UserReducer
});

export type IAppState = ReturnType<typeof rootReducer>;

export default rootReducer;
