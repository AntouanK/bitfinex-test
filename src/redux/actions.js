import { SET_TICKER, SET_TRADE } from "./action-types";

export const setTicker = payload => ({
  type: SET_TICKER,
  payload
});

export const setTrade = trades => ({
  type: SET_TRADE,
  payload: trades
});
