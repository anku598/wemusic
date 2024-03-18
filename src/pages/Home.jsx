import { useAuth } from "../context/AuthContext";

function Home() {
  const { currentUser } = useAuth();

  return (
    <div>
      <h2>
        Home Page {currentUser ? currentUser.displayName : "No User Found"}
      </h2>
    </div>
  );
}

export default Home;
