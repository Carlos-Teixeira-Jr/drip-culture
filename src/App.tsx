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
import { ProductPage } from './pages/ProductPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { AfterPaymentPage } from './pages/AfterPaymentPage';
import { PageNotFound } from './pages/PageNotFound';
import { GoogleSignInCallback } from './components/auth/google/GoogleSignInCallback';
import { ForbiddenPage } from './pages/ForbiddenPage';
import ScrollToTop from './utils/utilComponents/ScrollToTop';

const routes = [
  { path: "/" },
  { path: "/login" },
  { path: "/signup" },
  { path: "page-not-found" },
  { path: "/verify" },
  { path: "/my-account" },
  { path: "/about-me" },
  { path: "/shop" },
  { path: "/product/:id" },
  { path:"/cart" },
  { path: "/checkout" },
  { path: "/after-payment" },
  { path: "/page-not-found" },
  { path: "/forbidden-page" },
  { path: "/google-callback"}
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
      <ScrollToTop/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<PageNotFound/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/signup" element={<SignUpPage/>} />
        <Route path="/verify" element={<VerifyEmail />} />
        <Route path='/about-me' element={<AboutMePage />} />
        <Route path='/shop' element={<ShopPage />} />
        <Route path='/product/:id' element={<ProductPage />} />
        <Route path='/cart' element={<CartPage/>} />
        <Route path='/after-payment' element={<AfterPaymentPage/>} />
        <Route path='/google-callback' element={<GoogleSignInCallback/>} />
        <Route path='/forbidden-page' element={<ForbiddenPage/>} />
        <Route path="/my-account" element={
          <PrivateRoute>
            <MyAccountPage />
          </PrivateRoute>
        } />
        <Route
          path="/checkout"
          element={
            <PrivateRoute>
              <CheckoutPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  )
}

export default App
