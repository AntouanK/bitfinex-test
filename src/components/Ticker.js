import React, { Component } from "react";
import { widgetBackground, lightRed2, lightGreen2 } from "../colors.js";

const mainWrapperStyle = {
  display: "flex",
  flexDirection: "row",
  margin: "10px",
  padding: "10px",
  backgroundColor: widgetBackground
};
const columnStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-around",
  margin: "0 10px"
};
const pairStyle = { fontSize: "x-large" };
const lastPriceStyle = { fontSize: "x-large" };
const volumeStyle = { textDecoration: "underline", margin: "0 4px" };

//
//
class Ticker extends Component {
  render() {
    const { notFound, pair, volume, priceChange, lastPrice } = this.props;
    let content;

    if (notFound === true) {
      content = <div style={mainWrapperStyle}>not found</div>;
    } else {
      const priceChangeStyle = {
        color: priceChange < 0 ? lightRed2 : lightGreen2
      };

      content = (
        <div style={mainWrapperStyle}>
          <div style={columnStyle}>
            <div style={pairStyle}>{pair}</div>
            <div style={{ opacity: 0.7 }}>
              VOL
              <span style={volumeStyle}>{volume.toFixed(3)}</span> USD
            </div>
          </div>
          <div style={columnStyle}>
            <div style={lastPriceStyle}>{lastPrice.toFixed(3)}</div>
            <div style={priceChangeStyle}>{priceChange.toFixed(2)}%</div>
          </div>
        </div>
      );
    }

    return <div>{content} </div>;
  }
}

export default Ticker;
