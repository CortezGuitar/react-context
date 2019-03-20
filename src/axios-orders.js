import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://context-react-bootstrap.firebaseio.com/'
});

export default instance;
