import { useReducer } from "react";
import { CartContext } from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const reducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    const exisitngCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    const exisitngCartItem = state.items[exisitngCartItemIndex];
    let updatedItems;

    if (exisitngCartItem) {
      // if this item was already in the cart list of items
      const updatedItem = {
        ...exisitngCartItem,
        amount: exisitngCartItem.amount + action.item.amount,
      };
      updatedItems = [...state.items];
      updatedItems[exisitngCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  if(action.type==='REMOVE'){
    
    const exisitngCartItemIndex = state.items.findIndex(
        (item) => item.id === action.id
    );
    const exisitingItem = state.items[exisitngCartItemIndex];
    const updatedTotalAmount = state.totalAmount - exisitingItem.price;
    let updatedItems;
    if(exisitingItem.amount===1){
        updatedItems = state.items.filter(i => i.id !== action.id);
    }else {
        const updatedItem = {...exisitingItem, amount: exisitingItem.amount-1};
        updatedItems = [...state.items];
        updatedItems[exisitngCartItemIndex] = updatedItem;
    }

    return {
        items: updatedItems,
        totalAmount: updatedTotalAmount,
      };
  }
  return defaultCartState;
};


const CartProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, defaultCartState);

  const addItemToCartHandler = (item) => {
    dispatch({ type: "ADD", item: item });
  };
  const removeItemFromCartHandler = (id) => {
    dispatch({ type: "REMOVE", id: id });
  };

  const cartContextData = {
    items: state.items,
    totalAmount: state.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };
  return (
    <CartContext.Provider value={cartContextData}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
