// reducer.js
import {
  PRODUCT_LOADING,
  PRODUCT_SUCCESS,
  PRODUCT_ERROR,
  LIKE_TO_CART,
  REMOVE_LIKE_FROM_CART,
  INCREMENT_COUNT,
  SELECT_CATEGORY,
  REMOVE_FROM_CART,
  CLEAR_CART,
  ADD_TO_CART,
  SHOW_ALL_MOBILES
} from './constaint';

const initialState = {
  data: [],
  filteredData: [],
  selectedCategory: 'All',
  loading: false,
  error: null,
};

const initialStateCount = {
  count: 0,
};

const LIKE_TO_CART_initialState = {
  items: [],
};
const initialCartState = {
  carts: JSON.parse(localStorage.getItem('cartItems')) || [],
};

export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case PRODUCT_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case PRODUCT_SUCCESS:
      return {
        ...state,
        data: action.payload,
        filteredData: action.payload,
        loading: false,
        error: null,
      };
    case PRODUCT_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case SELECT_CATEGORY:
      const filteredData = action.payload === 'All'
        ? state.data
        : state.data.filter(product => product.category === action.payload);
      return {
        ...state,
        selectedCategory: action.payload,
        filteredData,
      };
      case SHOW_ALL_MOBILES:
        const mobileData = state.data.filter(product => product.category === 'Mobile');
        return {
          ...state,
          selectedCategory: 'Mobile',
          filteredData: mobileData,
        };
    default:
      return state;
  }
  
};

export const countReducer = (state = initialStateCount, action) => {
  switch (action.type) {
    case INCREMENT_COUNT:
      return {
        ...state,
        count: state.count + 1,
      };
    default:
      return state;
  }
};

export const cartLikeReducer = (state = LIKE_TO_CART_initialState, action) => {
  switch (action.type) {
    case LIKE_TO_CART:
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    case REMOVE_LIKE_FROM_CART:
      return {
        ...state,
        items: state.items.filter(item => item._id !== action.payload),
      };
    default:
      return state;
  }
};
export const cartAddReducer = (state = initialCartState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const updatedCarts = [...state.carts, action.payload];
      localStorage.setItem('cartItems', JSON.stringify(updatedCarts));
      return {
        ...state,
        carts: updatedCarts,
      };
    case REMOVE_FROM_CART:
      const filteredCarts = state.carts.filter(item => item._id !== action.payload._id);
      localStorage.setItem('cartItems', JSON.stringify(filteredCarts)); // Save to localStorage
      return {
        ...state,
        carts: filteredCarts,
      };
    default:
      return state;
  }
};