import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Controller() {
  const [articleFileStatus, setArticleFileStatus] = useState("");
  const [productFileStatus, setProductFileStatus] = useState("");
  const [selectedArticleFile, setSelectedArticleFile] = useState("");
  const [selectedProductFile, setSelectedProductFile] = useState("");

  const onArticleFileUpload = () => {
    const formData = new FormData();
    if (selectedArticleFile !== "")
      formData.append("file", selectedArticleFile, selectedArticleFile.name);

    axios
      .post("http://localhost:8082/inventory/api/v1/articles", formData)
      .then(function(response) {
        setArticleFileStatus(response.data);
      })
      .catch(error => {
        console.log({
          error,
          "error status": error.response.status,
          "error response": error.response.data
        });
      });
  };

  const onProductFileUpload = () => {
    const formData = new FormData();
    if (selectedProductFile !== "")
      formData.append("file", selectedProductFile, selectedProductFile.name);

    axios
      .post("http://localhost:8082/inventory/api/v1/products", formData)
      .then(function(response) {
        setProductFileStatus(response.data);
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
      <h1>Warehouse Management</h1>
      <div className="field-group">
        <div>
          <h3>Choose the file to uplod the inventory data</h3>
          <input
            type="file"
            onChange={e => setSelectedArticleFile(e.target.files[0])}
          />
          <button onClick={onArticleFileUpload} className="button">
            Upload!
          </button>
        </div>
      </div>
      {articleFileStatus && articleFileStatus.data[0].articlesAdded && (
        <>
          <h2>{articleFileStatus.message}</h2>
        </>
      )}

      <div className="field-group">
        <div>
          <h3>Choose the file to uplod the product data</h3>
          <input
            type="file"
            onChange={e => setSelectedProductFile(e.target.files[0])}
          />
          <button onClick={onProductFileUpload} className="button">
            Upload!
          </button>
        </div>
      </div>
      {productFileStatus && productFileStatus.data[0].productsAdded && (
        <>
          <h2>{productFileStatus.message}</h2>
        </>
      )}

      <br></br>
      <div>
        <Link to="/productlist">
          Click to Get all products and quantity of each
        </Link>
      </div>
      <br></br>
      <div>
        <Link to="/sellproduct">Remove(Sell) a product</Link>
      </div>
    </>
  );
}

export default Controller;
