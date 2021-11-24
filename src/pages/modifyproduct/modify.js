import ModifyStyle from "./modify.module.css";
import Header from "../../common/header/header";
import { Button, TextField, Typography } from "@material-ui/core";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import jwt from "jsonwebtoken";
import authAxios from "../../common/authAxios/authAxios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditBox = () => {
  const [Name, setName] = useState();
  const [Categories, setCategories] = useState();
  const [Manufacturer, setManufacturer] = useState();
  const [AvailableItems, setAvailableItems] = useState();
  const [Price, setPrice] = useState();
  const [URL, setURL] = useState();
  const [Description, setDescription] = useState();

  const navigate = useNavigate();

  const queryString = window.location.search;

  const urlParams = new URLSearchParams(queryString);

  const Id = urlParams.get("Id");

  let CallAPI = async () => {
    await authAxios
      .get("https://mshopbackend.herokuapp.com/api/products/" + Id)
      .then(async (response) => {
        console.log(response.data);
        setName(response.data[0].name);
        setCategories(response.data[0].category);
        setManufacturer(response.data[0].manufacturer);
        setAvailableItems(response.data[0].availableItems);
        setPrice(response.data[0].price);
        setURL(response.data[0].imageURL);
        setDescription(response.data[0].description);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const Admin = jwt.decode(token);
      if (Admin.role !== "Admin") {
        localStorage.removeItem("token");
        navigate("/");
      } else {
        CallAPI();
      }
    } else {
      navigate("/");
    }
  }, []);

  let onChangeName = (e) => {
    setName(e.target.value);
  };

  let onChangeCategories = (e) => {
    setCategories(e.target.value);
  };

  let onChangeManufacturer = (e) => {
    setManufacturer(e.target.value);
  };

  let onChangeAvailableItems = (e) => {
    setAvailableItems(e.target.value);
  };

  let onChangePrice = (e) => {
    setPrice(e.target.value);
  };

  let onChangeURL = (e) => {
    setURL(e.target.value);
  };

  let onChangeDescription = (e) => {
    setDescription(e.target.value);
  };

  const modifyNotification = () => {
    toast.success("Product Modified successfully!");
  };

  let onSubmit = async (e) => {
    e.preventDefault();

    let newProduct = {
      name: Name,
      category: Categories,
      manufacturer: Manufacturer,
      availableItems: AvailableItems,
      price: Price,
      imageURL: URL,
      description: Description,
    };

    await authAxios
      .put("https://mshopbackend.herokuapp.com/api/products/" + Id, newProduct)
      .then((response) => {
        console.log(response.data);
      });

    modifyNotification();
  };

  return (
    <div className={ModifyStyle.container}>
      <Header
        addproduct={true}
        home={true}
        showAcc={false}
        showLB={true}
        showSB={true}
      />
      <div className={ModifyStyle.content}>
        <Typography component="div" className={ModifyStyle.title}>
          Modify Products
        </Typography>
        <br />
        <form onSubmit={onSubmit}>
          <TextField
            onChange={onChangeName}
            className={ModifyStyle.input}
            required
            type="text"
            InputLabelProps={{
              shrink: true,
            }}
            label="Name"
            variant="outlined"
            value={Name}
          />
          <br />
          <br />
          <TextField
            onChange={onChangeCategories}
            className={ModifyStyle.input}
            required
            type="text"
            InputLabelProps={{
              shrink: true,
            }}
            label="Categories"
            variant="outlined"
            value={Categories}
          />
          <br />
          <br />
          <TextField
            onChange={onChangeManufacturer}
            className={ModifyStyle.input}
            required
            type="text"
            InputLabelProps={{
              shrink: true,
            }}
            label="Manufacturer"
            variant="outlined"
            value={Manufacturer}
          />
          <br />
          <br />
          <TextField
            onChange={onChangeAvailableItems}
            className={ModifyStyle.input}
            required
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            label="Available items"
            variant="outlined"
            value={AvailableItems}
          />
          <br />
          <br />
          <TextField
            onChange={onChangePrice}
            className={ModifyStyle.input}
            required
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            label="Price"
            variant="outlined"
            value={Price}
          />
          <br />
          <br />
          <TextField
            onChange={onChangeURL}
            className={ModifyStyle.input}
            required
            type="text"
            InputLabelProps={{
              shrink: true,
            }}
            label="Image URL"
            variant="outlined"
            value={URL}
          />
          <br />
          <br />
          <TextField
            onChange={onChangeDescription}
            className={ModifyStyle.input}
            required
            type="text"
            InputLabelProps={{
              shrink: true,
            }}
            label="Product Description"
            variant="outlined"
            value={Description}
          />
          <br />
          <br />
          <Button
            color="primary"
            variant="contained"
            type="submit"
            className={ModifyStyle.btn}
          >
            Modify Product
          </Button>
        </form>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme="colored"
        pauseOnHover
      />
    </div>
  );
};
export default EditBox;
