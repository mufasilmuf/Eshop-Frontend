import React from "react";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";
import toggleStyle from "./toggle.module.css";
import authAxios from "../../common/authAxios/authAxios";
import { useEffect } from "react";

const Toggle = () => {
  const [alignment, setAlignment] = React.useState("All");
  const [categories, setCategories] = React.useState([]);

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  var i = 1;

  useEffect(() => {
    authAxios
      .get("https://mshopbackend.herokuapp.com/api/products/categories")
      .then((response) => {
        let chars = response.data;
        let uniqueChars = [...new Set(chars)];
        setCategories(uniqueChars);
      });
  }, []);

  return (
    <ToggleButtonGroup
      className={toggleStyle.toggle}
      color="primary"
      value={alignment}
      exclusive
      onChange={handleChange}
    >
      <ToggleButton value="All">All</ToggleButton>
      {categories.map((categ) => {
        return (
          <ToggleButton key={i++} value={categ}>
            {categ}
          </ToggleButton>
        );
      })}
    </ToggleButtonGroup>
  );
};
export default Toggle;
