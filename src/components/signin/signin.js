import Box from "@material-ui/core/Box";
import LockIcon from "@material-ui/icons/LockOutlined";
import { Button, TextField } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Header from "../../common/header/header";
import signInStyle from "./signin.module.css";

const SignIn = () => {
  const [Email, setEmail] = useState();
  const [Password, setPassword] = useState();
  const [Error, setError] = useState("");

  let onChangeEmail = (e) => {
    let EMAIL = e.target.value.toLowerCase();
    setEmail(EMAIL);
  };

  let onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  let onSubmit = async (e) => {
    e.preventDefault();

    let user = {
      email: Email,
      password: Password,
    };

    axios
      .post("https://mshopbackend.herokuapp.com/api/auth", user)
      .then((response) => {
        if (response.data.isAuthenticated === true) {
          localStorage.setItem("token", response.data.token);
          window.location = "/Home";
        } else {
        }
      })
      .catch((err) => {
        setError("Invalid Email or Password");
      });
  };

  return (
    <div className={signInStyle.signin}>
      <Header
        home={false}
        addproduct={false}
        showAcc={true}
        showLB={false}
        showSB={false}
      />
      <Box className={signInStyle.conntainer}>
        <div className={signInStyle.icon_items}>
          <LockIcon className={signInStyle.icon} />
          <div className={signInStyle.title}>Sign in</div>
        </div>
        <br />
        <div className={signInStyle.error}>{Error}</div>
        <form onSubmit={onSubmit}>
          <div className={signInStyle.input_filed}>
            <TextField
              required
              type="email"
              className={signInStyle.input}
              label="Email Address"
              variant="outlined"
              onChange={onChangeEmail}
            />
            <br />
            <br />
            <TextField
              required
              autoComplete="on"
              className={signInStyle.input}
              label="Password"
              type="password"
              variant="outlined"
              onChange={onChangePassword}
            />
          </div>
          <div className={signInStyle.btn}>
            <Button
              className={signInStyle.btn_signIn}
              color="primary"
              type="submit"
              variant="contained"
            >
              Sign in
            </Button>
          </div>
        </form>
        <br />
        <Link to="/signup">Don't have an account? Sign Up</Link>
      </Box>
    </div>
  );
};
export default SignIn;
