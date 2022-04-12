import { IUser } from '../../schemas/IUser';
import { AppEvents } from './events';

const makeAction = <T extends AppEvents, IUser>(type: T) => (payload: IUser) => {
  return {
    type,
    payload
  };
};

export const SetUser = makeAction<AppEvents.SET_USER, IUser>(AppEvents.SET_USER);

interface IStringMap<T> {
  [key: string]: T;
}
type IAnyFunction = (...args: any[]) => any;
type IActionUnion<A extends IStringMap<IAnyFunction>> = ReturnType<A[keyof A]>;

const actions = {
  SetUser
};

export type IAction = IActionUnion<typeof actions>;
