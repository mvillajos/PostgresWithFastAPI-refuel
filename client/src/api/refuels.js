import axios from "axios";

// const URL = "http://192.168.0.17:8000";
//const URL = "https://pyrefuelop-marianovs-projects.vercel.app";
// const endpoint = `${URL}/refuelop`;

const endpoint = import.meta.env.VITE_API_URLEP;

export const fetchRefuels = async () => await axios.get(endpoint);

export const fetchRefuel = async (id) => await axios.get(`${endpoint}/${id}`);

export const createRefuel = async (newRefuel) =>
  await axios.post(endpoint, newRefuel);

export const updateRefuel = async (id, updRefuel) =>
  await axios.patch(`${endpoint}/${id}`, updRefuel);

export const deleteRefuel = async (id) =>
  await axios.delete(`${endpoint}/${id}`);
