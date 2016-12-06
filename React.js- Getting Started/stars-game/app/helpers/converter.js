const helpers = {
  socketRelativeUri(path) {
    const protocolPrefix = (window.location.protocol === 'https:') ? 'wss:' : 'ws:';
    return protocolPrefix + '//' + location.host + path;
  },
  apiRelativeUri(path, prt) {
    const protocolPrefix = (window.location.protocol === 'https:') ? 'https:' : 'http:';
    return protocolPrefix + '//' + location.host + path;
  }
};

const retrieveUri = (prefix, host, pathname, path) => {
  let firstPath = pathname.split('/')[1];
  let uriPath = '';
  if (firstPath === '') {
    uriPath = prefix + '//' + host + '/' + path;
  } else {
    uriPath = prefix + '//' + host + '/' + firstPath + '/' + path;
  }
  return uriPath;
}

export default helpers;
