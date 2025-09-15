import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../redux/authSlice';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProfileSetup = () => {
  const user = useSelector(state => state.auth.user);
  const [name, setName] = useState(user?.name || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!bio.trim()) {
      setError('Please provide a bio to finish setup');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/user/me`,
        { name, bio },
        { withCredentials: true }
      );
      dispatch(setUser(res.data));
      if (res.data.hasCompletedProfile) {
        navigate('/');
      }
    } catch (err) {
      setError('Failed to update profile');
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <div className="bg-gray-900 rounded-2xl p-12 w-full max-w-md border border-gray-700">
        <h1 className="text-3xl font-bold mb-6 text-center text-emerald-400">
          Create Your Account
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-emerald-400 mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-emerald-400 mb-1">
              About You
            </label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 h-32 focus:outline-none"
              placeholder="Write something about yourself..."
              required
            />
          </div>
          {error && (
            <div className="text-red-500 text-sm">{error}</div>
          )}
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-emerald-500 text-white text-sm font-medium rounded-md disabled:opacity-50"
          >
            {loading ? 'Saving...' : 'Save Profile'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileSetup;
