import { Navigate, useLocation } from 'react-router';
import useAuth from '../Components/hooks/useAuth';


const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) return '....loading';
    if (!user) return <Navigate to="/login" state={{ from: location }} replace />;

    return children;
};

export default PrivateRoute;
