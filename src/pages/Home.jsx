import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Home() {
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
    <div>
      <h2>
        Home Page {currentUser ? currentUser.displayName : "No User Found"}{" "}
      </h2>
      <button onClick={handleLogout} className="btn btn-primary shadow">
        Logout
      </button>
    </div>
  );
}

export default Home;
