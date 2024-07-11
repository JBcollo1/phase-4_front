import { useState } from 'react';
import './addnovel.css'; 



const AddNovel = () => {
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [author, setAuthor] = useState('');
  const [profile, setProfile] = useState(''); // For storing image URL
  const [publicationYear, setPublicationYear] = useState('');
  const [synopsis, setSynopsis] = useState('');
  const [error, setError] = useState(null);
  const [info, setInfo] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setInfo(null);

    const data = {
      title,
      genre,
      author,
      profile,
      publication_year: publicationYear,
      synopsis
    };

    let accessToken = localStorage.getItem('access_token');
    const refreshToken = localStorage.getItem('refresh_token');

    try {
      let response = await fetch('http://127.0.0.1:5555/novels/addnovel', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify(data)
      });

    

      const responseData = await response.json();

      if (!response.ok) {
        setError(responseData.msg || 'Failed to add novel');
      } else {
        setInfo('Novel added successfully');
        setTitle('');
        setGenre('');
        setAuthor('');
        setProfile('');
        setPublicationYear('');
        setSynopsis('');
      }
    } catch (error) {
      console.error('Error adding novel:', error);
      setError('Failed to add novel');
    }
  };

  return (
    <div className="add-novel-form">
      <h2>Add Novel</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <label>Title</label>
        </div>
        <div className="form-group">
          <input
            type="text"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            required
          />
          <label>Genre</label>
        </div>
        <div className="form-group">
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
          <label>Author</label>
        </div>
        <div className="form-group">
          <input
            type="text"
            value={profile}
            onChange={(e) => setProfile(e.target.value)}
            required
          />
          <label>Profile</label>
        </div>
        <div className="form-group">
          <input
            type="number"
            value={publicationYear}
            onChange={(e) => setPublicationYear(e.target.value)}
            required
          />
          <label>Publication Year</label>
        </div>
        <div className="form-group">
          <textarea
            value={synopsis}
            onChange={(e) => setSynopsis(e.target.value)}
            required
          ></textarea>
          <label>Synopsis</label>
        </div>
        <button type="submit">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          Submit
        </button>
        {error && <div className="error">{error}</div>}
        {info && <div className="info">{info}</div>}
      </form>
    </div>
  );
};

export default AddNovel;
