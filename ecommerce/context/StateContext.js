//File for managing entire state of application

import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast"; //pop-up notification whenever product is added, removed or finished order

const Context = createContext();

export const StateContext = ({ children }) => { //children refers to component wrapped inside state

    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantities, setTotalQuantities] = useState(0);
    const [qty, setQty] = useState(1);

    let foundProduct;
    let index;

    const onAdd = (product, quantity) => {
        const checkProductInCart = cartItems.find((item) => item._id === product._id); //loop over all cart items to find individual item and check if item.id is equal to product.id
        setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);

        if (checkProductInCart) {
            //Adds product to existing product already in cart:
            const updatedCartItems = cartItems.map((cartProduct) => {
                if (cartProduct._id === product._id) return {
                    ...cartProduct,
                    quantity: cartProduct.quantity + quantity
                }
            })
            setCartItems(updatedCartItems);
        } else {    //if product doesn't already exist in cart:
            product.quantity = quantity;
            setCartItems([...cartItems, { ...product }]);
        }
        toast.success(`${qty} ${product.name} added to the cart!`)
    }

    //Dynamic quantity update function:
    const addQty = () => {
        setQty((prevQty) => prevQty + 1);
    }

    const minusQty = () => {
        setQty((prevQty) => {
            if (prevQty - 1 < 1) return 1; //cannot go lower than 1
            return prevQty - 1;
        });
    }

    const onRemove = (product) => {
        foundProduct = cartItems.find((item) => item._id === product._id);
        const newCartItems = cartItems.filter((item) => item._id !== product._id); //create a version of cartitems without the item currently updating
        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price * foundProduct.quantity);
        setTotalQuantities(prevTotalQuantities => prevTotalQuantities - foundProduct.quantity);
        setCartItems(newCartItems);
    }

    const toggleCartItemQuantity = (id, value) => {

        foundProduct = cartItems.find((item) => item._id === id)
        index = cartItems.findIndex((product) => product._id === id);
        const newCartItems = cartItems.filter((item) => item._id !== id); //non-mutative method - do not mutate state directly. 

        if (value === 'add') {
            //cartItems[index] = foundProduct; //Not advisable as in React, one should never mutate the state - ie do not update state with '='
            setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity + 1 }]); //updating cartItems with current cartItems and adding 1 new element to it and spreading properties of that product and increasing quantity by 1
            setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
            setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1);
        } else if (value === 'minus') {
            if (foundProduct.quantity > 1) {
                setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity - 1 }]);
                setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
                setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1);
            }
        }
    }

    return (
        <Context.Provider
            value={{ //object of values passed across entire application
                showCart,
                setShowCart,
                cartItems,
                totalPrice,
                setTotalPrice,
                totalQuantities,
                setTotalQuantities,
                qty,
                addQty,
                minusQty,
                onAdd,
                onRemove,
                toggleCartItemQuantity,
                setCartItems
            }}>
            {children}
        </Context.Provider>
    )
}

export const useStateContext = () => useContext(Context); //allow us to use state as hook