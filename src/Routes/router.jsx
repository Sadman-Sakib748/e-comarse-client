import {
    createBrowserRouter,
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
import PrivateRoute from "./PrivateRoute";
import Offer from "../Components/Pages/Offer/Offer";
import HelpCenter from "../Components/Pages/Footer/HelpCenter";
import PrivacyPolicy from "../Components/Pages/Footer/PrivacyPolicy";
import TermsConditions from "../Components/Pages/Footer/TermsConditions";
import Contact from "../Components/Pages/Footer/Contact";
import VendorRoute from "./VendorRoute";
import AdminRoute from "./AdminRoute";
import VenAddAdvertisement from "../Components/Pages/Dashboard/VenAddAdvertisement/VenAddAdvertisement";
import MyAdvertisements from "../Components/Pages/Dashboard/VenAddAdvertisement/MyAdvertisements/MyAdvertisements";
import Advertisements from "../Components/Pages/Advertisements/Advertisements";
import AdvertisementDetails from "../Components/Pages/AdvertisementDetails/AdvertisementDetails";
import Markets from "../Components/Pages/Markets/Markets";
import AllOrder from "../Components/Pages/Dashboard/AllOrder/AllOrder";
import AdminAllProducts from "../Components/Pages/Dashboard/AdminAllProducts/AdminAllProducts";



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
                path: 'markets',
                element: <Markets />
            },
            {
                path: "/advertisement/:id",
                element: <AdvertisementDetails />
            },
            {
                path: 'helpCenter',
                element: <HelpCenter />
            },
            {
                path: 'terms',
                element: <TermsConditions />
            },
            {
                path: 'privacy',
                element: <PrivacyPolicy />
            },
            {
                path: 'contact',
                element: <Contact />
            },
            {
                path: 'offer',
                element: <Offer />
            },
            {
                path: 'products/:id',
                element: <PrivateRoute><Products /></PrivateRoute>,
                loader: async ({ params }) => fetch(`https://assignment-12-server-delta-orcin.vercel.app/products/${params.id}`)

            },

            {
                path: 'login',
                element: <Login />
            },
        ]
    },
    {
        path: 'dashboard',
        element: <PrivateRoute>
            <Dashboard />
        </PrivateRoute>,
        children: [
            {
                path: 'home',
                element: <PrivateRoute>
                    <DashbordHome />
                </PrivateRoute>
            },
            {
                path: 'product',
                element:
                    <PrivateRoute>
                        <ProductList />
                    </PrivateRoute>
                ,
            },

            {
                path: 'payment/:newId',
                element: <PrivateRoute>
                    <Payment />
                </PrivateRoute>
            },
            {
                path: 'paymentHistory',
                element:
                    <PrivateRoute>
                            <PaymentHistory />
                    </PrivateRoute>

            },
            {
                path: 'updateProfile',
                element: <PrivateRoute>
                    <UpdateProfile />
                </PrivateRoute>
            },
            // vendor
            {
                path: 'createProduct',
                element:
                    <VendorRoute>
                        <ProductCreate />
                    </VendorRoute>

            },
            {
                path: 'venAddAdver',
                element:
                    <VendorRoute>
                        <VenAddAdvertisement />
                    </VendorRoute>

            },
            {
                path: 'MyAdvertisements',
                element:
                    <VendorRoute>
                        <MyAdvertisements />
                    </VendorRoute>

            },
            {
                path: 'myProducts',
                element: <PrivateRoute>
                    <MyProducts />
                </PrivateRoute>
            },
            // admin
            {
                path: 'allUsers',
                element:
                    <AdminRoute>
                        <AllUsers />
                    </AdminRoute>

            },
            {
                path: 'allOrder',
                element:
                    <AdminRoute>
                        <AllOrder />
                    </AdminRoute>

            },
            {
                path: 'adminallProducts',
                element:
                    <AdminRoute>
                        <AdminAllProducts />
                    </AdminRoute>

            },
        ]
    }
]);