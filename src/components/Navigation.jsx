import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navigation = () => {
  const { currentUser, logOut } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      navigate("/login");
      await logOut();
    } catch {
      console.log("Failed to log out");
    }
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarTogglerDemo03"
        aria-controls="navbarTogglerDemo03"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <Link to="/" className="navbar-brand" href="#">
        We Music
      </Link>

      <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
          <li className="nav-item active">
            <Link className="nav-item nav-link active" to={`/`}>
              Home
            </Link>
          </li>
          <li className="nav-item">
            {currentUser ? (
              <Link
                className="nav-item nav-link"
                to={`/`}
                onClick={handleLogout}
              >
                {currentUser.displayName} Logout
              </Link>
            ) : (
              <Link className="nav-item nav-link" to={`/login`}>
                Login
              </Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
