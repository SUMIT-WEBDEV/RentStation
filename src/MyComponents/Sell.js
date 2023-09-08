import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../Authentications/context/AuthContext";
import "./Sell.css";

function Sell() {
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [duration, setDuration] = useState("");
  const [fileName, setFileName] = useState([]);
  const [isValid, setIsValid] = useState(false);

  // This effect runs when 'data' changes
  // useEffect(() => {
  //   // If there is data, the form is valid
  //   setIsValid(category ? true : false);
  //   // console.log("")
  // }, [category]);

  // const [user, setUser] = useState("")

  const { user } = useContext(AuthContext);

  const userObject = user;

  useEffect(() => {
    console.log(user.email);
  }, []);

  const onChangeFile = (e) => {
    setFileName(e.target.files);
    console.log(e.target.files);
  };

  const changeOnClick = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("price", price);
    formData.append("location", location);
    formData.append("description", description);
    formData.append("title", title);
    formData.append("category", category);
    formData.append("duration", duration);
    for (let i = 0; i < fileName.length; i++) {
      formData.append("Image", fileName[i]);
    }
    // formData.append("Image", fileName);
    formData.append("userId", user._id);
    formData.append("username", user.username);

    setPrice("");
    setLocation("");
    setDescription("");
    setTitle("");
    setCategory("");
    setDuration("");
    setFileName("");
    // setUser("");

    axios
      .post("http://localhost:4000/products/add", formData)
      .then((res) => {
        // setMessage(res.data);
        console.log("added Successfully");
      })
      .catch((err) => {
        // console.log("nhi huwa");
        console.log(err);
      });
  };

  return (
    <div className="sell">
      <div className="sell__Wrapper">
        <div className="sell__Wrapper1">
          <div className="sell__Head">
            <h1>POST YOUR AD</h1>
          </div>
          <form onSubmit={changeOnClick} encType="multipart/form-data">
            <div className="form-group">
              <label htmlFor="author">Price</label>
              <br />
              <input
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="form-control"
                placeholder="price"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="author">Location</label>
              <br />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="form-control"
                placeholder="location"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="title">Description</label>
              <br />
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="form-control"
                placeholder="description"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="title">Title</label>
              <br />
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="form-control"
                placeholder="title"
                required
              />
            </div>

            {/* <div className="form-group">
              <label htmlFor="title">Duration</label>
              <br />
              <input
                type="text"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="form-control"
                placeholder="duration"
              />
            </div> */}

            <div className="form-group">
              <label htmlFor="title">Duration</label>
              <br />
              <select
                required
                className="sell__Dropdown"
                // onChange={(e) => {
                //   setSearchTerm(e.target.value);
                // }}

                onChange={(e) => setDuration(e.target.value)}
              >
                {/* {!isValid && <p>You must choose a value</p>} */}

                <option value="">--Select Duration--</option>
                <option value="1Day">1Day</option>
                <option value="1Month">1Month</option>
                <option value="1Night">1Night</option>
                <option value="1Week">1Week</option>
                <option value="1Year">1Year</option>
                <option value="1Hr">1Hr</option>
              </select>
            </div>

            {/* <div className="form-group">
              <label htmlFor="title">Duration</label>
              <br />
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="form-control"
                placeholder="category"
              />
            </div> */}

            <div className="form-group">
              <label htmlFor="title">Category</label>
              <br />
              <select
                className="sell__Dropdown"
                // onChange={(e) => {
                //   setSearchTerm(e.target.value);
                // }}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="">--Select Category--</option>
                <option value="WFH Essentials">WFH Essentials</option>
                <option value="Packeges"> Packeges</option>
                <option value="Rooms"> Rooms</option>
                <option value="Car"> Car</option>
                <option value="Bike"> Bike</option>
                <option value="Furniture">Furniture</option>
                <option value="Fitness">Fitness </option>
                <option value="Electronics"> Electronics</option>
                <option value="Appliances"> Appliances</option>
                <option value="Full Home">Full Home </option>
                <option value="Storage">Storage </option>
                <option value="Work Stations"> Work Stations</option>
                <option value="Living Room">Living Room </option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="file">Choose Product image</label>
              <br />
              <input
                type="file"
                filename="Image"
                className="for-control-file"
                onChange={onChangeFile}
                multiple
                required
              />
            </div>

            <div className="form__button">
              <button type="submit" className="button">
                Post Now
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Sell;
