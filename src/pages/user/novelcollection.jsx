import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './novellist.css';

const NovelDetail = () => {
  const { title } = useParams();
  const [novel, setNovel] = useState(null);
  const [rating, setRating] = useState('');
  const token = localStorage.getItem('token'); // Replace with your token management logic

  useEffect(() => {
    const fetchNovel = async () => {
      try {
        const response = await fetch(`/novels/${title}`);
        const data = await response.json();
        if (response.ok) {
          setNovel(data);
        } else {
          alert('Novel not found');
        }
      } catch (error) {
        alert('An error occurred');
      }
    };

    fetchNovel();
  }, [title]);

  const addToCollection = async () => {
    try {
      const userId = 1; // Replace with the current user ID
      if (!rating) {
        alert('Please enter a rating');
        return;
      }

      const response = await fetch('/novelcollection/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          user_id: userId,
          novel_id: novel.id,
          rating: parseInt(rating),
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert(data.msg);  // Show a success message
        setRating('');    // Clear the rating input
      } else {
        alert(data.msg || 'An error occurred');  // Show an error message
      }
    } catch (error) {
      alert('An error occurred');
    }
  };

  if (!novel) {
    return <p>Loading novel details...</p>;
  }

  return (
    <div className="novel-card-2">
      <img src={novel.profile} alt={`${novel.title} cover`} className="novel-profile" />
      <div className="novel-details">
        <div className="novel-info">
          <h2>{novel.title}</h2>
          <p><strong>Genre:</strong> {novel.genre}</p>
          <p><strong>Description:</strong> {novel.description}</p>
        </div>
        <input
          type="number"
          min="1"
          max="5"
          placeholder="Rating (1-5)"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />
        <button onClick={addToCollection}>Add to Collection</button>
        <Link to="/novellist" className="back-link">Back to List</Link>
      </div>
    </div>
  );
};

export default NovelDetail;
