import { UserPlusIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


export default function Register() {

  const navigate = useNavigate();
  const [fullname, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if(!username || !password || !confirmPassword) {
      setError('All fields are required');
      setSuccess('');
      return;
    }

    if(password != confirmPassword) {
      setError('Passwords do not match.')
      setSuccess('');
      return;
    }

    const users= JSON.parse(localStorage.getItem('users')) || [];
    const userExists = users.find((user) => user.username === username);

    if(userExists) {
      setError('Username already exists. Try logging in.');
      setSuccess('');
      return;
    }

    users.push({ username, password, email, fullname});
    localStorage.setItem('users', JSON.stringify(users));

    setError('');
    setSuccess('Account created succesfully! Redirecting to login...');

    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  return(
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 via-blue-100 to-indigo-100 font-sans overflow-hidden">

      <div className='relative bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md text-center z-10'>
        <UserPlusIcon className="h-12 w-12 text-indigo-500 mx-auto mb-4"/>

        <h2 className="text-3xl font-bold mb-1"> Create Account </h2>
        <p className="text-gray-500 mb-8">Sign Up to get Started</p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            value={fullname}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full mb-4 p-3 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-4 p-3 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
            required
          />

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full mb-4 p-3 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-4 p-3 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
            required
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full mb-4 p-3 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
            required
          />

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-left">
              <strong className="font-bold">Error: </strong>
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 text-left">
              <strong className="font-bold">Success: </strong>
              <span>{success}</span>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-500 to-blue-500 text-white py-3 rounded-full font-semibold hover:opacity-90 transition duration-300"
          >
            Register
          </button>
        </form>

        <p className="mt-4 text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/" className="text-indigo-600 hover:underline">
          Login here!
          </Link>
        </p>
      </div>
    </div>
  );
}
