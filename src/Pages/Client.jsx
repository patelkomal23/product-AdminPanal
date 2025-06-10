import React, { useState, useEffect } from "react";
import axios from "axios";

const Client = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3000/product").then((res) => {
      setProducts(res.data);
      setFiltered(res.data);
    });
  }, []);

  useEffect(() => {
    let result = [...products];

    // Filter by search
    if (search) {
      result = result.filter((item) =>
        item.product_name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Filter by category
    if (category !== "all") {
      result = result.filter((item) => item.category === category);
    }

    // Sorting
    if (sort === "price-asc") {
      result.sort((a, b) => a.product_price - b.product_price);
    } else if (sort === "price-desc") {
      result.sort((a, b) => b.product_price - a.product_price);
    }

    setFiltered(result);
  }, [search, category, sort, products]);

  return (
    <div className="container mt-4">
      <h2 className="text-center fw-bold mb-4">Product List</h2>

      <div className="row mb-3">
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="col-md-4">
          <select
            className="form-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="all">All Categories</option>
            <option value="Electronics">Electronics</option>
            <option value="Fashion">Fashion</option>
            <option value="Sports">Sports</option>
            {/* Add more as needed */}
          </select>
        </div>

        <div className="col-md-4">
          <select
            className="form-select"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="">Sort by</option>
            <option value="price-asc">Price Low to High</option>
            <option value="price-desc">Price High to Low</option>
          </select>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="table-dark text-center">
            <tr>
              <th>#</th>
              <th>Product</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Image</th>
              <th>Description</th>
              <th>Brand</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {filtered.length > 0 ? (
              filtered.map((item, idx) => (
                <tr key={item.id}>
                  <td>{idx + 1}</td>
                  <td>{item.product_name}</td>
                  <td>₹{item.product_price}</td>
                  <td>{item.product_stock}</td>
                  <td>
                    <img
                      src={item.product_image?.url}
                      alt="product"
                      style={{ width: "60px", height: "60px", objectFit: "cover" }}
                      className="rounded"
                    />
                  </td>
                  <td>{item.description}</td>
                  <td>{item.brand}</td>
                  <td>{item.category}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8">No products found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Client;