import * as React from 'react';
import LocalizedStrings from 'react-localization';
import Strings from '../../locale/strings';
import SelectLanguage from '../../components/NavigationBar/select-language';

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
  DropdownItem,
  Container
} from 'reactstrap';
import './index.css';

interface NavigationBarProps {
}

interface NavigationBarState {
  isOpen: boolean;
  currentLanguage: string;
}

class NavigationBar extends React.Component<NavigationBarProps, NavigationBarState> {

  constructor(props: NavigationBarProps) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      currentLanguage: Strings.getInterfaceLanguage()
    };

    this.onLanguageSelected.bind(this.onLanguageSelected);
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  onLanguageSelected = (language: string) => {
    Strings.setLanguage(language);
    this.setState({currentLanguage: language});
  }


  public render(): React.ReactElement<{}> {

    return (

        <Navbar dark color="dark" expand="md">
      <Container>
          
          <NavbarBrand href="/"><img src="/assets/soar_logo.png" alt="brand logo" /></NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
            <NavItem>
                <NavLink href="/upload">{Strings.Upload}</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/faucet">{Strings.Faucet}</NavLink>
              </NavItem>
              <NavItem>
                <SelectLanguage onLanguageSelected={this.onLanguageSelected}/>
                </NavItem>
            </Nav>
          </Collapse>
          </Container>
        </Navbar>
    );
  }
}

export default NavigationBar;