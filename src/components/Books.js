import React, { Component } from "react";
import { widgetBackground, lightRed2, lightGreen2 } from "../colors.js";
const MAX_BOOKS = 30;

const mainWrapperStyle = {
  flex: "1 0 auto",
  minWidth: "550px",
  display: "flex",
  flexDirection: "row",
  margin: "10px",
  padding: "10px",
  backgroundColor: widgetBackground
};
const booksSideStyle = {
  flex: "1 0 auto",
  display: "flex",
  flexDirection: "column"
};
const bookBarStyle = ({ mode, width }) => ({
  height: "3px",
  width,
  backgroundColor: mode === "sell" ? lightRed2 : lightGreen2
});
const bookStyle = {
  flex: "0 0 18px",
  display: "flex",
  flexDirection: "column"
};
const bookCellsStyle = {
  display: "flex",
  justifyContent: "center",
  flexDirection: "row"
};
const cellStyle = width => ({
  flex: "1 0 " + width,
  display: "flex",
  padding: "0 6px",
  justifyContent: "center"
});

//
//
const sortFn = (a, b) => (a.PRICE > b.PRICE ? -1 : 1);
const sortFnReverse = (a, b) => (a.PRICE > b.PRICE ? 1 : -1);
const aggregateTotal = (prev, cur, i, list) => {
  const absAmount = Math.abs(cur.AMOUNT);
  if (i === 0) {
    cur.TOTAL = absAmount;
  } else {
    cur.TOTAL = list[i - 1].TOTAL + absAmount;
  }
  return list;
};
//
//
const renderBook = ({ mode, maxTotal }) => ({
  COUNT,
  AMOUNT,
  PRICE,
  TOTAL
}) => (
  <div key={PRICE} style={bookStyle}>
    <div style={bookCellsStyle}>
      <div style={cellStyle("30px")}>{COUNT}</div>
      <div style={cellStyle("70px")}>{Math.abs(AMOUNT).toFixed(2)}</div>
      <div style={cellStyle("70px")}>{TOTAL.toFixed(2)}</div>
      <div style={cellStyle("70px")}>{PRICE.toFixed(1)}</div>
    </div>
    <div style={bookBarStyle({ width: (TOTAL / maxTotal) * 100 + "%", mode })}>
      {" "}
    </div>
  </div>
);

//
//
class Books extends Component {
  render() {
    const { booksByPrice, lastPrice } = this.props;
    let booksSmaller = [];
    let booksBigger = [];

    Array.from(booksByPrice.values())
      // get only books with COUNT above zero. we don't need empty ones
      .filter(book => book.COUNT > 0)
      // get new copies of those books
      .map(book => Object.assign({}, book))
      // split them in 2 list, based on lastPrice
      .forEach(book => {
        if (book.PRICE > lastPrice) {
          booksBigger.push(book);
        } else {
          booksSmaller.push(book);
        }
      });

    // sort them by price
    booksSmaller = booksSmaller.slice(0, MAX_BOOKS).sort(sortFn);
    booksBigger = booksBigger.slice(0, MAX_BOOKS).sort(sortFnReverse);

    // keep the maximum TOTAL here
    let maxTotal = 0;
    const totalKeeperFn = book => {
      if (book.TOTAL > maxTotal) {
        maxTotal = book.TOTAL;
      }
      return book;
    };
    const renderedBooksSmaller = booksSmaller
      .reduce(aggregateTotal, [])
      .map(totalKeeperFn)
      .map(renderBook({ mode: "buy", maxTotal }));
    const renderedBooksBigger = booksBigger
      .reduce(aggregateTotal, [])
      .map(totalKeeperFn)
      .map(renderBook({ mode: "sell", maxTotal }));

    const header = (
      <div style={bookStyle}>
        <div style={bookCellsStyle}>
          <div style={cellStyle("30px")}>COUNT</div>
          <div style={cellStyle("70px")}>AMOUNT</div>
          <div style={cellStyle("70px")}>TOTAL</div>
          <div style={cellStyle("70px")}>PRICE</div>
        </div>
      </div>
    );

    return (
      <div style={mainWrapperStyle}>
        <div style={booksSideStyle}>
          {header}
          {renderedBooksSmaller}
        </div>
        <div style={booksSideStyle}>
          {header}
          {renderedBooksBigger}
        </div>
      </div>
    );
  }
}

export default Books;
