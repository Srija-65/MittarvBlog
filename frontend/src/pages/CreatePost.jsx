import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../index.css';

const CreatePost = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate inputs
    if (!title.trim()) {
      setError('Title is required');
      return;
    }
    if (!content.trim()) {
      setError('Content is required');
      return;
    }

    setLoading(true);
    setError('');

    // Process tags - convert comma-separated to space-separated
    const processedTags = tags
      .split(/[,\s]+/)
      .map(tag => tag.trim())
      .filter(Boolean)
      .join(' ');

    // Prepare post data
    const postData = {
      title: title.trim(),
      content: content.trim(),
      tags: processedTags,
      image: image.trim() || undefined
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/posts`,
        postData,
        { 
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data && response.data._id) {
        navigate(`/post/${response.data._id}`);
      } else {
        setError('Failed to create post - no post ID returned');
      }
    } catch (err) {
      console.error('Create post error:', err.response || err);
      setError(
        err.response?.data?.error || 
        err.response?.data?.message || 
        'Failed to create post. Please try again.'
      );
    }

    setLoading(false);
  };

  const handleTagChange = (e) => {
    // Allow letters, numbers, commas, and spaces
    const value = e.target.value.replace(/[^a-zA-Z0-9,\s]/g, '');
    setTags(value);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="font-inter font-bold text-3xl mb-10 text-center tracking-tight bg-gradient-to-r from-green-400 to-teal-500 bg-clip-text text-transparent">Create Your Post</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Post Title</label>
          <input
            type="text"
            value={title}
            placeholder="A day in the mountains"
            onChange={e => setTitle(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Image(optional)</label>
          <input
            type="text"
            value={image}
            onChange={e => setImage(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="https://example.com/photo"

          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Your Story</label>
          <textarea
            value={content}
            onChange={e => setContent(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[200px]"
            required
            placeholder="Once upon a time..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Add Tags
            <span className="text-sm text-gray-500 ml-2"></span>
          </label>
          <input
            type="text"
            value={tags}
            onChange={handleTagChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="travel, nature"
          />
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}
          <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-green-400 to-teal-500 text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:from-green-500 hover:to-teal-600 transition disabled:opacity-50">
          {loading ? 'Publishing...' : '🚀 Publish Post'}
        </button>
      </form>
    </div>
  );
};

export default CreatePost; 