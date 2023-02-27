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
import { addCart, fetchProducts, searchArr } from "../redux/reduxSlice";
function Products() {
  const products = useSelector((state) => state.products.products);
  const loader = useSelector((state) => state.products.loading);
  const cartArr = useSelector((state) => state.products.cart);
  const cloneArr = useSelector((state) => state.products.clone);
  const dispatch = useDispatch();
  const [input, setInput] = useState("");
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  // console.log("pro", products);
  const addToCart = (val, id) => {
    if (cartArr.length === 0) {
      dispatch(addCart(val));
    } else {
      for (let i = 0; i < cartArr.length; i++) {
        if (cartArr[i].id === id) {
          alert("Item Already In Your Cart !");
          return;
        }
      }
      dispatch(addCart(val));
    }
  };
  console.log("CART", cartArr);
  const searchHandler = (e) => {
    let tempArr = [];
    setInput(e);
    let temp = e.toUpperCase();
    setInput(e);
    if (temp.length >= 2) {
      //    Search Data
      for (let i = 0; i < cloneArr.length; i++) {
        if (cloneArr[i].title.toUpperCase().startsWith(temp) === true) {
          tempArr.push(cloneArr[i]);
        }
      }
      dispatch(searchArr(tempArr));
    } else if (e.length === 0) {
      dispatch(searchArr(cloneArr));
    }
    console.log("TEMP ARR", tempArr);
  };
  return (
    <div>
      <br></br>
      <center>
        <div style={{ width: "50%" }}>
          <TextField
            onChange={searchHandler}
            autocomplete="off"
            placeHolder="Search..."
            type="text"
            value={input}
          />
        </div>
      </center>
      <br></br>
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
    </div>
  );
}

export default Products;
