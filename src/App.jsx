
import React, { useEffect, useState, useRef } from "react";
import Form from "./Pages/Form";
import Datatable from "./Pages/Datatable";
import Home from "./Pages/Home";
import axios from "axios";
import './App.css'
import { Route, Router, Routes, useNavigate } from "react-router-dom";

import Client from "./Pages/Client";

const App = () => {
  const [product, setProduct] = useState({});
  const [productsData, setProductsData] = useState([]);
  const [godown, setGodown] = useState([]);
  const [editId, setEditId] = useState("");
  const imgRef = useRef();
  const [error, setError] = useState({});
  

  const navigate = useNavigate();
  const URL = "http://localhost:3000/product";

  // useEffect(() => {
  //   const oldData = JSON.parse(localStorage.getItem("productss") || "[]");
  //   setProductsData(oldData);
  // }, []);

  useEffect(() => {
    handleFetch();
  }, []);

 const handleFetch = async () => {
  try {
    const res = await axios.get(URL);
    setProductsData(Array.isArray(res.data) ? res.data : []);
    setEditId("");
    setProduct({});
  } catch (err) {
    console.error("Fetch error:", err);
  }
};

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
 if (type === "file") {
      const file = files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const product_image = {
            name: file.name,
            type: file.type,
            url: reader.result,
          };
          setProduct((prev) => ({ ...prev, product_image }));
        };
        reader.readAsDataURL(file);
      }
    } else {
      setProduct((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validation = () => {
    let errors = {};
    if (!product.product_name)
      errors.product_name = "*Product Name is required";
    if (!product.product_price)
      errors.product_price = "*Product Price is required";
    if (!product.product_stock) errors.product_stock = "*Stock is required";
   
    if (!product.description) errors.description = "*Description is required";

    setError(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validation()) return;

    if (editId === "") {
      await axios.post(URL, { ...product,id: String(Date.now()) });
    } else {
      let res = await axios.put(`${URL}/${editId}`, { ...product });
    }
    handleFetch();

    setProduct({});
    imgRef.current.value = "";

    navigate("/datatable");
  };

  const handleDelete = async (id) => {
    await axios.delete(`${URL}/${id}`);
    handleFetch();
  };

  const handleEdit = (id) => {
    let user = productsData.find((item) => item.id === id);
    if (!user) return;

    setEditId(id);
    setProduct(user);
    navigate("/form");
  };

  return (
    <>
     
      <Routes>
        {/* <Route path="/" element={<ProductList/>}/> */}
        <Route path="/home" element={<Home/>}/>
        <Route path="/" element={<Client />} />

        <Route
          path="/form"
          element={
            <Form
              handleChange={handleChange}
              product={product}
              handleSubmit={handleSubmit}
              imgRef={imgRef}
              isEdit={editId !== ""}
              error={error}
            />
          }
        />
        <Route
        path="/datatable"
        element={<Datatable
        productsData={productsData}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        />
      }
        
        />

      </Routes>
    </>
  );
};

export default App;