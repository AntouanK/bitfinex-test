import React, { Component } from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import { setBook, setTicker, setTrade } from "./redux/actions.js";
import TickerContainer from "./components/TickerContainer.js";
import TradesContainer from "./components/TradesContainer.js";
import BooksContainer from "./components/BooksContainer.js";
import { initiate } from "./websocket.js";
import "./App.css";

//
// handle the websocket messages here, and dispatch actions to get the
// data in the state
const wsMessageHandler = ({ channelInfo, payload }) => {
  if (channelInfo.channel === "ticker") {
    store.dispatch(setTicker({ channelInfo, payload }));
  } else if (channelInfo.channel === "trades") {
    store.dispatch(setTrade(payload));
  } else if (channelInfo.channel === "book") {
    store.dispatch(setBook(payload));
  }
};

//
//
class App extends Component {
  componentDidMount() {
    initiate(wsMessageHandler);
  }

  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <p>Bitfinex test</p>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div>
              <BooksContainer pair="BTCUSD" />
            </div>
            <div>
              <TickerContainer pair="BTCUSD" />
              <TradesContainer />
            </div>
          </div>
        </div>
      </Provider>
    );
  }
}

//
//
export default App;
