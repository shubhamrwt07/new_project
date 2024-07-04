// Product.js

import React, { useEffect, useState } from 'react';
import { FaShoppingCart, FaHeart, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { FaHeartCircleCheck } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import '../../style/Product.css';
import 'animate.css';
import { fetchProductData, incrementCount, selectCategory, addToCart, likeToCart } from '../../redux/Product/action';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import config from '../../config';
import { Spinner } from 'react-bootstrap';
import { big_bachat, profile_img, slide1, slide2, slide3, slide4, slide5, slide6 } from '../../assets/image';

const Product = () => {
  const dispatch = useDispatch();
  const productData = useSelector((state) => state.product.filteredData);
  const selectedCategory = useSelector((state) => state.product.selectedCategory);
  const [addedProducts, setAddedProducts] = useState([]);

  const [products, setProducts] = useState([]);
  const [isFolded, setIsFolded] = useState(false);
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

  const toggleLike = (index, item) => {
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
  const logos = [
    {
      img: 'https://i.pinimg.com/736x/02/40/6a/02406a5d8a0015e1a78857c27acdb5f9.jpg',
      title: 'High product'
    },
    {
      img: "https://www.designevo.com/res/templates/thumb_small/shoelace-and-sneaker-shoe.webp",
      title: 'Product logo'
    },
    {
      img: "https://img.freepik.com/premium-vector/find-product-logo-design-template_145155-4160.jpg",
      title: 'Search'
    },
    {
      img: 'https://png.pngtree.com/png-clipart/20230319/original/pngtree-original-product-logo-badge-vector-desing-png-image_8995679.png',
      title: 'anything'
    },
    {
      img: 'https://png.pngtree.com/png-clipart/20210311/original/pngtree-genuine-100-percent-guarnteed-original-product-golden-insignia-(medal)-png-image_6049799.jpg',
      title: 'grocery'
    },
    {
      img: 'https://mir-s3-cdn-cf.behance.net/project_modules/disp/eecf2a34169231.56c63b7281d66.png',
      title: 'Luxliry'
    },
    {
      img: 'https://images-platform.99static.com//CdqgOqvXyAVXB64OPMeuT-EtedA=/0x0:1499x1499/fit-in/500x500/99designs-contests-attachments/143/143961/attachment_143961987',
      title: 'grocery'
    },
    {
      img: 'https://www.designevo.com/res/templates/thumb_small/green-shopping-trolley.webp',
      title: 'grocery'
    },
    {
      img: 'https://cdn.pixabay.com/photo/2015/05/22/19/01/business-779542_640.jpg',
      title: 'grocery'
    },
  ]

  const handleToggle = () => {
    setIsFolded(!isFolded);
  };

  return (
    <div className="container-fluid product-body bg-light">
      <div className="row mx-auto ">
        {logos.map((item) =>
          <div className="col bg-white mt-lg-4 text-center">
            <div className="logo">
              <img src={item.img} alt="" className='rounded-circle' style={{ height: '70px' }} />
              <h4 className='product-price'>{item.title}</h4>
            </div>
          </div>
        )}


      </div>
      <div className="row mt-lg-3">
        <div className="col-12">
          <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img src={slide1} className=" slider-img d-block w-100" alt="..." style={{ height: "48vh", objectFit: "cover" }} />
              </div>
              <div className="carousel-item">
                <img src={slide2} className=" slider-img d-block w-100" alt="..." style={{ height: "48vh", objectFit: "cover" }} />
              </div>
              <div className="carousel-item">
                <img src={slide3} className=" slider-img d-block w-100" alt="..." style={{ height: "48vh", objectFit: "cover" }} />
              </div>
              <div className="carousel-item">
                <img src={slide4} className=" slider-img d-block w-100" alt="..." style={{ height: "48vh", objectFit: "cover" }} />
              </div>
              <div className="carousel-item">
                <img src={slide5} className=" slider-img d-block w-100" alt="..." style={{ height: "48vh", objectFit: "cover" }} />
              </div>
              <div className="carousel-item">
                <img src={slide6} className=" slider-img d-block w-100" alt="..." style={{ height: "48vh", objectFit: "cover" }} />
              </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-6 text-start">
          <h4 className="mt-lg-5 me-0 fw-bold text-product-heading animate__animated animate__bounce">
            Electronics <FaShoppingCart />
          </h4>
        </div>
        <div className="col-6 d-flex justify-content-end">
          <Autocomplete
            disablePortal
            className="mt-lg-4"
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
          <div className='d-flex mb-3 justify-content-center'>
            <Spinner animation="border" className='d-flex justify-content-center' role="status">
              <span className="visually-hidden text-center">Loading...</span>
            </Spinner>
          </div>
        ) : (
          products.map((item, i) => (
            <div className="col-3 p-3" key={item._id}>
              <div className="card border border-dark py-0 p-0 rounded-3 shadow text-center" style={{ height: 'auto' }}>
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
                  <h2 className='product-name'>{item.name}</h2>
                  <p className='product-price'>Price: ${item.price}</p>
                  <span className="ms-5 mb-2 text-center" onClick={() => toggleLike(i, item)}>
                    {item.liked ? <FaHeart className="text-danger fs-5" /> : <FaHeartCircleCheck />}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="row">
        <div className="col-12">
          <h4 className="mt-lg-5 me-0 fw-bold text-product-heading animate__animated animate__bounce">
            Fashion <FaShoppingCart />
          </h4>
        </div>
        <div className='d-flex justify-content-between mb-3'>
          {isFolded && (
            <button className='btn btn-primary' onClick={handleToggle}>
              <FaArrowLeft /> Back
            </button>
          )}
          <button className='btn btn-primary' onClick={handleToggle}>
            {isFolded ? <FaArrowLeft /> : <FaArrowRight />}
          </button>
        </div>
        {products.length === 0 ? (
          <div className='d-flex mb-3 justify-content-center'>
            <Spinner animation="border" className='d-flex justify-content-center' role="status">
              <span className="visually-hidden text-center">Loading...</span>
            </Spinner>
          </div>
        ) : (
          <div className={`row ${isFolded ? 'd-none' : 'd-flex'}`}>
            {products.map((item, i) => (
              <div className="col-3 p-3" key={item._id}>
                <div className="card border border-dark py-0 p-0 rounded-3 shadow text-center" style={{ height: 'auto' }}>
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
                    <h2 className='product-name'>{item.name}</h2>
                    <p className='product-price'>Price: ${item.price}</p>
                    <span className="ms-5 mb-2 text-center" onClick={() => toggleLike(i, item)}>
                      {item.liked ? <FaHeart className="text-danger fs-5" /> : <FaHeartCircleCheck />}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
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
      <div className="row">
        <div className="col-4">
          <div className="row bg-plan-img p-lg-3">
            <div className="col-6 ">
              <h5>Name</h5>
              <div className="prodcut-content">
                <p>*Add.2000$ Off On Exch</p>
                <h3>moto name no</h3>
                <h3>undifined</h3>
              </div>
              <div className="offer d-flex flex-column">
                <img src={big_bachat} alt="" style={{ height: '70px', width: '70px' }} />
                <span className='bg-white text-dark'>1 july to 10 july</span>
              </div>
            </div>
            <div className="col-6"></div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Product;
