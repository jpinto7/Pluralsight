/**
*
* Link
*
*/

import React from 'react';


import styles from './styles.css';

function Link({ voteCount, url, description }) {
  return (
    <div className={styles.link}>
      <div className={styles.votingContainer}>
        <div className={styles.votingCount}>
          {voteCount}
        </div>
      </div>
      <div className={styles.detailsContainer}>
        <div>
          <a
            href={url}
            className={styles.linkAnchor}>
              {url}
          </a>
        </div>
        <div className={styles.description}>
          {description}
        </div>
      </div>
    </div>
  );
}

Link.propTypes = {
  voteCount: React.PropTypes.number.isRequired,
  description: React.PropTypes.string.isRequired,
  url: React.PropTypes.string.isRequired
};

export default Link;
