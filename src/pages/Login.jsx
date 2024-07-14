import { Formik, Form, Field, ErrorMessage } from 'formik';
import './Login.css';

const Login = () => {
  // Simple validation function
  const validate = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = 'Invalid email address';
    }

    if (!values.password) {
      errors.password = 'Password is required';
    }

    return errors;
  };

  // Handle form submission
  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    const { email, password } = values;

    const response = await fetch('https://phase-4-project-0zcg.onrender.com/logs/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (!response.ok) {
      setErrors({ submit: data.msg || 'Login failed' });
    } else {
      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('refresh_token', data.refresh_token);
      window.location.href = '/';
    }

    setSubmitting(false);
  };

  return (
    <div className="login-box">
      <h2>Login</h2>
      <Formik
        initialValues={{ email: '', password: '' }}
        validate={validate}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="user-box">
              <Field
                type="text"
                name="email"
                className="form-field"
              />
              <label>Email</label>
              <ErrorMessage name="email" component="div" className="error-message" />
            </div>
            <div className="user-box">
              <Field
                type="password"
                name="password"
                className="form-field"
              />
              <label>Password</label>
              <ErrorMessage name="password" component="div" className="error-message" />
            </div>
            <button type="submit" disabled={isSubmitting}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Submit
            </button>
            <ErrorMessage name="submit" component="p" className="error" />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
