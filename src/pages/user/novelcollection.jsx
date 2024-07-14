import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './novelcollection.css';

const Appc = () => {
  const [books, setBooks] = useState([]);
  const [userId, setUserId] = useState(null);
  const [userProfile, setUserProfile] = useState({});
  const [loggedIn, setLoggedIn] = useState(true);
  const [ratings, setRatings] = useState({}); 

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const token = localStorage.getItem('access_token');
        if (!token) {
          throw new Error('No token found');
        }

        const response = await fetch('https://phase-4-project-0zcg.onrender.com/novelcollection/getUserId', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setUserId(data.userId);
      } catch (error) {
        console.error('Error fetching userId:', error);
        setLoggedIn(false);
      }
    };

    fetchUserId();
  }, []);

  useEffect(() => {
    if (userId) {
      fetchUserProfile();
      fetchBooks();
    }
  }, [userId]);

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch(`https://phase-4-project-0zcg.onrender.com/novelcollection/getuserdetails`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setUserProfile(data);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const fetchBooks = async () => {
    try {
      const token = localStorage.getItem('access_token');
      if (!token) {
        throw new Error('No token found');
      }

      const response = await fetch(`https://phase-4-project-0zcg.onrender.com/novelcollection/user/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setBooks(data.collections);

      const initialRatings = data.collections.reduce((acc, book) => {
        acc[book.id] = book.rating || 0;
        return acc;
      }, {});
      setRatings(initialRatings);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const removeBook = async (collectionId) => {
    try {
      const token = localStorage.getItem('access_token');
      if (!token) {
        throw new Error('No token found');
      }

      const response = await fetch(`https://phase-4-project-0zcg.onrender.com/novelcollection/delete/${collectionId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      setBooks(books.filter(book => book.id !== collectionId));
    } catch (error) {
      console.error('Error removing book:', error);
    }
  };

  const handleRatingChange = async (collectionId, novelId, newRating) => {
    try {
      const token = localStorage.getItem('access_token');
      if (!token) {
        throw new Error('No token found');
      }

      const response = await fetch(`https://phase-4-project-0zcg.onrender.com/novelcollection/update/${collectionId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ novel_id: novelId, rating: newRating })
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Network response was not ok: ${errorText}`);
      }

      setRatings({ ...ratings, [collectionId]: newRating });
    } catch (error) {
      console.error('Error updating rating:', error);
    }
  };

  const renderStars = (collectionId, novelId, currentRating) => {
    const stars = [1, 2, 3, 4, 5].map(star => (
      <span
        key={star}
        className={`star ${star <= currentRating ? 'on' : ''}`}
        onClick={() => handleRatingChange(collectionId, novelId, star)}
      >
        &#9733;
      </span>
    ));
    return <div className="rating">{stars}</div>;
  };

  if (!loggedIn) {
    return <h1>Please log in</h1>;
  }

  return (
    <div className="boddy">
      <div className="user-profile">
        <img src={userProfile.profile} alt={`${userProfile.username}'s profile`} />
        <div className="user-details">
          <h2>{userProfile.username}</h2>
        </div>
      </div>
      <div className="novel-list">
        {books.map((book) => (
          <div key={book.id} className="novel-card">
            <img src={book.novel.profile} alt={book.novel.title} />
            <h2>{book.novel.title}</h2>
            <p>Author: {book.novel.author}</p>
            <p>Genre: {book.novel.genre}</p>
            {renderStars(book.id, book.novel_id, ratings[book.id])}
            <button onClick={() => removeBook(book.id)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Appc;
