import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showAllMobiles } from '../../redux/Product/action';

const Mobilepage = () => {
  const dispatch = useDispatch();
  const { filteredData, loading, error } = useSelector(state => state.product);

  useEffect(() => {
    dispatch(showAllMobiles());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div className="container-fluid mt-lg-5">
        <div className="row">
          {filteredData.map(product => (
            <div className="col-4 p-3" key={product._id}>
              <div className="row bg-plan-img p-lg-3">
                <div className="col-6">
                  <h5 className="product-name">{product.name}</h5>
                  <div className="product-content">
                    <p className="product-price text-light m-0">{product.price}</p>
                    <h3 className="product-name">{product.description}</h3>
                  </div>
                  <div className="offer d-flex flex-column">
                    <img src={product.image} alt={product.name} style={{ height: '70px', width: '100px' }} />
                    <span className="bg-white text-dark p-1 px-2" style={{ width: '100px', fontSize: '12px' }}>
                      1 July to 10 July
                    </span>
                  </div>
                </div>
                <div className="col-6">
                  <img src={product.image} className="mt-lg-5" alt={product.name} style={{ height: '150px', width: '220px' }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Mobilepage;
