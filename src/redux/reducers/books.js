import { SET_BOOK, SET_BOOKS_PRECISION } from "../action-types";

const initialState = {
  booksByPrice: new Map(),
  precision: 0
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_BOOK: {
      const newBooksByPrice = new Map(state.booksByPrice);
      action.payload.forEach(book =>
        newBooksByPrice.set(book.PRICE, Object.assign({}, book))
      );

      return {
        ...state,
        booksByPrice: newBooksByPrice
      };
    }

    case SET_BOOKS_PRECISION: {
      const precision = action.payload > 0 ? 0 : action.payload;

      return {
        ...state,
        precision
      };
    }

    default:
      return state;
  }
}
