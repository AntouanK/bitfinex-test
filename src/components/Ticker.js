import React, { Component } from "react";

const mainWrapperStyle = {
  display: "flex",
  flexDirection: "row",
  margin: "10px",
  padding: "10px",
  backgroundColor: "#1b262d"
};
const columnStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-around",
  margin: "0 10px"
};
const pairStyle = { fontSize: "x-large" };
const lastPriceStyle = { fontSize: "x-large" };

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
        color: priceChange < 0 ? "red" : "green"
      };

      content = (
        <div style={mainWrapperStyle}>
          <div style={columnStyle}>
            <div style={pairStyle}>{pair}</div>
            <div style={{ opacity: 0.7 }}>
              VOL
              <span
                style={{
                  textDecoration: "underline",
                  margin: "0 4px"
                }}
              >
                {volume.toFixed(3)}
              </span>{" "}
              USD
            </div>
          </div>
          <div style={columnStyle}>
            <div style={lastPriceStyle}>{lastPrice.toFixed(3)}</div>
            <div style={priceChangeStyle}>{priceChange}%</div>
          </div>
        </div>
      );
    }

    return <div>{content} </div>;
  }
}

export default Ticker;
