import axios from "axios";

const BASE_URL = "http://localhost:8080";

export const api = axios.create({
  baseURL: BASE_URL,
});

export const login = ({ username, password }) =>
  api.post("/login", {
    username,
    password,
  });

export const getVaccines = () => api.get("/vaccineWrappers");

export const getLocation = (lat, lon) =>
  axios.get(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=8a1533f1347bc4cafe1a53d87916e70d&units=metric`
  );

export const getVaccinesFromFreezers = (id) => api.get(`/${id}`);

export const getFreezers = () => api.get("/freezers");

export const getFreezersDanger = () => api.get("/freezerDangers");

export const getFreezersWarning = () => api.get("/freezerWarnings");

export const getManagers = () => api.get("/managers");

export default api;
