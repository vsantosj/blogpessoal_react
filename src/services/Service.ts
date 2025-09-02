import axios from "axios";

//import library AXIOS
const api = axios.create({
  baseURL: "https://blogpessoal-1rfu.onrender.com"
});

export const registerUser = async (url: string, data: Object, setData: Function) => {
  const response = await api.post(url, data);
  setData(response.data);
};

export const login = async (url: string, data: Object, setData: Function) => {
  const response = await api.post(url, data);
  setData(response.data);
};
