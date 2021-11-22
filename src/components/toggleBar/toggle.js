import React from "react";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";
import toggleStyle from "./toggle.module.css";
import authAxios from "../../common/authAxios/authAxios";
import { useEffect } from "react";

const Toggle = (props) => {
  const [alignment, setAlignment] = React.useState("All");
  const [categories, setCategories] = React.useState([]);

  const handleChange = async (event, newAlignment) => {
    setAlignment(newAlignment);

    let Data = [];

    await authAxios
      .get("https://mshopbackend.herokuapp.com/api/products")
      .then((response) => {
        Data = response.data;
      });

    if (newAlignment === "All") {
      props.setProduct(Data);
    } else {
      let filterCategories = Data.filter((prod) => {
        return prod.category === newAlignment;
      });

      props.setProduct(filterCategories);
    }
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
    <div className={toggleStyle.toggle}>
      <ToggleButtonGroup
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
    </div>
  );
};
export default Toggle;
