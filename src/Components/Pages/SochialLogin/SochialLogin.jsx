import { FcGoogle } from 'react-icons/fc';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router';  // এখানে react-router-dom হবে
import useAuth from '../../hooks/useAuth';

const SochialLogin = () => {
  const { googleSignIn } = useAuth();
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      const result = await googleSignIn();
      const user = result.user;
      console.log('Google login success:', user);
      toast.success(`Welcome, ${user.displayName || 'User'}!`);

      navigate('/dashboard');
    } catch (error) {
      console.error('Google login error:', error);
      toast.error('Google login failed!');
    }
  };

  return (
    <div className="mt-6 text-center">
      <p className="text-gray-500 mb-2">Or continue with</p>
      <button
        onClick={handleGoogleSignIn}
        className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded hover:bg-gray-100 transition"
      >
        <FcGoogle className="text-xl" />
        <span>Continue with Google</span>
      </button>
    </div>
  );
};

export default SochialLogin;
