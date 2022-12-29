import axios from "../axios";

export const handleLogin = (userEmail, userPassword) => {
  return axios.post("/login", { email: userEmail, password: userPassword });
};

// if no id then method get Alluser,
// if else have a id then method get user by id
export const getAllCustomer = () => {
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


export const getAllDoctor = () => {
  return axios.get('getAll-doctor');
};

export const getTopDoctor = (limit) => {
  return axios.get(`getTop-doctor?limit=${limit}`);
};
export const saveDetailDoctor = (data) => {
  return axios.post(`save-info-doctor`, data)
}
export const getDetailDoctor = (id) => {
  return axios.get(`get-detail-doctor?id=${id}`)
}