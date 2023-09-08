import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Authentications/context/AuthContext";
import { useStateValue } from "../StateProvider";
import "./Ad.css";
import DeleteIcon from "@material-ui/icons/Delete";
import axios from "axios";
import AdLoad from "./AdLoad";

function Ad() {
  // const [{ user }, dispatch] = useStateValue();
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState([]);
  const [change, setChange] = useState(false);
  const [adLoad, setAdLoad] = useState(false);

  console.log(user);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/products/user/${user._id}`)
      .then((res) => {
        // setLoading(false)
        setProducts(res.data);
        setAdLoad(true);
        // console.log(res.data);
      })
      .catch((error) => console.log(error));
  }, [change]);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:4000/products/${id}`)
      .then((res) => {
        // setLoading(false)
        // setProduct(res.data);
        console.log(res.data);
        // setProduct(product.filter((elem) => elem._id !== id));
        setChange(product.filter((elem) => elem._id !== id));
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <div className="ad">
        {user ? (
          <div className="ad__User">
            <div className="ad__Header">
              <div className="hel">
                <h1>Your Ads</h1>
              </div>
            </div>
            <br />
            {adLoad ? (
              <>
                {products.map((myAd, key) => (
                  <div className="ad__MyAds">
                    <div className="ad__Wrapper">
                      <div className="ad__profile">
                        <img
                          className="ad__image"
                          src={`/photos/${myAd.Image[0]} `}
                          alt="add"
                        />
                      </div>

                      <div className="add__Title">{myAd.title}</div>
                      <div className="ad__Price">
                        <h1>₹ {myAd.price}</h1>
                        <h2>This ad is currently active</h2>
                      </div>

                      <div className="ad__Icon">
                        <DeleteIcon onClick={() => handleDelete(myAd._id)} />
                      </div>

                      {/* <h1>{user.username}</h1>
              <h1>{myAd.location}</h1>
              <h1>{myAd.description}</h1>
               */}
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <>
                <AdLoad />
                <AdLoad />
                <AdLoad />
                <AdLoad />
              </>
            )}
          </div>
        ) : (
          <h1>Please Sign up and upload your ads</h1>
        )}
      </div>
    </>
  );
}

export default Ad;
