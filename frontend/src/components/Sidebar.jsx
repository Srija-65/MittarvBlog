import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {  FaTachometerAlt,FaCompass,FaPenNib, FaRegBookmark,FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import { setUser } from '../redux/authSlice';
import axios from 'axios';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);

  const links = [
    { to: '/', icon: FaTachometerAlt, text: 'Dashboard' },
  { to: '/search', icon: FaCompass, text: 'Discover' },
  { to: '/create', icon: FaPenNib, text: 'Write' },
  { to: '/bookmarks', icon: FaRegBookmark, text: 'Saved' },
  { to: '/profile', icon: FaUserCircle, text: 'Account' },

  ];

  const handleLogout = async () => {
    try {
      await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/logout`, { withCredentials: true });
      dispatch(setUser(null));
      navigate('/auth');
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 shadow-lg flex flex-col">
      <div className="p-6 flex-1">
      <div className="font-poppins font-bold text-3xl mb-10 text-center tracking-wider bg-gradient-to-r from-teal-400 to-emerald-500 bg-clip-text text-transparent">
        MittarvBlog
      </div>



        <nav className="space-y-2">
          {links.map(({ to, icon: Icon, text }) => (
            <Link
              key={to}
              to={to}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                location.pathname === to
                  ? 'bg-gradient-to-r from-green-400 to-teal-500 text-white'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800'
              }`}
            >
              <Icon className="text-xl" />
              <span className="font-medium">{text}</span>
            </Link>
          ))}
        </nav>
      </div>

      <div className="p-6 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3 p-4 rounded-lg bg-gray-50 dark:bg-gray-700 mb-4">
          <img
            src={user?.profilePicture || 'https://via.placeholder.com/40'}
            alt={user?.name}
            className="w-10 h-10 rounded-full object-cover border shadow"
          />
          <div className="overflow-hidden">
            <div className="font-medium text-gray-900 dark:text-gray-100 truncate">
              {user?.name}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400 truncate">
              {user?.email}
            </div>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <FaSignOutAlt className="text-xl" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar; 