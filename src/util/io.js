import io from 'socket.io-client';
const uri = '/'


const socket = function (token, socketId) {
  const _io = io('http://127.0.0.1:7001/', {
    query: {
      token,
      socketId
    }
  });
  return _io
}


export default socket
