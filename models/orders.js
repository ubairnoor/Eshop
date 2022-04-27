//orders schema 
const mongoose =  require('mongoose');

const orderSchema = mongoose.Schema({


    orderItems:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'OrderItem',
        required:true
    }],
    shippingAdress1:{
        type:String,
        required:true
    },
    shippingAdress2:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    zip:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    },
    phone:{
        type:number,
        required:true
    },
    satus:{
        type:String,
        required:true,
        status:'Pending', 
    },
    totalPrice:{
        type:number,
        required:true
    },
    user:{
        type:String,
        required:true
    },
    dateOrdered:{
        type:Date,
        default:Date.now,
    }




})

orderSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

orderSchema.set('toJSON',{
    virtuals:true,
});

exports.Order = mongoose.model('Order',orderSchema)