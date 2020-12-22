import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap'
import { Badge } from '@material-ui/core'
import { ShoppingCart } from '@material-ui/icons'

import { logOut } from '../actions/userActions';
import SearchBox from './SearchBox';

function Header() {
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.userLogin)
    const { cart } = useSelector(state => state.cartItems)
    const count = cart.reduce((a, x) => a + x.qty, 0)

    const logoutHandler = () => {
        window.location = '/'
        dispatch(logOut())
    }

    return (
        <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark" fixed="top">
            <Container>
                <LinkContainer to="/">
                    <Navbar.Brand>
                        LapLop <i className="fab fa-confluence" style={{ fontSize: '1.2rem' }} />
                    </Navbar.Brand>
                </LinkContainer>


                <Navbar.Toggle aria-controls="responsive-navbar-nav" />

                <Navbar.Collapse id="responsive-navbar-nav">
                    <SearchBox />

                    <Nav className="ml-auto">
                        <LinkContainer to="/cart">
                            <Nav.Link>
                                <Badge badgeContent={count} color="secondary" showZero className="mr-2" >
                                    <ShoppingCart />
                                </Badge>
                            Cart
                            </Nav.Link>
                        </LinkContainer>

                        {!user && (
                            <NavDropdown title="Account">
                                <LinkContainer to="/login">
                                    <NavDropdown.Item>Login</NavDropdown.Item>
                                </LinkContainer>

                                <LinkContainer to="/saved">
                                    <NavDropdown.Item>Wishlist</NavDropdown.Item>
                                </LinkContainer>

                                <NavDropdown.Divider />

                                <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                            </NavDropdown>
                        )}

                        {user && (
                            <NavDropdown title={user.name}>
                                <LinkContainer to="/profile">
                                    <NavDropdown.Item>Profile</NavDropdown.Item>
                                </LinkContainer>

                                <LinkContainer to="/saved">
                                    <NavDropdown.Item>Wishlist</NavDropdown.Item>
                                </LinkContainer>

                                <NavDropdown.Divider />

                                <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                            </NavDropdown>
                        )}

                        {user && user.isAdmin && (
                            <NavDropdown title="Admin">
                                <LinkContainer to="/admin/users">
                                    <NavDropdown.Item>Users</NavDropdown.Item>
                                </LinkContainer>

                                <LinkContainer to="/admin/products">
                                    <NavDropdown.Item>Products</NavDropdown.Item>
                                </LinkContainer>

                                <LinkContainer to="/admin/orders">
                                    <NavDropdown.Item>Orders</NavDropdown.Item>
                                </LinkContainer>
                            </NavDropdown>
                        )}

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;