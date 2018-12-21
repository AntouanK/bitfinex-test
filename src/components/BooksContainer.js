import Books from "../components/Books.js";
import { connect } from "react-redux";

const mapStateToProps = (state, ownProps) => {
  const ticker = state.tickers.tickersByPair.get(ownProps.pair);
  let lastPrice;

  if (ticker !== undefined) {
    lastPrice = ticker.LAST_PRICE;
  }
  return {
    booksByPrice: state.books.booksByPrice,
    lastPrice
  };
};

export default connect(mapStateToProps)(Books);
