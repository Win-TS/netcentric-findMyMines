// module.exports = (io) => {
//     io.on('connection', (socket) => {
//       console.log('A user connected');
      
//       socket.on('disconnect', () => {
//         console.log('User disconnected');
//       });
//     });
  
//     return {
//       newConnection: (req, res) => {
//         res.send('Wait For Matchmaking');
//       }
//     };
//   };