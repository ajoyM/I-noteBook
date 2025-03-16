import React, { useState } from 'react';
import AuthContext from './authContext';

const AuthState = (props) => {
    const host = 'http://localhost:3500';
    const [accessToken, setAccessToken] = useState('');

    const login = async (req) => {
        const { email, password } = req;
        try {
            const response = await fetch(`${host}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            const res = await response.json();
            setAccessToken(res.authToken);
            console.log('Access token is', res.authToken);
            return res;
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    return (
        <AuthContext.Provider value={{ accessToken, login }}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthState;
