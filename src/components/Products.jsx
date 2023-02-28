import {
  Button,
  Card,
  FlexLayout,
  Loader,
  TextField,
} from "@cedcommerce/ounce-ui";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addCart,
  clearFilter,
  fetchProducts,
  filterHToLPrice,
  filterHToLRating,
  filterLToHPrice,
  filterLToHRating,
  searchArr,
} from "../redux/reduxSlice";
import fallbackImg from "../images/pnf.jpg";
function Products() {
  // Redux Products Array State
  const products = useSelector((state) => state.products.products);

  // Redux Loader State
  const loader = useSelector((state) => state.products.loading);

  // Redux Cart Array
  const cartArr = useSelector((state) => state.products.cart);

  // Redux Clone Array State
  const cloneArr = useSelector((state) => state.products.clone);

  const dispatch = useDispatch();

  // UseState for search and select box fields
  const [input, setInput] = useState("");
  const [order, setOrder] = useState("");
  const [type, setType] = useState("");

  // Flag state for check search array result is empty or not
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    // Dispath fetchProduct method on first render
    dispatch(fetchProducts());
  }, [dispatch]);

  // Add to cart handler
  const addToCart = (val, id) => {
    if (cartArr.length === 0) {
      alert("Product Added Successfully");
      dispatch(addCart(val));
    } else {
      for (let i = 0; i < cartArr.length; i++) {
        if (cartArr[i].id === id) {
          alert("Item Already In Your Cart !");
          return;
        }
      }
      alert("Product Added Successfully");
      dispatch(addCart(val));
    }
  };

  // Search Handler
  const searchHandler = (e) => {
    let tempArr = [];
    let temp = e.toUpperCase();
    setInput(e);
    if (temp.length >= 2) {
      //    Search Data
      for (let i = 0; i < cloneArr.length; i++) {
        if (cloneArr[i].title.toUpperCase().startsWith(temp) === true) {
          tempArr.push(cloneArr[i]);
          setFlag(false);
        } else {
          setFlag(true);
        }
      }
      dispatch(searchArr(tempArr));
    } else if (e.length === 0) {
      dispatch(searchArr(cloneArr));
      setFlag(false);
    }
  };

  // Filter Handler
  const filterHandler = () => {
    if (order === "Low To High" && type === "Price") {
      dispatch(filterLToHPrice());
    } else if (order === "Low To High" && type === "Rating") {
      dispatch(filterLToHRating());
    } else if (order === "High To Low" && type === "Price") {
      dispatch(filterHToLPrice());
    } else if (order === "High To Low" && type === "Rating") {
      dispatch(filterHToLRating());
    }
  };

  // Clear Filter Handler
  const clearFilterHandler = () => {
    dispatch(clearFilter());
  };

  return (
    <div>
      <br></br>
      <center>
        <Card cardType="Bordered">
          <FlexLayout halign="around" spacing="loose" valign="start">
            {/* Search Field */}
            <div style={{ width: "150%" }}>
              <TextField
                onChange={searchHandler}
                autocomplete="off"
                placeHolder="Search..."
                type="text"
                value={input}
              />
            </div>
            {/* Filers */}
            <div style={{ display: "flex" }}>
              <select
                style={{ fontSize: "16px", width: "250%", height: "2.8em" }}
                onChange={(e) => setOrder(e.target.value)}
                class="form-select me-1"
                aria-label="Default select example"
              >
                <option selected disabled>
                  --Select Order--
                </option>
                <option value="Low To High">Low To High</option>
                <option value="High To Low">High To Low</option>
              </select>
              <select
                style={{ fontSize: "16px", width: "250%" }}
                onChange={(e) => setType(e.target.value)}
                class="form-select me-1"
                aria-label="Default select example"
              >
                <option selected disabled>
                  --Select Type--
                </option>
                <option value="Price">Price</option>
                <option value="Rating">Rating</option>
              </select>
              <button
                style={{ fontSize: "16px" }}
                onClick={filterHandler}
                type="button"
                class="btn btn-dark me-1"
              >
                Filter
              </button>
              <button
                style={{ fontSize: "16px", width: "170%" }}
                onClick={clearFilterHandler}
                type="button"
                class="btn btn-dark me-1"
              >
                Clear Filter
              </button>
            </div>
          </FlexLayout>
        </Card>

        <></>
      </center>
      <br></br>
      {/* Loader and Products Display */}
      {loader === true ? (
        <Loader percentage={20} type="Loader1" />
      ) : (
        <FlexLayout halign="around" spacing="loose" valign="start">
          {products.map((val, index) => (
            <>
              <div className="productCard">
                <Card key={index} cardType="Bordered">
                  <img
                    className="productImg"
                    src={val.thumbnail}
                    alt="product img"
                  />
                  <div className="productTitle">{val.title}</div>
                  <div className="productDescription">{val.description}</div>
                  <div>
                    <span className="productPrice" style={{ float: "left" }}>
                      $&nbsp;{val.price}
                    </span>
                    <span className="productRating" style={{ float: "right" }}>
                      <i style={{ color: "yellow" }} class="fas fa-star"></i>
                      &nbsp;{val.rating}
                    </span>
                  </div>
                  <br></br>
                  <br></br>
                  <Button
                    onClick={() => addToCart(val, val.id)}
                    content="ADD TO CART"
                    length="fullBtn"
                  />
                </Card>
              </div>
            </>
          ))}
        </FlexLayout>
      )}
      {/* Fallback Image Display */}
      <div>
        <center>
          {flag === true ? (
            <img style={{ width: "50%" }} src={fallbackImg} alt="fallbackImg" />
          ) : null}
        </center>
      </div>
    </div>
  );
}

export default Products;
