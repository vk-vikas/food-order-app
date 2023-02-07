import { CartContext } from "./cart-context";

const CartProvider = (props) => {

    const addItemToCartHandler = () => {};
    const removeItemFromCartHandler =() => {};
    const cartContextData = {
        items: [],
        totalAmount: 0,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler
    }
return (
    <CartContext.Provider value={cartContextData}>
        {props.children}
    </CartContext.Provider>
)
}

export default CartProvider;