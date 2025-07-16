import axios from "axios";

const axiosSecure = axios.create({
    baseURL: "https://assignment-12-server-delta-orcin.vercel.app",
    withCredentials: true, 
});

axiosSecure.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("access-token");
        if (token) {
            config.headers.authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

const useAxiosSecure = () => {
    return axiosSecure;
};

export default useAxiosSecure;


 