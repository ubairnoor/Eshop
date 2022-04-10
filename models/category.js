const mongoose = require('mongoose')

const categorySchema = mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    //Color #3334
    color:{
        type:String,
        required:true
    },
    //
    icon:{ 
        type:String
    },
    image:[{
        type:String
    }]

})

module.exports = mongoose.model('Category',categorySchema )