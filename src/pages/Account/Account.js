import React from 'react';
import { FaHeart } from 'react-icons/fa';
import Tooltip from '@mui/material/Tooltip';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart } from '../../redux/Product/action';

const Account = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);

  const handleRemove = (itemId) => {
    dispatch(removeFromCart(itemId));
  };

  return (
    <>
      <h1 className='mt-lg-5'>Account Page</h1>
      <h2>Selected Products:</h2>
      <div>
        {cartItems.length > 0 ? (
          cartItems.map((item, index) => (
            <div key={index} className="card mb-3">
              <div className="row g-0">
                <div className="col-md-3 col-lg-2">
                  <img src={item.image} className="img-fluid rounded-start w-50 h-50 mt-3" alt={item.title} />
                </div>
                <div className="col-md-10">
                  <div className="card-body">
                    <h5 className="card-title">{item.title}</h5>
                    <p className="card-text">{item.description}</p>
                    <p className="card-text"><small className="text-muted fw-bold">Price ${item.price}</small></p>
                    <Tooltip title="Click to remove from cart"placement='right-end' >
                      <p>
                      <FaHeart className="text-danger" style={{ cursor: "pointer" }} onClick={() => handleRemove(item.id)} />

                      </p>
                    </Tooltip>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No products selected.</p>
        )}
      </div>
    </>
  );
};

export default Account;
