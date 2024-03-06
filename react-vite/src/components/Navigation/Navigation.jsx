import { NavLink, useNavigate } from "react-router-dom";
// import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import { useDispatch, useSelector } from "react-redux";
import { thunkLogout } from "../../redux/session";

function Navigation() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sessionUser = useSelector((state) => state.session.user);
  const isAuthenticated = sessionUser !== null;

  const logout = (e) => {
    e.preventDefault();
    dispatch(thunkLogout());
    navigate("/");
  };

return (
  <nav className="navigation">
    <a href="/" className="logo-link">
      <img className="logo" src="/logo-01.png" alt="PackTune Logo" />
    </a>
    <ul className="nav-links">
      {isAuthenticated && (
        <>
          <div className="content-nav">
            <li>
              <NavLink to="/" activeClassName="active">Home</NavLink>
            </li>

            <li>
              <NavLink to="/opps" activeClassName="active">Opps</NavLink>
            </li>

            <li>
              <NavLink to="/opps/form" activeClassName="active">Add New Opp</NavLink>
            </li>
            <li>
              <NavLink to="/myopps" activeClassName="active">My Opps</NavLink>
            </li>
            <li>

              <button onClick={logout} className="logout-button">
                Logout
              </button>
            </li>
          </div>
        </>
      )}
      {!isAuthenticated && (
        <>
          <li>
            <NavLink className="log-in" to="/login" activeClassName="active">
              Login
            </NavLink>
          </li>
          <li>
            <NavLink
              className="sign-up"
              to="/signup"
              activeClassName="active">
              Sign Up
            </NavLink>
          </li>
        </>
      )}
    </ul>
  </nav>
);
}

export default Navigation;
