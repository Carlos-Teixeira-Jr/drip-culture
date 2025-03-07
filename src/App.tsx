import { useEffect } from 'react';
import { useLocation, useNavigate, matchRoutes, Routes, Route } from 'react-router-dom';
import './App.css'
import { Home } from './pages/Home';
import { LoginPage } from './pages/LoginPage';

const routes = [
  { path: "/" },
  { path: "/login" },
  { path: "page-not-found" },
];

function RouteValidator() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const match = matchRoutes(routes, location);
    if (!match) {
      navigate("/page-not-found", { replace: true });
    }
  }, [location, navigate]);

  return null;
}

function App() {

  return (
    <>
      <RouteValidator />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<h1>404</h1>} />
        <Route path="/login" element={<LoginPage/>} />
      </Routes>
    </>
  )
}

export default App
