import axios from "axios";

//import library AXIOS
const api = axios.create({
  baseURL: "https://blogpessoal-1rfu.onrender.com",
});

export const registerUser = async (
  url: string,
  data: object,
  setData: Function
) => {
  const response = await api.post(url, data);
  setData(response.data);
};

export const login = async (url: string, data: object, setData: Function) => {
  const response = await api.post(url, data);
  setData(response.data);
};

export const find = async (url: string, setData: Function, header: object) => {
  const response = await api.get(url, header);
  setData(response.data);
};

export const create = async (
  url: string,
  data: object,
  setData: Function,
  header: object
) => {
  const response = await api.post(url, data, header);
  setData(response.data);
};

export const update = async (
  url: string,
  data: object,
  setData: Function,
  header: object
) => {
  const response = await api.put(url, data, header);
  setData(response.data);
};

export const remove = async (url: string, header: object) => {
  await api.delete(url, header);
};
