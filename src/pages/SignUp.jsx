import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import './SignUp.css';

const SignUp = () => {
    const [isLoading, setIsLoading] = useState(false);

    const getRandomColor = () => {
        return '#' + Math.floor(Math.random() * 16777215).toString(16);
    };

    // Custom validation function
    const validate = (values) => {
        const errors = {};
        
        // Username validation
        if (!values.username) {
            errors.username = 'Username is required';
        }

        // Email validation
        if (!values.email) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(values.email)) {
            errors.email = 'Invalid email address';
        }

        // Password validation
        if (!values.password) {
            errors.password = 'Password is required';
        } else if (values.password.length < 6) {
            errors.password = 'Password must be at least 6 characters';
        }

        // Confirm Password validation
        if (!values.confirmPassword) {
            errors.confirmPassword = 'Confirm Password is required';
        } else if (values.confirmPassword !== values.password) {
            errors.confirmPassword = 'Passwords must match';
        }

        return errors;
    };

    return (
        <div className="sign-up-container">
            <Formik
                initialValues={{
                    username: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                    profile: ''
                }}
                validate={validate}
                onSubmit={async (values, { setSubmitting, resetForm }) => {
                    setIsLoading(true);
                    const { username, email, password, profile } = values;
                    const profileColor = profile || getRandomColor();
                    
                    try {
                        const res = await fetch('https://phase-4-project-0zcg.onrender.com/logs/signup', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ username, email, password, profile: profileColor })
                        });

                        if (res.ok) {
                            alert('Form submitted successfully!');
                            resetForm();
                        } else {
                            alert('Failed to submit the form!');
                        }
                    } catch (error) {
                        console.error('Error submitting the form:', error);
                        alert('Error submitting the form!');
                    } finally {
                        setIsLoading(false);
                        setSubmitting(false);
                    }
                }}
            >
                {({ setFieldValue }) => (
                    <Form className="sign-up-form">
                        <h2>Registration Form</h2>
                        <div className="input-container">
                            <i className="fa fa-user icon"></i>
                            <Field
                                type="text"
                                name="username"
                                placeholder="Username"
                                className="input-field"
                            />
                            <ErrorMessage name="username" component="p" className="error-message" />
                        </div>
                        <div className="input-container">
                            <i className="fa fa-envelope icon"></i>
                            <Field
                                type="email"
                                name="email"
                                placeholder="Email"
                                className="input-field"
                            />
                            <ErrorMessage name="email" component="p" className="error-message" />
                        </div>
                        <div className="input-container">
                            <i className="fa fa-lock icon"></i>
                            <Field
                                type="password"
                                name="password"
                                placeholder="Password"
                                className="input-field"
                            />
                            <ErrorMessage name="password" component="p" className="error-message" />
                        </div>
                        <div className="input-container">
                            <i className="fa fa-lock icon"></i>
                            <Field
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                className="input-field"
                            />
                            <ErrorMessage name="confirmPassword" component="p" className="error-message" />
                        </div>
                        <div className="input-container">
                            <i className="fa fa-user-circle icon"></i>
                            <Field
                                type="text"
                                name="profile"
                                placeholder="Profile"
                                className="input-field"
                                onChange={(e) => setFieldValue('profile', e.target.value)}
                            />
                            <ErrorMessage name="profile" component="p" className="error-message" />
                        </div>
                        <button type="submit" className="register-btn" disabled={isLoading}>
                            {isLoading ? 'Registering...' : 'Register'}
                        </button>
                        <button
                            type="button"
                            className="reset-btn"
                            onClick={() => {
                                setFieldValue('username', '');
                                setFieldValue('email', '');
                                setFieldValue('password', '');
                                setFieldValue('confirmPassword', '');
                                setFieldValue('profile', '');
                            }}
                        >
                            Reset
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default SignUp;
