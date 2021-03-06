import { IUser } from '../../schemas/IUser';
import * as local from '@utils/userAuth';
import { AppEvents } from '@redux/actions/events';
import { IAction } from '@redux/actions';

interface IState {
  data: IUser;
}

export const initialState: IState = {
  data: JSON.parse(local.getUser())
};

export const reducer = (state: IState = initialState, action: IAction): IState => {
  switch (action.type) {
    case AppEvents.SET_USER: {
      local.storeUser(action.payload);
      return { ...state, data: action.payload };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
