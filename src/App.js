import React from 'react';
import { Route, withRouter } from 'react-router-dom'

import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import SavedPage from './pages/SavedPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import ShippingPage from './pages/ShippingPage';
import PaymentPage from './pages/PaymentPage';
import PlaceOrderPage from './pages/PlaceOrderPage';
import OrderPage from './pages/OrderPage';
import UserListPage from './pages/admin/UserListPage';
import UserEditPage from './pages/admin/UserEditPage';
import ProductListPage from './pages/admin/ProductListPage';
import ProductEditPage from './pages/admin/ProductEditPage';
import ProductCreatePage from './pages/admin/ProductCreatePage';
import OrderListPage from './pages/admin/OrderListPage';
import NotFoundPage from './pages/NotFoundPage';
import Meta from './components/Meta';

const App = ({ location: { pathname } }) => {
  // Access list of paths that should be contained inside container and include Header & Footer
  let arr =
    [
      "/",
      "/login",
      "/register",
      "/profile",
      "/saved",
      "/cart",
      "/product",
      "/placeorder",
      "/payment",
      "/shipping",
      "/order",
      "/admin/users",
      "/admin/user/:id/edit",
      "/admin/products",
      "/admin/products/new",
      "/admin/product/:id/edit",
      "/admin/orders"
    ];
  if (pathname.length >= 7) // For dynamic routes 
    arr = arr.concat(pathname)


  const AdminRoutes = () => (
    <>
      <Meta title="Admin" />
      <Route path="/admin/users" component={UserListPage} />
      <Route path="/admin/user/:id/edit" component={UserEditPage} />
      <Route exact path="/admin/products/:pageNumber" component={ProductListPage} />
      <Route exact path="/admin/products" component={ProductListPage} />
      <Route path="/admin/products/new" component={ProductCreatePage} />
      <Route path="/admin/product/:id/edit" component={ProductEditPage} />
      <Route path="/admin/orders" component={OrderListPage} />
    </>
  )

  const UserRoutes = () => (
    <>
      <Route path="/order/:id" component={OrderPage} />
      <Route path="/shipping" component={ShippingPage} />
      <Route path="/payment" component={PaymentPage} />
      <Route path="/placeorder" component={PlaceOrderPage} />
      <Route path="/product/:id" component={ProductPage} />
      <Route path="/cart" component={CartPage} />
      <Route path="/saved" component={SavedPage} />
      <Route path="/profile" component={ProfilePage} />
      <Route exact path="/search/:keyword/page/:pageNumber" component={HomePage} />
      <Route exact path="/search/:keyword" component={HomePage} />
      <Route exact path="/page/:pageNumber" component={HomePage} />
      <Route exact path="/" component={HomePage} />
    </>
  )

  const AuthRoutes = () => (
    <>
      <Route path="/register" component={RegisterPage} />
      <Route path="/login" component={LoginPage} />
    </>
  )

  return (
    <>
      {arr.includes(pathname) ?
        <>
          <Header />

          <main className="container min-vh-100">
            <Route component={AdminRoutes} />
            <Route component={UserRoutes} />
            <Route component={AuthRoutes} />
          </main>

          <Footer />
        </> : <Route component={NotFoundPage} />
      }
    </>
  );
}

export default withRouter(App);