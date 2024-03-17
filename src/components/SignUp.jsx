import { useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const SignUp = () => {
  const [username, setusername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { signUp, currentUser } = useAuth();

  const navigate = useNavigate();

  useLayoutEffect(() => {
    if (currentUser) {
      navigate("/");
    } else {
      navigate("/signup");
    }
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setLoading(true);
      await signUp(email, password, username);
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
          <h2 className="mb-4">Sign In</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-4 ">
              <input
                type="text"
                className="form-control "
                id="exampleInputName"
                aria-describedby="nameHelp"
                placeholder="Enter Name"
                value={username}
                required
                onChange={(e) => setusername(e.target.value)}
              />
            </div>
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
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              disabled={loading}
              type="submit"
              className="btn btn-primary mt-3 shadow"
            >
              Submit Now
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
