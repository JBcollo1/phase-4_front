import React, { useState } from 'react';
import './SignUp.css';

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match!');
        } else {
            setErrorMessage('');
            alert('Form submitted successfully!');
            // Here you can add code to submit the form
        }
    };

    const handleReset = () => {
        setUsername('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
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
                <button type="submit" className="register-btn">Register</button>
                <button type="button" className="reset-btn" onClick={handleReset}>Reset</button>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
            </form>
        </div>
    );
};

export default SignUp;