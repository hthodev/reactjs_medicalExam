import axios from "../axios";

export const handleLogin = (userEmail, userPassword) => {
  return axios.post("/api/login", { email: userEmail, password: userPassword });
};

// if no id then method get Alluser,
// if else have a id then method get user by id
export const getAllUser = () => {
  return axios.get("/get-user");
};

export const createNewDoctor = (data) => {
  return axios.post("/register-doctor", data);
};

export const editAccount = (id, data) => {
  return axios.put(`/update-account?id=${id}`, data);
};

export const deleteAccount = (id) => {
  return axios.delete(`/remove-account?id=${id}`);
};
