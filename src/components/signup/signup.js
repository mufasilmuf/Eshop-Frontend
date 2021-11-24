import Box from "@material-ui/core/Box";
import LockIcon from "@material-ui/icons/LockOutlined";
import { Button, TextField } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useState } from "react";
import authAxios from "../../common/authAxios/authAxios";
import Header from "../../common/header/header";
import signUpStyles from "./signup.module.css";

const SignUp = () => {
  const [FirstName, setfirstName] = useState("");
  const [LastName, setlastName] = useState("");
  const [Email, setemail] = useState("");
  const [Password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [Number, setNumber] = useState("");
  const [success, setsuccess] = useState("");
  const [error, seterror] = useState("");

  let onChangeFirstName = (event) => {
    setfirstName(event.target.value);
  };

  let onChangeLastName = (event) => {
    setlastName(event.target.value);
  };

  let onChangeEmail = (event) => {
    let EMAIL = event.target.value.toLowerCase();
    setemail(EMAIL);
  };

  let onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  let onChangePasswordConfrom = (event) => {
    setconfirmPassword(event.target.value);
  };

  let onChangeContactNumber = (event) => {
    setNumber(event.target.value);
  };

  let onSumbit = async (event) => {
    event.preventDefault();

    let RegistornewUser = {
      email: Email,
      password: Password,
      first_name: FirstName,
      last_name: LastName,
      phone_number: Number,
    };

    await authAxios
      .post("https://mshopbackend.herokuapp.com/api/users", RegistornewUser)
      .then(async (response) => {
        setsuccess("Account Created Successfully!");
      })
      .catch((err) => {
        seterror("Entered Email is Already Registor");
      });

    setfirstName("");
    setlastName("");
    setemail("");
    setPassword("");
    setconfirmPassword("");
    setNumber("");
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
              value={FirstName}
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
              value={LastName}
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
              value={Email}
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
              value={Password}
            />
            <br />
            <br />
            <TextField
              onChange={onChangePasswordConfrom}
              required
              className={signUpStyles.Input}
              autoComplete="on"
              type="password"
              label="Confirm Password"
              variant="outlined"
              value={confirmPassword}
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
              value={Number}
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
        <div className={signUpStyles.success}>{success}</div>
        <div className={signUpStyles.error}>{error}</div>
        <Link to="/">Already have an account? Sign In</Link>
      </Box>
    </div>
  );
};
export default SignUp;
