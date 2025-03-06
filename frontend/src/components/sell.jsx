import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Button, Form, Container, Row, Col, ProgressBar } from "react-bootstrap";

const Sell = () => {
  const [step, setStep] = useState(1);
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    subcategory: "",
    brand: "",
    stock: "",
    condition: "",
    tags: "",
    weight: "",
    dimensions: "",
    discount: "",
    shipping: "",
    ratings: "",
    reviews: "",
    image: ""
  });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Product Submitted: ", product);
  };

  return (
    <Container className="sell-container d-flex justify-content-center align-items-center">
      <Row className="w-100">
        <Col md={8} lg={6} className="mx-auto">
          <Card className="sell-card">
            <Card.Body>
              <h2 className="text-center sell-title">Sell Your Product</h2>
              <ProgressBar now={(step / 4) * 100} className="mb-3" />
              <Form onSubmit={handleSubmit}>
                {step === 1 && (
                  <>
                    <Form.Group className="mb-3">
                      <Form.Label>Product Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        placeholder="Enter product name"
                        value={product.name}
                        onChange={handleChange}
                        required
                        className="sell-input"
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Description</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        name="description"
                        placeholder="Enter product description"
                        value={product.description}
                        onChange={handleChange}
                        required
                        className="sell-input"
                      />
                    </Form.Group>
                    <Button onClick={nextStep} className="sell-button">Next</Button>
                  </>
                )}
                {step === 2 && (
                  <>
                    <Form.Group className="mb-3">
                      <Form.Label>Price ($)</Form.Label>
                      <Form.Control
                        type="number"
                        name="price"
                        placeholder="Enter product price"
                        value={product.price}
                        onChange={handleChange}
                        required
                        className="sell-input"
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Category</Form.Label>
                      <Form.Control
                        type="text"
                        name="category"
                        placeholder="Enter product category"
                        value={product.category}
                        onChange={handleChange}
                        required
                        className="sell-input"
                      />
                    </Form.Group>

                    <div className="block" style={{display : "flex" , justifyContent : "space-between" , margin : '20px'}}>

                      <Button onClick={prevStep} className="me-9">Back</Button>
                      <Button onClick={nextStep} className="sell-button">Next</Button>

                    </div>
                  </>
                )}
                {step === 3 && (
                  <>
                    <Form.Group className="mb-3">
                      <Form.Label>Brand</Form.Label>
                      <Form.Control
                        type="text"
                        name="brand"
                        placeholder="Enter brand name"
                        value={product.brand}
                        onChange={handleChange}
                        required
                        className="sell-input"
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Stock Quantity</Form.Label>
                      <Form.Control
                        type="number"
                        name="stock"
                        placeholder="Enter available stock"
                        value={product.stock}
                        onChange={handleChange}
                        required
                        className="sell-input"
                      />
                    </Form.Group>

                  <div className="block" style={{display : "flex" , justifyContent : "space-between" , margin : '20px'}}>

                    <Button onClick={prevStep} className="me-9">Back</Button>
                    <Button onClick={nextStep} className="sell-button">Next</Button>
                  
                  </div>
                  
                  </>
                )}
                {step === 4 && (
                  <>
                    <Form.Group className="mb-3">
                      <Form.Label>Product Image</Form.Label>
                      <Form.Control
                        type="file"
                        name="image"
                        onChange={handleChange}
                        className="sell-input"
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Shipping Information</Form.Label>
                      <Form.Control
                        type="text"
                        name="shipping"
                        placeholder="Enter shipping details"
                        value={product.shipping}
                        onChange={handleChange}
                        className="sell-input"
                      />
                    </Form.Group>

                    <div className="block" style={{display : "flex" , justifyContent : "space-between" , margin : '20px'}}>

                      <Button onClick={prevStep} className="me-9">Back</Button>
                      <Button variant="success" type="submit" className="sell-button">Submit</Button>

                    </div>

                  </>
                )}
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Sell;
