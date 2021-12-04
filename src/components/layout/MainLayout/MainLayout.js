import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { Header } from '../Header/Header';

// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

import styles from './MainLayout.module.scss';




const Component = ({className, isLoggedIn, children}) => {
  return (
    <div className={clsx(className, styles.root)}>
      <Header isLoggedIn={isLoggedIn} />
      {children}
    </div>
  )
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};




// const Component = ({className, children }) => (

  // <div className={clsx(className, styles.root)}>
  //   <Header />
  //   {children}
  // </div>
// );

// const Component = ({className, isLoggedIn, children }) => {

//   if(isLoggedIn){
//     return (
//       <div className={clsx(className, styles.root)}>
//       <Header isLoggedIn={isLoggedIn} />
//       {children}
//     </div>
//     )  
//   } else {
//     return (
//       <div className={clsx(className, styles.root)}>
//       <Header isLoggedIn={false} />
//       {children}
//     </div>
//     )
//   }
// };

// Component.propTypes = {
//   children: PropTypes.node,
//   className: PropTypes.string,
// };

// const mapStateToProps = state => ({
//   someProp: reduxSelector(state),
// });

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

// const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

Component.propTypes = {
  children: PropTypes.node,
};

export {
  Component as MainLayout,
  // Container as MainLayout,
  Component as MainLayoutComponent,
};
