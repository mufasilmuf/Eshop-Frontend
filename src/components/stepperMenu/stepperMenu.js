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

const steps = ["Items", "Select Address", "Confirm Order"];

export default function StepperMenu() {
  const queryString = window.location.search;

  const urlParams = new URLSearchParams(queryString);

  const Id = urlParams.get("Id");

  const Quantity = urlParams.get("Quantity");

  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  let show = (activeStep) => {
    if (activeStep === 0) {
      return <Item />;
    } else if (activeStep === 1) {
      return <Addaddress />;
    } else if (activeStep === 2) {
      return <Confirm />;
    }
  };

  let callAPI = async () => {
    debugger;
    const addressId = sessionStorage.getItem("address");

    console.log(addressId);

    let Order = {
      product: Id,
      address: addressId,
      quantity: Quantity,
    };

    await authAxios
      .post("https://mshopbackend.herokuapp.com/api/orders", Order)
      .then((response) => {
        console.log(Id);
        console.log(addressId);
        console.log(Quantity);
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let placeOrder = (place) => {
    debugger;
    callAPI();
    let go = place;
    window.location = go;
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Card>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};

            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
      </Card>

      {activeStep === steps.length ? (
        <div>{placeOrder("Home")}</div>
      ) : (
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
      )}
    </Box>
  );
}
