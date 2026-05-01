  import axios from "axios";

  const API = axios.create({
    //change to your own url to use
    baseURL: "https://nontropical-francina-morbifically.ngrok-free.dev",
  });

  //login endpoint
  export const Login = async (email, password) => {
  const res = await API.post("/signin", {
    email,
    password,
  });

  return res.data;
};
//signup endpoint
export const Signup = async (email, password, username) => {
  const res = await API.post("/signup", {
    email,
    password,
    username,
  });

  return res.data;
};
//upload enpoint
export const uploadPhoto = async (imageUri, Latitude, Longitude, token) => {
  const formData = new FormData();
  formData.append("file", {
    uri: imageUri,
    name: "photo.jpg",
    type: "image/jpeg",
  });

  const res = await API.post(
    `/upload?lat=${Latitude}&lng=${Longitude}`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return res.data;
};
//get user photo endpoint
export const getPhotos = async (token) => {
  const res = await API.get("/get_photos", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

//get summary
export const getSummary = async (birdName, token) => {
  const res = await API.get("/get_summary", {
    params: { bird_name: birdName },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

//get bird image, from wiki
export const getImage = async (birdName, token) => {
  const res = await API.get("/get_image", {
    params: { bird_name: birdName },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

//get map
export const getMap = async (birdName, token) => {
  const res = await API.get("/get_map", {
    params: { bird_name: birdName },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

//gets all birds and if they are caught
export const getCaughtBirds = async (token) => {
  const res = await API.get("/get_caught_birds", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const getPoints = async (token) => {
  const res = await API.get("/get_points", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

// get wikipedia link
export const getWiki = async (birdName, token) => {
  const res = await API.get("/get_wiki", {
    params: { bird_name: birdName },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

  export default API;