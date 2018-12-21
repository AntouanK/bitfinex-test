import { SET_TICKER } from "../action-types";

const initialState = {
  tickersByPair: new Map()
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_TICKER: {
      const { channelInfo, payload } = action.payload;
      const newTicketsByPair = new Map(state.tickersByPair);
      newTicketsByPair.set(channelInfo.pair, payload);

      return {
        ...state,
        tickersByPair: newTicketsByPair
      };
    }

    default:
      return state;
  }
}
