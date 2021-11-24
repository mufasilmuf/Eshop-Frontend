import DetailStyle from "./details.module.css";
import Header from "../../common/header/header";
import Toggle from "../../components/toggleBar/toggle";
import { useState, useEffect } from "react";
import authAxios from "../../common/authAxios/authAxios";
import { Button, TextField } from "@material-ui/core";
import jwt from "jsonwebtoken";
import { useNavigate } from "react-router";

var Details = () => {
  const queryString = window.location.search;

  const urlParams = new URLSearchParams(queryString);

  const Id = urlParams.get("Id");

  const [productDetails, setProductDetails] = useState([]);

  const [Quantity, setQuantity] = useState();

  const navigate = useNavigate();

  let callAPI = () => {
    authAxios
      .get("https://mshopbackend.herokuapp.com/api/products/" + Id)
      .then((response) => {
        setProductDetails(response.data);
      });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = jwt.decode(token);
      if (!user) {
        localStorage.removeItem("token");
        navigate("/");
      } else {
        callAPI();
      }
    } else {
      navigate("/");
    }
  }, []);

  let handleClick = async (e) => {
    e.preventDefault();
    window.location = `/order?Id=${Id}&Quantity=${Quantity}`;
  };

  let handleChange = (e) => {
    setQuantity(e.target.value);
  };

  return (
    <div className={DetailStyle.Details}>
      <Header home={true} showAcc={false} showLB={true} showSB={false} />

      <div className={DetailStyle.container}>
        <div className={DetailStyle.Image}>
          <img
            src={productDetails[0]?.imageURL}
            alt={productDetails[0]?.imageURL}
          />
        </div>

        <div className={DetailStyle.content}>
          <div className={DetailStyle.title}>
            <h1>{productDetails[0]?.name}</h1>

            <div className={DetailStyle.avaiableStatus}>
              Avaliable Quantity: {productDetails[0]?.availableItems}
            </div>
          </div>

          <div>
            category: <b>{productDetails[0]?.category}</b>
          </div>
          <br />
          <div className={DetailStyle.description}>
            {productDetails[0]?.description}
          </div>
          <h1 className={DetailStyle.price}>₹ {productDetails[0]?.price}</h1>

          <form onSubmit={handleClick}>
            <TextField
              required
              type="number"
              label="Enter Quantity"
              variant="outlined"
              onChange={handleChange}
            />

            <br />
            <br />
            <Button
              color="primary"
              type="submit"
              id={productDetails[0]?._id}
              variant="contained"
            >
              Place order
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Details;
