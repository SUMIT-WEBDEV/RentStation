import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Navbar from "../MyComponents/Navbar";
import "./feddd.css";
import { format } from "timeago.js";
import { AuthContext } from "../Authentications/context/AuthContext";
import { useStateValue } from "../StateProvider";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

function Feeddd(props) {
  const { user } = useContext(AuthContext);
  const history = useHistory();

  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [userId, setUserId] = useState("");
  const [username, setUsername] = useState("");
  const [image, setImage] = useState("");
  const [desc, setDesc] = useState("");
  const [duration, setDuration] = useState("");
  const [time, setTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [chatId, setChatId] = useState(null);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/products/${props.match.params.id}`)
      .then((res) => [
        setTitle(res.data.title),
        setLocation(res.data.location),
        setPrice(res.data.price),
        setImage(res.data.Image),
        setUserId(res.data.userId),
        setUsername(res.data.username),
        setDesc(res.data.description),
        setDuration(res.data.duration),
        setTime(res.data.createdAt),
        setLoading(true),
      ])
      .catch((error) => console.log(error));
  });

  //   console.log(props.match.params.id);

  // const [{ box }, dispatch] = useStateValue();

  // console.log("add to boxxxxxxxxxxxx>>>>", box);

  const handleSub = async (e) => {
    // e.preventDefault();
    const message = {
      senderId: user?._id,
      receiverId: userId,
    };

    try {
      const res = await axios.post(
        "http://localhost:4000/conversations",
        message
      );
      // setMessages([...messages, res.data]);
      // console.log(res);
      setChatId(res.data);
      console.log(res.data);

      // hekk = res.data
      // addToBox();
      history.push(`/chat/chat1/${res.data}`);

      // setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  // const addToBox = () => {
  //   alert("Recipe Added Successfully!");
  //   // dispatch the item into the data layer
  //   dispatch({
  //     type: "ADD_TO_BOX",
  //     item: {
  //       chatId: title,
  //     },
  //   });
  // };

  const length = image.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  // if (!Array.isArray(image) || image.length <= 0) {
  //   return null;
  // }

  return (
    <div>
      <Navbar />

      {loading ? (
        <>
          <div className="feddd">
            <div className="feddd__Wrapper">
              <div className="feddd__Left">
                {/* <FaArrowAltCircleLeft
                  className="left-arrow"
                  onClick={prevSlide}
                />
                <FaArrowAltCircleRight
                  className="right-arrow"
                  onClick={nextSlide}
                /> */}

                <div className="slider">
                  {/* <div></div> */}
                  {image.map((imgg, index) => (
                    <div
                      className={index === current ? "slide active" : "slide"}
                      key={index}
                    >
                      <div className="slider__Arrow">
                        <div className="left-arrow" onClick={prevSlide}>
                          {/* left */}
                          <ArrowBackIosIcon
                            style={{
                              height: "40px",
                              width: "40px",
                              color: "rgb(96, 95, 95)",
                            }}
                          />
                        </div>

                        <div className="right-arrow" onClick={nextSlide}>
                          {/* Right */}
                          <ArrowForwardIosIcon
                            style={{
                              height: "40px",
                              width: "40px",
                              color: "rgb(96, 95, 95)",
                            }}
                          />
                        </div>
                      </div>
                      {index === current && (
                        <img
                          className="feddd__img"
                          src={`/photos/${imgg}`}
                          alt="img"
                        />
                      )}
                    </div>
                  ))}
                </div>

                {/* <img
                  className="feddd__img"
                  src={`/photos/${image[2]}`}
                  alt="img"
                /> */}

                <div className="feddd__Desc">
                  <h3>Description</h3>
                  <p>{desc}</p>
                </div>
              </div>

              <div className="feddd__Right">
                {/* <div>
              <Link to={{ pathname: `/chat/chat1/${userId}` }}>
                <h1>{username}</h1>
              </Link>
            </div> */}
                <div className="feddd__Price">
                  <h1>
                    ₹ {price} /{duration}
                  </h1>
                  <h2>{title}</h2>
                  <div className="price__Bottom">
                    <div>{location}</div>
                    <div>{format(time)}</div>
                  </div>
                </div>
                <div className="feddd__Seller">
                  {/* <h1>{userId}</h1> */}
                  <h1>Renter Description</h1>
                  <div className="seller__Profile">
                    <img
                      className="profile__Pic"
                      src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                    />
                    <div className="seller__Name">{username}</div>
                  </div>
                  {user?._id === userId ? (
                    <Link to="/"></Link>
                  ) : (
                    <div className="seller__Chat">
                      <Link
                        // to={{ pathname: `/chat/chat1/${userId}` }}
                        onClick={handleSub}
                      >
                        <h1>Chat with Renter</h1>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="feddd">
          <div className="feddd__Wrapper">
            <div className="feddd__Left">
              {/* <img className="feddd__img" src={`/photos/${image}`} alt="img" /> */}
              <div className="load__Img"></div>
              <div className="load__Desc">
                <h3 className="load_D1">Description</h3>
                <p className="load_D2">Description</p>
              </div>
            </div>

            <div className="feddd__Right">
              <div className="load__Price">
                <h1 className="load_P1">price</h1>
                <h2 className="load_T1">Title</h2>
                <div className="price__Bottom">
                  <div className="load_L1">loacation</div>
                  <div className="load_L1">Time</div>
                </div>
              </div>
              <div className="load__Seller">
                {/* <h1>{userId}</h1> */}
                <h1>Renter Description</h1>
                <div className="load__Profile">
                  <div className="load__Pic"></div>
                  {/* <img
                    className="profile__Pic"
                    src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                  /> */}
                  <div className="load__Name">Username</div>
                </div>
                <div className="loader__Chat">
                  {/* <Link to={{ pathname: `/chat/chat1/${userId}` }}> */}
                  <button>Chat with Renter</button>
                  {/* </Link> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Feeddd;
