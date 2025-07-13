import { Navigate, useLocation } from 'react-router';
import useAuth from '../Components/hooks/useAuth';
import Spinner from '../Components/Pages/Spinner/Spinner';


const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) return <Spinner /> ;
    if (!user) return <Navigate to="/login" state={{ from: location }} replace />;

    return children;
};

export default PrivateRoute;
