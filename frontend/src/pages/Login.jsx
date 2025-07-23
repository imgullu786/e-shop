import { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from "react-hot-toast";

const Login = () => {
  const [currentState, setCurrentState] = useState('Login');
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (currentState === 'Sign Up') {
        const response = await axios.post(backendUrl + '/api/user/register', { name, email, password });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
          toast.success('Registration successful!');
        } else {
          toast.error(response.data.message);
        }
      } else {
        const response = await axios.post(backendUrl + '/api/user/login', { email, password });
        if (response.data.success) {
          toast.success('Login successful!');
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong.");
    }
  };

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-white px-4">
      <form
        onSubmit={onSubmitHandler}
        className="w-full max-w-md bg-white border border-gray-200 shadow-xl rounded-xl p-8 flex flex-col gap-5"
      >
        <div className="text-center mb-2">
          <h2 className="text-3xl font-semibold text-gray-800">{currentState}</h2>
          <p className="text-sm text-gray-500 mt-1">
            {currentState === 'Login'
              ? 'Welcome back! Please log in.'
              : 'Create an account to get started.'}
          </p>
        </div>

        {currentState === 'Sign Up' && (
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm outline-none focus:border-black"
          />
        )}

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm outline-none focus:border-black"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm outline-none focus:border-black"
        />

        <div className="flex justify-between text-sm text-gray-500">
          <p className="cursor-pointer hover:underline">Forgot password?</p>
          <p
            className="cursor-pointer hover:underline"
            onClick={() =>
              setCurrentState(currentState === 'Login' ? 'Sign Up' : 'Login')
            }
          >
            {currentState === 'Login' ? 'Create account' : 'Login here'}
          </p>
        </div>

        <button
          type="submit"
          className="bg-black text-white py-2 mt-2 rounded-md hover:bg-gray-800 transition duration-300"
        >
          {currentState === 'Login' ? 'Sign In' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
};

export default Login;
