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
                loader: async ({ params }) => {
                    const res = await fetch(`http://localhost:5000/product/${params.id}`);

                    if (!res.ok) {
                        throw new Response('Not Found', { status: 404 });
                    }

                    const data = await res.json();
                    return data; // useLoaderData এ যাবে
                },
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
                path: 'product/:email',
                element: <ProductList />,
                loader: ({params}) => fetch(`http://localhost:5000/productAdd?email=${params.email}`)
            },

            {
                path: 'payment/:newId',
                element: <Payment />
            },
        ]
    }
]);