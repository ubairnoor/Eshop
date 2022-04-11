const mongoose = require('mongoose')
const productSchema  = mongoose.Schema({
    name:{
        type:String,
        required: true,

    },
    description:{
        type: String,
        required: true
    },
    richDescription:{
        type:String,
        default:''
    },
    //Image is Array of String and type is also String
    image:[{
        type: String

    }],
    brand:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        default:0
    },
    //when we add Product we use catogory id not whole category.we say the link between the table and catorgory is id.
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category',
        required:true,
        
    },
    countInStock:{
        type:Number,
        required:true,
        min: 0,
        max: 255
    },
    rating:{
        type:Number,
        default:0,
    },
    numReviews:{
        type:Number,
        default:0,
    },
    isFeatured:{
        type:Boolean,
        default:false,
    },
    dateCreated:{
        type:Date,
        default:Date.now,
    }

})

module.exports   = mongoose.model('Product',productSchema); 
