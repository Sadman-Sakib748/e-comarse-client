import { useForm } from 'react-hook-form';
import { useState } from 'react';
import useAuth from '../hooks/useAuth';
import { toast } from 'react-hot-toast';
import SochialLogin from '../Pages/SochialLogin/SochialLogin';
import { useNavigate } from 'react-router';
import useAxiosPublic from '../hooks/useAxiosPublic';

const Register = () => {
    const { createUser, updateUserProfile } = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (formDataValues) => {
        setLoading(true);

        try {
            // Step 1: Create Firebase user with email and password
            const userCredential = await createUser(formDataValues.email, formDataValues.password);

            // Step 2: Update Firebase user profile (send name and photoURL separately)
            // এখানে photoURL নেই, তাই null দিলাম
            await updateUserProfile(formDataValues.name, null);

            // Step 3: Prepare user info for backend DB
            const userInfo = {
                name: formDataValues.name,
                email: formDataValues.email,
                role: 'user',
                created_at: new Date().toISOString(),
                last_log_in: new Date().toISOString(),
            };

            // Step 4: Save user info to backend
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

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md bg-white p-8 rounded shadow-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-2 rounded-md text-white ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'} transition`}
                    >
                        {loading ? 'Registering...' : 'Register'}
                    </button>
                </form>

                <p className="mt-4 text-sm text-center">
                    Already have an account?{' '}
                    <a href="/login" className="text-blue-600 hover:underline">Login</a>
                </p>

                <SochialLogin />
            </div>
        </div>
    );
};

export default Register;
