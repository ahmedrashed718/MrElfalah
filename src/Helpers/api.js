import axios from 'axios';
import {BASE_URL} from '../../.env.json';

// console.log(BASE_URL)
export default axios.create({
  BASE_URL,
  //   timeout: 30000,
});
