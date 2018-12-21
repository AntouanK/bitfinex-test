import Trades from "../components/Trades.js";
import { connect } from "react-redux";

const mapStateToProps = (state, ownProps) => {
  const { sortedTrades } = state.trades;
  return { trades: sortedTrades.slice(0, 20) };
};

export default connect(mapStateToProps)(Trades);
