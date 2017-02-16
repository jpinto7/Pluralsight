export const createLink = ({topicName, url, description}) => (
  fetch(`http://localhost:3000/api/topics/${topicName}/links`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      url,
      description,
      topicName
    })
  }).then(response => response.json())
);
