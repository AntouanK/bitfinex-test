import {
  SET_TICKER,
  SET_TRADE,
  SET_BOOK,
  SET_BOOKS_PRECISION
} from "./action-types";

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

export const setBooksPrecision = precision => ({
  type: SET_BOOKS_PRECISION,
  payload: precision
});
