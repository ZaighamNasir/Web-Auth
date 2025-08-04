import { UserCircleIcon, ChartBarIcon, CheckCircleIcon } from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (!storedUser) {
      // If no user, force back to login:
      navigate('/');
    } else {
      setUser(storedUser);
    }
  }, []);

  if (!user) return null; // If user not loaded, render nothing

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 via-blue-100 to-indigo-100 font-sans">
      {/* Navbar */}
      <nav className="bg-white shadow-md py-4 px-8 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-indigo-600">MyApp Dashboard</h1>
        <button
          onClick={() => {
            localStorage.removeItem('loggedInUser');
            localStorage.setItem('isLoggedIn', 'false');
            navigate('/');
          }}
          className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 transition"
        >
          Logout
        </button>
      </nav>

      {/* Main Content */}
      <main className="max-w-screen-lg mx-auto p-8">
        <h2 className="text-3xl font-bold mb-8">Welcome back, {user.username}!</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-xl transition border-t-4 border-indigo-500">
            <div className="flex items-center mb-4">
              <UserCircleIcon className="h-8 w-8 text-indigo-500 mr-2" />
              <h3 className="text-xl font-semibold">Profile</h3>
            </div>
            <p className="text-gray-600 mb-1">Name: {user.fullname}</p>
            <p className="text-gray-600">Email: {user.email}</p>
          </div>

          {/* Tasks Card */}
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-xl transition border-t-4 border-green-500">
            <div className="flex items-center mb-4">
              <CheckCircleIcon className="h-8 w-8 text-green-500 mr-2" />
              <h3 className="text-xl font-semibold">Tasks</h3>
            </div>
            <p className="text-gray-600 mb-1">✅ Finish Dashboard</p>
            <p className="text-gray-600 mb-1">✅ Review PRs</p>
            <p className="text-gray-600">✅ Plan new features</p>
          </div>

          {/* Fake Chart Card */}
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-xl transition border-t-4 border-purple-500">
            <div className="flex items-center mb-4">
              <ChartBarIcon className="h-8 w-8 text-purple-500 mr-2" />
              <h3 className="text-xl font-semibold">Weekly Activity</h3>
            </div>
            <div className="flex items-end space-x-2 h-32">
              <div className="w-4 bg-gradient-to-t from-purple-600 to-purple-400 h-12 rounded-t hover:scale-y-110 transition"></div>
              <div className="w-4 bg-gradient-to-t from-purple-600 to-purple-400 h-24 rounded-t hover:scale-y-110 transition"></div>
              <div className="w-4 bg-gradient-to-t from-purple-600 to-purple-400 h-16 rounded-t hover:scale-y-110 transition"></div>
              <div className="w-4 bg-gradient-to-t from-purple-600 to-purple-400 h-28 rounded-t hover:scale-y-110 transition"></div>
              <div className="w-4 bg-gradient-to-t from-purple-600 to-purple-400 h-20 rounded-t hover:scale-y-110 transition"></div>
              <div className="w-4 bg-gradient-to-t from-purple-600 to-purple-400 h-16 rounded-t hover:scale-y-110 transition"></div>
              <div className="w-4 bg-gradient-to-t from-purple-600 to-purple-400 h-24 rounded-t hover:scale-y-110 transition"></div>
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
              <span>Sun</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
