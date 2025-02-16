import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const UserDataContext = createContext();

const UserContext = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem('token');
                if (token) {
                    const response = await axios.get(
                        `${import.meta.env.VITE_BASE_URL}/users/profile`,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        }
                    );
                    setUser(response.data); // Backend sends user data
                    console.log('User data:', response.data);
                }
            } catch (error) {
                console.error('Error fetching user:', error);
                localStorage.removeItem('token');
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    return (
        <UserDataContext.Provider value={{ user, setUser, loading }}>
            {children}
        </UserDataContext.Provider>
    );
};

export default UserContext;