import { Link, Outlet } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
function App() {
  return (
    <>
      <AuthProvider>
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
                <Link className="nav-item nav-link" to={`/login`}>
                  Login
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        <div id="main-content">
          <Outlet />
        </div>
      </AuthProvider>
    </>
  );
}

export default App;
