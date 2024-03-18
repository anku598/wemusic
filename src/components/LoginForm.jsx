import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { login, currentUser } = useAuth();

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setLoading(true);
      await login(email, password);
      navigate("/");
    } catch {
      console.log(e);
      setLoading(false);
    }
  }

  return (
    <div className="container">
      <div className="row vh-100 align-items-center justify-content-center ">
        <div className="col-md-6 col-12">
          {currentUser ? (
            <>
              <h2 className="mb-4">Welcome {currentUser.displayName}</h2>
              <Link className="btn btn-primary" to={`/`}>
                Go To HomePage
              </Link>
            </>
          ) : (
            <>
              <h2 className="mb-4">Sign In</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group mb-4 ">
                  <input
                    type="email"
                    className="form-control "
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                    value={email}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-group ">
                  <input
                    type="password"
                    className="form-control"
                    id="exampleInputPassword1"
                    placeholder="Password"
                    value={password}
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <button
                  disabled={loading}
                  type="submit"
                  className="btn btn-primary mt-3 shadow"
                >
                  Submit
                </button>
              </form>

              <p>
                You don't have account? Go to{" "}
                <Link to={"/signup"}>Sign Up</Link>{" "}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
