import React from "react";
import { useState, useContext } from "react";
import { CartContext } from "../CartContext";
import { Button } from "react-bootstrap";

export default function TicketOrderForm() {

  const cart = useContext(CartContext);
  const [state, setState] = useState(true);
  
  const [orderdata, setOrderedData] = useState({
    name: "",
    address: "",
    zip: "",
    city: "",
    housenumber: "",
    phonenumber: "",
    email: "",
  });

  function handleChange(evt) { 
    setOrderedData({
      ...orderdata,
      [evt.target.name]: evt.target.value,
    });
  }

  async function sendOrder(event) {
    event.preventDefault();
    
    const orderData =  {
        ...orderdata,
        product: cart.items
    };
    
    const response = await fetch("http://127.0.0.1:5000/upload",
          {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify(orderData), /* mindenképpen string legyen, mint itt */
          });
      const data = await response.json();
      console.log(data);
      const data_1 = data;
      alert("Your order number is: " + data_1.orderId);
      cart.resetCart();

  }


  return (
    <>
      <div>
        <form id="add-data">
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Your name is..."
            value={orderdata.name}
            onChange={handleChange}
          />
          <input
            type="text"
            name="zip"
            id="zip"
            placeholder="Your ZIP is..."
            value={orderdata.zip}
            onChange={handleChange}
          />
          <input
            type="text"
            name="city"
            id="city"
            placeholder="Your city is..."
            value={orderdata.city}
            onChange={handleChange}
          />
          <input
            type="text"
            name="street"
            id="street"
            placeholder="Your street is..."
            value={orderdata.street}
            onChange={handleChange}
          />
          <input
            type="text"
            name="housenumber"
            id="housenumber"
            placeholder="Your house number is..."
            value={orderdata.housenumber}
            onChange={handleChange}
          />
          <input
            type="text"
            name="phonenumber"
            id="phonenumber"
            placeholder="Your phone number is..."
            value={orderdata.phonenumber}
            onChange={handleChange}
          />
          <input
            type="text"
            name="email"
            id="email"
            placeholder="Your e-mail address is..."
            value={orderdata.email}
            onChange={handleChange}
          />
        </form>
      </div>
      <div className={state ? "alert" : "alertOpen"}>
        <div>
          <p>{orderdata.name}</p>
          <p>{orderdata.address}</p>
          <p>{orderdata.zip}</p>
          <p>{orderdata.city}</p>
          <p>{orderdata.street}</p>
          <p>{orderdata.housenumber}</p>
          <p>{orderdata.phonenumber}</p>
          <p>{orderdata.email}</p>
          <h2>Köszönjük Tibi a kódot!</h2>
          <Button variant="success" onClick={sendOrder} >Purchase items!</Button>
        </div>
      </div>
    </>
    )
}