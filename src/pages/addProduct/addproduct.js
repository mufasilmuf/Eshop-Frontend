import ADDStyle from "./addproduct.module.css";
import Header from "../../common/header/header";
import { Button, TextField, Typography } from "@material-ui/core";
import { useState } from "react";
import authAxios from "../../common/authAxios/authAxios";
import { useEffect } from "react";
import jwt from "jsonwebtoken";
import { useNavigate } from "react-router";

const AddProducts = () => {
  const [Name, setName] = useState();
  const [Categories, setCategories] = useState();
  const [Manufacturer, setManufacturer] = useState();
  const [AvailableItems, setAvailableItems] = useState();
  const [Price, setPrice] = useState();
  const [URL, setURL] = useState();
  const [Description, setDescription] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const Admin = jwt.decode(token);
      if (Admin.role !== "Admin") {
        localStorage.removeItem("token");
        navigate("/");
      } else {
        navigate("/Addproduct");
      }
    } else {
      navigate("/");
    }
  }, []);

  let onChangeName = (e) => {
    setName(e.target.value);
    console.log(e.target.value);
  };

  let onChangeCategories = (e) => {
    setCategories(e.target.value);
    console.log(e.target.value);
  };

  let onChangeManufacturer = (e) => {
    setManufacturer(e.target.value);
    console.log(e.target.value);
  };

  let onChangeAvailableItems = (e) => {
    setAvailableItems(e.target.value);
    console.log(e.target.value);
  };

  let onChangePrice = (e) => {
    setPrice(e.target.value);
    console.log(e.target.value);
  };

  let onChangeURL = (e) => {
    setURL(e.target.value);
    console.log(e.target.value);
  };

  let onChangeDescription = (e) => {
    setDescription(e.target.value);
    console.log(e.target.value);
  };

  let onSubmit = (e) => {
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

    authAxios
      .post("https://mshopbackend.herokuapp.com/api/products", newProduct)
      .then((response) => {
        console.log(response);
      });

    console.log(newProduct);
  };

  return (
    <div className={ADDStyle.container}>
      <Header
        addproduct={true}
        home={true}
        showAcc={false}
        showLB={true}
        showSB={true}
      />
      <div className={ADDStyle.content}>
        <Typography component="div" className={ADDStyle.titles}>
          Add Product
        </Typography>
        <br />
        <form onSubmit={onSubmit}>
          <TextField
            onChange={onChangeName}
            className={ADDStyle.input}
            required
            type="text"
            label="Name"
            variant="outlined"
          />
          <br />
          <br />
          <TextField
            onChange={onChangeCategories}
            className={ADDStyle.input}
            required
            type="text"
            label="Categories"
            variant="outlined"
          />
          <br />
          <br />
          <TextField
            onChange={onChangeManufacturer}
            className={ADDStyle.input}
            required
            type="text"
            label="Manufacturer"
            variant="outlined"
          />
          <br />
          <br />
          <TextField
            onChange={onChangeAvailableItems}
            className={ADDStyle.input}
            required
            type="number"
            label="Available items"
            variant="outlined"
          />
          <br />
          <br />
          <TextField
            onChange={onChangePrice}
            className={ADDStyle.input}
            required
            type="number"
            label="Price"
            variant="outlined"
          />
          <br />
          <br />
          <TextField
            onChange={onChangeURL}
            className={ADDStyle.input}
            required
            type="text"
            label="Image URL"
            variant="outlined"
          />
          <br />
          <br />
          <TextField
            onChange={onChangeDescription}
            className={ADDStyle.input}
            required
            type="text"
            label="Product Description"
            variant="outlined"
          />
          <br />
          <br />
          <Button
            color="primary"
            variant="contained"
            type="submit"
            className={ADDStyle.btn}
          >
            Save Product
          </Button>
        </form>
      </div>
    </div>
  );
};
export default AddProducts;
