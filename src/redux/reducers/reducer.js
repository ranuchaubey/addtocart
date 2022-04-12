const INITIAL_STATE = {
  carts: [],
};

export const cartreducers = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "ADD_CART":
      // when we click on add to cart then, that item id and the id which ie present in action.apyload.id
      // if they both are equal then, it means one item is present already
      // so we will increment quantity by 1

      const ItemIndex = state.carts.findIndex(
        (item) => item.id === action.payload.id
      );
      if (ItemIndex >= 0) {
        state.carts[ItemIndex].qnty += 1;
      } else {
        const temp = { ...action.payload, qnty: 1 };

        return {
          ...state,
          carts: [...state.carts, temp],
        };
      }
    case "DELETE_CART":
      // it will return that data whose id will not match, and whose id will match it will delte that ele
      const data = state.carts.filter((el) => el.id !== action.payload);
      return {
        ...state,
        carts: data,
      };
    case "REMOVE_ONE":
      const ItemIndex_dec = state.carts.findIndex(
        (item) => item.id === action.payload.id
      );
      if (state.carts[ItemIndex_dec].qnty >= 1) {
        const decItem = state.carts[ItemIndex_dec].qnty -= 1;
        console.log([...state.carts, decItem]);
        return {
          ...state,
          carts: [...state.carts],
        };
      } else if (state.carts[ItemIndex_dec].qnty === 1) {
          const data = state.carts.filter((el) => el.id !== action.payload);
          return {
            ...state,
            carts: data,
          };
      }
    default:
      return state;
  }
};
