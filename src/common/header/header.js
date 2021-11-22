import { Box, Button, OutlinedInput, Typography } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import Logo from "@material-ui/icons/ShoppingCart";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import HeaderStyle from "./header.module.css";
import authAxios from "../authAxios/authAxios";

const Header = (props) => {
  const Navigate = useNavigate();

  let handlelogout = () => {
    localStorage.removeItem("token");
    Navigate("/");
  };

  let SearchItem = "";

  const handleChangle = (e) => {
    debugger;
    SearchItem = e.target.value;
    let product = props.Product;

    if (SearchItem == "") {
      authAxios.get("/api/products").then((response) => {
        props.setProduct(response.data);
      });
    } else {
      const SearchProduct = product.filter((prod) => {
        return prod.name.toLowerCase().indexOf(SearchItem.toLowerCase()) >= 0;
      });
      props.setProduct(SearchProduct);
    }
  };

  return (
    <Box className={HeaderStyle.Header}>
      <div className={HeaderStyle.Logo}>
        <Logo className={HeaderStyle.logo_icon} />
        <Typography className={HeaderStyle.logo_text}>upGard E-Shop</Typography>
      </div>

      {props.showSB ? (
        <div className={HeaderStyle.search_box}>
          <SearchIcon className={HeaderStyle.search_icon} />
          <OutlinedInput
            className={HeaderStyle.search_input}
            placeholder="Search.."
            onChange={handleChangle}
          ></OutlinedInput>
        </div>
      ) : null}

      <div className={HeaderStyle.btn_group}>
        {props.showAcc ? (
          <Link to="/" className={HeaderStyle.link}>
            Login
          </Link>
        ) : null}
        {props.showAcc ? (
          <Link to="/signup" className={HeaderStyle.link}>
            Sign Up
          </Link>
        ) : null}
        {props.home ? (
          <Link to="/Home" className={HeaderStyle.link}>
            Home
          </Link>
        ) : null}
        {props.addproduct ? (
          <Link to="/Addproduct" className={HeaderStyle.link}>
            Add Product
          </Link>
        ) : null}
        {props.showLB ? (
          <Button color="secondary" variant="contained" onClick={handlelogout}>
            LOGOUT
          </Button>
        ) : null}
      </div>
    </Box>
  );
};
export default Header;
