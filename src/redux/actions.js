import { SET_TICKER, SET_TRADE, SET_BOOK } from "./action-types";

export const setTicker = payload => ({
  type: SET_TICKER,
  payload
});

export const setTrade = trades => ({
  type: SET_TRADE,
  payload: trades
});

export const setBook = books => ({
  type: SET_BOOK,
  payload: books
});
