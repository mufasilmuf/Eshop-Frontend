import ItemStyle from "./items.module.css";
import { useEffect } from "react";
import { useState } from "react";
import authAxios from "../../common/authAxios/authAxios";

var Item = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const Id = urlParams.get("Id");
  const quantity = urlParams.get("Quantity");

  const [Item, setItem] = useState([]);

  useEffect(() => {
    authAxios
      .get("https://mshopbackend.herokuapp.com/api/products/" + Id)
      .then((response) => {
        setItem(response.data);
      });
  }, []);

  return (
    <div className={ItemStyle.container}>
      <div className={ItemStyle.Lift}>
        <img src={Item[0]?.imageURL} alt={Item[0]?.name} />
      </div>
      <div className={ItemStyle.Right}>
        <h1>{Item[0]?.name}</h1>
        <div>
          Quantity: <b>{quantity}</b>
        </div>
        <br />
        <div>
          category: <b>{Item[0]?.category}</b>
        </div>
        <br />
        <div className={ItemStyle.description}>{Item[0]?.description}</div>
        <h1 className={ItemStyle.price}>Total Price: ₹ {Item[0]?.price}</h1>
      </div>
    </div>
  );
};
export default Item;
