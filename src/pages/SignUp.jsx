import React, { useState } from 'react';
import './SignUp.css';

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [profile, setProfile] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const getRandomColor = () => {
        return '#' + Math.floor(Math.random() * 16777215).toString(16);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match!');
        } else {
            setErrorMessage('');
            if (!profile) {
                setProfile(getRandomColor());
            }
            try {
                const res = await fetch('http://127.0.0.1:5555/logs/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ username, email, password, profile })
                });

                if (res.ok) {
                    alert('Form submitted successfully!');
                    
                } else {
                    alert('Failed to submit the form!');
                    
                }
            } catch (error) {
                console.error('Error submitting the form:', error);
                alert('Error submitting the form!');
            }
        }
    };

    const handleReset = () => {
        setUsername('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setProfile('');
        setErrorMessage('');
    };

    return (
        <div className="sign-up-container">
            <form className="sign-up-form" onSubmit={handleSubmit}>
                <h2>Registration Form</h2>
                <div className="input-container">
                    <i className="fa fa-user icon"></i>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="input-container">
                    <i className="fa fa-envelope icon"></i>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="input-container">
                    <i className="fa fa-lock icon"></i>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="input-container">
                    <i className="fa fa-lock icon"></i>
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="input-container">
                    <i className="fa fa-user-circle icon"></i>
                    <input
                        type="text"
                        placeholder="Profile"
                        value={profile}
                        onChange={(e) => setProfile(e.target.value)}
                    />
                </div>
                <button type="submit" className="register-btn">Register</button>
                <button type="button" className="reset-btn" onClick={handleReset}>Reset</button>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
            </form>
        </div>
    );
};

export default SignUp;
