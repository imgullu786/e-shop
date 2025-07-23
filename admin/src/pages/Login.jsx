import axios from 'axios';
import React, { useState } from 'react';
import { backendUrl } from '../App';
import { toast } from 'react-hot-toast';

const Login = ({ setToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(backendUrl + '/api/user/admin', { email, password });
      if (response.data.success) {
        setToken(response.data.token);
        toast.success('Admin login successful');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error('Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-lg p-8 sm:p-10">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Admin Panel</h2>
        <form onSubmit={onSubmitHandler} className="flex flex-col gap-4">
          <div>
            <label className="text-sm text-gray-700 font-medium block mb-1">Email Address</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="admin@example.com"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-black transition"
            />
          </div>

          <div>
            <label className="text-sm text-gray-700 font-medium block mb-1">Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="Enter your password"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-black transition"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-black text-white rounded-lg font-medium hover:bg-gray-900 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
