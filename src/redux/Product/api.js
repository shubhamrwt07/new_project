import axios from 'axios';
import { PRODUCT_URL } from '../../helper/api/apiEndPoint';

export const productApi = async () => {
  const response = await axios.get(PRODUCT_URL);
  return response.data.response; // Ensure response.data.response contains the product data
};
