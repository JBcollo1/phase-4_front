import './Navbar.css'
import { Link } from 'react-router-dom'; 

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-title">
        Novel Nest
      </div>
      <div className="navbar-menu">
        <div className="navbar-brand">
          <Link to="/">Home</Link>
        </div>
        <div className="navbar-brand">
          <Link to="/login">Login</Link>
        </div>
        <div className="navbar-brand">
          <Link to='/signup'>Signup</Link>
        </div>
        <div className="navbar-brand">
          <Link to='/novellist'>Novels</Link>
        </div>
        <div className="navbar-brand">
          <Link to='/addnovel'>Add</Link>
        </div>
        <div className="navbar-brand">
          <Link to='/appc'>My collection</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
