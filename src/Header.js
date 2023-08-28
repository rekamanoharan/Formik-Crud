import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          Bookophia
        </NavLink>
        <div className="navbar-nav d-flex flex-row">
          <NavLink
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "nav-link active" : "nav-link"
            }
            to="/"
          >
            Book List
          </NavLink>
          <NavLink
            className={({ isActive, isPending }) =>
              isPending
                ? "pending"
                : isActive
                ? "nav-link ms-3 active"
                : "nav-link ms-3"
            }
            to="/add"
          >
            Add Book
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Header;
