import React, { Component } from "react";

class Ticker extends Component {
  render() {
    const { notFound, pair, volume, priceChange, lastPrice } = this.props;
    let content;

    if (notFound === true) {
      content = <div>not found</div>;
    } else {
      content = (
        <div>
          <div>pair: {pair}</div>
          <div>volume: {volume}</div>
          <div>priceChange: {priceChange}%</div>
          <div>lastPrice: {lastPrice}</div>
        </div>
      );
    }

    return <div>{content} </div>;
  }
}

export default Ticker;
