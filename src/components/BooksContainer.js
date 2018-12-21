import Books from "../components/Books.js";
import { connect } from "react-redux";
import { setBooksPrecision } from "../redux/actions.js";

//
//
const mapStateToProps = (state, ownProps) => {
  const ticker = state.tickers.tickersByPair.get(ownProps.pair);
  let lastPrice;

  if (ticker !== undefined) {
    lastPrice = ticker.LAST_PRICE;
  }
  return {
    booksByPrice: state.books.booksByPrice,
    precision: state.books.precision,
    lastPrice
  };
};

//
//
const mapDispatchToProps = dispatch => ({
  setBooksPrecision: function() {
    dispatch(setBooksPrecision.apply(null, arguments));
  }
});

//
//
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Books);
