/**
*
* LinkList
*
*/

import React from 'react';
import Link from '../Link';
import IconButton from '../IconButton';
import styles from './styles.css';

function LinkList({ links, topicName, children, actions: { startAdd } }) {
  const linkNodes = links.map(l => (
    <Link
      key={l.id}
      url={l.url}
      description={l.description}
      voteCount={l.voteCount}/>
  ));

  return (
    <div className={styles.linkList}>
      <h1>{topicName}</h1>
      {linkNodes}
      <IconButton
        icon="plus"
        buttonClass={styles.button}
        iconClass={styles.icon}
        onClick={() => startAdd(topicName)} />
      {children}
    </div>
  );
}

LinkList.propTypes = {
  links: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      voteCount: React.PropTypes.number.isRequired,
      description: React.PropTypes.string.isRequired,
      url: React.PropTypes.string.isRequired,
      id: React.PropTypes.string.isRequired
    })
  ),
  actions: React.PropTypes.shape({
    startAdd: React.PropTypes.func.isRequired
  }),
  topicName: React.PropTypes.string.isRequired,
  children: React.PropTypes.element
};

export default LinkList;
