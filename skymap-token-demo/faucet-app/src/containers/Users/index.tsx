import * as React from 'react';
import { createStructuredSelector } from 'reselect';
const connect = require('react-redux').connect;

import { fetch } from './actions';
import { selectUsers, selectIsLoading, selectIsFetched } from './selectors';
import { User } from './model';

import Container from '../../components/Container';
import Header from '../../components/Header';
import Preloader from '../../components/Preloader';
import List from '../../components/List';
import Card from '../../components/Card';
import Button from '../../components/Button';

interface UsersPageProps extends React.Props<Users> {
  users: Array<User>;
  isLoading: boolean;
  isFetched: boolean;
  onUsersFetch: () => void;
};

interface UserPageState {
  web3: any;
}

class Users extends React.Component<UsersPageProps, UserPageState> {
  
  static contextTypes = {
    web3: React.PropTypes.object
  };

  constructor(props: UsersPageProps, context: any){
    super(props, context);
    this.state = {
      web3: null
    };
  }

  componentDidUpdate(){
    if(!this.state.web3 && this.context.web3){
      this.setState({web3 : this.context.web3});
      console.log('ComponentUpdate: ', this.context.web3)
    }
  }

  public render(): React.ReactElement<{}> {

    const { users, isLoading, isFetched, onUsersFetch } = this.props;
    return (
      <Container>
        <Header>US Presidents List</Header>
        {isLoading && <Preloader />}
        <List>
          {users.map((item, idx) => {
            return (
              <Card
                key={idx}
                title={item.nm}
                label={item.pp}
                />
            );
          })}
        </List>
        {!isFetched && <Button onClick={onUsersFetch}>Fetch</Button>}
      </Container>
    );
  }
}

function mapStateToProps() {
  return createStructuredSelector({
    users: selectUsers(),
    isLoading: selectIsLoading(),
    isFetched: selectIsFetched()
  });
}

function mapDispatchToProps(dispatch: any) {
  return {
    onUsersFetch: (): void => {
      dispatch(fetch());
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);
