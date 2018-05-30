const express = require('express')
const utils = require('utility')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')


const model = require('./moudle')

const Chat = model.getModel('chat')
// console.log(Chat)

const app = express()

//work with express
const server = require('http').Server(app)

const io = require('socket.io')(server)

//监听事件
io.on('connection', function (socket) {
    // console.log('user login')
    socket.on('sendmsg', function (data) {
        console.log(data)
        const { from, to, msg } = data
        const chatid = [from, to].sort().join('_')
        
        Chat.create({ chatid, from, to, content: msg }, function (err, doc) {
            
            io.emit('recvmsg', Object.assign({}, doc))
        })
        // io.emit('recvmsg', data)
    })
})

const userRouter = require('./user')


app.use(cookieParser())
app.use(bodyParser.json())
app.use('/user', userRouter)
server.listen(9093, function () {
    console.log('Node aoo runs on 9093')
})