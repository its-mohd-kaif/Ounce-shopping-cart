import { Button, Card, FlexLayout, PageHeader } from "@cedcommerce/ounce-ui";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import logo from "../images/logo.png";
import CarouselComponent from "./CarouselComponent";
import Products from "./Products";
function Navbar() {
  const cartArr = useSelector((state) => state.products.cart);
  return (
    <div>
      <Card>
        <PageHeader
          action={
            <FlexLayout spacing="loose" wrap="noWrap">
              <Button onClick={function noRefCheck() {}} type="Outlined">
                Home <i class="fas fa-home"></i>
              </Button>
              <Button onClick={function noRefCheck() {}} type="Outlined">
                Help <i class="fas fa-hands-helping"></i>
              </Button>
              <Link to={"/cart"}>
                <Button onClick={function noRefCheck() {}} type="Outlined">
                  Cart <i class="fas fa-shopping-cart"></i>&nbsp;
                  {cartArr.length}
                </Button>
              </Link>
            </FlexLayout>
          }
          title={<img style={{ width: "7em" }} src={logo} alt="logo" />}
        />
      </Card>
      <CarouselComponent />
      <Products />
    </div>
  );
}

export default Navbar;
