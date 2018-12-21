import Ticker from "../components/Ticker.js";
import { connect } from "react-redux";

const mapStateToProps = (state, ownProps) => {
  let notFound = true,
    volume,
    priceChange,
    lastPrice;
  const ticker = state.tickers.tickersByPair.get(ownProps.pair);

  if (ticker !== undefined) {
    notFound = false;
    volume = ticker.VOLUME;
    priceChange = ticker.DAILY_CHANGE;
    lastPrice = ticker.LAST_PRICE;
  }

  return {
    pair: ownProps.pair,
    volume,
    priceChange,
    lastPrice,
    notFound
  };
};

export default connect(mapStateToProps)(Ticker);
