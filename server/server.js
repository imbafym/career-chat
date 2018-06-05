import express from 'express'
import utils from 'utility'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import path from 'path'
import model from './moudle'
import staticPath from '../build/asset-manifest.json'


console.log(staticPath)
//后端css hock
import csshook from 'css-modules-require-hook/preset'
import assetHook from 'asset-require-hook'
assetHook({
    extensions: ['png'],
    limit: 8000
})

//後端裏面的前端渲染引入
//React => div
import React from 'react'
import { renderToNodeStream } from 'react-dom/server'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { StaticRouter } from 'react-router-dom'
import App from '../src/App'
import reducers from '../src/reducer'


const Chat = model.getModel('chat')

const app = express()
//work with express
const server = require('http').Server(app)

const io = require('socket.io')(server)

//监听事件
io.on('connection', function (socket) {
    // console.log('user login')
    socket.on('sendmsg', function (data) {
        // console.log(data)
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

//拦截 user 开头或者static 路径下 执行下一步操作 一般是接受发送获取消息的路径
//否则执行index.html文件 交给前端渲染
app.use(function (req, res, next) {
    if (req.url.startsWith('/user/') || req.url.startsWith('/static/'))
        return next()
    return res.sendFile(path.resolve('build/index.html'))
}

)
//拦截
app.use('/', express.static(path.resolve('build')))


//项目上线
//1. 购买域名
//2. DNS 解析服务器IP
//3. 安装nginx
// 4. 使用pm2管理Node进程
server.listen(9093, function () {
    console.log('Node app runs on 9093')
})