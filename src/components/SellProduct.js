import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles.css";

function SellProduct() {
  const [products, setProducts] = useState([]);
  const [successResponce, setSuccessResponce] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:9001/productcatalog/api/v1/listproducts")
      .then(res => {
        setProducts(res.data.data);
      })
      .catch(error => {
        console.log({
          error,
          "error status": error.response.status,
          "error response": error.response.data
        });
      });
  }, [successResponce]);

  const sellProduct = (e, productName) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", productName);

    axios
      .put("http://localhost:8082/productcatalog/api/v1/sellproduct", {
        name: productName
      })
      .then(function(response) {
        setSuccessResponce(response.data.data[0].sold);
      })
      .catch(error => {
        console.log({
          error,
          "error status": error.response.status,
          "error response": error.response.data
        });
      });
  };

  return (
    <>
      <div className="field-group">
        <div>
          <h3>Buy Products</h3>

          <table className="products">
            <thead className="thead-dark">
              <tr>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="tbody">
              {products &&
                products !== null &&
                products !== undefined &&
                products.map(product => (
                  <tr key={product.id} className="trow">
                    <td>{product.name}</td>
                    <td>{product.quantity <= 0 ? "SOLD" : product.quantity}</td>
                    <td>
                      <button
                        onClick={e => sellProduct(e, product.name)}
                        disabled={product.quantity <= 0}
                      >
                        Sell Product
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default SellProduct;
