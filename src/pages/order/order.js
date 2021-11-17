import Header from "../../common/header/header";
import StepperMenu from "../../components/stepperMenu/stepperMenu";
import "./order.css";
import { useNavigate } from "react-router";
import jwt from "jsonwebtoken";
import { useEffect } from "react";

var Order = () => {
  const navigator = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = jwt.decode(token);
      if (user.role === "user") {
      } else {
        navigator("/notfound");
      }
    } else {
      navigator("/");
    }
  }, []);

  return (
    <div>
      <Header home={true} showAcc={false} showLB={true} showSB={true} />
      <div className="Menu">
        <StepperMenu />
      </div>
    </div>
  );
};
export default Order;
