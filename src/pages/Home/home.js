import { useEffect } from "react";
import jwt from "jsonwebtoken";
import { useNavigate, Link } from "react-router-dom";
import Header from "../../common/header/header";
import { Card, CardMedia, CardContent, CardActions } from "@material-ui/core";
import { Button, Typography } from "@material-ui/core";
import AuthAxios from "../../common/authAxios/authAxios";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { useState } from "react";
import Toggle from "../../components/toggleBar/toggle";
import SortBox from "../../components/sortedBox/sorted";
import HomeStyle from "./home.module.css";
import Modal from "@material-ui/core/Modal";
import Box from "@material-ui/core/Box";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 330,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const Home = () => {
  const [products, setproducts] = useState([]);
  const [show, setshow] = useState(false);
  const [open, setOpen] = useState(false);
  const [DeleteId, setDeleteId] = useState();

  const handleOpen = (id) => {
    setOpen(true);
    setDeleteId(id);
  };

  const handleClose = () => setOpen(false);

  const navigate = useNavigate();

  //it call the APi....
  const callApi = async () => {
    await AuthAxios.get("/api/products").then(async (response) => {
      setproducts(await response.data);
    });
  };

  //It verify and user status....
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = jwt.decode(token);
      if (!user) {
        localStorage.removeItem("token");
        navigate("/");
      } else {
        const user = jwt.decode(token);
        if (user.role === "Admin") {
          callApi();
          setshow(true);
        } else {
          callApi();
        }
      }
    } else {
      navigate("/");
    }
  }, []);

  let handleClick = async (id) => {
    window.location = `/details?Id=${id}`;
  };

  let handleDelete = () => {
    AuthAxios.delete(
      "https://mshopbackend.herokuapp.com/api/products/" + DeleteId
    ).then((response) => {
      console.log(response.data);
    });
    handleClose();
  };

  return (
    <div className={HomeStyle.Home}>
      <Header
        addproduct={show}
        home={true}
        showAcc={false}
        showLB={true}
        showSB={true}
      />
      <Toggle />
      <SortBox />
      <div className={HomeStyle.container}>
        {products.map((product) => {
          return (
            <Card className={HomeStyle.card} key={product._id}>
              <CardMedia
                className={HomeStyle.headerImage}
                component="img"
                alt={product.name}
                image={product.imageURL}
              />
              <Typography className={HomeStyle.midContent}>
                <Typography gutterBottom variant="h5" component="div">
                  {product.name}
                </Typography>
                <Typography component="div">₹ {product.price}</Typography>
              </Typography>
              <CardContent className={HomeStyle.content}>
                <Typography variant="body2" color="text.secondary">
                  {product.description}
                </Typography>
              </CardContent>
              <CardActions key={product._id} className={HomeStyle.cardFooter}>
                <Button
                  key={product._id}
                  size="small"
                  color="primary"
                  variant="contained"
                  onClick={() => {
                    handleClick(product._id);
                  }}
                >
                  Buy
                </Button>

                {show ? (
                  <div className={HomeStyle.divIcon}>
                    <Link
                      className={HomeStyle.linkIcon}
                      to={`/modifyproducts?Id=${product._id}`}
                    >
                      <EditIcon
                        style={{ margin: "0px 20px 0px 0px" }}
                        className={HomeStyle.cardIcon}
                      />
                    </Link>
                    <DeleteIcon
                      onClick={() => {
                        handleOpen(product._id);
                      }}
                      className={HomeStyle.cardIcon}
                    />
                  </div>
                ) : null}
              </CardActions>
            </Card>
          );
        })}
      </div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Confirm deletion of product!
          </Typography>
          <br />
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Are you sure you want to delete the product?
          </Typography>
          <br />
          <Typography component="div" className={HomeStyle.deleteBtn}>
            <Button
              color="primary"
              className={HomeStyle.deleteBtn_item}
              variant="contained"
              onClick={handleDelete}
            >
              OK
            </Button>
            <Button color="primary" variant="outlined" onClick={handleClose}>
              Cancel
            </Button>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};
export default Home;
