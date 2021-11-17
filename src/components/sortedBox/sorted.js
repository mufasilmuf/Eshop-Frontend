import { Typography } from "@material-ui/core";
import React from "react";
import Select from "react-select";
import boxStyle from "./sorted.module.css";

const options = [
  { value: "Default", label: "Default" },
  { value: "Price: High to Low", label: "Price: High to Low" },
  { value: "Price: Low to High", label: "Price: Low to High" },
  { value: "Newest", label: "Newest" },
];

const sortBox = () => {
  return (
    <div className={boxStyle.box}>
      <Typography>Sort By:</Typography>
      <Select options={options} />
    </div>
  );
};
export default sortBox;
