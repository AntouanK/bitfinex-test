import React, { Component } from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import TickerContainer from "./components/TickerContainer.js";
import { initiate } from "./websocket.js";
import "./App.css";

import { setTicker } from "./redux/actions.js";

//
//
class App extends Component {
  componentDidMount() {
    const cb = ({ channelInfo, payload }) => {
      if (channelInfo.channel === "ticker") {
        store.dispatch(setTicker({ channelInfo, payload }));
        console.log({ channelInfo, payload });
      }
    };
    initiate(cb);
  }

  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <header className="App-header">
            <TickerContainer pair="BTCUSD" />
          </header>
        </div>
      </Provider>
    );
  }
}

//
//
export default App;
