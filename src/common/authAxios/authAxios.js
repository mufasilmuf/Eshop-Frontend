import axios from "axios";

const accessToken = localStorage.getItem("token");

const authAxios = axios.create({
  baseURL: "https://mshopbackend.herokuapp.com",
  headers: {
    Authorization: `${accessToken}`,
  },
});
export default authAxios;
