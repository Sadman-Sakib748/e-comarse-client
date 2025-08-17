import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../hooks/useAuth';
import { useNavigate, useLocation } from 'react-router';
import toast from 'react-hot-toast';
import useAxiosPublic from '../hooks/useAxiosPublic';

const Login = () => {
    const { signIn, googleSignIn, updateUserProfile } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const axiosPublic = useAxiosPublic();

    const from = location.state?.from?.pathname || "/";

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    // ✅ Email/Password Login
    const onSubmit = async (data) => {
        signIn(data.email, data.password)
            .then((result) => {
                console.log('Logged in user:', result.user);
                toast.success('Login successful!');
                navigate(from, { replace: true });
            })
            .catch((err) => {
                console.error(err);
                toast.error('Login failed. Please check your credentials.');
            });
    };

    // ✅ Google Login Handler
    const handleGoogleLogin = async () => {
        try {
            const result = await googleSignIn();
            const user = result.user;

            // Optional: Update profile with displayName & photoURL if needed
            await updateUserProfile(user.displayName, user.photoURL);

            // Save to DB
            const userInfo = {
                name: user.displayName,
                email: user.email,
                photo: user.photoURL,
                role: 'user',
                created_at: new Date().toISOString(),
                last_log_in: new Date().toISOString(),
            };

            await axiosPublic.post('/users', userInfo);

            toast.success('Signed in with Google!');
            navigate(from, { replace: true });
        } catch (error) {
            console.error(error);
            toast.error('Google sign-in failed.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md bg-white p-8 rounded shadow-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Email Field */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            {...register('email', { required: 'Email is required' })}
                            className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                        )}
                    </div>

                    {/* Password Field */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            {...register('password', { required: 'Password is required' })}
                            className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
                    >
                        Log In
                    </button>
                </form>

                <div className="mt-4">
                    <button
                        onClick={handleGoogleLogin}
                        className="w-full flex items-center justify-center gap-2 py-2 border border-gray-300 rounded-md hover:bg-gray-50 mt-4"
                    >
                        <img
                            src="https://www.svgrepo.com/show/475656/google-color.svg"
                            alt="Google"
                            className="w-5 h-5"
                        />
                        <span>Continue with Google</span>
                    </button>
                </div>

                <p className="mt-4 text-sm text-center">
                    Don’t have an account?{' '}
                    <a href="/register" className="text-blue-600 hover:underline">
                        Register
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Login;
