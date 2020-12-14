import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Footer from "./components/Footer";
import { Container } from 'react-bootstrap'
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ActivatePage from './pages/ActivatePage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import ProfilePage from './pages/ProfilePage';

const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route path='/login' component={LoginPage} />
          <Route path='/register' component={RegisterPage} />
          <Route path='/profile' component={ProfilePage} />
          <Route path='/auth/activate/:token' component={ActivatePage} exact />
          <Route path='/auth/password/forgot' component={ForgotPasswordPage} exact />
          <Route path='/auth/password/reset/:token' component={ResetPasswordPage} exact />
          <Route path='/product/:id' component={ProductPage} />
          <Route path='/cart/:id?' component={CartPage} />
          <Route path='/' component={HomePage} exact />
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
