// src/utils/auth.js
export const setToken = (token) => {
    localStorage.setItem('token', token);
};

export const getToken = () => {
    const token = localStorage.getItem('token');
  
    return token;
};

export const removeToken = () => {
    localStorage.removeItem('token');
};