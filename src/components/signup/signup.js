import Box from "@material-ui/core/Box";
import LockIcon from "@material-ui/icons/LockOutlined";
import { Button, TextField } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Header from "../../common/header/header";
import signUpStyles from "./signup.module.css";

const SignUp = () => {
  const [FirstName, setfirstName] = useState();
  const [LastName, setlastName] = useState();
  const [Email, setemail] = useState();
  const [Password, setPassword] = useState();
  const [Number, setNumber] = useState();

  let onChangeFirstName = (event) => {
    setfirstName(event.target.value);
  };

  let onChangeLastName = (event) => {
    setlastName(event.target.value);
  };

  let onChangeEmail = (event) => {
    setemail(event.target.value);
  };

  let onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  let onChangeContactNumber = (event) => {
    setNumber(event.target.value);
  };

  let onSumbit = async (event) => {
    event.preventDefault();

    const RegistornewUser = {
      firstname: FirstName,
      lastname: LastName,
      email: Email,
      password: Password,
      contactnumber: Number,
    };
    console.log(RegistornewUser);
    axios
      .post("https://mshopbackend.herokuapp.com/api/users", RegistornewUser)
      .then((response) => {
        console.log(response.data);
      });

    window.location = "/";
  };

  return (
    <div className={signUpStyles.signUp}>
      <Header
        home={false}
        addproduct={false}
        showAcc={true}
        showLB={false}
        showSB={false}
      />
      <Box className={signUpStyles.Container}>
        <div className={signUpStyles.Icon_items}>
          <LockIcon className={signUpStyles.Icon} />
          <div className={signUpStyles.Title}>Sign Up</div>
        </div>
        <br />
        <form onSubmit={onSumbit}>
          <div className={signUpStyles.Input_filed}>
            <TextField
              onChange={onChangeFirstName}
              required
              type="text"
              className={signUpStyles.Input}
              label="First Name"
              variant="outlined"
            />
            <br />
            <br />
            <TextField
              onChange={onChangeLastName}
              required
              className={signUpStyles.Input}
              type="text"
              label="Last Name"
              variant="outlined"
            />
            <br />
            <br />
            <TextField
              onChange={onChangeEmail}
              required
              className={signUpStyles.Input}
              type="email"
              label="Email Address"
              variant="outlined"
            />
            <br />
            <br />
            <TextField
              onChange={onChangePassword}
              required
              autoComplete="on"
              className={signUpStyles.Input}
              type="password"
              label="Password"
              variant="outlined"
            />
            <br />
            <br />
            <TextField
              required
              className={signUpStyles.Input}
              autoComplete="on"
              type="password"
              label="Confirm Password"
              variant="outlined"
            />
            <br />
            <br />
            <TextField
              onChange={onChangeContactNumber}
              required
              className={signUpStyles.Input}
              type="number"
              label="Contact Number"
              variant="outlined"
            />
          </div>
          <div className="Btn">
            <Button
              type="submit"
              className={signUpStyles.Btn_signIn}
              color="primary"
              variant="contained"
              value="sign in"
            >
              Sign Up
            </Button>
          </div>
        </form>
        <br />
        <Link to="/">Already have an account? Sign In</Link>
      </Box>
    </div>
  );
};
export default SignUp;
