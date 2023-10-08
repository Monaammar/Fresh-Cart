import axios from "axios";
import { createContext } from "react";
import React, { useEffect, useState } from "react";

export const ListContext = createContext();

export function ListContextProvider(props) {
  const [listId, setListId] = useState(null);
  
  let headers = {
    token: localStorage.getItem("userToken"),
  };
  function addToList(id) {
    return axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
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

  function deleteListItem(productId) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
        headers,
      })
      .then((response) => response)
      .catch((error) => error);
  }
  function getLoggedList() {
    return axios
      .get("https://ecommerce.routemisr.com/api/v1/wishlist", {
        headers,
      })
      .then((response) => response)
      .catch((error) => error);
  }
  async function getData() {
    const { data } = await getLoggedList();
    console.log(data);
    setListId(data.data._id);
  }
  useEffect(() => {
    getData();
  }, []);

  return (
    <ListContext.Provider
      value={{
       addToList,
       getLoggedList,
       deleteListItem,
       listId,
      }}
    >
      {props.children}
    </ListContext.Provider>
  );
}
