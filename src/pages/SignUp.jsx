import React from 'react';
import './SignUp.css';

const SignUp = () => {
  return (
    <div className="sign-up-container">
      <form className="sign-up-form">
        <h2>Registration Form</h2>
        <div className="input-container">
          <i className="fa fa-user icon"></i>
          <input type="text" placeholder="Username" required />
        </div>
        <div className="input-container">
          <i className="fa fa-lock icon"></i>
          <input type="password" placeholder="Password" required />
        </div>
        <div className="gender-container">
          <label>Gender</label>
          <div>
            <input type="radio" id="male" name="gender" value="male" />
            <label htmlFor="male">Male</label>
            <input type="radio" id="female" name="gender" value="female" />
            <label htmlFor="female">Female</label>
          </div>
        </div>
        <div className="terms-container">
          <input type="checkbox" id="terms" required />
          <label htmlFor="terms">
            Click to accept our <a href="#">Terms</a>.
          </label>
        </div>
        <button type="submit" className="register-btn">Register</button>
        <button type="reset" className="reset-btn">Reset</button>
      </form>
    </div>
  );
};

export default SignUp;