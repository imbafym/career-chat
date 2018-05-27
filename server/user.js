const express = require('express')
const utils = require('utility')

const Router = express.Router()
const model = require('./moudle')
const User = model.getModel('user')

const _filter = { 'pwd': 0, '__v': 0 }

Router.get('/list', function (req, res) {
    User.find({}, function (err, doc) {
        return res.json(doc)
    })
})
Router.post('/login', function (req, res) {

    const { user, pwd } = req.body
    User.findOne({ user, pwd: md5Pwd(pwd) }, { 'pwd': 0 }, function (err, doc) {
        if (!doc) {
            return res.json({ code: 1, msg: 'username or password incorrect' })
        }
        res.cookie('userid', doc._id)
        return res.json({ code: 0, data: doc })

    })

})
Router.post('/update', function (req, res) {
    const userid = req.cookies.userid
    if (!userid) {
        return json.dumps({ code: 1 })
    }
    const body = req.body
    User.findByIdAndUpdate(userid, body, function (err, doc) {
        const data = Object.assign({}, {
            user: doc.user,
            type: doc.type
        }, body)
        // console.log(doc + ' this is doc')
        // console.log(JSON.stringify (body) + ' this is body')
        // console.log(JSON.stringify (data) + ' this is data')
        
        return res.json({ code: 0, data })
    })
    

})

Router.post('/register', function (req, res) {
    console.log(req.body)
    const { user, pwd, type } = req.body
    User.findOne({ user: user }, function (err, doc) {
        if (doc) {
            return res.json({ code: 1, msg: 'user name existed' })
        }

        const userModel = new User({ user, pwd: md5Pwd(pwd), type })
        userModel.save(function (e, d) {
            if (e) {
                return res.json({ code: 1, msg: 'backend error' })
            }
            const { user, type, _id } = d
            res.cookie('userid', _id)
            return res.json({ code: 0, data: { user } })
        })
        // create 不好 因爲無法得到_id
        // User.create({ user, pwd: md5Pwd(pwd), type }, function (e, d) {
        //     if (e) {
        //         return res.json({ code: 1, msg: 'backend error' })
        //     }

        //     return res.json({ code: 0 })
        // })
    })
})

Router.get('/info', function (req, res) {
    const { userid } = req.cookies
    if (!userid) {
        return res.json({ code: 1 })
    }
    User.findOne({ _id: userid }, _filter, function (err, doc) {
        if (err) {
            return res.json({ code: 1, msg: 'backend error' })
        }
        if (doc) {
            return res.json({ code: 0, data: doc })
        }
    })
    //if user has cookies 

    return
})

function md5Pwd(pwd) {
    const salt = 'this_is_salt_57348x8Yfg#!asd@'
    return utils.md5(utils.md5(pwd + salt))
}



module.exports = Router