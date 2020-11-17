import axios from "axios";
const headers = {
  "Content-Type": "application/json"
};
const headersWithUserName = {
  "Content-Type": "application/json",
  "UserName": localStorage.getItem("name")
};
const burl = process.env.REACT_APP_URL || "http://localhost:8800";
export const recipeImageUrl = `${burl}/ourrecipes/recipeimage`;

export default {
  login: function(name, password) {
    return axios.post(
      `${burl}/ourrecipes/user/login`,
      {
        name,
        password
      },
      {
        headers: headers
      }
    );
  },
  
  signup: function(send) {
    return axios.post(`${burl}/ourrecipes/user/signup`, send, { headers });
  },


  isAuth: function() {
    return localStorage.getItem("token") !== null;
  },

  logout: function() {
    localStorage.clear();
  },

  getAllRecipes() {
    return axios.get(`${burl}/ourrecipes/recipe/getall`, { headers });
  },

  createRecipe(recipe) {
    return axios.post(`${burl}/ourrecipes/recipe/create`, recipe, { headers: headersWithUserName });
  },

  uploadImage(formData) {
    const headersFile = { 'Content-Type': 'multipart/form-data' };
    return axios.post(`${burl}/ourrecipes/recipeimage/upload`, formData, { headers: headersFile });
  },
};