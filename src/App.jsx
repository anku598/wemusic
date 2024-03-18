import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import LoginForm from "./components/LoginForm.jsx";
import Navigation from "./components/Navigation.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import SignUp from "./components/SignUp.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import Home from "./pages/Home.jsx";
function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <Navigation />
          <div id="main-content">
            <Routes>
              <Route
                path="/"
                element={
                  <PrivateRoute>
                    <Home />
                  </PrivateRoute>
                }
              />
              <Route path="/login" exact element={<LoginForm />} />
              <Route path="/signup" exact element={<SignUp />} />
            </Routes>
          </div>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
