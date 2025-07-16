import axios from 'axios';
import React from 'react';

const axiosPublic = axios.create({
    baseURL: 'https://assignment-12-server-delta-orcin.vercel.app',

});
const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;