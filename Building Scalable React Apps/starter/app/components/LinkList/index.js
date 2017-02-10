/**
*
* LinkList
*
*/

import React from 'react';

import Link from '../Link';
import styles from './styles.css';

function LinkList({ links, topicName }) {
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
  topicName: React.PropTypes.string.isRequired
};

export default LinkList;
