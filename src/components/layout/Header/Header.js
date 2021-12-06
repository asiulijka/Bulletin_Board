import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getUser, changeUserType } from '../../../redux/userRedux.js';


import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import styles from './Header.module.scss';


const Component = ({className, user, changeUserType}) => {
  const [userType, setUserType] = React.useState('user');

  const handleChange = (event) => {
    setUserType(event.target.value);
    changeUserType(event.target.value);
  };

  if(user.isLoggedIn){
    return (
      <div className={clsx(className, styles.root)}>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Container maxWidth='lg'>
              <Toolbar>
                <Button component={Link} to="/" color="inherit" sx={{ flexGrow: 1 }}>
                  Home
                </Button>
                <Button component={Link} to="/post/myposts" color="inherit" sx={{ flexGrow: 1 }}>
                  Your Ads
                </Button>
                <Button component={Link} to="/logout" color="inherit" sx={{ flexGrow: 1 }}>
                  LOG OUT
                </Button>

                <Box sx={{ minWidth: 120, flexGrow: 1 }}>
                  <FormControl fullWidth>
                    <InputLabel id="user-type-select-label">UserType</InputLabel>
                    <Select
                      labelId="user-type-select-label"
                      id="user-type-select"
                      value={userType}
                      label="UserType"
                      onChange={handleChange}
                    >
                      <MenuItem value={'user'}>User</MenuItem>
                      <MenuItem value={'admin'}>Admin</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Toolbar>
            </Container>
          </AppBar>
        </Box>
      </div>
    );
  } else {
    return (
      <div className={clsx(className, styles.root)}>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Container maxWidth='lg'>
              <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} />
                <Button>
                  <Link to="/login">Login with Google</Link>
                </Button>
              </Toolbar>
            </Container>
          </AppBar>
        </Box>
      </div>
    );
  }
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  login: PropTypes.func,
};

const mapStateToProps = state => ({
  user: getUser(state),
});

const mapDispatchToProps = dispatch => ({
  // someAction: arg => dispatch(reduxActionCreator(arg)),
  changeUserType: userType => dispatch(changeUserType(userType)),
});

const HeaderContainer = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as Header,
  HeaderContainer as Header,
  Component as HeaderComponent,
};
