import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './novellist.css';

const List = ({ novels }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredNovels = novels.filter(novel =>
    novel.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addToCollection = async (novelId) => {
    const token = localStorage.getItem('access_token'); 

    if (!token || token.split('.').length !== 3) {
      alert('Invalid token format');
      return;
    }

    try {
      const rating = 5; 

      const response = await fetch('http://127.0.0.1:5555/novelcollection/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          novel_id: novelId,
          rating: rating,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert(data.msg);
      } else {
        alert(data.msg || 'An error occurred');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred');
    }
  };

  if (!novels || novels.length === 0) {
    return <p>No novels available</p>; 
  }

  return (
    <div className="novel-container">
      <input
        type="text"
        placeholder="Search for novels..."
        value={searchQuery}
        onChange={handleSearchChange}
        className="search-input"
      />
      <div className="novel-grid">
        {filteredNovels.length > 0 ? (
          filteredNovels.map(novel => (
            <div className="novel-item" key={novel.id}>
              <Link to={`/novellist/${novel.title}`}>
                <img src={novel.profile} alt={`${novel.title} cover`} className="novel-image"/>
              </Link>
              <h2 className="novel-title">{novel.title}</h2>
              <p className="novel-genre"><strong>Genre:</strong> {novel.genre}</p>
              <button className="novel-button" onClick={() => addToCollection(novel.id)}>Add to Collection</button>
            </div>
          ))
        ) : (
          <p className="no-novels">No novels match your search criteria</p>
        )}
      </div>
    </div>
  );
};

export default List;
