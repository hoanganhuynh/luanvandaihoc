let io

module.exports = {
   init: (server) => {
      io = require('socket.io')(server, {
         cors: {
            // origin: process.env.ORIGIN,
            methods: ['GET', 'POST', 'PUT', 'DELETE'],
         },
      })

      return io
   },
   getIO: () => {
      if (!io) {
         throw new Error('Chưa open socket!')
      }
      return io
   },
}
