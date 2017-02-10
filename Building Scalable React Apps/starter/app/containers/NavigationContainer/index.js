/*
 *
 * NavigationContainer
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import selectNavigationContainer from './selectors';
import Navigation from '../../components/Navigation';
import { requestTopics, selectTopic, toggleDrawer } from './actions';

export class NavigationContainer extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    actions: React.PropTypes.shape({
      requestTopics: React.PropTypes.func.isRequired,
      selectTopic: React.PropTypes.func.isRequired,
      toggleDrawer: React.PropTypes.func.isRequired
    })
  }

  componentWillMount() {
    this.props.actions.requestTopics();
  }

  render() {
    return (
      <Navigation {...this.props} />
    );
  }
}

const mapStateToProps = selectNavigationContainer();

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      requestTopics: () => dispatch(requestTopics()),
      selectTopic: (topic) => dispatch(selectTopic(topic)),
      toggleDrawer: () => dispatch(toggleDrawer())
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationContainer);
