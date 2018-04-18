import * as React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import './index.css';

interface NavigationBarProps {
}

interface NavigationBarState {
  isOpen: boolean;
}

class NavigationBar extends React.Component<NavigationBarProps, NavigationBarState> {

  constructor(props: NavigationBarProps) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  public render(): React.ReactElement<{}> {
    return (
      <div>
        <Navbar dark color="dark" expand="md">
          <NavbarBrand href="/"><img src="/assets/soar_logo.png" alt="brand logo" /></NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
            <NavItem>
                <NavLink href="/upload">Upload</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/faucet">Faucet</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/admin">Admin</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default NavigationBar;