import { ajax } from 'rxjs/ajax';
import { ofType } from 'redux-observable';
import { map, switchMap, takeUntil } from 'rxjs/operators';
import {
  getOrderAllSuccess,
  GET_ORDER_ALL,
  GET_ORDER_ALL_STOP,
} from '../actions/order';
import { timer } from 'rxjs';
export const getOrderEpic = (action$) => {
  const stopPolling$ = action$.pipe(ofType(GET_ORDER_ALL_STOP));
  return action$.pipe(
    ofType(GET_ORDER_ALL),

    switchMap((_) =>
      timer(0, 5000).pipe(
        takeUntil(stopPolling$),
        switchMap((_) =>
          ajax
            .getJSON(`${process.env.REACT_APP_API_SERVICE}/orders`)
            .pipe(map((response) => getOrderAllSuccess(response)))
        )
      )
    )
  );
};
