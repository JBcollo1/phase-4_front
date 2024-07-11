import React, { useState, useEffect } from 'react';
import './novelcollection.css';

const Appc = () => {
  const [books, setBooks] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Fetch userId from the backend
    const fetchUserId = async () => {
      try {
        const token = localStorage.getItem('access_token');
        if (!token) {
          throw new Error('No token found');
        }

        const response = await fetch('http://127.0.0.1:5555/novelcollection/getUserId', {
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
        setUserId(data.userId);  // Get the userId from the response
      } catch (error) {
        console.error('Error fetching userId:', error);
      }
    };

    fetchUserId();
  }, []);

  useEffect(() => {
    if (userId) {
      fetchBooks();
    }
  }, [userId]);

  const fetchBooks = async () => {
    try {
      const token = localStorage.getItem('access_token');
      if (!token) {
        throw new Error('No token found');
      }

      const response = await fetch(`http://127.0.0.1:5555/novelcollection/user/${userId}`, {
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

      const response = await fetch(`http://127.0.0.1:5555/novelcollection/delete/${collectionId}`, {
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

  return (
    <div className="appc-container">
      <h1>User Book Collection</h1>
      {books.length === 0 && <div className="loading-spinner"></div>}
      <ul>
        {books.map(book => (
          <li key={book.id}>
            {book.novel_id} - Rating: {book.rating}
            <button onClick={() => removeBook(book.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Appc;
