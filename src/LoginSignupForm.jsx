import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
//import axios from 'axios';
import './login.css' 
const LoginSignupForm = () => {
    const navigate=useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [isSignup, setIsSignup] = useState(false); // Flag for signup/login mode
  const [errorMessage, setErrorMessage] = useState('');
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  const toggleMode = () => {
    setIsSignup(!isSignup);
    setErrorMessage(''); // Clear error message when switching modes
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const url = isSignup
      ? 'http://localhost:3000/users/signup' // Signup API endpoint
      : 'http://localhost:3000/users/login'; // Login API endpoint

    try {
        const response=await fetch(url,{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
          });

          if(response.status===200){
            localStorage.setItem('userEmail', formData.email);
            navigate('/allcampaigns',{ state: { email: formData.email } });
          }else
          if(response.status===200){
            alert("user created successfully")
            navigate('/allcampaigns');
          }

          //response.then((response) => response.json()).then((responseData) =>console.log('responseData', responseData))
       // Handle successful operation (signup or login)
    } catch (error) {
      console.error(error);
      setErrorMessage(error);
    }
  };

  return (
    <div className='container'>
      <h2>{isSignup ? 'Signup' : 'Login'}</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleSubmit} className='form'>
        <label htmlFor="email">Email:</label>
        <input className='input'
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <label htmlFor="password" className='label'>Password:</label>
        <input className='input'
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit" className='button'>{isSignup ? 'Signup' : 'Login'}</button>
      </form>
      <p>
        {isSignup ? 'Already have an account?' : 'Don\'t have an account?'}
        <button onClick={toggleMode}> {isSignup ? 'Login' : 'Signup'}</button>
      </p>
    </div>
  );
};

export default LoginSignupForm;
