import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../index.css';
import PostCard from '../components/PostCard';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState({ name: '', profilePicture: '', bio: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    // Fetch user's profile and posts
    axios.get(`${import.meta.env.VITE_API_URL}/api/user/me`, { withCredentials: true })
      .then(res => {
        setProfile(res.data.user);
        setPosts(res.data.posts);
        setForm({
          name: res.data.user.name || '',
          profilePicture: res.data.user.profilePicture || '',
          bio: res.data.user.bio || '',
        });
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async e => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await axios.put(`${import.meta.env.VITE_API_URL}/api/user/me`, form, { withCredentials: true });
      setProfile({ ...profile, ...form });
      setEdit(false);
    } catch (err) {
      console.error('Error updating profile:', err);
    }
    setSaving(false);
  };

  if (loading) return <div>Loading...</div>;
  if (!profile) return <div>Profile not found.</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="font-inter font-bold text-3xl mb-10 text-center tracking-tight bg-gradient-to-r from-green-400 to-teal-500 bg-clip-text text-transparent">Profile Overview</h2>
      <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
        <div className="flex gap-8 items-start">
          <img 
            src={profile.profilePicture || 'https://via.placeholder.com/150'} 
            alt="profile" 
            className="w-32 h-32 rounded-full object-cover border shadow-md"
          />
          <div className="flex-1">
            {edit ? (
              <form onSubmit={handleSave} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Profile Picture URL</label>
                  <input
                    type="text"
                    name="profilePicture"
                    value={form.profilePicture}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                  <textarea
                    name="bio"
                    value={form.bio}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[100px]"
                    placeholder="Tell us about yourself..."
                  />
                </div>
                <div className="flex gap-2">
                  <button 
                    type="submit" 
                    className="bg-gradient-to-r from-green-400 to-teal-500 text-white px-6 py-2 rounded-lg shadow hover:from-green-500 hover:to-teal-600 transition-all duration-300" 
                    disabled={saving}
                  >
                    {saving ? 'Saving...' : 'Save Changes'}
                  </button>
                  <button 
                    type="button" 
                    className="px-6 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition" 
                    onClick={() => setEdit(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{profile.name}</h3>
                <p className="text-gray-600 mb-4">{profile.bio}</p>
                <button 
                  className="bg-gradient-to-r from-green-400 to-teal-500 text-white px-6 py-2 rounded-lg shadow 
           hover:from-green-500 hover:to-teal-600 transition-all duration-300"
                  onClick={() => setEdit(true)}
                >
                  Edit Profile
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {posts.length === 0 && (
          <div className="text-center text-gray-500 py-8">
            You haven’t written any posts yet. Start your first story today!
          </div>
        )}
        {posts.map(post => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Profile; 