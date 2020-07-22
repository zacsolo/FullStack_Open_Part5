import axios from 'axios';
const baseUrl = 'http://localhost:3000/api/blogs';

//initializing the token varaible with nothing
//and then creating a function which set the token
//to a "bearer" prefixed version of the props
//passed into the function
let token = null;
const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};
//Expecting to get a URL from a folder
//named /api/blogs
//Then response with all data from the blog root route.
const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};
//The create function takes in an object which would be our
//blog information we want to add the the database
//it then creates a config variable that sets the authorization
//to the value of our new token we created
const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };
  //We make an axios post request to the baseUrl endpoint
  //We add the object we want to add to the database
  //we also add the token as a header, stored in the config
  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

//In order to update a post we need to add the ID of the user
//this will be expected as a prop
//We use the ID to make a put request to the specific URL endpoint
//of the most we wish to update, followed by the object we want to add
const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then((response) => response.data);
};

const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response.data;
};

export default { getAll, create, update, setToken, remove };
