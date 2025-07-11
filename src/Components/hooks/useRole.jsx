// hooks/useRole.js
import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiousSecure';

const useRole = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: role, isLoading } = useQuery({
    queryKey: ['userRole', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/role/${user.email}`);
      return res.data?.role;
    },
    enabled: !!user?.email,
  });

  return [role, isLoading];
};

export default useRole;
