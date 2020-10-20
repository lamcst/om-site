import { GET_ORDER_ALL_SUCCESS, GET_ORDER_ALL } from '../actions/order';
export const order = (
  state = { isLoading: false, invalidate: true, payload: [] },
  action
) => {
  switch (action.type) {
    case GET_ORDER_ALL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        payload: action.payload || [],
        invalidate: false,
      };
    case GET_ORDER_ALL:
      return {
        ...state,
        invalidate: false,
        isLoading: true,
      };
    default:
      return state;
  }
};
