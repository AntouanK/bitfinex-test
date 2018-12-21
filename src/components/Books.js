import React, { Component } from "react";
import { widgetBackground, lightRed2, lightGreen2 } from "../colors.js";
const MAX_BOOKS = 30;

const mainWrapperStyle = {
  flex: "1 0 auto",
  minWidth: "650px",
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
const precisionButtonStyle = {
  cursor: "pointer",
  fontSize: "large"
};

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
    const {
      precision,
      booksByPrice,
      lastPrice,
      setBooksPrecision
    } = this.props;
    const _booksByPrice = new Map();
    let booksSmaller = [];
    let booksBigger = [];

    Array.from(booksByPrice.values())
      // get only books with COUNT above zero. we don't need empty ones
      .filter(book => book.COUNT > 0)
      // get new copies of those books
      .map(book => Object.assign({}, book))
      // round up for precision if needed
      .map(book => {
        if (precision !== 0) {
          const multiplier = Math.pow(10, Math.abs(precision) - 1);
          book.PRICE = Math.round(book.PRICE / multiplier) * multiplier;
        }
        return book;
      })
      .forEach(book => {
        if (_booksByPrice.has(book.PRICE)) {
          const existingBook = _booksByPrice.get(book.PRICE);
          existingBook.AMOUNT += book.AMOUNT;
        } else {
          _booksByPrice.set(book.PRICE, book);
        }
      });

    Array.from(_booksByPrice.values())
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
          <div
            style={precisionButtonStyle}
            title="increase precision"
            onClick={() => setBooksPrecision(precision + 1)}
          >
            +
          </div>
          <div
            style={precisionButtonStyle}
            title="decrease precision"
            onClick={() => setBooksPrecision(precision - 1)}
          >
            -
          </div>
        </div>
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
