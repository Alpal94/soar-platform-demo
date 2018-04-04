import React from 'react';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import './NavigationBar.css';

const navigationBar = () => {
    return (
        <div>
            <Navbar inverse className="navbar-dark NavigationBar">
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="/"><img src="/assets/soar_logo.png" height="30" className="d-inline-block align-top" alt="" /></a>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav pullRight>
                        <NavItem eventKey={1} href="/browse">Browse</NavItem>
                        <NavItem eventKey={2} href="/upload">Upload file</NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}

export default navigationBar;