import React, { Component } from "react";
import {
  widgetBackground,
  lightRed1,
  lightRed2,
  lightGreen1,
  lightGreen2
} from "../colors.js";
const BIG_TRANSACTION = 1;

const mainWrapperStyle = {
  flex: "0 0 auto",
  minWidth: "250px",
  display: "flex",
  flexDirection: "column",
  margin: "10px",
  padding: "10px",
  backgroundColor: widgetBackground
};
const tradeStyle = mode => ({
  flex: "1 0 16px",
  display: "flex",
  flexDirection: "row",
  padding: "2px",
  alignItems: "center",
  backgroundColor:
    mode === "buy"
      ? lightGreen1
      : mode === "buy-l"
        ? lightGreen2
        : mode === "sell"
          ? lightRed1
          : mode === "sell-l"
            ? lightRed2
            : ""
});
const cellStyle = width => ({
  flex: "1 0 " + width,
  display: "flex",
  padding: "0 4px",
  justifyContent: "center"
});

//
//
class Trades extends Component {
  render() {
    const { trades } = this.props;

    const tradesHeader = (
      <div style={tradeStyle()}>
        <div style={cellStyle("100px")}>TIME</div>
        <div style={cellStyle("60px")}>PRICE</div>
        <div style={cellStyle("60px")}>AMOUNT</div>
      </div>
    );
    const renderTrade = ({ ID, AMOUNT, PRICE, MTS }) => {
      const mtsDate = new Date(MTS);
      //const dateString = mtsDate.toDateString();
      const timeString = mtsDate.toTimeString().slice(0, 8);
      const mode =
        AMOUNT >= BIG_TRANSACTION
          ? "buy-l"
          : AMOUNT > 0
            ? "buy"
            : AMOUNT <= -BIG_TRANSACTION
              ? "sell-l"
              : AMOUNT <= 0
                ? "sell"
                : "";

      return (
        <div key={ID} style={tradeStyle(mode)}>
          <div style={cellStyle("100px")}>{timeString}</div>
          <div style={cellStyle("60px")}>{PRICE.toFixed(1)}</div>
          <div style={cellStyle("60px")}>{Math.abs(AMOUNT).toFixed(4)}</div>
        </div>
      );
    };
    const tradesRendered = trades.map(renderTrade);

    return (
      <div style={mainWrapperStyle}>
        {tradesHeader}
        {tradesRendered}
      </div>
    );
  }
}

export default Trades;
