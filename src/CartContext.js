import { createContext, useState, useEffect } from "react";

export const CartContext = createContext({
    items: [],
    getProductQuantity: () => {},
    addOneToCart: () => {},
    removeOneFromCart: () => {},
    deleteFromCart: () => {},
    getTotalCost: () => {},
    resetCart: () => {}
});

export function CartProvider({children}) {

    //fetcheljük az adatokat mielőtt dolgozunk vele
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('http://127.0.0.1:5000/ticket')
            .then((response) => response.json())
            .then((data) => {
                console.log("micsoda ? : ", data);
                setProducts(data);
            })
            .catch(console.error);
    }, []);
    // fetch vége
    
    const [cartProducts, setCartProducts] = useState([]);

    // termékek össz-darabszáma
    function getProductQuantity(id) {
        const quantity = cartProducts.find(product => product.id === id)?.quantity;
        if(quantity === undefined){return 0;} return quantity;
    }

    // kosárhoz ad
    function addOneToCart(id) {
        const quantity = getProductQuantity(id);

        if(quantity === 0) {
            setCartProducts(
                [
                    ...cartProducts,
                    {
                        id: id,
                        quantity: 1
                    }])
        } else {
            setCartProducts(
                cartProducts.map(
                    product => product.id === id ? { ...product, quantity: product.quantity + 1 }: product
                ))}
    }

    // termékek darbszámának csökkentése
    function removeOneFromCart(id) {
        const quantity = getProductQuantity(id);

        if(quantity == 1) { deleteFromCart(id);
        } else {
            setCartProducts(
                cartProducts.map(
                    product => product.id === id ? { ...product, quantity: product.quantity - 1 }: product
                ))}
    }

    //terméktípus törlése a kosárból
    function deleteFromCart(id) {
        setCartProducts(
            cartProducts => cartProducts.filter(currentProduct => {return currentProduct.id != id;})
        )
    }

    function getTotalCost() {
        let totalCost = 0;
        cartProducts.map((cartItem) => {
            const productData = products.find(product => product.id == cartItem.id);
            totalCost += (productData.price * cartItem.quantity);
        });
        return totalCost;
    }

    //lenulláza a shopping cartot 
    function resetCart() {
        setCartProducts([]);
    }
    
    const contextValue = {
        items: cartProducts,
        getProductQuantity,
        addOneToCart,
        removeOneFromCart,
        deleteFromCart,
        getTotalCost,
        resetCart
    }
    
    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider;