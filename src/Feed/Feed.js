import React, { useContext, useEffect, useState } from "react";
import { useStateValue } from "../StateProvider";
import Axios from "axios";
import { Link } from "react-router-dom";
import { format } from "timeago.js";
import axios from "axios";
import Feedd from "./Feedd";
import Navbar from "../MyComponents/Navbar";
import "./Feed.css";
import Pagination from "./Pagination";
import LoadFeed from "./LoadFeed";
import Banner from "./Bannerr";

// import { AuthContext } from "../Authentications/context/AuthContext";

function Feed({ myAds, conversation, currentUser, feedLoad }) {
  // const { user } = useContext(AuthContext);

  const [showPerPage, setShowPerPage] = useState(6);
  // const [len, setLen] = useState(myAds.length);

  const [pagination, setPagination] = useState({
    start: 0,
    end: showPerPage,
  });

  const onPaginationChange = (start, end) => {
    setPagination({ start: start, end: end });
  };

  const locations = [
    ...new Set(
      myAds.map((item) => {
        return item.location;
      })
    ),
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [searchProduct, setSearchProduct] = useState("");
  const [searchCat, setSearchCat] = useState("");
  const [sortt, setSortt] = useState(locations);

  const [user, setUser] = useState(null);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleChangeProduct = (e) => {
    setSearchProduct(e.target.value);
  };

  const handleChangeCat = (e) => {
    setSearchCat(e.target.value);

    myAds.filter((date) => {
      return date;
    });
  };

  // useEffect(() => {
  //   setLen(myAds.length);
  // }, [myAds.length]);

  const hello = myAds
    .filter((val) => {
      if (searchTerm === "") {
        return val;
      } else if (
        val.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        val.location.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return val;
      }
    })
    .filter((vall) => {
      if (searchProduct === "") {
        return vall;
      } else if (
        vall.title.toLowerCase().includes(searchProduct.toLowerCase()) ||
        vall.location.toLowerCase().includes(searchProduct.toLowerCase())
      ) {
        return vall;
      }
    })
    .filter((v) => {
      if (searchCat === "") {
        return v;
      } else if (
        v.location.toLowerCase().includes(searchCat.toLowerCase()) ||
        v.category.toLowerCase().includes(searchCat.toLowerCase())
      ) {
        return v;
      }
    });

  // useEffect(() => {
  //  let timer = setTimeout(() => {
  //     hello
  //  }, 3000)
  // }, myAds)

  return (
    <>
      <Navbar
        searchTerm={searchTerm}
        // sortty={sortt}
        locations={locations}
        searchProduct={searchProduct}
        handleChange={handleChange}
        handleChangeProduct={handleChangeProduct}
      />
      <div className="feed__User">
        {/* {locations.map((item) => (
        <h1>{item}</h1>
      ))} */}

        <div className="feed__banner">
          <Banner />
        </div>

        <div className="feed">
          <div className="feed__Left">
            <h1>Categories</h1>
            <div className="feed__Items">
              <a href="/">All Categories</a>
              <br />
              <button onClick={handleChangeCat} value="WFH Essentials">
                WFH Essentials
              </button>
              <br />
              <button onClick={handleChangeCat} value="Packages">
                Packages
              </button>
              <br />
              <button onClick={handleChangeCat} value="Rooms">
                Rooms
              </button>
              <br />
              <button onClick={handleChangeCat} value="Car">
                Car
              </button>
              <br />
              <button onClick={handleChangeCat} value="Bike">
                Bike
              </button>
              <br />
              <button onClick={handleChangeCat} value="Furniture">
                Furniture
              </button>
              <br />
              <button onClick={handleChangeCat} value="Electronics">
                Electronics
              </button>
              <br />
              <button onClick={handleChangeCat} value="Fitness">
                Fitness
              </button>
              <br />
              <button onClick={handleChangeCat} value="Appliances">
                Appliances
              </button>
              <br />
              <button onClick={handleChangeCat} value="Full Home">
                Full Home
              </button>
              <br />
              <button onClick={handleChangeCat} value="Storage">
                Storage
              </button>
              <br />
              <button onClick={handleChangeCat} value="Work Stations">
                Work Stations
              </button>
              <br />
              <button onClick={handleChangeCat} value="Living Room">
                Living Room
              </button>
              <br />
            </div>
          </div>

          {feedLoad ? (
            <div className="feed__Right">
              {/* <h1>{hello.length}</h1> */}

              {hello.length > 0 ? (
                <>
                  {hello
                    .slice(pagination.start, pagination.end)
                    .reverse()
                    .map((myfeed, key) => (
                      <div className="feed__Myfeeds">
                        <div className="feed__Myfeedss">
                          <Feedd
                            id={myfeed._id}
                            location={myfeed.location}
                            username={myfeed.username}
                            userId={myfeed.userId}
                            price={myfeed.price}
                            createdAt={myfeed.createdAt}
                            description={myfeed.description}
                            title={myfeed.title}
                            // myAds={myAds}
                            duration={myfeed.duration}
                            category={myfeed.category}
                            Image1={`/photos/${myfeed.Image[0]} `}
                            Image2={`/photos/${myfeed.Image[1]} `}
                            Image3={`/photos/${myfeed.Image[2]} `}
                            Image4={`/photos/${myfeed.Image[3]} `}
                            Image5={`/photos/${myfeed.Image[4]} `}
                            Image6={`/photos/${myfeed.Image[5]} `}
                          />
                        </div>
                      </div>
                    ))}
                </>
              ) : (
                <div className="page404">
                  <div className="page404__Left"></div>
                  <div className="page404__Wrapper">
                    <h1>Oops!</h1>
                    <h3>404 - PAGE NOT FOUND</h3>
                    <p>
                      Try search for something more general, change the filters
                      <br />
                      or check for spelling mistakes
                    </p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="feed__Right">
              <LoadFeed />
              <LoadFeed />
              <LoadFeed />
              <LoadFeed />
              <LoadFeed />
              <LoadFeed />
            </div>
          )}
        </div>
        <Pagination
          showPerPage={showPerPage}
          onPaginationChange={onPaginationChange}
          total={myAds.length}
        />
      </div>
    </>
  );
}

export default Feed;
