import { Button } from "react-bootstrap";
import { CartContext } from "../CartContext";
import { useContext, useEffect, useState } from "react";

function CartProduct(props) {
    const cart = useContext(CartContext);
    const id = props.id;
    const quantity = props.quantity;

    const [productData, setProductData] = useState({});

    //fetchelünk mielőtt a jegyekkel dolgoznánk
    useEffect(() => {
        fetch(`http://127.0.0.1:5000/ticket/${id}`)
            .then((response) => response.json())
            .then((data) => {
                console.log("micsoda ? : ", data);
                setProductData(data);
            })
            .catch(console.error);
    }, []);
    //fetch vége

    return (
        <>
            <h3>{productData.name}</h3>
            <p>{quantity} total</p>
            <p>${(quantity * productData.price).toFixed(2) }</p>
            <Button size="sm" onClick={() => cart.deleteFromCart(id)}>Remove</Button>
            <hr></hr>
        </>

        //form helye
        
    )
}

export default CartProduct;