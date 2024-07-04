// action.js
import {
  PRODUCT_LOADING,
  PRODUCT_SUCCESS,
  PRODUCT_ERROR,
  LIKE_TO_CART,
  REMOVE_LIKE_FROM_CART,
  INCREMENT_COUNT,
  SELECT_CATEGORY,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  CLEAR_CART
} from './constaint';

export const fetchProductData = () => ({
  type: PRODUCT_LOADING,
});

export const productDataData = (data) => ({
  type: PRODUCT_SUCCESS,
  payload: data,
});

export const productError = (error) => ({
  type: PRODUCT_ERROR,
  payload: { error },
});

export const likeToCart = (data) => ({
  type: LIKE_TO_CART,
  payload: data,
});

export const removeLikeFromCart = (dataId) => ({
  type: REMOVE_LIKE_FROM_CART,
  payload: dataId,
});

export const incrementCount = () => ({
  type: INCREMENT_COUNT,
});

export const selectCategory = (category) => ({
  type: SELECT_CATEGORY,
  payload: category,
});
export const addToCart = (product) => ({
  type: ADD_TO_CART,
  payload: product
});

export const removeFromCart = (productId) => ({
  type: REMOVE_FROM_CART,
  payload: productId
});

export const clearCart = () => ({
  type: CLEAR_CART
});
