import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [token, setToken] = useState(null);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            validateToken(storedToken);
        }
    }, []);

    const validateToken = (token) => {
        fetch('http://20.9.240.176:5000/validate-token', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'token': `${token}`
            }
        })
        .then(response => {
            if (response.ok) {
                setIsAuthenticated(true);
                setToken(token);
            } else {
                localStorage.removeItem('token');
                setIsAuthenticated(false);
                setToken(null);
            }
        })
        .catch(() => {
            localStorage.removeItem('token');
            setIsAuthenticated(false);
            setToken(null);
        });
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, token, validateToken }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
