import { SET_BOOK } from "../action-types";

const initialState = {
  booksByPrice: new Map()
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_BOOK: {
      const newBooksByPrice = new Map(state.booksByPrice);
      actio.payload.forEach(book => newBooksByPrice.set(book.PRICE, book));

      return {
        ...state,
        booksByPrice: newBooksByPrice
      };
    }

    default:
      return state;
  }
}
