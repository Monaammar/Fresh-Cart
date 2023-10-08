import axios from "axios";
import { createContext } from "react";
import React, { useEffect, useState } from "react";

export const CartContext = createContext();

export function CartContextProvider(props) {
  const [cartId, setcartId] = useState(null);
  const [numberOfCartItems, setNumberOfCartItems] = useState(0);

  let headers = {
    token: localStorage.getItem("userToken"),
  };
  function addToCart(id) {
    return axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          productId: id,
        },
        {
          headers,
        }
      )
      .then((response) => response)
      .catch((error) => error);
  }
  function updateCartQuantity(count, id) {
    return axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        {
          count,
        },
        {
          headers,
        }
      )
      .then((response) => response)
      .catch((error) => error);
  }
  function deleteCartItem(productId) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
        headers,
      })
      .then((response) => response)
      .catch((error) => error);
  }
  function getLoggedCart() {
    return axios
      .get("https://ecommerce.routemisr.com/api/v1/cart", {
        headers,
      })
      .then((response) => response)
      .catch((error) => error);
  }
  async function getData() {
    const { data } = await getLoggedCart();
    setNumberOfCartItems(data.numOfCartItems)
    console.log(data);
    setcartId(data.data._id);
  }
  useEffect(() => {
    getData();
    
  }, []);
  console.log(numberOfCartItems)
  function OnlinePayment(cartId, shippingAddress) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,
        {
          shippingAddress,
        },
        {
          headers,
        }
      )
      .then((response) => response)
      .catch((error) => error);
  }

  return (
    <CartContext.Provider
      value={{
        addToCart,
        getLoggedCart,
        deleteCartItem,
        updateCartQuantity,
        OnlinePayment,
        cartId,
        numberOfCartItems,
        setNumberOfCartItems,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}
