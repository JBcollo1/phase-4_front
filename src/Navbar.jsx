import './Navbar.css'
import { Link } from 'react-router-dom'; 

function Navbar() {
  return (
    <nav className="navbar">
     
      <div className="navbar-menu">
       <div className="navbar-brand">
        
        <Link to="/">Home</Link>
       </div>
        <div className="navbar-brand">
          <Link to="/login">Login</Link>
         
        </div>
        <div className="navbar-brand">
          <Link to='/signup'>signup</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;