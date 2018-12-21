import Ticker from "../components/Ticker.js";
import { connect } from "react-redux";

const mapStateToProps = (state /*, ownProps*/) => {
  return {
    counter: state
  };
};

export default connect(mapStateToProps)(Ticker);
