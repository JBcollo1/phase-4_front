import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
// import './noveldetail.css'

const Noveldetail = () => {
  const { title } = useParams();
  const [novel, setNovel] = useState(null); // Single novel object
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(`http://127.0.0.1:5555/novels/name/${title}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch novel info');
        }
        return response.json();
      })
      .then(data => {
        setNovel(data); // Set the novel data
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, [title]);

  return (
    <div className="novel-card-2">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        novel && ( // Ensure novel data is available
          <div className="novel-details">
            <img src={novel.profile} alt={`${novel.title} cover`} />
            <h2>{novel.title}</h2>
            <p><strong>Author:</strong> {novel.author}</p>
            <p><strong>Publication Year:</strong> {novel.publication_year}</p>
            <p><strong>Created At:</strong> {novel.created_at}</p>
            <p><strong>Synopsis:</strong> {novel.synopsis}</p>
            <Link to={'/novellist'}>Return</Link>
          </div>
        )
      )}
    </div>
  );
};

export default Noveldetail;
