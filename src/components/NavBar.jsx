import { Link } from "react-router-dom";

function NavBar() {
  return (
    <div>
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-3">
      <div className="container">
        <span className="navbar-brand"> Authors</span>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to='/authors' >All Authors</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to='/authors/new' >Add an Author</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    </div>
  );
}

export default NavBar;
