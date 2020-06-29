import io from 'socket.io-client';
const uri = '/'


const socket = function (token) {
  const _io = io('http://127.0.0.1:7001/', {
    query: {
      token
    }
  });
  // _io.on('connect', function(){
  //   const id = _io.id;
  //   _io.on(id, (msg) => {
  //     console.log('#receive,', msg);
  //   });
  // });
  // _io.on('disconnect', function(){
  //   console.log('断开连接');
  // });
  // _io.on('connect_error', function (e) {
  //   console.log(e, 'reconnect_error');
  //   _io.close()
  // })
  return _io
}


export default socket
