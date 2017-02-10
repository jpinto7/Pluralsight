/**
*
* Navigation
*
*/

import React from 'react';
import styles from './styles.css';
import AppBar from '../AppBar';
import Drawer from '../Drawer';

function Navigation({ topics, isDrawerOpen, email, actions: { selectTopic, toggleDrawer } }) {
  return (
    <div className={styles.navigation}>
      <AppBar
        email={email}
        toggleDrawer={toggleDrawer} />
      <Drawer
        items={topics}
        selectItem={selectTopic}
        itemLabelAttr="name"
        itemKeyAttr="name"
        isDrawerOpen={isDrawerOpen} />
    </div>
  );
}

Navigation.propTypes = {
  topics: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      name: React.PropTypes.string.isRequired,
      description: React.PropTypes.string.isRequired
    })
  ).isRequired,
  email: React.PropTypes.string,
  isDrawerOpen: React.PropTypes.bool.isRequired,
  actions: React.PropTypes.shape({
    selectTopic: React.PropTypes.func.isRequired,
    toggleDrawer: React.PropTypes.func.isRequired
  })
};

export default Navigation;
