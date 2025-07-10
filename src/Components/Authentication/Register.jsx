import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useState } from 'react';
import useAuth from '../hooks/useAuth';
import { toast } from 'react-hot-toast';
import SochialLogin from '../Pages/SochialLogin/SochialLogin';

const Register = () => {
    const { createUser, updateUserProfile } = useAuth();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [loading, setLoading] = useState(false);

    const onSubmit = async (data) => {
        if (!data.profileImage[0]) {
            toast.error('Please select a profile image');
            return;
        }

        setLoading(true);

        const formData = new FormData();
        formData.append('image', data.profileImage[0]);

        axios.post(
            `https://api.imgbb.com/1/upload?expiration=600&key=${import.meta.env.VITE_image_key}`,
            formData
        ).then((uploadRes) => {
            const imageUrl = uploadRes.data?.data?.url;

            if (!uploadRes.data?.success) {
                throw new Error('Image upload failed');
            }

            // Step 2: Firebase Auth createUser
            createUser(data.email, data.password)
                .then((userCredential) => {
                    const data = userCredential.user;

                    // Step 3: Update Firebase user profile
                    updateUserProfile(data.name, imageUrl)
                        .then(() => {
                            // Step 4: Save to DB (optional)
                            const userInfo = {
                                name: data.name,
                                email: data.email,
                                imageUrl,
                            };
                            return axios.post('http://localhost:5000/users', userInfo, {
                            });
                        })
                        .then((res) => {
                            toast.success('User registered successfully!');
                            console.log('Backend response:', res.data);
                        })
                        .catch((err) => {
                            console.error(err);
                            toast.error('Something went wrong!');
                        })
                        .finally(() => {
                            setLoading(false);
                        });
                })
                .catch((err) => {
                    toast.error(err.message || 'Registration failed');
                    setLoading(false);
                });

        }).catch((err) => {
            console.error(err);
            toast.error('Image upload failed');
            setLoading(false);
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md bg-white p-8 rounded shadow-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Name */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Full Name
                        </label>
                        <input
                            id="name"
                            type="text"
                            {...register('name', { required: 'Name is required' })}
                            className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                    </div>

                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            {...register('email', {
                                required: 'Email is required',
                                pattern: {
                                    value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                                    message: 'Invalid email address',
                                },
                            })}
                            className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                    </div>

                    {/* Password */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            {...register('password', {
                                required: 'Password is required',
                                minLength: { value: 6, message: 'Password must be at least 6 characters' },
                            })}
                            className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                    </div>

                    {/* Profile Image */}
                    <div>
                        <label htmlFor="profileImage" className="block text-sm font-medium text-gray-700">
                            Profile Image
                        </label>
                        <input
                            id="profileImage"
                            type="file"
                            accept="image/*"
                            {...register('profileImage', { required: 'Profile image is required' })}
                            className="mt-1 block w-full text-sm text-gray-900"
                        />
                        {errors.profileImage && <p className="text-red-500 text-sm mt-1">{errors.profileImage.message}</p>}
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-2 rounded-md text-white ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} transition duration-200`}
                    >
                        {loading ? 'Registering...' : 'Register'}
                    </button>
                </form>

                <p className="mt-4 text-sm text-center">
                    Already have an account?{' '}
                    <a href="/login" className="text-blue-600 hover:underline">
                        Login
                    </a>
                </p>
                <SochialLogin />
            </div>
        </div>
    );
};

export default Register;
