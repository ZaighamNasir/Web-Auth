import { LockClosedIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


export default function Login() {

  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find((user) => user.username === username);

    if (!user) {
      setError('No account found for this username.');
    }else if(user.password !== password) {
      setError('Wrong password. Please try again.');
    }else {
      setError('');

      localStorage.setItem('isLoggedIn','true');
      localStorage.setItem('loggedInUser', JSON.stringify(user));
      navigate('/dashboard');
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 via-blue-100 to-indigo-100 font-sans overflow-hidden">

  {/* Blob 1 */}
  <div className="absolute -top-20 -left-20 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>

  {/* Blob 2 */}
  <div className="absolute top-40 -right-20 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>

  <div className="relative bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md text-center z-10">
    <LockClosedIcon className="h-12 w-12 text-indigo-500 mx-auto mb-4" />

    <h2 className="text-3xl font-bold mb-1">Login</h2>
    <p className="text-gray-500 mb-8"></p>

    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
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

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-left">
          <strong className="font-bold">Error: </strong>
          <span>{error}</span>
        {error.includes('account') && (
          <Link to="/register" className="text-indigo-600 underline ml-1">
            Create one now.
          </Link>
        )}
        </div>
      )}


      <div className="text-right mb-4">
        <Link to="/changepassword" className="text-sm text-indigo-600 hover:underline">
          Forgot password?
        </Link>
      </div>

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-indigo-500 to-blue-500 text-white py-3 rounded-full font-semibold hover:opacity-90 transition duration-300" >
        Sign In
      </button>
      <div className="mt-4 text-sm text-gray-600">
        Don't have an account?
        <Link to="/register" className="text-indigo-600 hover:underline">
          Register Now!
        </Link>
      </div>
    </form>
  </div>
</div>


    );
}