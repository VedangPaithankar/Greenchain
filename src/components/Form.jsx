import React, { useState } from 'react';
import loginpage from '../Assets/1197.jpg';
import axios from 'axios';

function Form(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [consoleResult, setConsoleResult] = useState('');

    const handleLogin = async () => {
      try {
        const userType = props.title ? props.title.toLowerCase() : 'buyer';
        console.log("Request Body:", { username, password, userType });
        const response = await axios.post(`http://localhost:5000/login`, { username, password, userType });
        if (response.status === 401) {
          console.log('nhk');
          // Redirect to homepage if authentication fails
          window.location.href = 'http://localhost:5173'; // Change the URL to your desired website
          return;
        }
        console.log(response.data);
        setConsoleResult('Login successful');
        // Redirect user after successful login
        window.location.href = 'http://localhost:5173'; // Change the URL to your desired website
      } catch (error) {
        console.log(error.message);
        setConsoleResult('Invalid password');
      }
  };

  return (
    <div className='flex h-screen mt-24'>
      <div className='mx-auto md:w-1/3 bg-white flex flex-col justify-center items-center'>
        <h2 className='text-3xl font-bold mt-[-130px] mb-20 text-center text-[#20AE24]'>{props.title.toUpperCase()}</h2>
        <div className='mb-4'>
          <div className='flex gap-5'>
            <p className='font-bold mt-2'>Username</p>
            <input
              type="text"
              placeholder='Username'
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        </div>
        <div className='mb-4'>
          <div className='flex gap-5'>
            <p className='font-bold mt-2'>Password</p>
            <input
              type="password"
              placeholder='Password'
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div className='mb-6'>
          <button
            className='w-full px-4 py-2 bg-[#20AE24] mt-10 text-white rounded-lg hover:bg-blue-600 transition duration-200'
            onClick={handleLogin}
          >
            Login
          </button>
        </div>
        <div className='text-center'>
          <p className='text-gray-600'>Don't have an account? <br /> Contact us at <span className="text-blue-400"> <a  href="mailto:vedangpaithankar19@gmail.com">support@greenchain.com</a> </span>to request access.</p>
          <p className='text-gray-600 mt-20'>Are you a {props.page}? <a href={props.link} className='text-[#20AE24] hover:underline'>{props.page}</a></p>
        </div>
      </div>
      <div className='hidden md:block w-2/3 relative bg-[#79E381]'>
        <img src={loginpage} alt="Login Page" className='absolute inset-0 w-full h-full my-auto object-cover' />
      </div>
    </div>
  );
}

export default Form;