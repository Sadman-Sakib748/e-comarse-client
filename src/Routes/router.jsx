import {
    createBrowserRouter,
    RouterProvider,
} from "react-router";
import Main from "../Layouts/Main";
import Home from "../Components/Home/Home";
import Register from "../Components/Authentication/Register";
import Login from "../Components/Authentication/Login";
import Dashboard from "../Components/Pages/Dashboard/Dashboard";
import DashbordHome from "../Components/Pages/Dashboard/DashbordHome/DashbordHome";
import ProductList from "../Components/Pages/Dashboard/ProductList/ProductList";
import ErrorPage from "../Components/ErrorPage/ErrorPage";
import Products from "../Components/Pages/Products/Products";
import BrowseAll from "../Components/Pages/BrowseAll/BrowseAll";
import Payment from "../Components/Pages/Dashboard/Payment/Payment";
import PaymentHistory from "../Components/Pages/Dashboard/PaymentHistory/PaymentHistory";
import UpdateProfile from "../Components/Pages/Dashboard/UpdateProfile/UpdateProfile";
import ProductCreate from "../Components/Pages/Dashboard/ProductCreate/ProductCreate";
import MyProducts from "../Components/Pages/Dashboard/MyProducts/MyProducts";
import AllUsers from "../Components/Pages/Dashboard/Allusers/Allusers";
import VendorRoute from "./VendorRoute";



export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: 'register',
                element: <Register />
            },
            {
                path: 'BrowseAll',
                element: <BrowseAll />
            },
            {
                path: 'products/:id',
                element: <Products />,
                loader: async ({ params }) => fetch(`http://localhost:5000/products/${params.id}`)

            },

            {
                path: 'login',
                element: <Login />
            },
        ]
    },
    {
        path: 'dashboard',
        element: <Dashboard />,
        children: [
            {
                index: true,
                element: <DashbordHome />
            },
            {
                path: 'home',
                element: <DashbordHome />
            },
            {
                path: 'product',
                element: <ProductList />,
                // loader: ({params}) => fetch(``)
            },

            {
                path: 'payment/:newId',
                element: <Payment />
            },
            {
                path: 'paymentHistory',
                element: <PaymentHistory />
            },
            {
                path: 'updateProfile',
                element: <UpdateProfile />
            },
            // vendor
            {
                path: 'createProduct',
                element: <ProductCreate />
            },
            {
                path: 'myProducts',
                element: <MyProducts />
            },
            {
                path: 'allUsers',
                element: <AllUsers />
            },
        ]
    }
]);