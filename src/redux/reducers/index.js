import { combineReducers } from "redux";
import tickers from "./tickers";
import trades from "./trades";
import books from "./books";

export default combineReducers({ tickers, trades, books });
