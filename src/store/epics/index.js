import { getOrderEpic } from './order';
import { combineEpics } from 'redux-observable';
export default combineEpics(getOrderEpic);
