const mongoose = require('mongoose')
//connect mogodb 
const DB_URL = 'mongodb://localhost:27017/react-chat'
mongoose.connect(DB_URL)

const models = {
    user: {
        'user': { type: String, require: true },
        'pwd': { type: String, require: true },
        'type': { type: String, require: true },
        'avator': { type: String },
        'desc': { type: String },
        'title': { type: String },
        //if boss two more 
        'company': { type: String },
        'moeny': { type: String },


    },
    chat: {

    }

}


for (let m in models){
    mongoose.model(m, new mongoose.Schema(models[m]))
}

module.exports = {
    getModel:function(name){
        return mongoose.model(name)
    }
}