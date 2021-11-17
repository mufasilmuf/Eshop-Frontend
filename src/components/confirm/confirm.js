import { CardContent, Typography } from "@material-ui/core";
import { Card, CardActions } from "@material-ui/core";
import ConfirmStyle from "./confirm.module.css";
import { useEffect, useState } from "react";
import authAxios from "../../common/authAxios/authAxios";

const Confirm = () => {
  const queryString = window.location.search;

  const urlParams = new URLSearchParams(queryString);

  const Id = urlParams.get("Id");

  const Quantity = urlParams.get("Quantity");

  const [product, setproduct] = useState([]);

  const [address, setaddress] = useState([]);

  useEffect(() => {
    authAxios
      .get("https://mshopbackend.herokuapp.com/api/products/" + Id)
      .then((response) => {
        setproduct(response.data);
      });

    authAxios
      .get("https://mshopbackend.herokuapp.com/api/addresses")
      .then((response) => {
        setaddress(response.data.result);
      });
  }, []);

  return (
    <div className={ConfirmStyle.container}>
      <div className={ConfirmStyle.Lift}>
        <Card className={ConfirmStyle.LiftCard}>
          <CardContent>
            <Typography variant="h3" gutterBottom>
              {product[0]?.name}
            </Typography>
            <Typography component="div">
              Quantity: <b>{Quantity}</b>
            </Typography>
            <br />
            <Typography component="div">
              Category: <b>{product[0]?.category}</b>
            </Typography>
            <br />
            <Typography component="div">{product[0]?.description}</Typography>
          </CardContent>
          <CardActions>
            <Typography variant="h4" className={ConfirmStyle.price}>
              Total price: ₹ {product[0]?.price}
            </Typography>
          </CardActions>
        </Card>
      </div>
      <div className={ConfirmStyle.Right}>
        <Card className={ConfirmStyle.RightCard}>
          <CardContent>
            <Typography variant="h3" gutterBottom>
              Address Details:
            </Typography>
            <Typography component="div">
              <Typography component="div">
                {address.name} {address.street}
              </Typography>
              <Typography component="div">
                Contact Number: {address.contactNumber}
              </Typography>
              <Typography component="div">{address.city}</Typography>
              <Typography component="div">{address.state}</Typography>
              <Typography component="div">{address.zipCode}</Typography>
            </Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
export default Confirm;
