// Product.js

import React, { useEffect, useState } from 'react';
import { FaShoppingCart, FaHeart } from 'react-icons/fa';
import { FaHeartCircleCheck } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import '../../style/Product.css';
import 'animate.css';
import { fetchProductData, incrementCount, selectCategory, addToCart, likeToCart } from '../../redux/Product/action';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import config from '../../config';
import { Spinner } from 'react-bootstrap';

const Product = () => {
  const dispatch = useDispatch();
  const productData = useSelector((state) => state.product.filteredData);
  const selectedCategory = useSelector((state) => state.product.selectedCategory);
  const [addedProducts, setAddedProducts] = useState([]);

  const [products, setProducts] = useState([]);
  const [toast, setToast] = useState(false);

  useEffect(() => {
    dispatch(fetchProductData());
  }, [dispatch]);

  useEffect(() => {
    if (productData.length > 0) {
      const productsWithLikes = productData.map((product) => ({ ...product, liked: false }));
      setProducts(productsWithLikes);
    }
  }, [productData]);

  const addProductToCart = (productid) => {
    if (!addedProducts.includes(productid)) {
      setAddedProducts([...addedProducts, productid]);
      dispatch(incrementCount());
      dispatch(addToCart(productid));
    } else {
      alert('This product is already added to the cart.');
    }
  };

  const toggleLike = (index,item) => {
    setProducts((prevProducts) => {
      const updatedProducts = [...prevProducts];
      updatedProducts[index] = {
        ...updatedProducts[index],
        liked: !updatedProducts[index].liked,
      };
      return updatedProducts;
    });
    dispatch(likeToCart(item))
    setToast(true);
    setTimeout(() => setToast(false), 5000);
  };

  const categories = [
    { label: 'All', value: 'All' },
    { label: 'Electronic', value: 'Electronic' },
    { label: 'Fashion', value: 'Fashion' },
    { label: 'Grocery', value: 'Grocery' },
    { label: 'Home & Furniture', value: 'Home & Furniture' },
  ];

  const handleCategorySelect = (event, value) => {
    if (value) {
      dispatch(selectCategory(productData.categoryId));
    }
  };

  return (
    <div className="container-fluid product-body bg-light">
      <div className="row">
        <div className="col-6 text-end">
          <h1 className="mt-lg-5 me-0 fw-bold text-product-heading animate__animated animate__bounce">
            Product <FaShoppingCart />
          </h1>
        </div>
        <div className="col-6 d-flex justify-content-end">
          <Autocomplete
            disablePortal
            className="mt-lg-"
            id="combo-box-demo"
            options={categories}
            sx={{ width: 300 }}
            getOptionLabel={(option) => option.label}
            renderInput={(params) => (
              <TextField
                className="d-flex justify-content-end rounded bg-white"
                {...params}
                label="Category"
              />
            )}
            onChange={handleCategorySelect}
            value={categories.find(category => category.value === selectedCategory)}
          />
        </div>
      </div>
      <div className="row">
        {products.length === 0 ? (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        ) : (
          products.map((item, i) => (
            <div className="col-2 p-3" key={item._id}>
              <div className="card py-0 p-0 rounded-3 shadow text-center" style={{ height: 'auto' }}>
                <div className="product-body p-0">
                  {item.image && (
                    <img
                      src={`${config.IMAGE_URL}${item.image}`}
                      alt={item.name}
                      className="object-fit-cover"
                      style={{ height: '150px', width: '190px', objectFit: 'contain', cursor: 'pointer' }}
                      onClick={() => addProductToCart(item)}
                    />
                  )}
                  <h2>{item.name}</h2>
                  <p>Price: ${item.price}</p>
                  <div className="description d-flex justify-content-center">
                    <p>{item.description}</p>
                    <span className="ms-5" onClick={() => toggleLike(i,item)}>
                      {item.liked ? <FaHeart className="text-danger fs-5" /> : <FaHeartCircleCheck />}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      {toast && (
        <div className="position-fixed bottom-0 end-0 p-3" style={{ zIndex: '11' }}>
          <div id="liveToast" className="toast show" role="alert" aria-live="assertive" aria-atomic="true">
            <div className="toast-header">
              <img src="..." className="rounded me-2" alt="..." />
              <strong className="me-auto">Notification</strong>
              <small>Just now</small>
              <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div className="toast-body">You liked this product!</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;
