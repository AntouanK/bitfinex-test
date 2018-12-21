import { combineReducers } from "redux";
import tickers from "./tickers";
import trades from "./trades";

export default combineReducers({ tickers, trades });
