import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getUser } from '../../../redux/postsRedux.js';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

import styles from './Header.module.scss';


const Component = ({className, user}) => {
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
    )
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
});

const HeaderContainer = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as Header,
  HeaderContainer as Header,
  Component as HeaderComponent,
};
