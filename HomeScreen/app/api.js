import axios from "axios";

const API = axios.create({
  baseURL: "http://11.20.6.234:8000",
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

export default API;