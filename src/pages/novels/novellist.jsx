import React from 'react';
import { Link } from 'react-router-dom';
import './novellist.css';

const List = ({ novels }) => {
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
        alert(data.msg);  // Show a success message
      } else {
        alert(data.msg || 'An error occurred');  // Show an error message
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
    <div className="novel-list">
      {novels.map(novel => (
        <div className="novel-card" key={novel.id}>
          <Link to={`/novellist/${novel.title}`}>
            <img src={novel.profile} alt={`${novel.title} cover`} />
          </Link>
          <h2>{novel.title}</h2>
          <p><strong>Genre:</strong> {novel.genre}</p>
          <button onClick={() => addToCollection(novel.id)}>Add to Collection</button>
        </div>
      ))}
    </div>
  );
};

export default List;
