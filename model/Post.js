const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PostSchema = new Schema({
    postName:{
        type: String,
        required: true
    },
    postDesc:{
        type: String,
        required: true
    },
    created_at:{
        type: Date,
        default: Date.now()
    },

})
module.exports = mongoose.model('posts', PostSchema)