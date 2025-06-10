import React from "react";

import Header from "../components/Header";
import Side from "../components/Side";



const Form = ({ handleChange, product, handleSubmit, imgRef, error }) => {
  return (
    <>
      <div className="wrapper">
        {/* Sidebar */}
        <Side />
        {/* End Sidebar */}
        <div className="main-panel">
          {/* Navbar start*/}
          <Header />
          {/* Navbar end */}
          <div className="container">
            <div className="page-inner">
              <div className="page-header">
                <h3 className="fw-bold mb-3">Forms</h3>
                <ul className="breadcrumbs mb-3">
                  <li className="nav-home">
                    <a href="#">
                      <i className="icon-home" />
                    </a>
                  </li>
                  <li className="separator">
                    <i className="icon-arrow-right" />
                  </li>
                  <li className="nav-item">
                    <a href="#">Forms</a>
                  </li>
                  <li className="separator">
                    <i className="icon-arrow-right" />
                  </li>
                  <li className="nav-item">
                    <a href="#">Basic Form</a>
                  </li>
                </ul>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <form action="" method="post" onSubmit={handleSubmit}>
                    <div className="card">
                      <div className="card">
                        <div className="card-header">
                          <button className="btn btn-info end">
                            View Product Page
                          </button>
                          <div className="card-title">Form Elements</div>
                        </div>
                        
                      </div>

                      <div className="card-body">
                        <div className="row">
                          <div className="col-md-6 col-lg-4">
                            {/* Product-Name */}
                            <div className="form-group">
                              <label htmlFor="product_name" className="fw-bold">
                                Product Name{" "}
                              </label>
                              <input
                                onChange={handleChange}
                                name="product_name"
                                value={product.product_name || ""}
                                type="text"
                                className="form-control"
                                id="product_name"
                                placeholder="Enter product name"
                              />
                              {error.product_name && (
                                <span className="text-danger">
                                  {error.product_name}
                                </span>
                              )}
                            </div>
                            <div className="form-group">
                              <label
                                htmlFor="product_price"
                                className="fw-bold"
                              >
                                Product Price{" "}
                              </label>
                              <input
                                type="text"
                                name="product_price"
                                onChange={handleChange}
                                value={product.product_price || ""}
                                className="form-control"
                                id="product_price"
                                placeholder="Enter product price"
                              />
                              {error.product_price && (
                                <span className="text-danger">
                                  {error.product_price}
                                </span>
                              )}
                            </div>
                            {/*Available stock*/}
                            <div className="form-group">
                              <label
                                htmlFor="product_stock"
                                className="fw-bold"
                              >
                                Product Stock
                              </label>
                              <input
                                type="text"
                                name="product_stock"
                                onChange={handleChange}
                                value={product.product_stock || ""}
                                className="form-control"
                                id="product_stock"
                                placeholder="Enter Stock available"
                              />
                              {error.product_stock && (
                                <span className="text-danger">
                                  {error.product_stock}
                                </span>
                              )}
                            </div>
                            {/*Image */}
                            <div className="form-group">
                              <label
                                htmlFor="product_Image"
                                className="fw-bold"
                              >
                                Product Image :
                              </label>
                              <input
                                type="file"
                                ref={imgRef}
                                name="file"
                                onChange={handleChange}
                                className="form-control"
                                id="product_image"
                                placeholder="Enter product image"
                              />
                              {/* {error.file && (
                                <span className="text-danger">
                                  {error.file}
                                </span>
                              )} */}
                            </div>

                            <div className="form-group">
                              <label htmlFor="description" className="fw-bold">
                                Description{" "}
                              </label>
                              <textarea
                                onChange={handleChange}
                                name="description"
                                value={product.description || ""}
                                className="form-control"
                                id="description"
                              />
                              {error.description && (
                                <span className="text-danger">
                                  {error.description}
                                </span>
                              )}
                            </div>

                            {/* brand */}

                            <div className="form-group">
                              <label htmlFor="brand" className="fw-bold">
                                Product Brand{" "}
                              </label>
                              <input
                                type="text"
                                name="brand"
                                onChange={handleChange}
                                value={product.brand || ""}
                                className="form-control"
                                id="brand"
                                placeholder="Enter product barnd"
                              />
                            </div>
                            {/* category */}

                            <div className="form-group">
                              <label htmlFor="category" className="fw-bold">
                                Product Category{" "}
                              </label>
                              <input
                                type="text"
                                name="category"
                                onChange={handleChange}
                                value={product.category || ""}
                                className="form-control"
                                id="category"
                                placeholder="Enter product barnd"
                              />
                            </div>

                            {/* rating */}
                          </div>
                        </div>
                      </div>
                      <div className="card-action">
                        <button className="btn btn-success">Submit</button>
                        <button className="btn btn-danger">Cancel</button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <footer className="footer">
            <div className="container-fluid d-flex justify-content-between">
              <nav className="pull-left">
                <ul className="nav">
                  <li className="nav-item">
                    <a className="nav-link" href="http://www.themekita.com">
                      ThemeKita
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      {" "}
                      Help{" "}
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      {" "}
                      Licenses{" "}
                    </a>
                  </li>
                </ul>
              </nav>
              <div className="copyright">
                2024, made with <i className="fa fa-heart heart text-danger" />{" "}
                by
                <a href="http://www.themekita.com">ThemeKita</a>
              </div>
              <div>
                Distributed by
                <a target="_blank" href="https://themewagon.com/">
                  ThemeWagon
                </a>
                .
              </div>
            </div>
          </footer>
        </div>
        {/* Custom template | don't include it in your project! */}
        <div className="custom-template">
          <div className="title">Settings</div>
          <div className="custom-content">
            <div className="switcher">
              <div className="switch-block">
                <h4>Logo Header</h4>
                <div className="btnSwitch">
                  <button
                    type="button"
                    className="selected changeLogoHeaderColor"
                    data-color="dark"
                  />
                  <button
                    type="button"
                    className="selected changeLogoHeaderColor"
                    data-color="blue"
                  />
                  <button
                    type="button"
                    className="changeLogoHeaderColor"
                    data-color="purple"
                  />
                  <button
                    type="button"
                    className="changeLogoHeaderColor"
                    data-color="light-blue"
                  />
                  <button
                    type="button"
                    className="changeLogoHeaderColor"
                    data-color="green"
                  />
                  <button
                    type="button"
                    className="changeLogoHeaderColor"
                    data-color="orange"
                  />
                  <button
                    type="button"
                    className="changeLogoHeaderColor"
                    data-color="red"
                  />
                  <button
                    type="button"
                    className="changeLogoHeaderColor"
                    data-color="white"
                  />
                  <br />
                  <button
                    type="button"
                    className="changeLogoHeaderColor"
                    data-color="dark2"
                  />
                  <button
                    type="button"
                    className="changeLogoHeaderColor"
                    data-color="blue2"
                  />
                  <button
                    type="button"
                    className="changeLogoHeaderColor"
                    data-color="purple2"
                  />
                  <button
                    type="button"
                    className="changeLogoHeaderColor"
                    data-color="light-blue2"
                  />
                  <button
                    type="button"
                    className="changeLogoHeaderColor"
                    data-color="green2"
                  />
                  <button
                    type="button"
                    className="changeLogoHeaderColor"
                    data-color="orange2"
                  />
                  <button
                    type="button"
                    className="changeLogoHeaderColor"
                    data-color="red2"
                  />
                </div>
              </div>
              <div className="switch-block">
                <h4>Navbar Header</h4>
                <div className="btnSwitch">
                  <button
                    type="button"
                    className="changeTopBarColor"
                    data-color="dark"
                  />
                  <button
                    type="button"
                    className="changeTopBarColor"
                    data-color="blue"
                  />
                  <button
                    type="button"
                    className="changeTopBarColor"
                    data-color="purple"
                  />
                  <button
                    type="button"
                    className="changeTopBarColor"
                    data-color="light-blue"
                  />
                  <button
                    type="button"
                    className="changeTopBarColor"
                    data-color="green"
                  />
                  <button
                    type="button"
                    className="changeTopBarColor"
                    data-color="orange"
                  />
                  <button
                    type="button"
                    className="changeTopBarColor"
                    data-color="red"
                  />
                  <button
                    type="button"
                    className="changeTopBarColor"
                    data-color="white"
                  />
                  <br />
                  <button
                    type="button"
                    className="changeTopBarColor"
                    data-color="dark2"
                  />
                  <button
                    type="button"
                    className="selected changeTopBarColor"
                    data-color="blue2"
                  />
                  <button
                    type="button"
                    className="changeTopBarColor"
                    data-color="purple2"
                  />
                  <button
                    type="button"
                    className="changeTopBarColor"
                    data-color="light-blue2"
                  />
                  <button
                    type="button"
                    className="changeTopBarColor"
                    data-color="green2"
                  />
                  <button
                    type="button"
                    className="changeTopBarColor"
                    data-color="orange2"
                  />
                  <button
                    type="button"
                    className="changeTopBarColor"
                    data-color="red2"
                  />
                </div>
              </div>
              <div className="switch-block">
                <h4>Sidebar</h4>
                <div className="btnSwitch">
                  <button
                    type="button"
                    className="selected changeSideBarColor"
                    data-color="white"
                  />
                  <button
                    type="button"
                    className="changeSideBarColor"
                    data-color="dark"
                  />
                  <button
                    type="button"
                    className="changeSideBarColor"
                    data-color="dark2"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="custom-toggle">
            <i className="icon-settings" />
          </div>
        </div>
        {/* End Custom template */}
      </div>
    </>
  );
};

export default Form;