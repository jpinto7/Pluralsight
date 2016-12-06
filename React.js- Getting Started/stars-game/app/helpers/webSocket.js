const webSocket = {
  onMessage(e, component) {
    const message = e.data;
    if (message === 'Send credentials') {
      var register = {
        type: 'register',
        clientId: '1'
      };
      component.socket.send(JSON.stringify(register));
    } else if (message === 'FINISHED') {
      component.setState({percentage: 0, isUploading: false, showDownloadButton: true});
      sweetAlert('Ok', 'El archivo se procesó correctamente', 'success');
    } else {
      component.setState({percentage: message});
    }
  },
  onClose(e, component) {
    if (component._mounted) {
      component.webSocketInterval = setInterval(component.connectWebSocket, 60000);
    } else {
      console.log('closed socket');
    }
  },
  onOpen(e, component) {
    console.log('is opened');
  },
  onError(e, component) {
    console.error('Socket encountered error: ', err.message, 'Closing socket');
    component.socket.close();
  }
}

export default webSocket;
