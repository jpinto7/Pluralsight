/*
 *
 * LinkListContainer
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import selectLinkListContainer from './selectors';
import LinkList from '../../components/LinkList';
import { requestLinks, startAdd } from './actions';

export class LinkListContainer extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    actions: React.PropTypes.shape({
      requestLinks: React.PropTypes.func.isRequired,
      startAdd: React.PropTypes.func.isRequired
    }),
    topicName: React.PropTypes.string.isRequired
  }

  componentWillMount() {
    this.props.actions.requestLinks(this.props.topicName);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.topicName !== this.props.topicName) {
      this.props.actions.requestLinks(newProps.topicName);
    }
  }

  render() {
    return (
      <LinkList {...this.props} />
    );
  }
}

const mapStateToProps = selectLinkListContainer();

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      requestLinks: (topicName) => dispatch(requestLinks(topicName)),
      startAdd: (topicName) => dispatch(startAdd(topicName))
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LinkListContainer);
