import { NavLink } from 'react-router-dom';

// TODO: Add necessary code to display the navigation bar and link between the pages
const Nav = () => {
  return (
    <nav className="nav">
      <ul className="nav-list">
        <li className="nav-item">
          <NavLink to="/" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
            Search Candidates
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/potential-candidates" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
            Potential Candidates
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;