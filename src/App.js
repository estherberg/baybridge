import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBListGroup,
  MDBListGroupItem,
  MDBRipple,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import data from "./data.json";

export default function App() {
  const [products, setProducts] = useState(data);
  console.log("products", products);

  const [sum, setSum] = useState(0);

  useEffect(() => {
    let sumOfProducts = 0;
    for (let item of products) {
      sumOfProducts = sumOfProducts + item.price * item.quantity;
    }
    if (products.length < 4) {
      setSum(sumOfProducts + 15);
    }
    if (products.length >= 4) {
      setSum(sumOfProducts + 30);
    }
  }, [products]);

  useEffect(
    (item) => {
      setProducts((ps) =>
        ps.map((item2) => {
          return {
            ...item2,
            priceForAll: item2.quantity * item2.price,
          };
        })
      );
    },
    [products]
  );

  return (
    <section className="h-100 gradient-custom">
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center my-4">
          {/* SUMMARY */}
          <MDBCol md="4">
            <MDBCard className="mb-4">
              <MDBCardHeader>
                <MDBTypography tag="h5" className="mb-0">
                  Summary
                </MDBTypography>
              </MDBCardHeader>
              <MDBCardBody>
                <MDBListGroup flush>
                  {/* <MDBListGroupItem className="d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                    Products
                    <span>$53.98</span>
                  </MDBListGroupItem> */}

                  <MDBListGroupItem
                    className="justify-content-between align-items-center"
                    style={{ minWidth: "22rem" }}
                    light
                    small
                  >
                    {products.map((item) => (
                      <div className={"d-flex justify-content-between mb-2"}>
                        {" "}
                        <span className={"item_title"}>
                          {" "}
                          {item.product}:
                        </span>{" "}
                        {item.priceForAll} ${" "}
                      </div>
                    ))}
                  </MDBListGroupItem>

                  <MDBListGroupItem className="d-flex  justify-content-between align-items-center px-10">
                    Shipping Value:
                    {products.length < 4 && (
                      <div>
                        {" "}
                        <span className={"item_title"}></span>15$
                      </div>
                    )}
                    {products.length >= 4 && (
                      <div>
                        {" "}
                        <span className={"item_title"}></span>30$
                      </div>
                    )}
                  </MDBListGroupItem>

                  <MDBListGroupItem className="d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                    <div>
                      <strong>Total amount</strong>
                      <strong>
                        <p className="mb-0">(including VAT)</p>
                      </strong>
                    </div>
                    <span>
                      <strong>
                        {" "}
                        <div>
                          {" "}
                          <span className={"item_title"}></span>
                          {sum} $
                        </div>
                      </strong>
                    </span>
                  </MDBListGroupItem>
                </MDBListGroup>

                <MDBBtn
                  block
                  size="lg"
                >
                  Save
                </MDBBtn>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>

          {/* Shopping cart */}

          <MDBCol md="8">
            <MDBCard className="mb-4">
              <MDBCardHeader className="py-3">
                <MDBTypography tag="h5" className="mb-0">
                  Shopping Cart - Esther Elbaz
                </MDBTypography>
              </MDBCardHeader>
              <MDBCardBody>
                {/* Product  */}
                {products.map((item) => (
                  <div className={"MDBRow"}>
                    <MDBRow className="d-flex justify-content-space-between align-items-center">
                      <MDBCol lg="3" md="12" className="mb-4 mb-lg-0">
                        <MDBRipple
                          rippleTag="div"
                          rippleColor="light"
                          className="bg-image rounded hover-zoom hover-overlay"
                        >
                          <img src={item.Link} className="w-100" alt="" />

                          <a href="#!">
                            <div
                              className="mask"
                              style={{
                                backgroundColor: "rgba(251, 251, 251, 0.2)",
                              }}
                            ></div>
                          </a>
                        </MDBRipple>
                      </MDBCol>

                      <MDBCol lg="5" md="6" className=" mb-4 mb-lg-0">
                        <p>
                          <strong>
                            <div className={"item"}>
                              <span className={"item_title"}>Product:</span>{" "}
                              {item.product}{" "}
                            </div>
                          </strong>
                        </p>

                        <MDBBtn
                          onClick={() => {
                            setProducts((ps) =>
                              ps.filter(
                                (item2) => item2.product !== item.product
                              )
                            );
                          }}
                          wrapperProps={{ size: "sm" }}
                          wrapperClass="me-1 mb-2"
                          title="Remove item"
                        >
                          <MDBIcon fas icon="trash" color="danger" />
                        </MDBBtn>
                      </MDBCol>

                      <MDBCol lg="4" md="6" className="mb-4 mb-lg-0">
                        <div
                          className="d-flex mb-4"
                          style={{ maxWidth: "300px" }}
                        >
                          <MDBBtn
                            className="px-3 me-2"
                            onClick={() => {
                              setProducts((ps) =>
                                ps.map((item2) => {
                                  if (item2.product === item.product) {
                                    return {
                                      ...item2,
                                      quantity: item2.quantity - 1,
                                    };
                                  } else {
                                    return item2;
                                  }
                                })
                              );
                            }}
                          >
                            <MDBIcon fas icon="minus" />
                          </MDBBtn>

                          <MDBInput
                            value={item.quantity}
                            type="number"
                            min={0}
                            label="Quantity"
                          />

                          <MDBBtn
                            className="px-3 ms-2"
                            onClick={() => {
                              setProducts((ps) =>
                                ps.map((item2) => {
                                  if (item2.product === item.product) {
                                    return {
                                      ...item2,
                                      quantity: item2.quantity + 1,
                                    };
                                  } else {
                                    return item2;
                                  }
                                })
                              );
                            }}
                            id="quantity"
                          >
                            <MDBIcon fas icon="plus" />
                          </MDBBtn>
                        </div>

                        <p className="text-start text-md-center">
                          <strong>{item.price}$</strong>
                        </p>
                      </MDBCol>
                    </MDBRow>
                  </div>
                ))}
                <hr className="my-4" />
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}
