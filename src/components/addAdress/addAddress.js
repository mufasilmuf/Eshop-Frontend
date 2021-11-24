import AddStyle from "./addAddress.module.css";
import Select from "react-select";
import { Button, TextField } from "@material-ui/core";
import { useState, useEffect } from "react";
import authAxios from "../../common/authAxios/authAxios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Addaddress = () => {
  const [address, setaddress] = useState("");
  const [value, setvalue] = useState("");

  const [Name, setName] = useState("");
  const [Number, setNumber] = useState("");
  const [Street, setStreet] = useState("");
  const [City, setCity] = useState("");
  const [State, setState] = useState("");
  const [Landmark, setLandmark] = useState("");
  const [Zipcode, setZipcode] = useState("");

  const notify = (status) => {
    toast.success(status);
  };

  useEffect(() => {
    authAxios
      .get("https://mshopbackend.herokuapp.com/api/addresses")
      .then((response) => {
        let newaddress =
          response.data.result.name + " " + response.data.result.street;
        setaddress(newaddress);
        setvalue(response.data.result?._id);
      })
      .catch((err) => {
        setaddress("");
        setvalue("");
      });
  }, []);

  let onChangeName = (e) => {
    setName(e.target.value);
  };

  let onChangeNumber = (e) => {
    setNumber(e.target.value);
  };

  let onChangeStreet = (e) => {
    setStreet(e.target.value);
  };

  let onChangeCity = (e) => {
    setCity(e.target.value);
  };

  let onChangeState = (e) => {
    setState(e.target.value);
  };

  let onChangeLandMark = (e) => {
    setLandmark(e.target.value);
  };

  let onChangeZipcode = (e) => {
    setZipcode(e.target.value);
  };

  let onSubmit = async (e) => {
    e.preventDefault();

    const Address = {
      name: Name,
      contactNumber: Number,
      street: Street,
      city: City,
      state: State,
      landmark: Landmark,
      zipCode: Zipcode,
    };

    await authAxios
      .post("https://mshopbackend.herokuapp.com/api/addresses", Address)
      .then((response) => {});

    setName("");
    setCity("");
    setNumber("");
    setStreet("");
    setCity("");
    setState("");
    setLandmark("");
    setZipcode("");

    notify("Address added successfully!");
  };

  const option = [{ value: value, label: address }];

  let handleChange = (e) => {
    let id = e.value;
    localStorage.setItem("addressId", id);
  };

  return (
    <div className={AddStyle.container}>
      <div className={AddStyle.selectBox}>
        <div>Select Address</div>
        <div className={AddStyle.Select}>
          <Select id={value} options={option} onChange={handleChange} />
        </div>
      </div>

      <h1>-OR-</h1>

      <div className={AddStyle.input_item}>
        <form onSubmit={onSubmit}>
          <h2>Add Address</h2>
          <TextField
            onChange={onChangeName}
            className={AddStyle.input}
            required
            type="text"
            value={Name}
            label="Name"
            variant="outlined"
          />
          <br />
          <br />
          <TextField
            onChange={onChangeNumber}
            className={AddStyle.input}
            required
            type="number"
            value={Number}
            label="Contact Number"
            variant="outlined"
          />
          <br />
          <br />
          <TextField
            onChange={onChangeStreet}
            className={AddStyle.input}
            required
            type="text"
            value={Street}
            label="Street"
            variant="outlined"
          />
          <br />
          <br />
          <TextField
            onChange={onChangeCity}
            className={AddStyle.input}
            required
            type="text"
            value={City}
            label="City"
            variant="outlined"
          />
          <br />
          <br />
          <TextField
            onChange={onChangeState}
            className={AddStyle.input}
            required
            type="text"
            label="State"
            value={State}
            variant="outlined"
          />
          <br />
          <br />
          <TextField
            onChange={onChangeLandMark}
            className={AddStyle.input}
            required
            type="text"
            value={Landmark}
            label="Landmark"
            variant="outlined"
          />
          <br />
          <br />
          <TextField
            onChange={onChangeZipcode}
            className={AddStyle.input}
            required
            type="number"
            value={Zipcode}
            label="Zipcode"
            variant="outlined"
          />
          <br />
          <br />
          <Button
            color="primary"
            type="submit"
            variant="contained"
            className={AddStyle.btn}
          >
            Save Address
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
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};
export default Addaddress;
