import { useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import { initializeCsrfToken } from "../../features/api/apiSlice";
import { setToken, setUser } from "../../features/auth/authSlice";
import Routers from "../../Routers/Routers";

function App() {
  // Manage authenticated user state here
  const [user, setUserState] = useState(null);
  const authValue = { user, setUser: setUserState };

  const dispatch = useDispatch();

  // Initialize CSRF token for Sanctum on app load
  useEffect(() => {
    initializeCsrfToken();

    // Rehydrate Redux from localStorage
    const token = localStorage.getItem("access_token");
    const user = localStorage.getItem("user");
    if (token) dispatch(setToken(token));
    if (user) dispatch(setUser(JSON.parse(user)));
  }, [dispatch]);

  return (
    <AuthContext.Provider value={authValue}>
      <Routers />
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </AuthContext.Provider>
  );
}

export default App;
