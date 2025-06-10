import React, { useEffect, useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState("none");

  useEffect(() => {
    axios.get("https://fakestoreapi.com/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  const handleAddToCart = (product) => {
    const existing = cart.find((item) => item.id === product.id);
    if (existing) {
      setCart(cart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    alert(`${product.title} added to cart`);
  };

  const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const getFilteredProducts = () => {
    let filtered = [...products];

    if (search) {
      filtered = filtered.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category !== "all") {
      filtered = filtered.filter((p) => p.category === category);
    }

    if (sortOrder === "asc") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "desc") {
      filtered.sort((a, b) => b.price - a.price);
    }

    return filtered;
  };

  const categories = ["all", ...new Set(products.map((p) => p.category))];

  return (
    <div className="container-fluid">
      {/* Header */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary p-3 sticky-top shadow">
        <div className="container-fluid">
          <a className="navbar-brand fw-bold fs-4">🛍️ ShopSmart</a>
          <div className="d-flex flex-wrap gap-2 w-100 justify-content-end">
            <input
              className="form-control"
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ maxWidth: "200px" }}
            />
            <select
              className="form-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={{ maxWidth: "150px" }}
            >
              {categories.map((cat, i) => (
                <option key={i} value={cat}>
                  {cat.toUpperCase()}
                </option>
              ))}
            </select>
            <select
              className="form-select"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              style={{ maxWidth: "180px" }}
            >
              <option value="none">Sort</option>
              <option value="asc">Price: Low to High</option>
              <option value="desc">Price: High to Low</option>
            </select>
            <button
              className="btn btn-warning position-relative"
              data-bs-toggle="offcanvas"
              data-bs-target="#cartDrawer"
            >
              Cart 🛒
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {cart.length}
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* Product Grid */}
      <div className="row p-4">
        {getFilteredProducts().map((product) => (
          <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4" key={product.id}>
            <div className="card h-100 shadow-sm border-0">
              <img
                src={product.image}
                alt={product.title}
                className="card-img-top p-3"
                style={{ height: "220px", objectFit: "contain" }}
              />
              <div className="card-body d-flex flex-column">
                <h6 className="card-title">{product.title}</h6>
                <p className="text-muted small">{product.category}</p>
                <h5 className="text-success">₹{product.price.toFixed(2)}</h5>
                <button
                  className="btn btn-primary mt-auto"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Offcanvas Cart */}
      <div
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="cartDrawer"
        aria-labelledby="cartDrawerLabel"
      >
        <div className="offcanvas-header bg-success text-white">
          <h5 className="offcanvas-title" id="cartDrawerLabel">🧾 Your Cart</h5>
          <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body">
          {cart.length === 0 ? (
            <p className="text-muted">Your cart is empty.</p>
          ) : (
            <>
              <ul className="list-group">
               <ul className="list-group">
  {cart.map((item) => (
    <li
      className="list-group-item d-flex justify-content-between align-items-center"
      key={item.id}
    >
      <div style={{ maxWidth: "60%" }}>
        <strong>{item.title}</strong>
        <br />
        <span className="text-muted">₹{item.price.toFixed(2)}</span>
      </div>

      <div className="d-flex align-items-center gap-2">
        <button
          className="btn btn-sm btn-outline-danger"
          onClick={() =>
            setCart((prev) =>
              prev
                .map((i) =>
                  i.id === item.id
                    ? { ...i, quantity: i.quantity - 1 }
                    : i
                )
                .filter((i) => i.quantity > 0)
            )
          }
        >
          −
        </button>

        <span>{item.quantity}</span>

        <button
          className="btn btn-sm btn-outline-success"
          onClick={() =>
            setCart((prev) =>
              prev.map((i) =>
                i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
              )
            )
          }
        >
          +
        </button>
      </div>
    </li>
  ))}
</ul>

              </ul>
              <div className="mt-3 text-end">
                <h5>Total: ₹{totalAmount.toFixed(2)}</h5>
                <button className="btn btn-success w-100 mt-2">Checkout</button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductList;