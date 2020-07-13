import io from 'socket.io-client';
const uri = '/'


const socket = function (token, socketId, url) {
  const _io = io(url, {
    query: {
      token,
      socketId
    }
  });
  return _io
}
export default socket
