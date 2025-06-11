import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaShoppingBag, FaUber } from "react-icons/fa";
import { useNavigate } from "react-router";

const Client = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("");
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    axios.get("http://localhost:3000/product").then((res) => {
      setProducts(res.data);
      setFiltered(res.data);
    });
  }, []);

  useEffect(() => {
    let result = [...products];

    if (search) {
      result = result.filter((item) =>
        item.product_name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category !== "all") {
      result = result.filter((item) => item.category === category);
    }

    if (sort === "price-asc") {
      result.sort((a, b) => a.product_price - b.product_price);
    } else if (sort === "price-desc") {
      result.sort((a, b) => b.product_price - a.product_price);
    }

    setFiltered(result);
  }, [search, category, sort, products]);

  const handleAddToCart = (item) => {
    const exists = cart.find((product) => product.id === item.id);
    if (exists) {
      const updatedCart = cart.map((product) =>
        product.id === item.id ? { ...product, qty: product.qty + 1 } : product
      );
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...item, qty: 1 }]);
    }

    alert(`${item.product_name} added to cart!`);
  };

  const cartCount = cart.reduce((acc, item) => acc + item.qty, 0);

  const handleRemoveFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const handleQtyChange = (id, type) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
            ...item,
            qty: type === "inc" ? item.qty + 1 : Math.max(item.qty - 1, 1),
          }
          : item
      )
    );
  };

  return (
    <>
      {/* Bootstrap Offcanvas Cart */}
      <div
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="cartCanvas"
        aria-labelledby="cartCanvasLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="cartCanvasLabel">
            🛒 Your Cart
          </h5>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          {cart.length > 0 ? (
            <>
              <ul className="list-group">
                {cart.map((item) => (
                  <li
                    key={item.id}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <div>
                      <strong>{item.product_name}</strong>
                      <br />
                      ₹{item.product_price} x {item.qty}
                      <br />
                      <button
                        className="btn btn-sm btn-secondary me-1"
                        onClick={() => handleQtyChange(item.id, "dec")}
                      >
                        -
                      </button>
                      <button
                        className="btn btn-sm btn-secondary me-1"
                        onClick={() => handleQtyChange(item.id, "inc")}
                      >
                        +
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleRemoveFromCart(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                    <span>₹{item.qty * item.product_price}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-3 text-end fw-bold">
                Total: ₹
                {cart.reduce(
                  (total, item) => total + item.qty * item.product_price,
                  0
                )}
              </div>
            </>
          ) : (
            <p>Your cart is empty.</p>
          )}
        </div>
      </div>

      {/* Flipcart Header */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top mb-5 px-4">
        <a className="navbar-brand fw-bold" href="#">
          <span className="text-warning">Shop</span>cart
        </a>

        {/* Search Bar */}
        <form className="d-flex mx-auto w-50">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search for products, brands and more"
            aria-label="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="btn btn-warning" type="submit">
            Search
          </button>
        </form>

        {/* Right-side Icons */}
        <div className="d-flex align-items-center gap-3">
          {/* Login Button - triggers modal */}
          <button
            className="btn btn-outline-light d-flex align-items-center"
            data-bs-toggle="modal"
            data-bs-target="#loginModal"
          >
            <FaUber className="me-1" />
            Login
          </button>

          {/* Admin Panel Button */}
          <button
            className="btn btn-warning fw-semibold"
            onClick={() => navigate("/home")}
          >
            View Admin
          </button>

          {/* Cart Icon */}
          <div
            className="position-relative text-white"
            data-bs-toggle="offcanvas"
            data-bs-target="#cartCanvas"
            role="button"
          >
            <FaShoppingBag size={22} />
            {cartCount > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {cartCount}
              </span>
            )}
          </div>
        </div>
      </nav>

      {/* Login Modal */}
      <div
        className="modal fade"
        id="loginModal"
        tabIndex="-1"
        aria-labelledby="loginModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content bg-light">
            <div className="modal-header">
              <h5 className="modal-title" id="loginModalLabel">Login</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email address
                  </label>
                  <input type="email" className="form-control" id="email" />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input type="password" className="form-control" id="password" />
                </div>
                <button type="submit" className="btn btn-warning w-100">
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Main Section */}
      <div className="container-fluid mt-5">
        <div className="row ">
          {/* Left Sidebar - Fixed Filters */}
          <div className="col-md-3">
            <div className="position-sticky" style={{ top: '100px' }}>
              <div className="card shadow-sm p-3">
                <h5 className="mb-3">🔍 Filters</h5>

                {/* Search */}
                <div className="mb-3">
                  <label className="form-label fw-bold">Search</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search by name..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>

                {/* Category */}
                <div className="mb-3">
                  <label className="form-label fw-bold">Category</label>
                  <select
                    className="form-select"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="all">All</option>
                    <option value="Bage">Bage</option>
                    <option value="Earbuds">Earbuds</option>
                    <option value="Watch">Watch</option>
                    <option value="Goggles">Goggles</option>
                  </select>
                </div>

                {/* Sort */}
                <div className="mb-3">
                  <label className="form-label fw-bold">Sort By</label>
                  <select
                    className="form-select"
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                  >
                    <option value="">Default</option>
                    <option value="price-asc">Price Low to High</option>
                    <option value="price-desc">Price High to Low</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Right Product Grid */}
          <div className="col-md-9 mt-5">
            <div className="row">
              {filtered.length > 0 ? (
                filtered.map((item) => (
                  <div className="col-md-3 mb-4" key={item.id}>
                    <div className="card  h-100 shadow">
                      <img
                        src={item.product_image?.url}
                        className="card-img-top mt-3 "
                        alt="product"
                        style={{ height: "250px", objectFit: "cover" }}
                      />
                      <div className="card-body d-flex flex-column">
                        <h5 className="card-title">{item.product_name}</h5>
                        <p className="card-text text-truncate fw-bold">{item.description}</p>
                        <p className="mb-1 "><strong>₹{item.product_price}</strong></p>
                        <p className="mb-1"><small className="fw-bold">Brand: {item.brand}</small></p>
                        <p className="mb-1"><small className="fw-bold">Category: {item.category}</small></p>
                        <p className="mb-2 "><small className="fw-bold">Stock: {item.product_stock}</small></p>
                        <button
                          className="btn btn-warning mt-auto"
                          onClick={() => handleAddToCart(item)}
                          disabled={item.product_stock === 0}
                        >
                          {item.product_stock === 0 ? "Out of Stock" : "Add to Cart"}
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center">No products found.</p>
              )}
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default Client;