import React, { Component } from "react";

const mainWrapperStyle = {
  flex: "0 0 auto",
  minWidth: "250px",
  display: "flex",
  flexDirection: "column",
  margin: "10px",
  padding: "10px",
  backgroundColor: "#1b262d"
};
const tradeStyle = mode => ({
  flex: "1 0 16px",
  display: "flex",
  flexDirection: "row",
  padding: "2px",
  alignItems: "center",
  backgroundColor:
    mode === "buy"
      ? "rgba(157, 194, 74, 0.05)"
      : mode === "sell"
        ? "rgba(225, 86, 86, 0.11)"
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
      const mode = AMOUNT > 0 ? "buy" : "sell";

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