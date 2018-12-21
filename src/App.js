import React, { Component } from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import TickerContainer from "./components/TickerContainer.js";
import TradesContainer from "./components/TradesContainer.js";
import { initiate } from "./websocket.js";
import "./App.css";

import { setTicker, setTrade } from "./redux/actions.js";
const wsMessageHandler = ({ channelInfo, payload }) => {
  if (channelInfo.channel === "ticker") {
    store.dispatch(setTicker({ channelInfo, payload }));
  } else if (channelInfo.channel === "trades") {
    store.dispatch(setTrade(payload));
    console.log({ channelInfo, payload });
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
          <TickerContainer pair="BTCUSD" />
          <TradesContainer />
        </div>
      </Provider>
    );
  }
}

//
//
export default App;
