import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { thunkSignup } from "../../redux/session";
import "./SignupForm.css";

function SignupFormPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  if (sessionUser) return <Navigate to="/" replace={true} />;

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   if (password !== confirmPassword) {
  //     return setErrors({
  //       confirmPassword:
  //         "Confirm Password field must be the same as the Password field",
  //     });
  //   }

  //   const serverResponse = await dispatch(
  //     thunkSignup({
  //       email,
  //       username,
  //       password,
  //     })
  //   );

  //   if (serverResponse) {
  //     setErrors(serverResponse);
  //   } else {
  //     navigate("/opps");
  //   }
  // };


  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = {};
    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Confirm Password field must be the same as the Password field";
    }
    if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
    }
    if (!/^[\w\.-]+@[\w\.-]+\.\w+$/.test(email)) {
      newErrors.email = "Invalid email format.";
    }
    if (username.length < 3 || username.length > 40) {
      newErrors.username = "Username must be between 3 and 40 characters.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const serverResponse = await dispatch(
      thunkSignup({
        email,
        username,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      navigate("/opps");
    }
};


  return (
    <div className="sign-up-form">
      <h1>Sign Up</h1>
      {errors.server && <p className="error">{errors.server}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {errors.email && <p className="error">{errors.email}</p>}
        <label>
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        {errors.username && <p className="error">{errors.username}</p>}
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.password && <p className="error">{errors.password}</p>}
        <label>
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignupFormPage;
