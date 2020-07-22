import axios from 'axios';
const baseUrl = 'http://localhost:3000/api/login';

//Expecting to be passed the credentials as params when called
//Get request is made at the URL endpoint for LOGINS
//Passing in the credentials as a second argument
//Backend handles validation
//If successful returns back our Token
const login = async (credentials) => {
  console.log('IN LOGIN SERVICE______', credentials);
  const request = await axios.post(baseUrl, credentials);
  return request.data;
};

export default { login };
