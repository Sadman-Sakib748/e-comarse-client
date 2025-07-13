import { useForm } from 'react-hook-form';
import { useState } from 'react';
import useAuth from '../hooks/useAuth';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router';
import useAxiosPublic from '../hooks/useAxiosPublic';

const Register = () => {
    const { createUser, updateUserProfile, googleSignIn } = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    // 🔹 Handle Email/Password Registration
    const onSubmit = async (formDataValues) => {
        setLoading(true);

        try {
            const userCredential = await createUser(formDataValues.email, formDataValues.password);
            await updateUserProfile(formDataValues.name, formDataValues.photo || null);

            const userInfo = {
                name: formDataValues.name,
                email: formDataValues.email,
                photo: formDataValues.photo || null,
                role: 'user',
                created_at: new Date().toISOString(),
                last_log_in: new Date().toISOString(),
            };

            await axiosPublic.post('/users', userInfo);
            toast.success('User registered successfully!');
            navigate('/');
        } catch (error) {
            console.error(error);
            toast.error(error.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    // 🔹 Handle Google Sign In
    const handleGoogleSignIn = async () => {
        try {
            const result = await googleSignIn();
            const user = result.user;

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
            navigate('/');
        } catch (error) {
            console.error(error);
            toast.error(error.message || 'Google sign-in failed');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md bg-white p-8 rounded shadow-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Name */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                        <input
                            id="name"
                            type="text"
                            {...register('name', { required: 'Name is required' })}
                            className="mt-1 block w-full px-4 py-2 border rounded-md"
                        />
                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                    </div>

                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            id="email"
                            type="email"
                            {...register('email', {
                                required: 'Email is required',
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: 'Invalid email address',
                                },
                            })}
                            className="mt-1 block w-full px-4 py-2 border rounded-md"
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                    </div>

                    {/* Password */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            id="password"
                            type="password"
                            {...register('password', {
                                required: 'Password is required',
                                minLength: { value: 6, message: 'Minimum 6 characters required' },
                            })}
                            className="mt-1 block w-full px-4 py-2 border rounded-md"
                        />
                        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                    </div>

                    {/* Photo URL (Optional) */}
                    <div>
                        <label htmlFor="photo" className="block text-sm font-medium text-gray-700">Photo URL</label>
                        <input
                            id="photo"
                            type="text"
                            {...register('photo')}
                            className="mt-1 block w-full px-4 py-2 border rounded-md"
                            placeholder="https://example.com/photo.jpg"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-2 rounded-md text-white ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'} transition`}
                    >
                        {loading ? 'Registering...' : 'Register'}
                    </button>
                </form>

                {/* Google Sign-In Button */}
                <div className="mt-6 text-center">
                    <p className="text-sm mb-2">Or sign in with</p>
                    <button
                        onClick={handleGoogleSignIn}
                        className="w-full py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-50 flex items-center justify-center gap-2"
                    >
                        <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
                        <span>Google</span>
                    </button>
                </div>

                <p className="mt-4 text-sm text-center">
                    Already have an account?{' '}
                    <a href="/login" className="text-blue-600 hover:underline">Login</a>
                </p>
            </div>
        </div>
    );
};

export default Register;
