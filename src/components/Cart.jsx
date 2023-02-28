import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  decrementCart,
  deleteCart,
  incrementCart,
  removeCart,
} from "../redux/reduxSlice";
// Cart Component
function CartPage() {
  //Redux State of Cart Array
  const cartArr = useSelector((state) => state.products.cart);

  const navigate = useNavigate();

  // State For Price
  const [price, setPrice] = useState(0);

  const dispatch = useDispatch();

  useEffect(() => {
    let tempPrice = 0;
    for (let i = 0; i < cartArr.length; i++) {
      tempPrice += cartArr[i].price * cartArr[i].quantity;
    }
    setPrice(tempPrice);
  }, [cartArr]);

  // Delete Item Handler
  const deleteHandler = (id) => {
    for (let i = 0; i < cartArr.length; i++) {
      if (cartArr[i].id === id) {
        let check = window.confirm("Do You Want To Remove Item !");
        if (check === true) {
          dispatch(deleteCart(cartArr[i].id));
        }
      }
    }
  };

  // Increment Quantity Handler
  const incrementHandler = (id) => {
    for (let i = 0; i < cartArr.length; i++) {
      if (cartArr[i].id === id) {
        dispatch(incrementCart(cartArr[i].id));
      }
    }
  };

  // Decrement Quantity Handler
  const decrementHandler = (id) => {
    for (let i = 0; i < cartArr.length; i++) {
      if (cartArr[i].id === id) {
        if (cartArr[i].quantity !== 1) {
          dispatch(decrementCart(cartArr[i].id));
        } else {
          let check = window.confirm("Do You Want To Remove Item !");
          if (check === true) {
            dispatch(deleteCart(cartArr[i].id));
          }
        }
      }
    }
  };

  return (
    <center>
      <section style={{ width: "80%", marginTop: "3em" }}>
        <h1>
          <i className="fas fa-shopping-bag mt-5"></i>&nbsp;My Cart
        </h1>
        {cartArr.length !== 0 ? (
          <div
            style={{ marginTop: "3em" }}
            className="d-flex justify-content-around"
          >
            <div style={{ width: "60%" }}>
              <hr></hr>
              <div style={{ textAlign: "left" }}>
                {/* Display Cart Data */}
                {cartArr.map((val) => (
                  <>
                    <div class="d-flex justify-content-around">
                      <div>
                        <img
                          style={{ width: "7em", height: "100px" }}
                          className="productImg"
                          src={val.thumbnail}
                          alt=""
                        />
                      </div>
                      <div style={{ width: "120px" }}>{val.title}</div>
                      <div style={{ width: "10px" }}>$&nbsp;{val.price}</div>
                      <div
                        style={{ fontSize: "larger" }}
                        class="d-flex justify-content-between"
                      >
                        <div>
                          <i
                            onClick={() => incrementHandler(val.id)}
                            style={{ cursor: "pointer" }}
                            class="fas fa-plus me-2"
                          ></i>
                        </div>
                        <div>{val.quantity}</div>
                        <div>
                          <i
                            onClick={() => decrementHandler(val.id)}
                            style={{ cursor: "pointer" }}
                            class="fas fa-minus ms-2"
                          ></i>
                        </div>
                      </div>
                      <div>
                        <i
                          style={{ cursor: "pointer", color: "red" }}
                          class="material-icons"
                          onClick={() => deleteHandler(val.id)}
                        >
                          delete
                        </i>
                      </div>
                    </div>
                    <hr></hr>
                  </>
                ))}
              </div>
            </div>
            <div style={{ width: "35%" }}>
              <h2>Total bill</h2>
              <table class="table">
                <tbody>
                  <tr>
                    <td>Shipping Cost</td>
                    <td>$ 0</td>
                  </tr>
                  <tr>
                    <td>Discount</td>
                    <td>$ 0</td>
                  </tr>
                  <tr>
                    <td>Estimated Total</td>
                    <td style={{ fontWeight: "bolder" }}>$ {price}</td>
                  </tr>
                </tbody>
              </table>
              <div className="d-grid gap-2 col-12 mx-auto">
                <button
                  onClick={() => {
                    alert("Checkout Successfully :)");
                    dispatch(removeCart());
                    navigate("/");
                  }}
                  className="btn btn-success"
                  type="button"
                  style={{ fontSize: "larger" }}
                >
                  <i className="fas fa-shopping-cart"></i>&nbsp;Checkout
                </button>
              </div>
            </div>
          </div>
        ) : (
          <>
            <br></br>
            <h1>Your Cart Is Empty :/</h1>
          </>
        )}
      </section>
    </center>
  );
}

export default CartPage;
