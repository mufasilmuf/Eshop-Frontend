import { Route, Routes } from "react-router-dom";
import SignIn from "./components/signin/signin";
import SignUp from "./components/signup/signup";
import AddProducts from "./pages/addProduct/addproduct";
import Details from "./pages/Details/details";
import Home from "./pages/Home/home";
import Order from "./pages/order/order";
import EditBox from "./pages/modifyproduct/modify";
import NotFound from "./pages/Not Found/notFound";

const App = () => {
  return (
    <Routes>
      <Route exact path="/" element={<SignIn />} />
      <Route exact path="/signup" element={<SignUp />} />
      <Route exact path="/Home" element={<Home />} />
      <Route exact path="/details" element={<Details />} />
      <Route exact path="/order" element={<Order />} />
      <Route exact path="/Addproduct" element={<AddProducts />} />
      <Route exact path="/modifyproducts" element={<EditBox />} />
      <Route expact path="/notfound" element={<NotFound />} />
    </Routes>
  );
};
export default App;
