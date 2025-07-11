import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import useRole from '../hooks/useRole';
import Spinner from '../components/Spinner'; // Optional

const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const [role, roleLoading] = useRole();
    const location = useLocation();

    if (loading || roleLoading) return <Spinner />;
    if (!user || role !== 'admin') return <Navigate to="/" state={{ from: location }} replace />;

    return children;
};

export default AdminRoute;
