import { useEffect } from 'react';
import { useLocation, useNavigate, matchRoutes, Routes, Route } from 'react-router-dom';
import './App.css'
import { Home } from './pages/Home';
import { LoginPage } from './pages/LoginPage';
import { SignUpPage } from './pages/SignUpPage';
import { VerifyEmail } from './pages/verifyEmail/VerifyEmail';
import { PrivateRoute } from './routes/PrivateRoute';
import { MyAccountPage } from './pages/MyAccountPage';
import { AboutMePage } from './pages/AboutMePage';
import { ShopPage } from './pages/ShopPage';

const routes = [
  { path: "/" },
  { path: "/login" },
  { path: "/signup" },
  { path: "page-not-found" },
  { path: "/verify" },
  { path: "/my-account" },
  { path: "/about-me" },
  { path: "/shop" },
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
        <Route path="/signup" element={<SignUpPage/>} />
        <Route path="/verify" element={<VerifyEmail />} />
        <Route path='/about-me' element={<AboutMePage />} />
        <Route path='/shop' element={<ShopPage />} />
        <Route
          path="/my-account"
          element={
            <PrivateRoute>
              <MyAccountPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  )
}

export default App
