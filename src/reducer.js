// export const actionTypes = {
//   SET_USER: "SET_USER",
// };

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_BASKET":
      return {
        ...state,
        basket: [...state.basket, action.item],
      };

    case "ADD_TO_BOX":
      return {
        ...state,
        box: [...state.box, action.item],
      };

    case "REMOVE_FROM_BASKET":
      const index = state.basket.findIndex(
        (basketItem) => basketItem.id === action.id
      );
      let newBasket = [...state.basket];

      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.warn(
          `Cant remove product (id: ${action.id}) as its not in basket!`
        );
      }

      return {
        ...state,
        basket: newBasket,
      };

    default:
      return state;
  }
};

export default reducer;

// case actionTypes.SET_USER:
//   return {
//     ...state,
//     user: action.user,
//   };

// case "SET_USER":
//   return {
//     ...state,
//     user: action.user,
//   };

// case "EMPTY_BASKET":
//   return {
//     ...state,
//     basket: [],
//   };
