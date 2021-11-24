import React from "react";
import Box from "@material-ui/core/Box";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { StepLabel, Card } from "@material-ui/core";
import "./stepperMenu.css";
import Item from "../items/items";
import Addaddress from "../addAdress/addAddress";
import Confirm from "../confirm/confirm";
import authAxios from "../../common/authAxios/authAxios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router";
import jwt from "jsonwebtoken";

const steps = ["Items", "Select Address", "Confirm Order"];

export default function StepperMenu() {
  const queryString = window.location.search;

  const urlParams = new URLSearchParams(queryString);

  const Id = urlParams.get("Id");

  const Quantity = urlParams.get("Quantity");

  const Navigate = useNavigate();

  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = async () => {
    console.log(activeStep);
    setActiveStep((prevActiveStep) => prevActiveStep + 1);

    if (activeStep === 2) {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
      const token = localStorage.getItem("token");
      const findUser = jwt.decode(token);
      if (findUser.role === "Admin") {
        Navigate("/notfound");
      } else {
        orderPlaced("Order placed sucessfully!");
        await callAPI();
      }
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    localStorage.removeItem("addressId");
  };

  const notify = (status) => {
    toast.error(status);
  };

  const orderPlaced = async (status) => {
    toast.success(status);
  };

  let show = (activeStep) => {
    if (activeStep === 0) {
      return <Item />;
    } else if (activeStep === 1) {
      return <Addaddress />;
    } else if (activeStep === 2) {
      const id = localStorage.getItem("addressId");
      if (id) {
        return <Confirm />;
      } else {
        setActiveStep(activeStep - 1);
        notify("Please select address!");
      }
    }
  };

  let callAPI = async () => {
    const addressId = localStorage.getItem("addressId");

    let Order = {
      product: Id,
      address: addressId,
      quantity: Quantity,
    };

    await authAxios
      .post("https://mshopbackend.herokuapp.com/api/orders", Order)
      .then((response) => {})
      .catch((err) => {
        console.log(err);
      });

    localStorage.removeItem("addressId");

    Navigate("/home");
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Card>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};

            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
      </Card>

      <div>
        <React.Fragment>
          <Typography component="div" sx={{ mt: 2, mb: 1 }}>
            {show(activeStep)}
          </Typography>
          <Box className="stepperBtn">
            <Button
              color="primary"
              variant="contained"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>

            <Button color="primary" variant="contained" onClick={handleNext}>
              {activeStep === steps.length - 1 ? "Place Order" : "Next"}
            </Button>
          </Box>
        </React.Fragment>
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
    </Box>
  );
}
