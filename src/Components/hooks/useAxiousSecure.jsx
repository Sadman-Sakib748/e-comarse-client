import axios from 'axios';


const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000',
    // https://assignment-12-server-delta-orcin.vercel.app
});

const useAxiosSecure = () => {
    return axiosSecure;
};

export default useAxiosSecure;
