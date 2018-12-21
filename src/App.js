import React, { Component } from "react";
import { Provider } from "react-redux";
import store from "./store";
import TickerContainer from "./components/TickerContainer.js";
import "./App.css";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <header className="App-header">
            <p>Hi</p>
            <TickerContainer />
          </header>
        </div>
      </Provider>
    );
  }
}

export default App;
