import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import "./LoginForm.css";

function LoginFormPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  if (sessionUser) return <Navigate to="/opps" replace={true} />;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkLogin({
        email,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      navigate("/opps");
    }
  };

  const demoLogin1 = async () => {
    await dispatch(
      thunkLogin({
        email: "demo@aa.io",
        password: "password",
      })
    ).catch((res) => {
      if (res.data && res.data.errors) setErrors(res.data.errors);
    });

    navigate("/opps");
  };

  const demoLogin2 = async () => {
    await dispatch(
      thunkLogin({
        email: "worldofcreatives.com@gmail.com",
        password: "password",
      })
    ).catch((res) => {
      if (res.data && res.data.errors) setErrors(res.data.errors);
    });

    navigate("/opps");
  };

  return (
    <div className="log-in-form">
      <h1>Log In</h1>
      {errors.length > 0 &&
        errors.map((message) => <p key={message} className="error">{message}</p>)}
      <form onSubmit={handleSubmit} >
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
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.password && <p className="error">{errors.password}</p>}
        <button type="submit" className="log-button">Log In</button>
        <div>
        <button onClick={demoLogin1}>Demo User 1</button>
        <button onClick={demoLogin2}>Demo User 2</button>
        </div>
      </form>
    </div>
  );
}

export default LoginFormPage;
