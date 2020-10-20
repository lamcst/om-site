export const GET_ORDER_ALL = 'GET_ORDER';
export const GET_ORDER_ALL_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_ALL_STOP = 'GET_ORDER_ALL_STOP';

export const getOrderAll = () => ({ type: GET_ORDER_ALL });
export const stopOrderAll = () => ({ type: GET_ORDER_ALL_STOP });
export const getOrderAllSuccess = (orders) => ({
  type: GET_ORDER_ALL_SUCCESS,
  payload: orders,
});
