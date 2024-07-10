import { Link } from 'react-router-dom';
import './novellist.css';

const List = ({ novels }) => {
  if (!novels || novels.length === 0) {
    return <p>No novels available</p>; 
  }

  return (
    <div className="novel-list">
      {novels.map(novel => (
        <div className="novel-card" key={novel.id}>
          <Link to={`/novel/${novel.title}`}>
            <img src={novel.profile} alt={`${novel.title} cover`} />
          </Link>
          <h2>{novel.title}</h2>
          <p><strong>Genre:</strong> {novel.genre}</p>
        </div>
      ))}
    </div>
  );
};

export default List;
