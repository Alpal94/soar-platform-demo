import * as React from 'react';
import { push } from 'react-router-redux';
import LocalizedStrings from 'react-localization';
import Strings from '../../locale/strings';
import { connect } from 'react-redux';
import SelectLanguage from '../../components/NavigationBar/select-language';
import { createStructuredSelector, createSelector } from 'reselect';

import { languageUpdateAction } from './actions';
import { selectLanguage } from './selectors';
import { SwitchLanguageAction } from './model';
import { Language } from '../../lib/model';
import store from '../../store';

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

interface NavigationBarProps extends React.Props<NavigationBar> {
  language: string;
  selectLanguage: (language: string) => void;
}

interface NavigationBarState {
  isOpen: boolean;
  
}

class NavigationBar extends React.Component<NavigationBarProps, NavigationBarState> {

  constructor(props: NavigationBarProps) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
    };

    this.onLanguageSelected.bind(this.onLanguageSelected);
    this.onClickUpload.bind(this.onClickUpload);
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  onLanguageSelected = (language: string) => {
    Strings.setLanguage(language);
    store.dispatch(languageUpdateAction(language));
  }

  onClickLogo() {
    store.dispatch(push('/'));
  }

  onClickUpload() {
    store.dispatch(push('/upload'));
  }

  onClickFaucet() {
    store.dispatch(push('/faucet'));
  }

  public render(): React.ReactElement<{}> {

    return (

        <Navbar dark color="dark" expand="md">
          <Container>
          <NavbarBrand onClick={this.onClickLogo} href="#"><img src="/assets/soar_logo.png" alt="Soar" /></NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
            <NavItem>
            
                <NavLink onClick={this.onClickUpload} href="#">{Strings.Upload}</NavLink>
              </NavItem>
              <NavItem>
                <NavLink onClick={this.onClickFaucet} href="#">{Strings.Faucet}</NavLink>
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

function mapStateToProps() {
  return createStructuredSelector({
    language: selectLanguage()
  });
}

function mapDispatchToProps(dispatch: any) {
  return {
    selectLanguage(language: string) {
      dispatch(languageUpdateAction(language));
    }
   };
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar);