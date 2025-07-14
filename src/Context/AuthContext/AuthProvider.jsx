import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword,GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../../firebase/firebase.config';
import useAxiosPublic from '../../Components/hooks/useAxiosPublic';

const AuthProvider = ({ children }) => {
    const axiosPublic = useAxiosPublic();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider();

    // Create User
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    // Google Sign In
    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    };

    // Email Sign In
    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    // Log Out
    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    };

    // Update Profile
    const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo,
        });
    };

    // Listen to Auth State
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);
            if (currentUser) {
                const userInfo = { email: currentUser.email }
                axiosPublic.post('/jwt', userInfo)
                    .then(res => {
                        if (res.data.token) {
                            console.log(res.data.token, 'token')
                            localStorage.setItem('access-token', res.data.token)
                        }
                    })
            } else {
                localStorage.removeItem('access-token');
            }
            console.log(currentUser, 'user cretar')
            setLoading(false);
        });

        return () => unsubscribe();
    }, [axiosPublic]);



    const authInfo = {
        user,
        loading,
        createUser,
        signIn,
        logOut,
        updateUserProfile,
        googleSignIn,
    }
    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;