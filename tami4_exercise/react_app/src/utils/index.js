import axios from 'axios';

export const setAuthToken = token => {
    if(token){
        axios.defaults.headers.common['Authorization'] = token;
    }else{
        delete axios.defaults.headers.common['Authorization'];
    }
}

export const setTokenToStorage = (token) => {
    localStorage.setItem('token', token);
}

export const getTokenFromStorage = () => {
    return localStorage.getItem('token');
}

export const clearToken = () => {
    return localStorage.removeItem('token');
}