import { Navigate, useLocation } from 'react-router';
import useAuth from '../Components/hooks/useAuth';
import useRole from '../Components/hooks/useRole';
import Spinner from '../Components/Pages/Spinner/Spinner';


const VendorRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const [role, roleLoading] = useRole();
    const location = useLocation();

    if (loading || roleLoading) return <Spinner />;
    if (!user || role !== 'vendor') 
        return <Navigate to="/" state={{ from: location }} replace />;

    return children;
};

export default VendorRoute;
