import React, {createContext,useContext,useState,useEffect} from 'react'
import { toast } from "react-hot-toast"


const Context = createContext();



export const StateContext = ( {children} ) => {
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantities, setTotalQuantities] = useState(0);
    const [qty, setQty] = useState(1);

    let foudProduct;
    let index;


    //add product
    const onAdd = (product, quantity) => {
        const checkProductInCart = cartItems.find((item)=> item._id === product._id) 
        setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);
        
        if(checkProductInCart) {
            const updateCardItems = cartItems.map((cartProduct)=>{
                if(cartProduct._id === product._id) 
                return {
                    ...cartProduct,
                    quantity:cartProduct.quantity + quantity
                }
            })
            setCartItems(updateCardItems);
        }else {
            product.quantity = quantity;
            setCartItems([...cartItems, {...product}])
        }
        toast.success(`${qty} ${product.name} added to the cart`)
    }
   // increase or reduce total  product

    const toggleCartItemQuanitity = (id, value) => {
        foudProduct = cartItems.find((item) => item._id === id);
        index = cartItems.findIndex((product) => product._id ===id);
        const newCartItems = cartItems.filter((item) => item._id !== id )

        if(value === 'inc') {
            setCartItems([...newCartItems, {...foudProduct, quantity:foudProduct.quantity + 1}]);
            setTotalPrice((prevTotalPrice) => prevTotalPrice + foudProduct.price);
            setTotalQuantities((prevTotalQuantities => prevTotalQuantities + 1))
        } else if (value ==='dec') {
            if(foudProduct.quantity > 1) {
                setCartItems([...newCartItems, {...foudProduct, quantity:foudProduct.quantity - 1}]);
                setTotalPrice((prevTotalPrice) => prevTotalPrice - foudProduct.price);
                setTotalQuantities((prevTotalQuantities => prevTotalQuantities - 1))
            }
            
        }
    }
    const onRemove = (product) => {
        foudProduct = cartItems.find((item) => item._id === product._id);
        const newCartItems = cartItems.filter((item) => item._id !== product._id )
        setTotalPrice((prevTotalPrice) => prevTotalPrice = foudProduct.price * foudProduct.quantity);
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - foudProduct.quantity);
        setCartItems(newCartItems)
    }


   // increase or reduce total  product
    const incQty = () => {
        setQty((preQty) => preQty + 1);
    }

    const decQty = () => {
        setQty((preQty) => {
            if(preQty - 1 < 1 ) return 1;
            return preQty - 1
        });
    }

    return (
        <Context.Provider
            value={{
                showCart,
                cartItems,totalPrice,
                totalQuantities,
                qty,
                incQty,
                decQty,
                onAdd,
                setShowCart,
                toggleCartItemQuanitity,
                onRemove,
                setCartItems,
                setTotalPrice,
                setTotalQuantities
            }}
        >
            {children}
        </Context.Provider>
    )
}

export const useStateContext = () => useContext(Context)