import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./components/Login";
import Home from "./containers/Home";
import { fetchUser } from "./utils/fetchUser";
import { useEffect } from "react";

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = fetchUser();

    if (!user) return navigate("/login", { replace: true });
  }, [navigate]);

  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="/*" element={<Home />} />
    </Routes>
  );
};

export default App;
