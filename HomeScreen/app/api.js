  import axios from "axios";

  const API = axios.create({
    baseURL: "UR IP HERE:PORT",
  });


  export const predictImage = async (imageUri) => {
    const formData = new FormData();

    formData.append("file", {
      uri: imageUri,
      name: "photo.jpg",
      type: "image/jpeg",
    });

    const res = await API.post("/PredictImage", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data;
  };
  export const Login = async (email, password) => {
  const res = await API.post("/signin", {
    email,
    password,
  });

  return res.data;
};

export const Signup = async (email, password) => {
  const res = await API.post("/signup", {
    email,
    password,
  });

  return res.data;
};

  export default API;