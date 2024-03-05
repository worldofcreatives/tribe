import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation() {
  return (
    <ul>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>

      <li>
        <NavLink to="/opps">Opps</NavLink>
      </li>

      <li>
        <NavLink to="/opps/form">Add New Opp</NavLink>
      </li>

      <li>
        <NavLink to="/myopps">My Opps</NavLink>
      </li>

      <li>
        <ProfileButton />
      </li>
    </ul>
  );
}

export default Navigation;
