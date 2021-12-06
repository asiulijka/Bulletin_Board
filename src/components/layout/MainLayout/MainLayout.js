import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { Header } from '../Header/Header';
import Container from '@mui/material/Container';

import { connect } from 'react-redux';
import { getUser } from '../../../redux/userRedux.js';

import styles from './MainLayout.module.scss';




const Component = ({className, children}) => {
  return (
    <div className={clsx(className, styles.root)}>
      <Header />
      <Container maxWidth='lg' sx={{ mt: 5 }}>
        {children}
      </Container>
    </div>
  );
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

const mapStateToProps = state => ({
  user: getUser(state),
});

const mapDispatchToProps = dispatch => ({
  // someAction: arg => dispatch(reduxActionCreator(arg)),
});

const MainLayoutContainer = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as MainLayout,
  MainLayoutContainer as MainLayout,
  Component as MainLayoutComponent,
};
