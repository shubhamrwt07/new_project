import axios from 'axios';
import { LOGIN_URL } from '../../helper/api/apiEndPoint';

export const loginApi = async (email, password) => {
  const response = await axios.post(LOGIN_URL, { email, password });
  return response.data;
};
