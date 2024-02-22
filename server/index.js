const express = require('express')()
const server = require('http').createServer(express)
const cors = require('cors')
const next = require('next')


const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'


const socketio = require('socket.io')(server, {
      cors: {
              origin: "*",
              methods: ["GET", "POST"]
      }
})


const nextApp = next({ dev })
const handle = nextApp.getRequestHandler()


nextApp.prepare().then(async() => {

  
  express.use(cors())
  express.get('/hello', async(req, res) => {
    res.send('Hello World')
  });


  socketio.on('connection', (socket) => {

    socket.emit("me", socket.id)

    socket.on('disconnect', () => {
      socket.broadcast.emit("Call ended")
    })

    socket.on('calluser', ({ userToCall, signalData, from, name }) => {
      socketio.to(userToCall).emit('calluser', { signalData, from, name })
    })

    socket.on('answercall', (data) => {
      socketio.to(data.to).emit('Call Accepted', data.signal)
    })
  })


  express.all('*', (req, res) => handle(req, res))

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})