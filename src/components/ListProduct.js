import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles.css";

function ListProduct() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8082/productcatalog/api/v1/listproducts")
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
  }, []);

  return (
    <>
      <div className="field-group">
        <div>
          <h3>Products</h3>

          <table className="products">
            <thead className="thead-dark">
              <tr>
                <th>Product Name</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody className="tbody">
              {products &&
                products.map(product => (
                  <tr key={product.id} className="trow">
                    <td>{product.name}</td>
                    <td>
                      {product.quantity === 0 ? "SOLD" : product.quantity}
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

export default ListProduct;
