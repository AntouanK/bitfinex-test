import { SET_TRADE } from "../action-types";

const initialState = {
  tradesById: new Map(),
  sortedTrades: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_TRADE: {
      const { trades } = action.payload;
      const newTradesById = new Map(state.tradesById);
      trades.forEach(trade => newTradesById.set(trade.ID, trade));

      // TODO optimise sorting. no need to sort all the trades every single
      // time. Check if all new trades are after the latest one we already
      // have, so then we can sort only them
      const newSortedTrades = Array.from(newTradesById.values()).sort(
        (a, b) => {
          return a.MTS > b.MTS ? -1 : a.MTS === b.MTS ? 0 : 1;
        }
      );

      return {
        ...state,
        tradesById: newTradesById,
        sortedTrades: newSortedTrades
      };
    }

    default:
      return state;
  }
}
